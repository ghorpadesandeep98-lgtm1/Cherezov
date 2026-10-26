import { formatMoscowTime, type Lead } from './lead';

/**
 * Заявка сразу в Битрикс24 через входящий вебхук.
 *
 * Адрес вебхука — секрет (по нему можно читать и менять CRM), поэтому он живёт
 * только в переменной окружения BITRIX_WEBHOOK_URL на Vercel и никогда не
 * попадает в браузер. Вида: https://<портал>.bitrix24.ru/rest/<id>/<ключ>/
 */

const ASSIGNED = 1; // Наталья Соболева — CRM ведётся из её аккаунта
const ORIGINATOR = 'cultdev.pro';

export function readBitrixConfig(): { hook: string } | null {
  const raw = process.env.BITRIX_WEBHOOK_URL?.trim().replace(/^["']|["']$/g, '');
  if (!raw || !/^https:\/\/[^/]+\/rest\/\d+\/[^/]+\/?$/.test(raw)) return null;
  return { hook: raw.endsWith('/') ? raw : `${raw}/` };
}

async function call<T>(hook: string, method: string, params: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${hook}${method}.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
    signal: AbortSignal.timeout(15_000),
  });
  const json = (await res.json().catch(() => ({}))) as { result?: T; error?: string; error_description?: string };
  if (!res.ok || json.error) {
    throw new Error(`${method}: ${json.error ?? res.status} ${json.error_description ?? ''}`.trim());
  }
  return json.result as T;
}

const OPEN = (stage: string) => !/WON|LOSE|APOLOGY/.test(stage);

/**
 * Создаёт контакт и сделку «Заявка с сайта Культура». Если человек с тем же
 * телефоном или почтой уже есть и у него открыта сделка Культуры — новую не
 * заводим, а дописываем повтор в неё (правило Ольги: без дублей по телефону).
 */
export async function sendLeadToBitrix(lead: Lead): Promise<void> {
  const cfg = readBitrixConfig();
  if (!cfg) throw new Error('BITRIX_WEBHOOK_URL не задан');
  const { hook } = cfg;
  const when = formatMoscowTime();
  const deadline = new Date(Date.now() + 3600_000).toISOString();

  let contactId: number | null = null;
  for (const [type, value] of [['PHONE', lead.phone], ['EMAIL', lead.email]] as const) {
    if (contactId || !value) continue;
    const found = await call<{ CONTACT?: number[] } | []>(hook, 'crm.duplicate.findbycomm', {
      type,
      values: [value],
      entity_type: 'CONTACT',
    });
    if (!Array.isArray(found) && found.CONTACT?.length) contactId = found.CONTACT[0];
  }

  if (contactId) {
    const deals = await call<{ ID: string; STAGE_ID: string; TITLE: string; COMMENTS: string | null }[]>(
      hook,
      'crm.deal.list',
      { filter: { CONTACT_ID: contactId, CATEGORY_ID: 0 }, select: ['ID', 'STAGE_ID', 'TITLE', 'COMMENTS'], order: { ID: 'DESC' } },
    );
    const open = deals.find((d) => OPEN(d.STAGE_ID) && /Культур/.test(d.TITLE ?? ''));
    if (open) {
      await call(hook, 'crm.deal.update', {
        id: open.ID,
        fields: {
          COMMENTS: `${open.COMMENTS ?? ''}<br>Повторная заявка с сайта Культура: ${when} МСК${lead.source ? ` · ${lead.source}` : ''}`,
        },
      });
      await call(hook, 'crm.activity.todo.add', {
        ownerTypeId: 2,
        ownerId: Number(open.ID),
        deadline,
        title: 'Повторная заявка с сайта Культура — позвонить',
        description: `Человек оставил заявку ещё раз ${when} МСК.`,
        responsibleId: ASSIGNED,
      }).catch(() => undefined);
      return;
    }
  } else {
    contactId = await call<number>(hook, 'crm.contact.add', {
      fields: {
        NAME: lead.name || 'Без имени',
        SOURCE_ID: 'WEB',
        OPENED: 'Y',
        ASSIGNED_BY_ID: ASSIGNED,
        COMMENTS: 'Заявка с сайта Культура (cultdev.pro)',
        ...(lead.phone ? { PHONE: [{ VALUE: lead.phone, VALUE_TYPE: 'WORK' }] } : {}),
        ...(lead.email ? { EMAIL: [{ VALUE: lead.email, VALUE_TYPE: 'WORK' }] } : {}),
      },
    });
  }

  const lines = [
    '<b>Заявка с сайта Культура</b> (cultdev.pro)',
    `Дата заявки (МСК): ${when}`,
    `Имя: ${lead.name}`,
    lead.phone && `Телефон: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
    lead.source && `Форма на сайте: ${lead.source}`,
    'Пришло с сайта напрямую (вебхук Битрикс24)',
  ].filter(Boolean);

  const dealId = await call<number>(hook, 'crm.deal.add', {
    fields: {
      TITLE: `Заявка с сайта Культура: ${lead.name || lead.phone || lead.email}`,
      CATEGORY_ID: 0,
      STAGE_ID: 'NEW',
      SOURCE_ID: 'WEB',
      SOURCE_DESCRIPTION: `Заявка с сайта Культура · cultdev.pro${lead.source ? ` · ${lead.source}` : ''}`,
      CONTACT_ID: contactId,
      COMMENTS: lines.join('<br>'),
      ORIGINATOR_ID: ORIGINATOR,
      ORIGIN_ID: `api-${Date.now().toString(36)}`,
      OPENED: 'Y',
      ASSIGNED_BY_ID: ASSIGNED,
    },
  });

  await call(hook, 'crm.activity.todo.add', {
    ownerTypeId: 2,
    ownerId: dealId,
    deadline,
    title: 'Позвонить по заявке с сайта Культура',
    description: `Заявка ${when} МСК: разбор участка.`,
    responsibleId: ASSIGNED,
  }).catch(() => undefined);
}
