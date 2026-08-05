import { MacBook } from "@/components/calculator/MacBook";
import { Calculator } from "@/components/calculator/Calculator";
import { platform, brand } from "@/content/site";
import { Pill } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function PlatformShowcase() {
  return (
    <section className="relative overflow-hidden bg-mist py-24 md:py-32">
      <div className="grid-lines absolute inset-0 opacity-70" />

      <div className="shell relative">
        <Reveal className="flex flex-col items-center text-center">
          <Pill>{platform.eyebrow}</Pill>
          <h2 className="display mt-8 max-w-4xl text-[clamp(2.2rem,5.4vw,4.4rem)]">
            {platform.title}
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-graphite md:text-lg">
            {platform.lead}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-5xl md:mt-20">
          <MacBook label="diton.ru/calculator">
            <Calculator />
          </MacBook>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {platform.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06} className="bg-white/80 backdrop-blur">
              <div className="h-full px-7 py-9">
                <span className="font-mono text-[11px] text-lime-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[17px] font-bold tracking-tight">{f.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-graphite">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] tracking-[0.18em] text-silver uppercase">
          {brand.product.name} — {brand.product.claim}
        </p>
      </div>
    </section>
  );
}
