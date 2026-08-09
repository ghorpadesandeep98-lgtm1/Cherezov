import { createSign } from 'node:crypto';
import { formatMoscowTime, type Lead } from './lead';

/**
 * Дозапись заявки в Google Таблицу от имени сервисного аккаунта.
 *
 * Токен получаем сами: подписываем JWT приватным ключом и меняем его на
 * access_token. Так обходимся без пакета googleapis — он тянет несколько
 * мегабайт зависимостей ради одного запроса.
 */

const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

type SheetsConfig = {
  spreadsheetId: string;
  clientEmail: string;
  privateKey: string;
  range: string;
};

export function readSheetsConfig(): SheetsConfig | null {
  const { GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  if (!GOOGLE_SHEETS_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) return null;

  return {
    spreadsheetId: GOOGLE_SHEETS_ID,
    clientEmail: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // В переменных окружения перевод строки хранится как \n — возвращаем его на место.
    privateKey: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    range: process.env.GOOGLE_SHEETS_RANGE || 'Заявки!A:E',
  };
}

const base64url = (input: string | Buffer) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function fetchAccessToken(config: SheetsConfig): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: config.clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );

  const signature = base64url(
    createSign('RSA-SHA256').update(`${header}.${claims}`).sign(config.privateKey),
  );

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google не выдал токен (${response.status}): ${await response.text()}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error('Google не вернул access_token');
  return data.access_token;
}

export async function appendLeadToSheet(lead: Lead): Promise<void> {
  const config = readSheetsConfig();
  if (!config) throw new Error('Google Таблица не настроена: проверьте переменные окружения');

  const token = await fetchAccessToken(config);

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(config.spreadsheetId)}` +
    `/values/${encodeURIComponent(config.range)}:append` +
    '?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS';

  const response = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      values: [[formatMoscowTime(), lead.name, lead.email, lead.phone, lead.source ?? '']],
    }),
  });

  if (!response.ok) {
    throw new Error(`Таблица не приняла строку (${response.status}): ${await response.text()}`);
  }
}
