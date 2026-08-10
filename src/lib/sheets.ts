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
    /*
     * Ключ из JSON часто копируют вместе с обрамляющими кавычками — снимаем их,
     * иначе подпись падает. Перевод строки в переменных окружения хранится
     * как \n: возвращаем его на место.
     */
    privateKey: GOOGLE_PRIVATE_KEY.trim()
      .replace(/^["']|["']$/g, '')
      .replace(/\\n/g, '\n'),
    /*
     * Диапазон без имени листа — Google дописывает строку на первую вкладку.
     * Так настройка не ломается из-за того, что вкладку забыли переименовать;
     * если листов несколько, укажите имя явно: GOOGLE_SHEETS_RANGE=Заявки!A:E
     */
    range: process.env.GOOGLE_SHEETS_RANGE || 'A:E',
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

/**
 * Проверка настройки без отправки заявки: подпись ключом и доступ к таблице.
 * Возвращает короткую причину отказа — по ней видно, ключ битый или не выдан
 * доступ к документу. Секреты в ответ не попадают.
 */
export async function verifySheetsAccess(): Promise<{ ok: boolean; reason?: string }> {
  const config = readSheetsConfig();
  if (!config) return { ok: false, reason: 'Переменные окружения не заданы' };

  if (!config.privateKey.includes('BEGIN PRIVATE KEY')) {
    return { ok: false, reason: 'GOOGLE_PRIVATE_KEY не похож на ключ: нет строки BEGIN PRIVATE KEY' };
  }

  let token: string;
  try {
    token = await fetchAccessToken(config);
  } catch (error) {
    return { ok: false, reason: `Google не принял ключ: ${String(error).slice(0, 300)}` };
  }

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(config.spreadsheetId)}?fields=properties.title`,
    { headers: { authorization: `Bearer ${token}` } },
  );

  if (!response.ok) {
    return {
      ok: false,
      reason: `Таблица недоступна (${response.status}): ${(await response.text()).slice(0, 300)}`,
    };
  }

  return { ok: true };
}

export async function appendLeadToSheet(lead: Lead): Promise<void> {
  const config = readSheetsConfig();
  if (!config) throw new Error('Google Таблица не настроена: проверьте переменные окружения');

  const token = await fetchAccessToken(config);

  /*
   * RAW, а не USER_ENTERED: телефон начинается с «+», и таблица принимает его
   * за формулу — в ячейке оказывается #ERROR!. Формулы нам тут не нужны,
   * значения должны лечь как есть.
   */
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(config.spreadsheetId)}` +
    `/values/${encodeURIComponent(config.range)}:append` +
    '?valueInputOption=RAW&insertDataOption=INSERT_ROWS';

  const response = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    /*
     * Пустых ячеек быть не должно: append ищет в диапазоне «таблицу», а дырка
     * в колонке разрывает её на две — и строка уезжает в правый обрывок.
     * Форма не собирает почту, поэтому на её месте прочерк.
     */
    body: JSON.stringify({
      values: [
        [formatMoscowTime(), lead.name, lead.email || '—', lead.phone, lead.source || '—'],
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Таблица не приняла строку (${response.status}): ${await response.text()}`);
  }
}
