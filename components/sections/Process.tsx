import { process } from "@/content/site";
import { Pill } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/** Этапы производства — реальная последовательность, поэтому нумерация оправдана. */
export function Process() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -top-32 right-0 size-[560px] rounded-full bg-lime/10 blur-[160px]" />

      <div className="shell relative">
        <Reveal className="flex flex-col items-center text-center">
          <Pill tone="dark">Как устроен путь тиража</Pill>
          <h2 className="display mt-8 max-w-3xl text-[clamp(2.2rem,5.4vw,4.2rem)] text-white">
            От параметра в интерфейсе
            <br />
            до паллеты на складе.
          </h2>
        </Reveal>

        <div className="no-scrollbar mt-16 flex gap-5 overflow-x-auto pb-6 lg:mt-20 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible">
          {process.map((step, i) => (
            <Reveal
              key={step.step}
              delay={i * 0.08}
              className={`min-w-[260px] lg:min-w-0 ${i % 2 === 1 ? "lg:mt-24" : ""}`}
            >
              <div
                className={`h-full rounded-[28px] p-7 transition-transform duration-500 hover:-translate-y-1.5 ${
                  step.accent ? "bg-lime text-ink" : "bg-white/5 text-white ring-1 ring-white/10"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-mono text-[11px] ${step.accent ? "text-ink/50" : "text-white/35"}`}
                  >
                    {step.step}
                  </span>
                  <span
                    className={`text-[12px] font-medium ${
                      step.accent ? "text-ink/60" : "text-white/45"
                    }`}
                  >
                    {step.days}
                  </span>
                </div>

                <h3 className="mt-6 text-[22px] font-bold tracking-tight">{step.title}</h3>

                <ul className="mt-6 space-y-2">
                  {step.items.map((item) => (
                    <li
                      key={item}
                      className={`inline-flex rounded-full px-3.5 py-1.5 text-[12px] ${
                        step.accent ? "bg-ink/10 text-ink" : "bg-white/8 text-white/60"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
