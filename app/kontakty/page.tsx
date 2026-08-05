import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { contactPage, contacts } from "@/content/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: contactPage.lead,
};

export default function ContactsPage() {
  return (
    <PageHero
      eyebrow={contactPage.eyebrow}
      title={
        <>
          <span className="text-ink">Покажем калькулятор</span>{" "}
          <span className="text-brand">на вашем участке</span>
        </>
      }
      lead={contactPage.lead}
    >
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.25}>
          <dl className="divide-y divide-line border-y border-line">
            {[
              { k: "Telegram", v: "Написать в Telegram", href: contacts.telegram },
              { k: "Телефон", v: contacts.phone, href: `tel:${contacts.phoneHref}` },
              { k: "Почта", v: contacts.email, href: `mailto:${contacts.email}` },
              { k: "Город", v: contacts.address },
              { k: "Часы работы", v: contacts.hours },
            ].map((row) => (
              <div
                key={row.k}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="w-32 shrink-0 text-[11px] font-semibold tracking-[0.14em] text-graphite uppercase">
                  {row.k}
                </dt>
                <dd className="text-[16px] font-medium">
                  {row.href ? (
                    <a href={row.href} className="transition-colors hover:text-brand">
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </PageHero>
  );
}
