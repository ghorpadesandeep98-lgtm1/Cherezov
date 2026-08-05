import Link from "next/link";
import type { ReactNode } from "react";

/* --------------------------------------------------------------- ярлычок */

export function Pill({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "lime";
  className?: string;
}) {
  const tones = {
    light: "border-line bg-white/70 text-graphite backdrop-blur-xl",
    dark: "border-white/15 bg-white/5 text-white/70 backdrop-blur-xl",
    lime: "border-lime-2/60 bg-lime/25 text-ink",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- кнопка */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "lime" | "ghost" | "glass";
  className?: string;
};

export function Button({ href, children, variant = "solid", className = "" }: ButtonProps) {
  const variants = {
    solid: "bg-ink text-white hover:bg-ink-2",
    lime: "bg-lime text-ink hover:bg-lime-2",
    ghost: "border border-line bg-transparent text-ink hover:border-ink/40 hover:bg-white",
    glass: "glass text-ink hover:bg-white/85",
  } as const;

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold transition-all duration-500 ${variants[variant]} ${className}`}
    >
      {children}
      <span className="grid size-6 place-items-center rounded-full bg-current/10 transition-transform duration-500 group-hover:translate-x-1">
        <Arrow />
      </span>
    </Link>
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
    <section id={id} className={`relative py-24 md:py-32 lg:py-40 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const isCenter = align === "center";
  return (
    <div className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start"}`}>
      {eyebrow ? <Pill tone={tone === "dark" ? "dark" : "light"}>{eyebrow}</Pill> : null}
      <h2
        className={`display mt-8 text-[clamp(2.4rem,6vw,5rem)] ${
          tone === "dark" ? "text-white" : "text-ink"
        } ${isCenter ? "max-w-4xl" : "max-w-3xl"}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-7 max-w-2xl text-[17px] leading-relaxed md:text-lg ${
            tone === "dark" ? "text-white/55" : "text-graphite"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
