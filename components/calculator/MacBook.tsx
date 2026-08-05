"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Устройство как витрина продукта: ноутбук раскрывается по мере скролла,
 * внутри — живой интерфейс, а не картинка.
 */
export function MacBook({
  children,
  label,
  height = "h-[560px] md:h-[600px]",
}: {
  children: ReactNode;
  label?: string;
  /** высота «экрана»: компактная сводка ниже полноразмерного дашборда */
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const rotateX = useTransform(smooth, [0, 1], [26, 0]);
  const scale = useTransform(smooth, [0, 1], [0.92, 1]);
  const glow = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative" style={{ perspective: 1600 }}>
      <motion.div
        className="pointer-events-none absolute inset-x-[8%] top-[12%] -z-10 h-[70%] rounded-full bg-brand/25 blur-[120px]"
        style={{ opacity: reduced ? 0.6 : glow }}
      />

      <motion.div
        style={reduced ? undefined : { rotateX, scale, transformStyle: "preserve-3d" }}
        className="origin-bottom"
      >
        {/* корпус экрана */}
        <div className="rounded-[22px] bg-gradient-to-b from-[#2b2e31] to-[#111314] p-[10px] shadow-[0_60px_120px_-50px_rgba(10,20,10,0.65)] md:rounded-[26px] md:p-[12px]">
          <div className="relative overflow-hidden rounded-[14px] bg-white md:rounded-[16px]">
            {/* строка состояния «приложения» */}
            <div className="flex items-center gap-3 border-b border-line bg-mist/80 px-4 py-2.5 backdrop-blur">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1">
                <svg viewBox="0 0 12 12" className="size-2.5 text-graphite" aria-hidden>
                  <path
                    d="M3 5V3.5a3 3 0 1 1 6 0V5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  <rect x="2.2" y="5" width="7.6" height="5.4" rx="1.4" fill="currentColor" />
                </svg>
                <span className="text-[10px] tracking-wide text-graphite">
                  {label ?? "kultura.dev/calculator"}
                </span>
              </div>
              <div className="w-12" />
            </div>

            <div className={`max-h-[74vh] overflow-hidden ${height}`}>{children}</div>
          </div>
        </div>

        {/* основание */}
        <div className="relative mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-[10px] bg-gradient-to-b from-[#c8ccd0] to-[#8e9498]">
          <div className="absolute top-0 left-1/2 h-1.5 w-24 -translate-x-1/2 rounded-b-lg bg-[#7b8185]" />
        </div>
        <div className="mx-auto h-2 w-[86%] rounded-b-[40px] bg-gradient-to-b from-[#7b8185]/40 to-transparent blur-[2px]" />

        {/* стеклянный постамент */}
        <div className="relative mx-auto mt-3 h-6 w-[78%] rounded-[10px] border border-white/70 bg-gradient-to-b from-white/70 to-[#dbe7dd]/70 backdrop-blur-sm md:h-8" />
        <div className="mx-auto h-4 w-[70%] rounded-b-[30px] bg-gradient-to-b from-[#b9c9bd]/35 to-transparent blur-[3px]" />
      </motion.div>
    </div>
  );
}
