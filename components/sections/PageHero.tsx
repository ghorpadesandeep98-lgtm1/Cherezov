import { Pill } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

/** Единая шапка внутренних страниц: одна композиция, разное наполнение. */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  visual,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  aside?: ReactNode;
  /** декоративная 3D-сцена справа: бренд остаётся объёмным на всех страницах */
  visual?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-mist pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="aurora" />
      <div className="grid-lines absolute inset-0" />


      <div className="shell relative">
        <Reveal>
          <Pill>{eyebrow}</Pill>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal delay={0.08}>
            <h1 className="display text-[clamp(2.6rem,7vw,5.6rem)]">{title}</h1>
          </Reveal>
          {lead || aside || visual ? (
            <Reveal delay={0.16}>
              {visual ? (
                <div className="mb-6 hidden h-[340px] lg:-mt-32 lg:block">{visual}</div>
              ) : null}
              {lead ? (
                <p className="text-[16px] leading-relaxed text-graphite md:text-[17px]">{lead}</p>
              ) : null}
              {aside}
            </Reveal>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}
