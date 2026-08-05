import { ObjectScene } from "@/components/three/Lazy";
import type { ObjectKind } from "@/components/three/ObjectScene";
import { audiences } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Audiences() {
  const { versus } = audiences;

  return (
    <section className="relative overflow-hidden bg-mist py-20 md:py-28">
      <div className="shell">
        <Reveal className="text-center">
          <h2 className="display mx-auto max-w-3xl text-[clamp(1.9rem,4.2vw,3.2rem)]">
            <span className="block text-ink">{audiences.titleTop}</span>
            <span className="block text-brand">{audiences.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] text-graphite md:text-[16px]">
            {audiences.lead}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <div className="card-glass flex h-full flex-col rounded-3xl p-4">
                <div className="h-[210px] w-full">
                  <ObjectScene kind={c.kind as ObjectKind} className="size-full" />
                </div>
                <p className="mt-2 pb-4 text-center text-[16px] font-semibold">{c.title}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* сравнение */}
        <div className="relative mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-white/70 p-7">
              <h3 className="text-[19px] font-bold tracking-tight text-graphite">
                {versus.old.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {versus.old.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14.5px] text-graphite">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full border border-line text-silver">
                      <Icon name="minus" className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <span className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-[15px] font-bold text-brand shadow-lg lg:grid">
            VS
          </span>

          <Reveal delay={0.1}>
            <div className="card-glass h-full rounded-3xl p-7">
              <h3 className="text-[19px] font-bold tracking-tight text-brand-2">
                {versus.now.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {versus.now.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14.5px] font-medium">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-2">
                      <Icon name="check" className="size-3" strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
