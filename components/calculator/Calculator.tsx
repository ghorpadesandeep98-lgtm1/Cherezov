"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  colorOptions,
  defaultConfig,
  estimate,
  finishOptions,
  formatOptions,
  money,
  moneyPrecise,
  paperOptions,
  plural,
  productOptions,
  type Config,
  type FinishKey,
} from "@/lib/pricing";

/* ---------------------------------------------------------- анимация цифр */

function useAnimatedNumber(value: number, duration = 650) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const next = from + (value - from) * eased;
      setDisplay(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = value;
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  return display;
}

/* ------------------------------------------------------------- контролы */

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.18em] text-graphite uppercase">{label}</span>
        {hint ? <span className="text-[11px] text-silver">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative rounded-2xl border px-3.5 py-3 text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ink focus-visible:outline-none ${
        active
          ? "border-lime-2 bg-lime shadow-[0_10px_30px_-16px_rgba(150,200,20,0.9)]"
          : "border-line bg-white hover:border-ink/25"
      }`}
    >
      <span className="block text-[13px] leading-tight font-semibold text-ink">{children}</span>
      {sub ? (
        <span className={`mt-1 block text-[11px] leading-tight ${active ? "text-ink/60" : "text-silver"}`}>
          {sub}
        </span>
      ) : null}
    </button>
  );
}

/* --------------------------------------------------------------- главное */

export function Calculator({ compact = false }: { compact?: boolean }) {
  const [cfg, setCfg] = useState<Config>(defaultConfig);
  const result = useMemo(() => estimate(cfg), [cfg]);

  const product = productOptions.find((p) => p.key === cfg.product)!;
  const total = useAnimatedNumber(result.total);
  const perCopy = useAnimatedNumber(result.perCopy);
  const days = useAnimatedNumber(result.days, 420);

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setCfg((c) => ({ ...c, [key]: value }));

  const toggleFinish = (key: FinishKey) =>
    setCfg((c) => ({
      ...c,
      finishes: c.finishes.includes(key)
        ? c.finishes.filter((f) => f !== key)
        : [...c.finishes, key],
    }));

  const maxLine = Math.max(...result.lines.map((l) => l.value));

  return (
    <div className="grid h-full grid-cols-1 gap-px overflow-hidden bg-line lg:grid-cols-[1.35fr_1fr]">
      {/* ---------------------------------------------------- параметры */}
      <div className="no-scrollbar space-y-7 overflow-y-auto bg-white p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-graphite uppercase">
              Конфигурация издания
            </p>
            <h3 className="mt-1 text-[19px] font-bold tracking-tight">Соберите тираж</h3>
          </div>
          <span className="relative flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
            <span className="pulse-ring relative size-1.5 rounded-full bg-lime-2" />
            <span className="font-mono text-[10px] tracking-[0.14em] text-graphite uppercase">
              Онлайн
            </span>
          </span>
        </div>

        <Field label="Продукт" hint={product.hint}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {productOptions.map((p) => (
              <Chip
                key={p.key}
                active={cfg.product === p.key}
                onClick={() =>
                  setCfg((c) => ({
                    ...c,
                    product: p.key,
                    pages: p.pages,
                    tirazh: Math.max(c.tirazh, p.minTirazh),
                  }))
                }
              >
                {p.label}
              </Chip>
            ))}
          </div>
        </Field>

        <div className="grid gap-7 sm:grid-cols-2">
          <Field label="Формат">
            <div className="grid grid-cols-4 gap-2">
              {formatOptions.map((f) => (
                <Chip key={f.key} active={cfg.format === f.key} onClick={() => set("format", f.key)}>
                  {f.label}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Красочность">
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((c) => (
                <Chip key={c.key} active={cfg.color === c.key} onClick={() => set("color", c.key)}>
                  {c.label}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <Field label="Бумага">
          <div className="grid gap-2 sm:grid-cols-2">
            {paperOptions.map((p) => (
              <Chip
                key={p.key}
                active={cfg.paper === p.key}
                onClick={() => set("paper", p.key)}
                sub={p.hint}
              >
                {p.label}
              </Chip>
            ))}
          </div>
        </Field>

        <Field
          label="Тираж"
          hint={`${money(cfg.tirazh)} ${plural(cfg.tirazh, ["экземпляр", "экземпляра", "экземпляров"])}`}
        >
          <input
            type="range"
            min={product.minTirazh}
            max={50000}
            step={50}
            value={cfg.tirazh}
            onChange={(e) => set("tirazh", Number(e.target.value))}
            aria-label="Тираж"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-mist-2 accent-lime-2 outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-lime"
          />
        </Field>

        {!product.pagesLocked && (
          <Field label="Полосность" hint={`${cfg.pages} полос`}>
            <input
              type="range"
              min={8}
              max={400}
              step={4}
              value={cfg.pages}
              onChange={(e) => set("pages", Number(e.target.value))}
              aria-label="Полосность"
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-mist-2 accent-lime-2 outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-lime"
            />
          </Field>
        )}

        <Field label="Отделка">
          <div className="grid gap-2 sm:grid-cols-2">
            {finishOptions.map((f) => (
              <Chip
                key={f.key}
                active={cfg.finishes.includes(f.key)}
                onClick={() => toggleFinish(f.key)}
                sub={f.hint}
              >
                {f.label}
              </Chip>
            ))}
          </div>
        </Field>

        <button
          type="button"
          onClick={() => set("express", !cfg.express)}
          aria-pressed={cfg.express}
          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-colors duration-300 ${
            cfg.express ? "border-ink bg-ink text-white" : "border-line bg-white"
          }`}
        >
          <span>
            <span className="block text-[14px] font-semibold">Срочный запуск</span>
            <span className={`text-[12px] ${cfg.express ? "text-white/55" : "text-silver"}`}>
              Приоритет на линиях, срок короче
            </span>
          </span>
          <span
            className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
              cfg.express ? "bg-lime" : "bg-mist-2"
            }`}
          >
            <span
              className={`absolute top-1 size-4 rounded-full bg-ink transition-all duration-300 ${
                cfg.express ? "left-6" : "left-1"
              }`}
            />
          </span>
        </button>
      </div>

      {/* ------------------------------------------------------- смета */}
      <div className="flex flex-col justify-between bg-ink p-6 text-white md:p-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
            Предварительная смета
          </p>

          <div className="mt-6">
            <div className="flex items-end gap-2">
              <span className="display text-[clamp(2.2rem,5vw,3.4rem)] text-lime tabular-nums">
                {money(total)}
              </span>
              <span className="pb-2 text-lg text-white/40">₽</span>
            </div>
            <p className="mt-2 text-[13px] text-white/45">
              {moneyPrecise(perCopy)} ₽ за экземпляр · без НДС
            </p>
          </div>

          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
            <span className="grid size-9 place-items-center rounded-full bg-lime text-[13px] font-bold text-ink tabular-nums">
              {Math.round(days)}
            </span>
            <span className="text-[13px] leading-tight text-white/65">
              {plural(Math.round(days), ["рабочий день", "рабочих дня", "рабочих дней"])}
              <br />
              <span className="text-white/35">от согласования макета</span>
            </span>
          </div>

          {!compact && (
            <div className="mt-8 space-y-3">
              {result.lines.map((line) => (
                <div key={line.key}>
                  <div className="flex items-baseline justify-between text-[12px]">
                    <span className="text-white/50">{line.label}</span>
                    <span className="tabular-nums text-white/80">{money(line.value)} ₽</span>
                  </div>
                  <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-lime/70"
                      animate={{ width: `${Math.max(3, (line.value / maxLine) * 100)}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={cfg.express ? "express" : "normal"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 text-[12px] leading-relaxed text-white/35"
            >
              {cfg.express
                ? "Срочный запуск: тираж встаёт в первую очередь на печатных линиях."
                : "Расчёт по производственным справочникам. Смета фиксируется после проверки макета."}
            </motion.p>
          </AnimatePresence>

          <a
            href="/kontakty"
            className="flex items-center justify-center gap-3 rounded-full bg-lime px-6 py-4 text-[15px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.02]"
          >
            Отправить в работу
          </a>
        </div>
      </div>
    </div>
  );
}
