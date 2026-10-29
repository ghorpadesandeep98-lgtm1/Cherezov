import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';
import { SITE_URL } from '@/lib/site';
import '@/styles/globals.css';

/* Manrope — единственное фирменное семейство дизайн-системы.
   Вариативное начертание 200..800, отдаётся в токен --font-core (см. globals.css). */
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
});

const TITLE = 'Культура девелопмента — оценка потенциала участка';
/**
 * Описание переписано 28.09.2026 по тексту контента от 24.09 (kd-marketing/content-plan.md,
 * раздел «Строки для сайт-инженера»). Прежний вариант пересказывал первый экран и не называл
 * целевое действие; здесь «Пришлите участок» стоит на 91-м знаке, внутри первых 120.
 * Сроков и цены нет намеренно (блокер 8в), цифр опыта нет намеренно (блокер 6).
 * `title` не трогаем: он проиндексирован, и при правке двух полей сразу
 * результат нечем будет объяснить.
 */
const DESCRIPTION =
  'Разбираем участок девелопера: сколько можно построить, за какие деньги, стоит ли заходить. ' +
  'Пришлите участок — вернём сценарий, цену входа и решение.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: 'Культура девелопмента',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
