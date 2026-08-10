import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '@/styles/globals.css';

/* Manrope — единственное фирменное семейство дизайн-системы.
   Вариативное начертание 200..800, отдаётся в токен --font-core (см. globals.css). */
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Культура девелопмента — оценка потенциала участка',
  description:
    'Проверьте потенциал участка до покупки и проектирования. Собираем землю, продукт, экономику и риски в одной модели — и готовим решение, которое можно защитить перед инвестором, банком и городом.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
