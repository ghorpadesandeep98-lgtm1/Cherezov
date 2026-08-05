import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Calculator } from "@/components/calculator/Calculator";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { brand, core, screen } from "@/content/site";

export const metadata: Metadata = {
  title: brand.product.name,
  description: core.lead,
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Цифровое ядро проекта"
        title={
          <>
            <span className="text-ink">Калькулятор</span>{" "}
            <span className="text-brand">девелопера</span>
          </>
        }
        lead={screen.lead}
      >
        <Reveal delay={0.2} className="mt-12">
          <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_60px_120px_-60px_rgba(12,40,20,0.4)]">
            <div className="h-[760px] md:h-[700px]">
              <Calculator />
            </div>
          </div>
        </Reveal>
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <h2 className="display text-[clamp(1.8rem,3.6vw,2.8rem)]">
                <span className="text-ink">Пять этапов</span>{" "}
                <span className="text-brand">в одной модели данных</span>
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-graphite">
                {core.banner.text}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {core.steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.05}>
                  <div className="card-glass h-full rounded-3xl p-6">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand-2">
                      <Icon name={s.icon as IconName} className="size-5" />
                    </span>
                    <p className="nums mt-5 text-[13px] font-semibold text-brand">{s.n}</p>
                    <h3 className="mt-1 text-[17px] font-bold tracking-tight">{s.tag}</h3>
                    <p className="mt-2 text-[13.5px] leading-snug text-graphite">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} className="mt-14">
            <div className="grid gap-4 md:grid-cols-4">
              {screen.asides.map((a) => (
                <div key={a.title} className="rounded-3xl border border-line bg-white/70 p-6">
                  <h3 className="text-[16px] font-bold tracking-tight">{a.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-snug text-graphite">{a.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
