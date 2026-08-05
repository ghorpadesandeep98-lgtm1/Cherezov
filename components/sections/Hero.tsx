import { HeroScene } from "@/components/three/Lazy";
import { hero, brand } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-mist">
      <div className="aurora" />
      <div className="grid-lines absolute inset-0" />

      {/* 3D-объект встаёт перед типографикой — бренд буквально осязаем */}
      <div className="absolute inset-0 z-20">
        <HeroScene className="size-full" />
      </div>

      <div className="pointer-events-none relative z-30 flex h-full flex-col justify-between pt-28 pb-6 md:pt-36">
        <div className="shell">
          <Reveal delay={0.1}>
            <p className="font-mono text-[11px] tracking-[0.2em] text-graphite uppercase">
              {hero.eyebrow}
            </p>
          </Reveal>
        </div>

        <div>
          <div className="shell flex items-end justify-between gap-6 pb-3">
            <Reveal delay={0.35}>
              <p className="max-w-[15ch] text-[13px] leading-snug font-medium text-graphite sm:max-w-none sm:text-[15px]">
                {brand.city} · производство с {brand.since}
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="max-w-[16ch] text-right text-[13px] leading-snug font-medium text-graphite sm:max-w-none sm:text-[15px]">
                {hero.rightNote}
              </p>
            </Reveal>
          </div>

          <div className="relative">
            <span className="display block text-center text-[21vw] leading-none tracking-[-0.06em] text-ink md:text-[14vw]">
              {hero.word}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
