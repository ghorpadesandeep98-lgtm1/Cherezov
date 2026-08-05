import Link from "next/link";
import { MacBook } from "@/components/calculator/MacBook";
import { MiniDashboard } from "@/components/calculator/MiniDashboard";
import { core } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ArrowUpRight } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function CoreProduct() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <h2 className="display max-w-3xl text-[clamp(1.9rem,4.2vw,3.2rem)]">
            <span className="text-ink">{core.titleTop}</span>{" "}
            <span className="text-brand">{core.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] text-graphite md:text-[17px]">{core.lead}</p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <MacBook label="kultura.dev/calculator" height="h-[240px] md:h-[268px]">
              <MiniDashboard />
            </MacBook>
          </Reveal>

          {/* этапы, которые закрывает калькулятор */}
          <div className="relative">
            <span className="absolute top-[132px] -left-20 hidden size-14 place-items-center rounded-full bg-gradient-to-br from-[#0f2416] to-[#0b3a1c] xl:grid">
              <span className="size-4 rounded-full bg-brand shadow-[0_0_18px_4px_rgba(34,162,75,0.7)]" />
            </span>

            <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-5 md:overflow-visible">
              {core.steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.06} className="w-[62vw] shrink-0 snap-start sm:w-[210px] md:w-auto">
                  <div className="card-glass flex h-full flex-col rounded-3xl px-4 py-6">
                    <span className="grid size-11 place-items-center self-center rounded-full bg-white text-brand shadow-sm">
                      <Icon name={s.icon as IconName} className="size-5" />
                    </span>
                    <span className="nums mt-6 text-center text-[26px] font-bold text-brand">
                      {s.n}
                    </span>
                    <span className="mt-4 border-t border-dashed border-line pt-4 text-center text-[10.5px] font-semibold tracking-[0.14em] text-brand-2 uppercase">
                      {s.tag}
                    </span>
                    <span className="mt-2 text-center text-[13px] leading-snug text-graphite">
                      {s.text}
                    </span>
                    <span className="mx-auto mt-5 size-1.5 rounded-full bg-brand" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* единая модель данных */}
        <Reveal delay={0.15} className="mt-12">
          <div className="card-glass flex flex-col items-start gap-6 rounded-3xl px-7 py-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-2">
                <Icon name="layers" className="size-5" />
              </span>
              <span>
                <span className="block text-[17px] font-bold text-brand-2">
                  {core.banner.title}
                </span>
                <span className="mt-1 block text-[14px] text-graphite">{core.banner.text}</span>
              </span>
            </div>

            <Link
              href={core.banner.action.href}
              className="group inline-flex shrink-0 items-center gap-3 rounded-2xl bg-brand px-7 py-4 text-[15px] font-semibold text-white transition-colors duration-400 hover:bg-brand-2"
            >
              {core.banner.action.label}
              <ArrowUpRight className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
