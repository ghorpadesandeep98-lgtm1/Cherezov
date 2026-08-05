/* ============================================================================
 * Расчётное ядро «Калькулятора ДИТОН».
 * ----------------------------------------------------------------------------
 * Модель детерминированная и прозрачная: те же статьи, что в производственной
 * смете — препресс, бумага, печать, отделка, переплёт, логистика.
 *
 * TODO(pdf): коэффициенты ниже — рабочая калибровка под демонстрацию.
 * Перед продом заменить на тарифы из производственного справочника.
 * ==========================================================================*/

export type ProductKey = "kvartal" | "perekid" | "kniga" | "katalog" | "broshura";
export type FormatKey = "a5" | "a4" | "a3" | "square";
export type PaperKey = "offset80" | "matt130" | "gloss150" | "design250";
export type ColorKey = "4+0" | "4+4" | "5+5";
export type FinishKey = "lak" | "folga" | "tisnenie" | "lam";

export const productOptions: {
  key: ProductKey;
  label: string;
  hint: string;
  /** базовая полосность по умолчанию */
  pages: number;
  pagesLocked?: boolean;
  bindingPerCopy: number;
  minTirazh: number;
}[] = [
  { key: "kvartal", label: "Квартальный календарь", hint: "3 блока, пружина, люверс", pages: 12, pagesLocked: true, bindingPerCopy: 34, minTirazh: 100 },
  { key: "perekid", label: "Перекидной календарь", hint: "12 листов на пружине", pages: 14, pagesLocked: true, bindingPerCopy: 26, minTirazh: 100 },
  { key: "kniga", label: "Книга в твёрдом переплёте", hint: "7БЦ, шитьё нитками", pages: 160, bindingPerCopy: 78, minTirazh: 50 },
  { key: "katalog", label: "Каталог", hint: "КБС, клеевое бесшвейное", pages: 64, bindingPerCopy: 21, minTirazh: 100 },
  { key: "broshura", label: "Брошюра", hint: "Скоба, 2 скрепки", pages: 24, bindingPerCopy: 7, minTirazh: 100 },
];

export const formatOptions: { key: FormatKey; label: string; area: number }[] = [
  { key: "a5", label: "A5", area: 0.031 },
  { key: "a4", label: "A4", area: 0.062 },
  { key: "a3", label: "A3", area: 0.125 },
  { key: "square", label: "210×210", area: 0.044 },
];

export const paperOptions: { key: PaperKey; label: string; hint: string; pricePerM2: number }[] = [
  { key: "offset80", label: "Офсет 80", hint: "Некрашеная, для блоков", pricePerM2: 5.4 },
  { key: "matt130", label: "Мелованная матовая 130", hint: "Универсальная", pricePerM2: 9.8 },
  { key: "gloss150", label: "Мелованная глянцевая 150", hint: "Насыщенный цвет", pricePerM2: 11.6 },
  { key: "design250", label: "Дизайнерская 250", hint: "Фактура, обложки", pricePerM2: 34 },
];

export const colorOptions: { key: ColorKey; label: string; hint: string; forms: number }[] = [
  { key: "4+0", label: "4+0", hint: "Полноцвет с одной стороны", forms: 4 },
  { key: "4+4", label: "4+4", hint: "Полноцвет с двух сторон", forms: 8 },
  { key: "5+5", label: "5+5", hint: "Полноцвет + Pantone", forms: 10 },
];

export const finishOptions: {
  key: FinishKey;
  label: string;
  hint: string;
  perCopy: number;
  setup: number;
  days: number;
}[] = [
  { key: "lak", label: "Выборочный лак", hint: "Акцент на обложке", perCopy: 4.2, setup: 4500, days: 1 },
  { key: "folga", label: "Тиснение фольгой", hint: "Горячее тиснение", perCopy: 7.8, setup: 9800, days: 2 },
  { key: "tisnenie", label: "Конгревное тиснение", hint: "Рельеф", perCopy: 6.4, setup: 8600, days: 1 },
  { key: "lam", label: "Ламинация", hint: "Матовая или soft-touch", perCopy: 3.1, setup: 2600, days: 1 },
];

export type Config = {
  product: ProductKey;
  format: FormatKey;
  paper: PaperKey;
  color: ColorKey;
  pages: number;
  tirazh: number;
  finishes: FinishKey[];
  express: boolean;
};

export const defaultConfig: Config = {
  product: "kvartal",
  format: "a3",
  paper: "matt130",
  color: "4+4",
  pages: 12,
  tirazh: 2000,
  finishes: ["lak"],
  express: false,
};

export type Estimate = {
  total: number;
  perCopy: number;
  days: number;
  lines: { key: string; label: string; value: number }[];
};

const round = (n: number) => Math.round(n);

/** Оптовая кривая: чем больше тираж, тем дешевле оттиск. */
function volumeFactor(tirazh: number) {
  return Math.max(0.42, 1 - Math.log10(Math.max(tirazh, 1) / 100) * 0.19);
}

export function estimate(cfg: Config): Estimate {
  const product = productOptions.find((p) => p.key === cfg.product)!;
  const format = formatOptions.find((f) => f.key === cfg.format)!;
  const paper = paperOptions.find((p) => p.key === cfg.paper)!;
  const color = colorOptions.find((c) => c.key === cfg.color)!;

  const tirazh = Math.max(cfg.tirazh, product.minTirazh);
  const pages = product.pagesLocked ? product.pages : cfg.pages;

  // печатных листов на экземпляр (2 полосы на сторону листа)
  const sheetsPerCopy = pages / 4;
  const paperArea = sheetsPerCopy * format.area * 2 * tirazh;

  // допечатная подготовка: формы + цветопроба
  const prepress = color.forms * 1450 * Math.max(1, Math.ceil(sheetsPerCopy / 4)) + 6800;

  // бумага + технологические отходы 4%
  const paperCost = paperArea * paper.pricePerM2 * 1.04;

  // печать: приладка + оттиски с оптовой кривой
  const impressions = sheetsPerCopy * tirazh * (color.key === "4+0" ? 1 : 2);
  const printing = color.forms * 1900 + impressions * 1.35 * volumeFactor(tirazh);

  // отделка
  const finishing = cfg.finishes.reduce((sum, key) => {
    const f = finishOptions.find((o) => o.key === key)!;
    return sum + f.setup + f.perCopy * tirazh;
  }, 0);

  // переплёт и сборка
  const binding = product.bindingPerCopy * tirazh * volumeFactor(tirazh) * 1.35;

  // упаковка и логистика
  const logistics = 4200 + tirazh * 1.6;

  const subtotal = prepress + paperCost + printing + finishing + binding + logistics;
  const total = subtotal * (cfg.express ? 1.28 : 1);

  // срок производства
  const finishDays = cfg.finishes.reduce((sum, key) => {
    const f = finishOptions.find((o) => o.key === key)!;
    return sum + f.days;
  }, 0);
  const base = 3 + Math.ceil(tirazh / 6000) + Math.ceil(pages / 120) + finishDays;
  const days = Math.max(2, cfg.express ? Math.ceil(base * 0.6) : base);

  return {
    total: round(total),
    perCopy: Math.round((total / tirazh) * 100) / 100,
    days,
    lines: [
      { key: "prepress", label: "Препресс и формы", value: round(prepress) },
      { key: "paper", label: "Бумага", value: round(paperCost) },
      { key: "print", label: "Печать", value: round(printing) },
      { key: "finish", label: "Отделка", value: round(finishing) },
      { key: "bind", label: "Переплёт и сборка", value: round(binding) },
      { key: "logistics", label: "Упаковка и логистика", value: round(logistics) },
    ],
  };
}

export const money = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n);

export const moneyPrecise = (n: number) =>
  new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
