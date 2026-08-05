import type { Metadata, Viewport } from "next";
import { Manrope, IBM_Plex_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { brand } from "@/content/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/** Дисплейный шрифт — техничная геометрия, кириллица как первый класс. */
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diton.ru"),
  title: {
    default: `${brand.fullName} — ${brand.tagline}`,
    template: `%s — ${brand.fullName}`,
  },
  description:
    "Полиграфический комбинат полного цикла: календари, книги, каталоги, упаковка. Расчёт тиража онлайн за 12 секунд.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: brand.fullName,
    title: `${brand.fullName} — ${brand.tagline}`,
    description: "Производство и цифровая платформа расчёта тиража.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${unbounded.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col bg-paper">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
