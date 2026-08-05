"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ObjectScene } from "@/components/three/Lazy";
import type { ObjectKind } from "@/components/three/ObjectScene";
import { products } from "@/content/site";
import { Pill, Arrow } from "@/components/ui/Primitives";

const kinds: Record<string, ObjectKind> = {
  kalendari: "calendar",
  knigi: "book",
  katalogi: "catalog",
  upakovka: "box",
};

export function ProductsShowcase({ eyebrow = "Продукция" }: { eyebrow?: string }) {
  const [active, setActive] = useState(0);
  const current = products[active];

  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-32" id="produkciya">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Pill>{eyebrow}</Pill>
            <h2 className="display mt-8 max-w-2xl text-[clamp(2.2rem,5vw,4rem)]">
              Четыре направления,
              <br />
              одна производственная логика.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-graphite">
            Каждое изделие проходит один и тот же контроль цвета и сроков — независимо от тиража.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* витрина 3D */}
          <div className="relative order-2 min-h-[420px] overflow-hidden rounded-[32px] border border-line bg-mist lg:order-1 lg:min-h-[560px]">
            <div className="aurora opacity-70" />
            <div className="absolute inset-0">
              <ObjectScene kind={kinds[current.slug] ?? "book"} className="size-full" />
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 backdrop-blur">
              <span className="size-1.5 rounded-full bg-lime-2" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-graphite uppercase">
                Модель следует за курсором
              </span>
            </div>
          </div>

          {/* список направлений */}
          <div className="order-1 lg:order-2">
            <div className="divide-y divide-line border-y border-line">
              {products.map((p, i) => {
                const open = i === active;
                return (
                  <button
                    key={p.slug}
                    id={p.slug}
                    type="button"
                    onClick={() => setActive(i)}
                    className="block w-full cursor-pointer py-6 text-left"
                    aria-expanded={open}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <span
                        className={`display text-[clamp(1.6rem,3vw,2.4rem)] transition-colors duration-500 ${
                          open ? "text-ink" : "text-silver hover:text-graphite"
                        }`}
                      >
                        {p.title}
                      </span>
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          open ? "rotate-90 border-lime-2 bg-lime text-ink" : "border-line text-graphite"
                        }`}
                      >
                        <Arrow />
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-5 text-[15px] leading-relaxed text-graphite">
                            {p.description}
                          </p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {p.specs.map((s) => (
                              <li
                                key={s}
                                className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-[12px] text-graphite"
                              >
                                {s}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
