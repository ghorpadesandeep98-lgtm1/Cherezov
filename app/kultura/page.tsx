import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Insight } from "@/components/sections/Insight";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { ObjectScene } from "@/components/three/Lazy";
import { brand, team, values } from "@/content/site";

export const metadata: Metadata = {
  title: "Культура",
  description: "Ценности, команда и принципы работы полиграфического комбината ДИТОН.",
};

export default function CulturePage() {
  return (
    <>
      <PageHero
        eyebrow="Культура компании"
        title={
          <>
            Культура — это
            <br />
            то, что видно
            <br />
            на оттиске.
          </>
        }
        lead={`${brand.fullName} — про отношение к материалу и к сроку. Всё остальное следствие.`}
        visual={<ObjectScene kind="catalog" distance={4.6} className="size-full" />}
      />

      <section className="bg-paper py-24 md:py-32">
        <div className="shell grid gap-px overflow-hidden rounded-[32px] border border-line bg-line md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="bg-white">
              <div className="h-full px-8 py-12 md:px-10">
                <span className="font-mono text-[11px] text-lime-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display mt-6 text-[clamp(1.5rem,2.6vw,2.1rem)]">{v.title}</h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-graphite">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Insight />

      <section className="bg-mist py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)]">Кто делает тираж</h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06} className="bg-white">
                <div className="h-full px-7 py-10">
                  <p className="text-[19px] font-bold tracking-tight">{t.name}</p>
                  <p className="mt-2 text-[14px] text-graphite">{t.role}</p>
                  <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-lime-2 uppercase">
                    {t.count}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
