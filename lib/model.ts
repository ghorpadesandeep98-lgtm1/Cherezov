/* ============================================================================
 * Расчётное ядро «Калькулятора девелопера».
 * ----------------------------------------------------------------------------
 * Модель повторяет логику допроектной оценки: участок → потенциал застройки →
 * продукт → выручка и затраты → денежный поток → IRR, NPV, маржа.
 *
 * TODO(бриф): коэффициенты ниже — калибровка под демонстрацию. Перед продом
 * заменить на нормативы бюро (доля продаваемой площади, доли затрат, ставки).
 * ==========================================================================*/

/* ----------------------------- справочники ----------------------------- */

export type ZoneKey = "zh4" | "zh3" | "mfz" | "obsh";
export type ClassKey = "comfort" | "comfort-plus" | "business";

export const zones: {
  key: ZoneKey;
  label: string;
  vri: string;
  /** предельный коэффициент плотности застройки */
  density: number;
  floors: string;
}[] = [
  { key: "zh4", label: "Ж-4", vri: "Многоквартирные дома", density: 2.76, floors: "2–9 эт." },
  { key: "zh3", label: "Ж-3", vri: "Среднеэтажная застройка", density: 1.9, floors: "2–6 эт." },
  { key: "mfz", label: "МФЗ", vri: "Многофункциональная застройка", density: 3.4, floors: "6–17 эт." },
  { key: "obsh", label: "О-1", vri: "Общественно-деловая", density: 2.2, floors: "2–12 эт." },
];

export const classes: {
  key: ClassKey;
  label: string;
  /** доля продаваемой площади в GBA */
  sellable: number;
  price: number; // ₽ за м² продаваемой площади
  cost: number; // ₽ за м² GBA
  avgFlat: number; // средняя площадь квартиры, м²
}[] = [
  { key: "comfort", label: "Комфорт", sellable: 0.72, price: 245000, cost: 98000, avgFlat: 48 },
  { key: "comfort-plus", label: "Комфорт+", sellable: 0.7, price: 285000, cost: 112000, avgFlat: 49 },
  { key: "business", label: "Бизнес", sellable: 0.67, price: 385000, cost: 145000, avgFlat: 64 },
];

/** Доли затрат сверх строительно-монтажных работ. */
const SHARES = {
  design: 0.055, // проектирование, изыскания, экспертиза
  networks: 0.09, // сети и внеплощадочные работы
  marketing: 0.03, // маркетинг и продажи
  management: 0.035, // управление проектом
  finance: 0.07, // обслуживание проектного финансирования
};

export type Config = {
  area: number; // площадь участка, м²
  zone: ZoneKey;
  productClass: ClassKey;
  landPrice: number; // цена входа за участок, млн ₽
  price: number; // цена продажи, ₽/м²
  cost: number; // себестоимость СМР, ₽/м² GBA
  salesPace: number; // темп продаж, % площади в месяц
  discountRate: number; // ставка дисконтирования, % годовых
  mortgageShare: number; // доля ипотеки, %
};

export const defaultConfig: Config = {
  area: 28450,
  zone: "zh4",
  productClass: "comfort-plus",
  landPrice: 420,
  price: 285000,
  cost: 112000,
  salesPace: 3.2,
  discountRate: 18,
  mortgageShare: 62,
};

export type Result = {
  gba: number; // потенциал застройки, м²
  gsa: number; // продаваемая площадь, м²
  flats: number;
  revenue: number; // ₽
  costs: number; // ₽
  profit: number; // ₽
  margin: number; // %
  ebitda: number; // ₽
  npv: number; // ₽
  irr: number; // %
  months: number;
  investment: number; // ₽
  breakdown: { key: string; label: string; value: number }[];
};

/* ------------------------------- расчёт -------------------------------- */

/** Чистая приведённая стоимость помесячного потока. */
function npv(flow: number[], monthlyRate: number) {
  return flow.reduce((sum, v, i) => sum + v / Math.pow(1 + monthlyRate, i), 0);
}

/** IRR методом бисекции: ищем ставку, при которой NPV потока обращается в ноль. */
export function irr(flow: number[]): number {
  let low = -0.9;
  let high = 1.5; // 150% в месяц — заведомо выше любого реального проекта
  const f = (r: number) => npv(flow, r);

  if (f(low) * f(high) > 0) return 0;

  for (let i = 0; i < 200; i++) {
    const mid = (low + high) / 2;
    if (f(low) * f(mid) <= 0) high = mid;
    else low = mid;
  }
  const monthly = (low + high) / 2;
  return (Math.pow(1 + monthly, 12) - 1) * 100;
}

export function calculate(cfg: Config): Result {
  const zone = zones.find((z) => z.key === cfg.zone)!;
  const product = classes.find((c) => c.key === cfg.productClass)!;

  const gba = Math.round(cfg.area * zone.density);
  const gsa = Math.round(gba * product.sellable);
  const flats = Math.round(gsa / product.avgFlat);

  const revenue = gsa * cfg.price;

  const land = cfg.landPrice * 1_000_000;
  const construction = gba * cfg.cost;
  const design = construction * SHARES.design;
  const networks = construction * SHARES.networks;
  const marketing = revenue * SHARES.marketing;
  const management = construction * SHARES.management;
  const finance = construction * SHARES.finance;

  const costs = land + construction + design + networks + marketing + management + finance;
  const profit = revenue - costs;
  const ebitda = revenue - (land + construction + design + networks + marketing + management);
  const margin = (profit / revenue) * 100;

  // сроки: проектирование и согласования, стройка, продажи
  const buildMonths = Math.max(18, Math.round(gba / 3200));
  const salesMonths = Math.max(10, Math.round(100 / cfg.salesPace));
  const preMonths = 8; // проектирование, экспертиза, РНС
  const completion = preMonths + buildMonths;
  const salesStart = preMonths + 2;
  const months = Math.max(completion, salesStart + salesMonths - 1);

  // Помесячный поток. Продажи идут через эскроу: деньги дольщиков раскрываются
  // не раньше ввода объекта, поэтому стройка живёт на проектном финансировании.
  const flow: number[] = new Array(months + 1).fill(0);
  flow[0] -= land;

  const spend = construction + design + networks + management + finance;
  for (let m = 1; m <= completion; m++) flow[m] -= spend / completion;

  const perMonth = (revenue - marketing) / salesMonths;
  for (let m = salesStart; m < salesStart + salesMonths; m++) {
    flow[Math.max(m, completion)] += perMonth;
  }

  const monthlyRate = Math.pow(1 + cfg.discountRate / 100, 1 / 12) - 1;
  const investment = -flow.filter((v) => v < 0).reduce((a, b) => a + b, 0);

  return {
    gba,
    gsa,
    flats,
    revenue,
    costs,
    profit,
    margin,
    ebitda,
    npv: npv(flow, monthlyRate),
    irr: irr(flow),
    months,
    investment,
    breakdown: [
      { key: "land", label: "Участок", value: land },
      { key: "construction", label: "Строительство", value: construction },
      { key: "networks", label: "Сети и благоустройство", value: networks },
      { key: "design", label: "Проектирование и экспертиза", value: design },
      { key: "management", label: "Управление проектом", value: management },
      { key: "marketing", label: "Маркетинг и продажи", value: marketing },
      { key: "finance", label: "Финансирование", value: finance },
    ],
  };
}

/* ------------------------------ сценарии ------------------------------- */

export type ScenarioKey = "base" | "optimistic" | "conservative";

export const scenarioShifts: Record<ScenarioKey, { label: string; price: number; cost: number; pace: number }> = {
  base: { label: "Базовый", price: 1, cost: 1, pace: 1 },
  optimistic: { label: "Оптимистичный", price: 1.08, cost: 0.96, pace: 1.15 },
  conservative: { label: "Консервативный", price: 0.93, cost: 1.06, pace: 0.85 },
};

export function withScenario(cfg: Config, key: ScenarioKey): Config {
  const s = scenarioShifts[key];
  return {
    ...cfg,
    price: Math.round(cfg.price * s.price),
    cost: Math.round(cfg.cost * s.cost),
    salesPace: Number((cfg.salesPace * s.pace).toFixed(2)),
  };
}

export function scenarios(cfg: Config) {
  return (Object.keys(scenarioShifts) as ScenarioKey[]).map((key) => {
    const r = calculate(withScenario(cfg, key));
    return { key, label: scenarioShifts[key].label, ...r };
  });
}

/* ---------------------------- чувствительность -------------------------- */

/** Насколько меняется IRR при отклонении фактора на 10%. */
export function sensitivity(cfg: Config) {
  const base = calculate(cfg).irr;
  const step = 0.1;

  const factors: { key: string; label: string; apply: (c: Config, k: number) => Config }[] = [
    { key: "price", label: "Цена продажи", apply: (c, k) => ({ ...c, price: c.price * k }) },
    { key: "cost", label: "Себестоимость", apply: (c, k) => ({ ...c, cost: c.cost * k }) },
    { key: "pace", label: "Темп продаж", apply: (c, k) => ({ ...c, salesPace: c.salesPace * k }) },
    {
      // ставка дисконтирования на IRR не влияет по определению,
      // поэтому в чувствительности стоит цена входа — реальный драйвер доходности
      key: "land",
      label: "Цена участка",
      apply: (c, k) => ({ ...c, landPrice: c.landPrice * k }),
    },
    {
      key: "mortgage",
      label: "Доля ипотеки",
      // ипотека влияет на темп выкупа: выше доля — быстрее продажи
      apply: (c, k) => ({
        ...c,
        mortgageShare: c.mortgageShare * k,
        salesPace: c.salesPace * (1 + (k - 1) * 0.5),
      }),
    },
  ];

  const raw = factors.map((f) => {
    const up = calculate(f.apply(cfg, 1 + step)).irr;
    const down = calculate(f.apply(cfg, 1 - step)).irr;
    return { key: f.key, label: f.label, impact: Math.abs(up - down) };
  });

  const max = Math.max(...raw.map((r) => r.impact), 0.0001);
  return raw.map((r) => ({ ...r, share: (r.impact / max) * 100, base }));
}

/* ----------------------------- форматирование --------------------------- */

const nf = (opts: Intl.NumberFormatOptions = {}) => new Intl.NumberFormat("ru-RU", opts);

export const num = (n: number) => nf({ maximumFractionDigits: 0 }).format(Math.round(n));

/** 4 052 000 000 → «4,05 млрд ₽» */
export function money(n: number, withSign = true) {
  const abs = Math.abs(n);
  const sign = withSign ? " ₽" : "";
  if (abs >= 1_000_000_000) return `${nf({ maximumFractionDigits: 2 }).format(n / 1_000_000_000)} млрд${sign}`;
  if (abs >= 1_000_000) return `${nf({ maximumFractionDigits: 0 }).format(n / 1_000_000)} млн${sign}`;
  return `${num(n)}${sign}`;
}

export const percent = (n: number, digits = 1) =>
  `${nf({ minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n)}%`;

export function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
