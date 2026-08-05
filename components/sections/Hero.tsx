import Link from "next/link";
import { HeroScene } from "@/components/three/Lazy";
import { hero, stats } from "@/content/site";
import { calculate, defaultConfig, money, num, percent } from "@/lib/model";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ArrowUpRight } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Карточки героя показывают результат того самого расчёта, который открывается
 * ниже в калькуляторе, — обещание проверяется на этой же странице.
 */
function heroCards() {
  const r = calculate(defaultConfig);
  return [
    { icon: "layers", label: "Потенциал участка", value: `${num(r.gba)} м²` },
    { icon: "trend", label: "IRR проекта", value: percent(r.irr) },
    { icon: "ruble", label: "Финансовый результат", value: money(r.profit) },
    { icon: "shield", label: hero.cards[3].label, value: hero.cards[3].value },
  ];
}

export function Hero() {
  const cards = heroCards();

  return (
    <section className="relative overflow-hidden bg-paper pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="aurora" />

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          {/* текст */}
          <Reveal>
            <h1 className="display text-[clamp(2.2rem,4.6vw,3.9rem)]">
              <span className="block text-ink">{hero.titleTop}</span>
              <span className="mt-3 block text-brand">{hero.titleAccent}</span>
            </h1>

            <p className="mt-8 max-w-lg text-[16px] leading-relaxed text-graphite md:text-[17px]">
              {hero.lead}
            </p>

            <Link
              href={hero.action.href}
              className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-brand px-8 py-4.5 text-[16px] font-semibold text-white transition-colors duration-400 hover:bg-brand-2"
            >
              {hero.action.label}
              <ArrowUpRight className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          {/* 3D + плавающие карточки */}
          <div className="relative min-h-[380px] lg:min-h-[560px]">
            <div className="absolute inset-0 -mx-6 lg:-mr-16">
              <HeroScene className="size-full" />
            </div>

            <div className="pointer-events-none relative grid h-full grid-cols-2 content-between gap-3 py-2 lg:gap-6">
              {cards.map((c, i) => (
                <Reveal
                  key={c.label}
                  delay={0.25 + i * 0.09}
                  className={i % 2 === 0 ? "justify-self-start" : "justify-self-end"}
                >
                  <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 md:px-5 md:py-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-sm md:size-10">
                      <Icon name={c.icon as IconName} className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[12px] leading-tight text-graphite md:text-[13px]">
                        {c.label}
                      </span>
                      <span className="nums block text-[15px] font-bold whitespace-nowrap text-brand md:text-[19px]">
                        {c.value}
                      </span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* полоса цифр */}
        <Reveal delay={0.2} className="mt-14">
          <dl className="card-glass grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-6 py-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand-2">
                  <Icon name={s.icon as IconName} className="size-5" />
                </span>
                <span>
                  <dt className="nums text-[24px] leading-none font-bold md:text-[28px]">
                    {s.value}
                  </dt>
                  <dd className="mt-1.5 text-[13px] text-graphite">{s.label}</dd>
                </span>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
