"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brand, nav, contacts } from "@/content/site";

/** Логотип: две строки, точка после «культура» — единственный цветной элемент. */
export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`block leading-[0.98] tracking-tight ${
        tone === "light" ? "text-white" : "text-ink"
      }`}
    >
      <span className="block text-[19px] font-bold">
        {brand.wordmark.top}
        <span className="text-brand">•</span>
      </span>
      <span
        className={`block text-[12px] font-medium ${
          tone === "light" ? "text-white/70" : "text-graphite"
        }`}
      >
        {brand.wordmark.bottom}
      </span>
    </span>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 text-white" fill="currentColor" aria-hidden>
      <path d="M21.9 4.3 18.9 19c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.5.5-.9.5l.3-4.6 8.3-7.5c.4-.3-.1-.5-.6-.2L7.4 13.1 2.9 11.7c-1-.3-1-1 .2-1.4l17.5-6.8c.8-.3 1.5.2 1.3 1.8Z" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (next: boolean) => setOpenFor(next ? pathname : null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
        <div className="shell">
          <div className="relative flex items-center justify-between gap-6 rounded-full bg-ink px-4 py-3 shadow-[0_24px_50px_-30px_rgba(11,15,12,0.7)] md:px-6 md:py-3.5">
            {/* меню слева */}
            <nav className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[15px] transition-colors duration-300 ${
                      active ? "text-brand" : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* логотип по центру */}
            <Link
              href="/"
              aria-label={brand.name}
              className="lg:absolute lg:left-1/2 lg:-translate-x-1/2"
            >
              <Wordmark />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href={contacts.telegram}
                aria-label="Telegram"
                className="grid size-10 place-items-center rounded-full bg-brand transition-colors duration-300 hover:bg-brand-2"
              >
                <TelegramIcon />
              </a>

              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="Меню"
                aria-expanded={open}
                className="grid size-10 place-items-center rounded-full border border-white/20 lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 block h-[1.5px] w-4 bg-white transition-all duration-300 ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-[1.5px] w-4 bg-white transition-all duration-300 ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-1 pt-24">
              {[{ href: "/", label: "Главная" }, ...nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="display block border-b border-line py-4 text-[7.5vw] sm:text-4xl"
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
