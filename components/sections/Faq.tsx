"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faq } from "@/content/site";
import { Pill } from "@/components/ui/Primitives";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Pill>Вопросы</Pill>
          <h2 className="display mt-8 text-[clamp(2rem,4vw,3.2rem)]">
            Коротко
            <br />
            и по делу.
          </h2>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[17px] font-semibold tracking-tight md:text-[19px]">
                    {item.q}
                  </span>
                  <span
                    className={`relative grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-lime-2 bg-lime" : "border-line"
                    }`}
                  >
                    <span className="absolute h-[1.5px] w-3 bg-ink" />
                    <span
                      className={`absolute h-3 w-[1.5px] bg-ink transition-transform duration-300 ${
                        isOpen ? "scale-y-0" : ""
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-graphite">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
