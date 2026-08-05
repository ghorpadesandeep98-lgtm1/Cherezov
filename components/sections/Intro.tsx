import Link from "next/link";
import { hero, marqueeWords } from "@/content/site";
import { Arrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section className="relative border-b border-line bg-paper py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <h2 className="display text-[clamp(1.9rem,3.4vw,3rem)]">
            Мы производим то,
            <br />
            что держат в руках.
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="max-w-2xl">
          <p className="text-[17px] leading-relaxed text-graphite md:text-lg">{hero.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {hero.actions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold transition-all duration-500 ${
                  a.primary
                    ? "bg-ink text-white hover:bg-lime hover:text-ink"
                    : "border border-line text-ink hover:border-ink/30 hover:bg-mist"
                }`}
              >
                {a.label}
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>

      <Marquee words={marqueeWords} />
    </section>
  );
}

export function Marquee({ words }: { words: string[] }) {
  const line = [...words, ...words];
  return (
    <div className="mt-20 overflow-hidden border-y border-line py-5">
      <div className="marquee-track flex w-max gap-10" style={{ ["--dur" as string]: "46s" }}>
        {line.map((w, i) => (
          <span key={w + i} className="flex items-center gap-10">
            <span className="font-mono text-[13px] tracking-[0.24em] text-graphite uppercase">
              {w}
            </span>
            <span className="size-1.5 rounded-full bg-lime-2" />
          </span>
        ))}
      </div>
    </div>
  );
}
