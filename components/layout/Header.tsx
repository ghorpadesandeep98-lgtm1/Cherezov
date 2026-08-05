"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brand, nav } from "@/content/site";
import { Arrow } from "@/components/ui/Primitives";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // меню привязано к маршруту: при переходе оно закрывается само, без эффекта
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (next: boolean) => setOpenFor(next ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        {/* мягкая подложка: контент не «протекает» сквозь навигацию */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper via-paper/75 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`shell relative flex items-center justify-between transition-all duration-700 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* вордмарк */}
          <Link
            href="/"
            className="pointer-events-auto flex items-baseline gap-2 text-ink"
            aria-label={brand.fullName}
          >
            <span className="text-[22px] font-extrabold tracking-[-0.04em]">{brand.name}</span>
            <span className="hidden font-mono text-[10px] tracking-[0.22em] text-graphite uppercase sm:block">
              культура печати
            </span>
          </Link>

          {/* стеклянная пилюля меню */}
          <nav
            className={`pointer-events-auto hidden rounded-full px-2 py-2 transition-all duration-700 lg:flex ${
              scrolled ? "glass shadow-lg" : "border border-line/70 bg-white/45 backdrop-blur-xl"
            }`}
          >
            {nav.slice(1).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors duration-300 ${
                    active ? "text-ink" : "text-graphite hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-lime"
                      transition={{ type: "spring", stiffness: 340, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pointer-events-auto flex items-center gap-3">
            <Link
              href="/platforma"
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-semibold text-white transition-colors duration-500 hover:bg-lime hover:text-ink md:inline-flex"
            >
              Рассчитать тираж
              <Arrow />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Меню"
              aria-expanded={open}
              className="glass grid size-12 place-items-center rounded-full lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-[1.5px] w-5 bg-ink transition-all duration-400 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-5 bg-ink transition-all duration-400 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white/92 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-2 pt-24">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="display block border-b border-line py-4 text-[8.5vw] leading-none sm:text-5xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
