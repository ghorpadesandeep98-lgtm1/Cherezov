# Деплой на Vercel

1. Vercel → Add New → Project → загрузить папку (или через GitHub). Framework: **Other**, Build Command пустой, Output Directory — корень.
2. Settings → Environment Variables:
   - `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather
   - `TELEGRAM_CHAT_ID` — id чата (напишите боту, затем откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` и возьмите `chat.id`)
3. Redeploy после добавления переменных.

Адреса: `/` главная · `/calculator` · `/mim` · `/priroda` · `/legal` (политика и согласие).
Заявки из всех форм уходят в `POST /api/lead` → Telegram.
