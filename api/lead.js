// Vercel Serverless Function: POST /api/lead → сообщение в Telegram.
// В Vercel → Settings → Environment Variables задайте:
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — id чата/канала, куда слать заявки
module.exports = async (req, res) => {
  if (req.method !== "POST") { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const name = String((body && body.name) || "").trim().slice(0, 200);
  const phone = String((body && body.phone) || "").trim().slice(0, 50);
  const page = String((body && body.page) || "").trim().slice(0, 200);
  if (!name || !phone) { res.status(400).json({ ok: false, error: "name and phone required" }); return; }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) { res.status(500).json({ ok: false, error: "Telegram env vars not set" }); return; }

  const text = "Новая заявка с сайта\n\nИмя: " + name + "\nТелефон: " + phone + "\nСтраница: " + page +
    "\nВремя: " + new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) + " МСК";
  try {
    const r = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text })
    });
    if (!r.ok) throw new Error("telegram " + r.status);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(502).json({ ok: false, error: String(e.message || e) });
  }
};
