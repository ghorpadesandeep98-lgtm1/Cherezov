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
const DESCRIPTION =
  'Проверьте потенциал участка до покупки и проектирования. Собираем землю, продукт, экономику и риски в одной модели — и готовим решение, которое можно защитить перед инвестором, банком и городом.';

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
