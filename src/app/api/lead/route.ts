import { NextResponse } from 'next/server';
import { isBot, validateLead } from '@/lib/lead';
import { readSmtpConfig, sendLeadEmail } from '@/lib/mailer';
import { appendLeadToSheet, readSheetsConfig } from '@/lib/sheets';

/** nodemailer и подпись JWT требуют Node — Edge-рантайм здесь не подходит. */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 });
  }

  const result = validateLead(payload);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  const { lead } = result;

  // Боту отвечаем успехом, но никуда не доставляем: так он не подбирает обход.
  if (isBot(lead)) return NextResponse.json({ ok: true });

  const channels: { name: string; run: () => Promise<void> }[] = [];
  if (readSmtpConfig()) channels.push({ name: 'почта', run: () => sendLeadEmail(lead) });
  if (readSheetsConfig()) channels.push({ name: 'таблица', run: () => appendLeadToSheet(lead) });

  if (channels.length === 0) {
    console.error('[lead] нет ни одного настроенного канала доставки', {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
    });
    return NextResponse.json({ error: 'Приём заявок не настроен' }, { status: 503 });
  }

  const settled = await Promise.allSettled(channels.map((c) => c.run()));
  const failed = settled
    .map((r, i) => (r.status === 'rejected' ? { name: channels[i].name, reason: r.reason } : null))
    .filter((f): f is { name: string; reason: unknown } => f !== null);

  for (const f of failed) console.error(`[lead] канал «${f.name}» не сработал:`, f.reason);

  // Заявка не должна пропасть из-за одного отказавшего канала.
  if (failed.length === channels.length) {
    console.error('[lead] заявка не доставлена ни одним каналом', {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
    });
    return NextResponse.json({ error: 'Не удалось отправить заявку' }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: channels.length - failed.length });
}
