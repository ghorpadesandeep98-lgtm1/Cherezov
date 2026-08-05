import Link from "next/link";
import { cta } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 md:py-28">
      <div className="aurora" />
      <div className="shell relative">
        <Reveal>
          <div className="card-glass flex flex-col items-center gap-7 rounded-[36px] px-7 py-14 text-center md:px-16 md:py-16">
            <h2 className="display max-w-2xl text-[clamp(1.8rem,4vw,3rem)]">{cta.title}</h2>
            <p className="max-w-xl text-[16px] leading-relaxed text-graphite">{cta.text}</p>
            <Link
              href={cta.action.href}
              className="group inline-flex items-center gap-3 rounded-2xl bg-brand px-8 py-4.5 text-[16px] font-semibold text-white transition-colors duration-400 hover:bg-brand-2"
            >
              {cta.action.label}
              <ArrowUpRight className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
