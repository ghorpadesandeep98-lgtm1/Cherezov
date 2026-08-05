import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { ObjectScene } from "@/components/three/Lazy";
import { lifecycle, team } from "@/content/site";

export const metadata: Metadata = {
  title: "Команда",
  description: team.lead,
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow={team.eyebrow}
        title={
          <>
            <span className="text-ink">Кто считает</span>{" "}
            <span className="text-brand">ваш проект</span>
          </>
        }
        lead={team.lead}
        visual={<ObjectScene kind="people" distance={4.8} className="size-full" />}
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-4 sm:grid-cols-2">
            {team.units.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.07}>
                <div className="card-glass h-full rounded-3xl p-8">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
                    {u.stage}
                  </p>
                  <h2 className="display mt-4 text-[clamp(1.3rem,2.2vw,1.8rem)]">{u.title}</h2>
                  <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-graphite">
                    {u.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* зона ответственности — та же, что в жизненном цикле */}
          <Reveal delay={0.15} className="mt-14">
            <div className="rounded-3xl border border-line bg-mist p-8 md:p-10">
              <h2 className="text-[19px] font-bold tracking-tight">{lifecycle.ourZone}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {lifecycle.stages
                  .filter((s) => s.ours)
                  .map((s) => (
                    <div key={s.n} className="rounded-2xl bg-white p-6">
                      <p className="text-[15px] font-bold text-brand-2">
                        {s.n}. {s.title}
                      </p>
                      <p className="mt-2 text-[13.5px] leading-snug text-graphite">{s.result}</p>
                    </div>
                  ))}
              </div>
              <p className="mt-6 text-[13px] text-silver">{lifecycle.clientZone}.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
