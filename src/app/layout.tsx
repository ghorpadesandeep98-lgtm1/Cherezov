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
  title: 'Культура девелопмента — калькулятор девелопера',
  description:
    'Земля — это ещё не актив. Активом её делает правильный девелопмент. Калькулятор девелопера превращает участок в решение: показывает потенциал, экономику и риски до старта.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
