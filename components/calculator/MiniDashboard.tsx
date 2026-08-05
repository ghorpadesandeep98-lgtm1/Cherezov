import { calculate, defaultConfig, money, num, percent, scenarios } from "@/lib/model";

/** Тёмная сводка для экрана ноутбука: те же числа, что и в большом дашборде. */
export function MiniDashboard() {
  const r = calculate(defaultConfig);
  const rows = scenarios(defaultConfig);
  const bars = [42, 68, 55, 88, 74, 96, 61, 80, 52, 90, 66, 78];

  return (
    <div className="grid h-full grid-cols-[92px_1fr] bg-[#0d120e] text-white">
      {/* боковое меню */}
      <aside className="flex flex-col gap-2 border-r border-white/8 p-3">
        <span className="mb-2 text-[9px] tracking-[0.16em] text-white/35 uppercase">Проект</span>
        {["Земля", "Продукт", "Экономика", "Сценарии", "Решение"].map((item, i) => (
          <span
            key={item}
            className={`rounded-lg px-2 py-1.5 text-[10px] ${
              i === 2 ? "bg-brand/20 text-brand" : "text-white/45"
            }`}
          >
            {item}
          </span>
        ))}
      </aside>

      <div className="grid grid-rows-[auto_1fr] gap-3 p-3">
        {/* KPI */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { k: "GBA", v: `${num(r.gba)} м²` },
            { k: "Выручка", v: money(r.revenue) },
            { k: "IRR", v: percent(r.irr) },
            { k: "NPV", v: money(r.npv) },
          ].map((kpi) => (
            <div key={kpi.k} className="rounded-lg border border-white/8 bg-white/4 px-2.5 py-2">
              <p className="text-[8.5px] tracking-[0.12em] text-white/35 uppercase">{kpi.k}</p>
              <p className="nums mt-1 text-[11px] font-semibold text-brand">{kpi.v}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1.4fr_1fr] gap-3">
          {/* объёмы застройки */}
          <div className="rounded-xl border border-white/8 bg-white/4 p-3">
            <p className="text-[9px] tracking-[0.14em] text-white/35 uppercase">Посадка объёмов</p>
            <div className="mt-3 flex h-[92px] items-end gap-1.5">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[3px]"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, rgba(34,162,75,${0.35 + (h / 100) * 0.6}) 0%, rgba(34,162,75,0.12) 100%)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* сценарии */}
          <div className="rounded-xl border border-white/8 bg-white/4 p-3">
            <p className="text-[9px] tracking-[0.14em] text-white/35 uppercase">Сценарии</p>
            <ul className="mt-3 space-y-2.5">
              {rows.map((s) => (
                <li key={s.key}>
                  <div className="flex items-baseline justify-between text-[9.5px]">
                    <span className="text-white/50">{s.label}</span>
                    <span className="nums text-white/80">{percent(s.irr)}</span>
                  </div>
                  <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full bg-brand"
                      style={{ width: `${Math.min(100, Math.max(6, s.irr * 2.6))}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
