/** Заявка с формы: единый контракт для клиента, почты и таблицы. */
export type Lead = {
  name: string;
  email: string;
  phone: string;
  /** Ловушка для ботов: живой человек это поле не видит и не заполняет. */
  company?: string;
  /** Откуда пришла заявка — блок формы или другой источник на странице. */
  source?: string;
};

export type LeadFields = Pick<Lead, 'name' | 'email' | 'phone'>;

const LIMITS = { name: 120, email: 160, phone: 40, source: 80 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Телефон: не меньше 10 цифр, разделители и + допускаются. */
const PHONE_DIGITS = 10;

export type Validation = { ok: true; lead: Lead } | { ok: false; errors: Partial<Record<keyof LeadFields, string>> };

/** Проверка на сервере: клиентской валидации браузера недостаточно. */
export function validateLead(input: unknown): Validation {
  const raw = (input ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

  const name = str(raw.name).slice(0, LIMITS.name);
  const email = str(raw.email).slice(0, LIMITS.email);
  const phone = str(raw.phone).slice(0, LIMITS.phone);
  const company = str(raw.company);
  const source = str(raw.source).slice(0, LIMITS.source) || 'Форма на сайте';

  const errors: Partial<Record<keyof LeadFields, string>> = {};
  if (name.length < 2) errors.name = 'Укажите имя';
  if (!EMAIL.test(email)) errors.email = 'Проверьте адрес почты';
  if ((phone.match(/\d/g) ?? []).length < PHONE_DIGITS) errors.phone = 'Проверьте номер телефона';

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, lead: { name, email, phone, company, source } };
}

/** Заполненная ловушка — это бот. Отвечаем как на успех, но никуда не доставляем. */
export const isBot = (lead: Lead) => Boolean(lead.company);

export const formatMoscowTime = (date = new Date()) =>
  new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Moscow',
  }).format(date);
