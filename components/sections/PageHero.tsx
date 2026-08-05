import { Pill } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

/** Единая шапка внутренних страниц. */
export function PageHero({
  eyebrow,
  title,
  lead,
  visual,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  /** декоративная 3D-врезка справа */
  visual?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-mist pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="aurora" />

      <div className="shell relative">
        <Reveal>
          <Pill tone="brand">{eyebrow}</Pill>
        </Reveal>

        <div className="mt-7 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <Reveal delay={0.08}>
            <h1 className="display text-[clamp(2.2rem,5.2vw,4.2rem)]">{title}</h1>
          </Reveal>

          {lead || visual ? (
            <Reveal delay={0.16}>
              {visual ? <div className="mb-6 hidden h-[280px] lg:-mt-24 lg:block">{visual}</div> : null}
              {lead ? (
                <p className="text-[16px] leading-relaxed text-graphite md:text-[17px]">{lead}</p>
              ) : null}
            </Reveal>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}
