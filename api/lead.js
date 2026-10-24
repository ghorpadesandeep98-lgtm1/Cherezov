// Vercel Serverless Function: POST /api/lead
//
// Заявка пишется строкой в Google-таблицу «Заявки с Сайта» — ту же, из которой
// агент раз в час переносит заявки в Битрикс24 с пометкой «Заявка с сайта Культура».
// Колонки таблицы (их порядок менять нельзя, на него смотрит агент):
//   A дата и время по Москве · B имя · C почта («—» если нет) · D телефон · E форма на сайте
//
// Переменные окружения уже заданы в проекте Vercel (их ставил прежний сайт):
//   GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL,
//   GOOGLE_PRIVATE_KEY_BASE64 (или GOOGLE_PRIVATE_KEY), GOOGLE_SHEETS_RANGE (по умолчанию A:E)
// Необязательный второй канал — Telegram: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// GET /api/lead?check=1 показывает, какие каналы настроены.

const { createSign } = require("node:crypto");

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

function readPrivateKey() {
  const encoded = (process.env.GOOGLE_PRIVATE_KEY_BASE64 || "").trim();
  if (encoded) return Buffer.from(encoded, "base64").toString("utf8");
  const raw = process.env.GOOGLE_PRIVATE_KEY;
  if (!raw) return null;
  return raw.trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
}

function readSheetsConfig() {
  const id = process.env.GOOGLE_SHEETS_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = readPrivateKey();
  if (!id || !email || !key) return null;
  return { id: id, email: email, key: key, range: process.env.GOOGLE_SHEETS_RANGE || "A:E" };
}

const base64url = (input) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function accessToken(cfg) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({ iss: cfg.email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }));
  const signature = base64url(createSign("RSA-SHA256").update(header + "." + claims).sign(cfg.key));
  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: header + "." + claims + "." + signature
    }).toString()
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.access_token) throw new Error("google token " + r.status + " " + (j.error_description || j.error || ""));
  return j.access_token;
}

async function appendRow(cfg, row) {
  const token = await accessToken(cfg);
  const url =
    "https://sheets.googleapis.com/v4/spreadsheets/" + encodeURIComponent(cfg.id) +
    "/values/" + encodeURIComponent(cfg.range) +
    ":append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS";
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] })
  });
  if (!r.ok) throw new Error("sheets " + r.status + " " + (await r.text()).slice(0, 200));
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;
  const r = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text: text })
  });
  return r.ok;
}

const moscowNow = () =>
  new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

module.exports = async (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({
      ok: true,
      channels: { sheets: !!readSheetsConfig(), telegram: !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) }
    });
    return;
  }
  if (req.method !== "POST") { res.status(405).json({ ok: false }); return; }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};
  const clean = (v, n) => String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, n);

  const name = clean(body.name, 200);
  const contact = clean(body.phone || body.contact, 120);
  const email = clean(body.email, 120) || (/@/.test(contact) ? contact : "");
  const phone = /@/.test(contact) ? "" : contact;
  const page = clean(body.page, 120);
  const plot = clean(body.plot, 300);
  const docs = clean(body.docs, 300);

  if (!name || (!phone && !email)) { res.status(400).json({ ok: false, error: "name and contact required" }); return; }

  const dt = moscowNow();
  const source = [page || "Форма на сайте", plot ? "участок: " + plot : "", docs ? "на руках: " + docs : ""]
    .filter(Boolean).join(" · ").slice(0, 400);
  const row = [dt, name, email || "—", phone, source];

  const cfg = readSheetsConfig();
  let sheetOk = false, sheetErr = "";
  if (cfg) {
    try { await appendRow(cfg, row); sheetOk = true; }
    catch (e) { sheetErr = String((e && e.message) || e).slice(0, 200); }
  } else {
    sheetErr = "sheets env vars not set";
  }

  let tgOk = false;
  try {
    tgOk = await sendTelegram(
      "Новая заявка с сайта Культура\n\nИмя: " + name +
      (phone ? "\nТелефон: " + phone : "") + (email ? "\nПочта: " + email : "") +
      (plot ? "\nУчасток: " + plot : "") + (docs ? "\nНа руках: " + docs : "") +
      "\nСтраница: " + (page || "—") + "\nВремя: " + dt + " МСК"
    );
  } catch (e) { tgOk = false; }

  if (sheetOk || tgOk) { res.status(200).json({ ok: true, sheets: sheetOk, telegram: tgOk }); return; }
  res.status(502).json({ ok: false, error: sheetErr || "no delivery channel" });
};
