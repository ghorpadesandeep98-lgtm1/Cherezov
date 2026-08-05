import { cultureIntro } from "@/content/site";
import { Pill } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Insight() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="shell">
        <Reveal className="flex flex-col items-center text-center">
          <Pill>{cultureIntro.eyebrow}</Pill>
          <h2 className="display mt-8 max-w-3xl text-[clamp(2.2rem,5.4vw,4.4rem)]">
            {cultureIntro.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap justify-center gap-x-16 gap-y-8">
          {cultureIntro.stats.map((s) => (
            <div key={s.value} className="flex items-center gap-4">
              <span className="display text-[clamp(2rem,4vw,3rem)]">{s.value}</span>
              <span className="max-w-[22ch] text-left text-[13px] leading-snug text-graphite">
                {s.text}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-16">
          <div className="grid gap-8 rounded-[36px] bg-lime p-8 md:p-12 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div className="flex flex-col justify-center">
              <p className="font-mono text-[11px] tracking-[0.18em] text-ink/50 uppercase">
                Формулировка задачи
              </p>
              <p className="display mt-6 text-[clamp(1.6rem,3vw,2.5rem)] text-ink">
                {cultureIntro.statement}
              </p>
            </div>

            <ul className="space-y-3">
              {cultureIntro.points.map((point, i) => (
                <li
                  key={point}
                  className="flex items-start gap-5 rounded-[24px] bg-white px-6 py-6 md:rounded-full md:py-5"
                >
                  <span className="font-mono text-[11px] text-silver">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-snug font-medium text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
