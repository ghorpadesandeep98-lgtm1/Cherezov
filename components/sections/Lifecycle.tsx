import { lifecycle } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/** Жизненный цикл проекта: последовательность реальная, поэтому этапы нумерованы. */
export function Lifecycle() {
  const { stages } = lifecycle;

  return (
    <section className="relative overflow-hidden bg-mist py-20 md:py-28" id="cikl">
      <div className="shell">
        <Reveal>
          <h2 className="display text-center text-[clamp(1.9rem,4.4vw,3.4rem)]">
            {lifecycle.titleBefore}{" "}
            <span className="relative text-brand">
              {lifecycle.titleAccent}
              <span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-brand/60" />
            </span>{" "}
            {lifecycle.titleAfter}
          </h2>
        </Reveal>

        {/* карточки этапов */}
        <div className="no-scrollbar mt-14 flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible">
          {stages.map((stage, i) => (
            <Reveal
              key={stage.n}
              delay={i * 0.07}
              className={`w-[76vw] shrink-0 snap-start sm:w-[320px] lg:w-auto ${
                i % 2 === 1 ? "lg:mt-10" : ""
              }`}
            >
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 ${
                  stage.ours
                    ? "card-glass border-line"
                    : "border-line/70 bg-white/50 text-graphite"
                }`}
              >
                <h3
                  className={`text-[17px] font-bold tracking-tight ${
                    stage.ours ? "text-brand-2" : "text-silver"
                  }`}
                >
                  {stage.n}. {stage.title}
                </h3>
                {stage.note ? (
                  <p className="mt-1.5 text-[12px] text-silver">{stage.note}</p>
                ) : null}

                <ul className="mt-6 flex-1 space-y-2.5">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-2.5 text-[13.5px] leading-snug ${
                        stage.ours ? "text-ink" : "text-silver"
                      }`}
                    >
                      <span
                        className={`mt-[7px] size-1 shrink-0 rounded-full ${
                          stage.ours ? "bg-brand" : "bg-silver"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {stage.result ? (
                  <div className="mt-6 border-t border-line pt-4">
                    <p className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.14em] text-brand uppercase">
                      <span className="size-1.5 rounded-full bg-brand" />
                      Результат
                    </p>
                    <p className="mt-2 text-[13.5px] leading-snug font-medium">{stage.result}</p>
                  </div>
                ) : null}

                {/* соединители между нашими этапами */}
                {i < 2 ? (
                  <span className="absolute top-1/2 -right-[26px] z-10 hidden size-6 place-items-center rounded-full bg-brand text-[11px] font-bold text-white lg:grid">
                    {i + 1}
                  </span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        {/* зоны ответственности */}
        <Reveal delay={0.2} className="mt-8 hidden gap-4 lg:grid lg:grid-cols-5">
          <div className="col-span-3">
            <div className="h-3 rounded-b-xl border-x-2 border-b-2 border-brand" />
            <p className="mt-3 text-center text-[15px] font-bold text-ink">{lifecycle.ourZone}</p>
          </div>
          <div className="col-span-2">
            <div className="h-3 rounded-b-xl border-x-2 border-b-2 border-line" />
            <p className="mt-3 text-center text-[13px] text-silver">{lifecycle.clientZone}</p>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-[13px] text-silver lg:hidden">
          {lifecycle.ourZone} — этапы 1–3. {lifecycle.clientZone}.
        </p>
      </div>
    </section>
  );
}
