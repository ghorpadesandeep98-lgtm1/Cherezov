import Link from "next/link";
import { brand, contacts, nav, lifecycle } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Primitives";
import { Wordmark } from "@/components/layout/Header";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[680px] -translate-x-1/2 rounded-full bg-brand/12 blur-[150px]" />

      <div className="shell relative pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Wordmark />
            <h2 className="display mt-8 max-w-lg text-[clamp(1.8rem,4vw,3rem)] text-white">
              Проверим потенциал участка{" "}
              <span className="text-brand">до сделки</span>
            </h2>
            <Link
              href="/kontakty"
              className="group mt-9 inline-flex items-center gap-3 rounded-2xl bg-brand px-7 py-4 text-[15px] font-semibold text-white transition-colors duration-400 hover:bg-brand-2"
            >
              Запросить демо
              <ArrowUpRight className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                Разделы
              </p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link href="/" className="text-[15px] text-white/65 transition-colors hover:text-brand">
                    Главная
                  </Link>
                </li>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] text-white/65 transition-colors hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                Этапы
              </p>
              <ul className="mt-5 space-y-3">
                {lifecycle.stages
                  .filter((s) => s.ours)
                  .map((s) => (
                    <li key={s.n} className="text-[15px] text-white/65">
                      {s.title}
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                Контакты
              </p>
              <ul className="mt-5 space-y-3 text-[15px] text-white/65">
                <li>
                  <a href={contacts.telegram} className="hover:text-brand">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href={`tel:${contacts.phoneHref}`} className="hover:text-brand">
                    {contacts.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contacts.email}`} className="hover:text-brand">
                    {contacts.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-[13px] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name} — {brand.tagline}.
          </p>
          <p>{brand.product.claim}</p>
        </div>
      </div>
    </footer>
  );
}
