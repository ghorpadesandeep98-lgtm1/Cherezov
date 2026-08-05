"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  calculate,
  classes,
  defaultConfig,
  money,
  num,
  percent,
  plural,
  scenarios,
  sensitivity,
  zones,
  type ClassKey,
  type Config,
  type ScenarioKey,
  type ZoneKey,
} from "@/lib/model";
import { Icon, type IconName } from "@/components/ui/Icon";

const tabs = [
  { key: "land", label: "Земля", icon: "layers" },
  { key: "product", label: "Продукт", icon: "building" },
  { key: "economy", label: "Экономика", icon: "ruble" },
  { key: "scenarios", label: "Сценарии", icon: "trend" },
  { key: "decision", label: "Решение", icon: "shield" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

/* ------------------------------------------------------------- атомы UI */

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-0">
      <span className="text-[12.5px] text-graphite">{k}</span>
      <span className={`nums text-[13px] ${strong ? "font-semibold" : "font-medium"}`}>{v}</span>
    </div>
  );
}

function Card({
  title,
  badge,
  children,
  className = "",
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card-glass rounded-2xl p-5 ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-[15px] font-semibold tracking-tight">{title}</h4>
        {badge ? (
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-2">
            {badge}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[11px] font-semibold tracking-[0.12em] text-graphite uppercase">
          {label}
        </span>
        <span className="nums text-[13px] font-semibold">
          {num(value)} {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-mist-2 outline-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand"
      />
    </label>
  );
}

function Choice<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => onChange(o.key)}
          aria-pressed={value === o.key}
          className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-300 ${
            value === o.key
              ? "border-brand bg-brand text-white"
              : "border-line bg-white text-graphite hover:border-ink/25"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- дашборд */

export function Calculator() {
  const [cfg, setCfg] = useState<Config>(defaultConfig);
  const [tab, setTab] = useState<TabKey>("land");
  const [scenario, setScenario] = useState<ScenarioKey>("base");

  const result = useMemo(() => calculate(cfg), [cfg]);
  const rows = useMemo(() => scenarios(cfg), [cfg]);
  const risks = useMemo(() => sensitivity(cfg), [cfg]);

  const zone = zones.find((z) => z.key === cfg.zone)!;
  const product = classes.find((c) => c.key === cfg.productClass)!;
  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setCfg((c) => ({ ...c, [key]: value }));

  return (
    <div className="flex h-full flex-col bg-mist">
      {/* вкладки */}
      <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-line bg-white px-4 py-2.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
              tab === t.key ? "bg-brand-soft text-brand-2" : "text-graphite hover:text-ink"
            }`}
          >
            <Icon name={t.icon as IconName} className="size-4" />
            {t.label}
          </button>
        ))}
        <span className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] text-graphite sm:flex">
          <Icon name="check" className="size-3.5" />
          Экспорт
        </span>
      </div>

      <div className="no-scrollbar grid flex-1 gap-3 overflow-y-auto p-4 lg:grid-cols-[1.15fr_1fr]">
        {/* ------------------------------------------- левая колонка */}
        <div className="space-y-3">
          {tab === "land" && (
            <Card title="Участок" badge="Подобран">
              <div className="mb-4 space-y-3">
                <Slider
                  label="Площадь участка"
                  value={cfg.area}
                  min={3000}
                  max={80000}
                  step={50}
                  suffix="м²"
                  onChange={(v) => set("area", v)}
                />
                <div>
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.12em] text-graphite uppercase">
                    Территориальная зона
                  </span>
                  <Choice
                    options={zones.map((z) => ({ key: z.key as ZoneKey, label: z.label }))}
                    value={cfg.zone}
                    onChange={(v) => set("zone", v)}
                  />
                </div>
              </div>
              <Row k="ВРИ" v={zone.vri} />
              <Row k="Потенциал застройки (GBA)" v={`${num(result.gba)} м²`} strong />
              <Row k="Этажность" v={zone.floors} />
              <Row k="Плотность застройки" v={String(zone.density)} />
              <Row k="Обременения" v="Нет" />
            </Card>
          )}

          {tab === "product" && (
            <Card title="Продукт" badge="Оптимальный">
              <div className="mb-4 space-y-3">
                <div>
                  <span className="mb-2 block text-[11px] font-semibold tracking-[0.12em] text-graphite uppercase">
                    Класс
                  </span>
                  <Choice
                    options={classes.map((c) => ({ key: c.key as ClassKey, label: c.label }))}
                    value={cfg.productClass}
                    onChange={(v) =>
                      setCfg((c) => {
                        const next = classes.find((x) => x.key === v)!;
                        return { ...c, productClass: v, price: next.price, cost: next.cost };
                      })
                    }
                  />
                </div>
              </div>
              <Row k="Тип" v="Квартиры" />
              <Row k="GBA" v={`${num(result.gba)} м²`} />
              <Row k="Продаваемая площадь" v={`${num(result.gsa)} м²`} strong />
              <Row k="Квартир" v={`${num(result.flats)} шт.`} />
              <Row k="Средняя квартира" v={`${product.avgFlat} м²`} />
            </Card>
          )}

          {tab === "economy" && (
            <Card title="Параметры экономики">
              <div className="space-y-3.5">
                <Slider
                  label="Цена продажи"
                  value={cfg.price}
                  min={90000}
                  max={600000}
                  step={5000}
                  suffix="₽/м²"
                  onChange={(v) => set("price", v)}
                />
                <Slider
                  label="Себестоимость"
                  value={cfg.cost}
                  min={60000}
                  max={260000}
                  step={2000}
                  suffix="₽/м²"
                  onChange={(v) => set("cost", v)}
                />
                <Slider
                  label="Цена входа за участок"
                  value={cfg.landPrice}
                  min={50}
                  max={3000}
                  step={10}
                  suffix="млн ₽"
                  onChange={(v) => set("landPrice", v)}
                />
              </div>
              <div className="mt-4">
                {result.breakdown.map((b) => (
                  <Row key={b.key} k={b.label} v={money(b.value)} />
                ))}
              </div>
            </Card>
          )}

          {tab === "scenarios" && (
            <Card title="Сценарии">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left">
                  <thead>
                    <tr className="text-[11px] tracking-[0.1em] text-graphite uppercase">
                      <th className="pb-2 font-semibold">Сценарий</th>
                      <th className="pb-2 font-semibold">Выручка</th>
                      <th className="pb-2 font-semibold">Прибыль</th>
                      <th className="pb-2 font-semibold">IRR</th>
                      <th className="pb-2 font-semibold">NPV</th>
                    </tr>
                  </thead>
                  <tbody className="nums">
                    {rows.map((r) => (
                      <tr
                        key={r.key}
                        onClick={() => setScenario(r.key)}
                        className={`cursor-pointer border-t border-line text-[13px] ${
                          scenario === r.key ? "bg-brand-soft" : ""
                        }`}
                      >
                        <td className="py-2.5 font-medium">{r.label}</td>
                        <td className="py-2.5">{money(r.revenue)}</td>
                        <td className="py-2.5">{money(r.profit)}</td>
                        <td className="py-2.5 font-semibold text-brand-2">{percent(r.irr)}</td>
                        <td className="py-2.5">{money(r.npv)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[12px] text-silver">
                Сценарии сдвигают цену продажи, себестоимость и темп продаж относительно базового.
              </p>
            </Card>
          )}

          {tab === "decision" && (
            <Card title="Решение">
              <p className="text-[14px] leading-relaxed text-graphite">
                При текущих параметрах проект{" "}
                <b className={result.npv > 0 ? "text-brand-2" : "text-ink"}>
                  {result.npv > 0 ? "проходит по доходности" : "не проходит по доходности"}
                </b>
                : IRR {percent(result.irr)} при ставке дисконтирования {cfg.discountRate}% и NPV{" "}
                {money(result.npv)}.
              </p>
              <div className="mt-4">
                <Row k="Предельная цена участка" v={money(result.npv + cfg.landPrice * 1e6)} strong />
                <Row k="Запас по цене продажи" v={percent(Math.max(0, result.margin))} />
                <Row k="Срок проекта" v={`${result.months} мес.`} />
                <Row k="Пиковая потребность в финансировании" v={money(result.investment)} />
              </div>
            </Card>
          )}

          <Card title="Чувствительность (IRR)">
            <ul className="space-y-2.5">
              {risks.map((r) => (
                <li key={r.key} className="grid grid-cols-[112px_1fr_46px] items-center gap-3">
                  <span className="text-[12px] text-graphite">{r.label}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-mist-2">
                    <motion.span
                      className="block h-full rounded-full bg-brand"
                      animate={{ width: `${Math.max(4, r.share)}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                  <span className="nums text-right text-[12px] font-semibold">
                    {r.impact.toFixed(1)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] text-silver">
              Изменение IRR в процентных пунктах при отклонении фактора на ±10%.
            </p>
          </Card>
        </div>

        {/* ------------------------------------------ правая колонка */}
        <div className="space-y-3">
          <div className="card-glass rounded-2xl p-5">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-graphite uppercase">
              Финансовый результат
            </p>
            <p className="mt-3 text-[13px] text-graphite">Потенциальный результат</p>
            <p className="display mt-1 text-[clamp(1.8rem,3.4vw,2.6rem)] text-brand nums">
              {money(result.profit)}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { k: "IRR проекта", v: percent(result.irr), accent: true },
                { k: "NPV проекта", v: money(result.npv), accent: true },
                { k: "Маржа", v: percent(result.margin) },
                { k: "EBITDA", v: money(result.ebitda) },
                { k: "Срок проекта", v: `${result.months} мес.` },
                { k: "Инвестиции", v: money(result.investment) },
              ].map((kpi) => (
                <div key={kpi.k} className="rounded-xl bg-white/70 px-3 py-2.5">
                  <dt className="text-[10.5px] leading-tight text-graphite">{kpi.k}</dt>
                  <dd
                    className={`nums mt-1 text-[14px] font-semibold ${
                      kpi.accent ? "text-brand-2" : "text-ink"
                    }`}
                  >
                    {kpi.v}
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => setTab("economy")}
              className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-2 hover:text-brand"
            >
              Перейти к экономике →
            </button>
          </div>

          <Card title="Выручка и затраты">
            <Row k="Выручка" v={money(result.revenue)} strong />
            <Row k="Затраты проекта" v={money(result.costs)} />
            <Row k="Продаваемая площадь" v={`${num(result.gsa)} м²`} />
            <Row
              k="Цена реализации"
              v={`${num(cfg.price)} ₽/м²`}
            />
            <div className="mt-4 space-y-2">
              <Slider
                label="Темп продаж"
                value={cfg.salesPace}
                min={1}
                max={8}
                step={0.1}
                suffix="% в месяц"
                onChange={(v) => set("salesPace", v)}
              />
              <Slider
                label="Ставка дисконтирования"
                value={cfg.discountRate}
                min={8}
                max={30}
                step={0.5}
                suffix="% годовых"
                onChange={(v) => set("discountRate", v)}
              />
              <Slider
                label="Доля ипотеки"
                value={cfg.mortgageShare}
                min={0}
                max={95}
                step={1}
                suffix="%"
                onChange={(v) => set("mortgageShare", v)}
              />
            </div>
          </Card>

          <p className="px-1 text-[12px] leading-relaxed text-silver">
            Продажи считаются через эскроу: деньги дольщиков раскрываются после ввода объекта,
            стройка финансируется проектным кредитом. Расчёт предварительный —{" "}
            {plural(result.months, ["месяц", "месяца", "месяцев"])} проекта уточняются на
            допроектном этапе.
          </p>
        </div>
      </div>
    </div>
  );
}
