import Link from "next/link";
import { brand, contacts, nav, products } from "@/content/site";
import { Arrow } from "@/components/ui/Primitives";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[720px] -translate-x-1/2 rounded-full bg-lime/10 blur-[140px]" />

      <div className="shell relative pt-24 pb-10 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase">
              {brand.descriptor}
            </p>
            <h2 className="display mt-6 text-[clamp(2.2rem,5.5vw,4.4rem)] text-white">
              Давайте
              <br />
              <span className="text-lime">напечатаем</span> это.
            </h2>
            <Link
              href="/platforma"
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-lime px-8 py-5 text-[16px] font-semibold text-ink transition-transform duration-500 hover:scale-[1.02]"
            >
              Открыть {brand.product.short.toLowerCase()}
              <span className="grid size-7 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 group-hover:translate-x-1">
                <Arrow />
              </span>
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/35 uppercase">
                Разделы
              </p>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] text-white/65 transition-colors hover:text-lime"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/35 uppercase">
                Продукция
              </p>
              <ul className="mt-5 space-y-3">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/produkciya#${p.slug}`}
                      className="text-[15px] text-white/65 transition-colors hover:text-lime"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/35 uppercase">
                Контакты
              </p>
              <ul className="mt-5 space-y-3 text-[15px] text-white/65">
                <li>
                  <a href={`tel:${contacts.phoneHref}`} className="hover:text-lime">
                    {contacts.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contacts.email}`} className="hover:text-lime">
                    {contacts.email}
                  </a>
                </li>
                <li className="text-white/45">{contacts.address}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.fullName}. {brand.city}, с {brand.since} года.
          </p>
          <div className="flex gap-6">
            {contacts.socials.map((s) => (
              <a key={s.label} href={s.href} className="transition-colors hover:text-lime">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
