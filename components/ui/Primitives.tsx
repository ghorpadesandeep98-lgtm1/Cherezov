import Link from "next/link";
import type { ReactNode } from "react";

/* --------------------------------------------------------------- ярлычок */

export function Pill({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "brand";
  className?: string;
}) {
  const tones = {
    light: "border-line bg-white/80 text-graphite backdrop-blur-xl",
    dark: "border-white/15 bg-white/5 text-white/70 backdrop-blur-xl",
    brand: "border-brand/30 bg-brand-soft text-brand-2",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- кнопка */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "brand" | "ink" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "brand", className = "" }: ButtonProps) {
  const variants = {
    brand: "bg-brand text-white hover:bg-brand-2",
    ink: "bg-ink text-white hover:bg-ink-2",
    ghost: "border border-line bg-white text-ink hover:border-ink/25",
  } as const;

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold transition-all duration-400 ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowUpRight className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`size-3.5 ${className}`} aria-hidden>
      <path
        d="M5 11 11 5m0 0H6m5 0v5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`size-3 ${className}`} aria-hidden>
      <path
        d="M3 8h10m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* --------------------------------------------------------------- секция */

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 lg:py-32 ${className}`}>
      {children}
    </section>
  );
}

/** Заголовок секции: первая строка чёрная, вторая — зелёная, как в макете. */
export function SectionTitle({
  top,
  accent,
  after,
  lead,
  align = "center",
  className = "",
}: {
  top?: string;
  accent?: string;
  after?: string;
  lead?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      <h2
        className={`display text-[clamp(1.9rem,4.2vw,3.4rem)] ${center ? "mx-auto max-w-4xl" : "max-w-3xl"}`}
      >
        {top ? <span className="text-ink">{top} </span> : null}
        {accent ? <span className="text-brand">{accent}</span> : null}
        {after ? <span className="text-ink"> {after}</span> : null}
      </h2>
      {lead ? (
        <p
          className={`mt-5 text-[16px] leading-relaxed text-graphite md:text-[17px] ${
            center ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
