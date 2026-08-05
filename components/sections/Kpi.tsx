import { kpi } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Kpi() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="shell grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {kpi.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.07} className="bg-white">
            <div className="group h-full px-7 py-10 transition-colors duration-500 hover:bg-mist">
              <div className="flex items-baseline gap-1.5">
                <span className="display text-[clamp(2.6rem,5vw,4rem)]">{item.value}</span>
                {item.unit ? (
                  <span className="text-lg font-semibold text-lime-2">{item.unit}</span>
                ) : null}
              </div>
              <p className="mt-5 max-w-[26ch] text-[14px] leading-relaxed text-graphite">
                {item.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
