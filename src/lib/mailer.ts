import nodemailer from 'nodemailer';
import { formatMoscowTime, type Lead } from './lead';

/**
 * Письмо с заявкой по SMTP. Подходит любой почтовый ящик — Яндекс 360,
 * Mail.ru для бизнеса, Gmail с паролем приложения: меняются только переменные
 * окружения, код остаётся прежним.
 */

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  to: string;
  from: string;
};

export function readSmtpConfig(): SmtpConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, LEAD_EMAIL_TO, LEAD_EMAIL_FROM } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !LEAD_EMAIL_TO) return null;

  const port = Number(SMTP_PORT ?? 465);
  return {
    host: SMTP_HOST,
    port,
    // 465 — SMTPS, 587 — STARTTLS
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    user: SMTP_USER,
    password: SMTP_PASSWORD,
    to: LEAD_EMAIL_TO,
    from: LEAD_EMAIL_FROM || SMTP_USER,
  };
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function renderHtml(lead: Lead, receivedAt: string) {
  const rows: [string, string][] = [
    ['Имя', lead.name],
    ['Почта', lead.email || '—'],
    ['Телефон', lead.phone],
    ['Источник', lead.source ?? '—'],
    ['Получено', receivedAt],
    ['Согласие на обработку ПДн', `дано ${receivedAt}`],
  ];

  return `<!doctype html>
<html lang="ru"><body style="margin:0;background:#f3f6f3;padding:24px;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#0f1f19">
  <table role="presentation" style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;border:1px solid #e3e9e3">
    <tr><td>
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#5a635c">Культура девелопмента</p>
      <h1 style="margin:0 0 22px;font-size:22px">Новая заявка с сайта</h1>
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:9px 0;color:#5a635c;width:110px">${k}</td><td style="padding:9px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:24px 0 0;font-size:13px;color:#5a635c">
        ${
          lead.email
            ? 'Ответить можно прямо из этого письма — адрес заявителя подставлен в «Reply-To».'
            : 'Заявитель оставил только телефон — свяжитесь по номеру выше.'
        }
      </p>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendLeadEmail(lead: Lead): Promise<void> {
  const config = readSmtpConfig();
  if (!config) throw new Error('SMTP не настроен: проверьте переменные окружения');

  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
  });

  const receivedAt = formatMoscowTime();

  await transport.sendMail({
    from: config.from,
    to: config.to,
    // Без почты отвечать нечему — тогда «Reply-To» не ставим.
    replyTo: lead.email ? `${lead.name} <${lead.email}>` : undefined,
    subject: `Заявка с сайта — ${lead.name}`,
    text: [
      'Новая заявка с сайта «Культура девелопмента»',
      '',
      `Имя: ${lead.name}`,
      `Почта: ${lead.email || '—'}`,
      `Телефон: ${lead.phone}`,
      `Источник: ${lead.source ?? '—'}`,
      `Получено: ${receivedAt}`,
      `Согласие на обработку ПДн: дано ${receivedAt}`,
    ].join('\n'),
    html: renderHtml(lead, receivedAt),
  });
}
