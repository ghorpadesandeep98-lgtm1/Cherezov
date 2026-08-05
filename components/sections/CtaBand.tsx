import Link from "next/link";
import { cta } from "@/content/site";
import { Arrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-mist py-24 md:py-32">
      <div className="aurora opacity-80" />
      <div className="shell relative">
        <Reveal>
          <div className="glass flex flex-col items-center gap-8 rounded-[40px] px-8 py-16 text-center md:px-16 md:py-20">
            <h2 className="display max-w-3xl text-[clamp(2rem,5vw,3.8rem)]">{cta.title}</h2>
            <p className="max-w-xl text-[16px] leading-relaxed text-graphite">{cta.text}</p>
            <Link
              href={cta.action.href}
              className="group inline-flex items-center gap-4 rounded-full bg-ink px-8 py-5 text-[16px] font-semibold text-white transition-colors duration-500 hover:bg-lime hover:text-ink"
            >
              {cta.action.label}
              <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
                <Arrow />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
