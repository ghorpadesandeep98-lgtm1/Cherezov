import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Kpi } from "@/components/sections/Kpi";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { ObjectScene } from "@/components/three/Lazy";
import { facility } from "@/content/site";

export const metadata: Metadata = {
  title: "Производство",
  description: facility.lead,
};

export default function ProductionPage() {
  return (
    <>
      <PageHero
        eyebrow={facility.eyebrow}
        title={facility.title}
        lead={facility.lead}
        visual={<ObjectScene kind="calendar" distance={4.4} className="size-full" />}
      >
        <Reveal delay={0.2} className="mt-14">
          <dl className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {facility.specs.map((s) => (
              <div key={s.k} className="bg-white/85 px-7 py-8 backdrop-blur">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-graphite uppercase">
                  {s.k}
                </dt>
                <dd className="mt-3 text-[17px] leading-snug font-semibold tracking-tight">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </PageHero>

      <Kpi />
      <Process />

      <section className="bg-paper py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4vw,3.2rem)]">
              Контроль цвета —
              <br />
              не выборочный.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-[16px] leading-relaxed text-graphite">
            <p>
              Цветопроба согласуется до запуска тиража и остаётся эталоном на всех этапах. В печати
              работает денситометрический контроль: параметры снимаются с оттисков в потоке, а не с
              выборки в конце смены.
            </p>
            <p>
              Отклонение фиксируется на линии — тираж не уходит на отделку, пока цвет не совпал с
              эталоном. Поэтому повторный тираж через год выглядит так же, как первый.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
