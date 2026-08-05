import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Calculator } from "@/components/calculator/Calculator";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { brand, platform } from "@/content/site";

export const metadata: Metadata = {
  title: brand.product.name,
  description: platform.lead,
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow={platform.eyebrow}
        title={
          <>
            {brand.product.short}
            <br />
            тиража
          </>
        }
        lead={brand.product.claim}
      >
        <Reveal delay={0.2} className="mt-14">
          <div className="overflow-hidden rounded-[32px] border border-line bg-white shadow-[0_60px_120px_-60px_rgba(10,20,10,0.4)]">
            <Calculator />
          </div>
        </Reveal>
      </PageHero>

      <section className="bg-paper py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="display text-[clamp(2rem,4vw,3.2rem)]">
                Четыре шага
                <br />
                вместо переписки.
              </h2>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-graphite">
                Интерфейс повторяет логику производства: вы проходите те же развилки, что и
                технолог, — только за секунды.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2">
              {platform.screens.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06} className="bg-white">
                  <div className="h-full px-7 py-9">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-lime-2 uppercase">
                      {s.tag}
                    </span>
                    <h3 className="mt-4 text-[19px] font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-[14px] text-graphite">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {platform.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05} className="bg-white">
                <div className="h-full px-7 py-9">
                  <h3 className="text-[17px] font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-graphite">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <CtaBand />
    </>
  );
}
