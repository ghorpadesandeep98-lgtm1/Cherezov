import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { contacts, brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Связаться с производством ${brand.fullName}.`,
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title={
          <>
            Расскажите,
            <br />
            что печатаем.
          </>
        }
        lead="Опишите задачу — вернёмся с расчётом и сроком. Если параметры уже известны, быстрее собрать смету в калькуляторе."
      >
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="divide-y divide-line border-y border-line">
              {[
                { k: "Телефон", v: contacts.phone, href: `tel:${contacts.phoneHref}` },
                { k: "Почта", v: contacts.email, href: `mailto:${contacts.email}` },
                { k: "Производство", v: contacts.address },
                { k: "Часы работы", v: contacts.hours },
              ].map((row) => (
                <div key={row.k} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <dt className="w-36 shrink-0 font-mono text-[10px] tracking-[0.18em] text-graphite uppercase">
                    {row.k}
                  </dt>
                  <dd className="text-[16px] font-medium">
                    {row.href ? (
                      <a href={row.href} className="transition-colors hover:text-lime-2">
                        {row.v}
                      </a>
                    ) : (
                      row.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex gap-3">
              {contacts.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-line px-5 py-2.5 text-[13px] font-medium transition-colors duration-300 hover:border-ink hover:bg-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </PageHero>
    </>
  );
}
