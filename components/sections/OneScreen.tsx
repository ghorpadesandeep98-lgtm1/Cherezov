import { Calculator } from "@/components/calculator/Calculator";
import { screen } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/** «Один экран» — не мокап, а рабочий дашборд с боковыми пояснениями. */
export function OneScreen() {
  const left = screen.asides.filter((a) => a.side === "left");
  const right = screen.asides.filter((a) => a.side === "right");

  const aside = (a: (typeof screen.asides)[number]) => (
    <div key={a.title} className="card-glass rounded-3xl px-6 py-6">
      <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand-2">
        <Icon name={a.icon as IconName} className="size-5" />
      </span>
      <h3 className="mt-4 text-[17px] font-bold tracking-tight">{a.title}</h3>
      <p className="mt-2 text-[13.5px] leading-snug text-graphite">{a.text}</p>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-28" id="ekran">
      <div className="aurora opacity-70" />

      <div className="shell relative">
        <Reveal className="text-center">
          <h2 className="display mx-auto max-w-3xl text-[clamp(1.9rem,4.2vw,3.2rem)]">
            <span className="block text-ink">{screen.titleTop}</span>
            <span className="block text-brand">{screen.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] text-graphite md:text-[16px]">
            {screen.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(190px,240px)_1fr_minmax(190px,240px)] xl:items-center">
          <div className="hidden gap-5 xl:grid">{left.map(aside)}</div>

          <Reveal delay={0.1}>
            <div className="relative">
              <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-line bg-white px-5 py-2 text-[12.5px] font-medium text-graphite shadow-sm">
                {screen.badge}
              </span>
              <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_60px_120px_-60px_rgba(12,40,20,0.4)]">
                <div className="h-[720px] md:h-[680px]">
                  <Calculator />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="hidden gap-5 xl:grid">{right.map(aside)}</div>

          {/* на узких экранах пояснения идут сеткой под дашбордом */}
          <div className="grid gap-4 sm:grid-cols-2 xl:hidden">{screen.asides.map(aside)}</div>
        </div>
      </div>
    </section>
  );
}
