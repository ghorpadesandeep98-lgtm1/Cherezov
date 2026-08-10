import {
  CASHFLOW,
  COSTS,
  ECON_EXTRA,
  ECON_MARGIN,
  ECON_ZONES,
  OWNER_DEAL,
  REV_SPLIT,
  type Scenario,
} from '@/data/v3/calculator';
import d from './Dashboard.module.css';
import s from './EconPanel.module.css';

const ECON_KPIS = (scenario: Scenario) => [
  { k: 'Выручка', v: scenario.rev },
  { k: 'Инвестиции', v: '2,68 млрд ₽' },
  { k: 'Маржа', v: '17,3 %' },
  { k: 'Себестоимость', v: '241 тыс. ₽/м²' },
  { k: 'Цена реализации', v: '298 тыс. ₽/м²' },
  { k: 'Точка безубыточности', v: '19 мес.' },
];

/** Вкладка «Экономика»: финансовый результат, структура затрат и денежный поток. */
export function EconPanel({ scenario }: { scenario: Scenario }) {
  return (
    <>
      <div className={d.topGrid}>
        <div className={s.summary}>
          <div className={s.summaryMain}>
            <span className={s.summaryOverline}>ФИНАНСОВЫЙ РЕЗУЛЬТАТ</span>
            <div className={s.summaryValue}>{scenario.profit}</div>
          </div>
          <div className={s.summaryGrid}>
            <span>IRR · {scenario.irr}</span>
            <span>NPV · {scenario.npv}</span>
            <span>Выручка · {scenario.rev}</span>
            <span>Срок · 31 мес.</span>
          </div>
        </div>
      </div>

      <div className={s.grid}>
        <div className={d.card}>
          <span className={d.cardTitle}>Экономика проекта</span>
          <div className={d.kpiGridWide}>
            {ECON_KPIS(scenario).map((k) => (
              <div key={k.k} className={d.kpiSmall}>
                <span className={d.kpiKSmall}>{k.k}</span>
                <b className={d.kpiVMid}>{k.v}</b>
              </div>
            ))}
          </div>

          <span className={`${d.subTitle} ${d.pushed}`}>Зоны внимания</span>
          <div className={d.zones}>
            {ECON_ZONES.map((z) => (
              <div key={z.t} className={d.zone} style={{ background: z.bg, border: `1px solid ${z.line}` }}>
                <span className={d.zoneDot} style={{ background: z.color }} />
                <span className={d.zoneText}>{z.t}</span>
                <b className={d.zoneValue} style={{ color: z.color }}>
                  {z.v}
                </b>
              </div>
            ))}
          </div>
        </div>

        <div className={d.cardTight}>
          <span className={d.cardTitle}>Показатели эффективности</span>
          <div className={d.kpiPair}>
            {ECON_EXTRA.map((e) => (
              <div key={e.k} className={d.kpiTiny}>
                <span className={d.footKSmall}>{e.k}</span>
                <b className={d.footV}>{e.v}</b>
              </div>
            ))}
          </div>

          <span className={`${d.subTitle} ${d.pushed}`}>Как делится выручка</span>
          <div className={s.splitBar}>
            {REV_SPLIT.map((r) => (
              <div key={r.label} style={{ height: '100%', width: r.width, background: r.color }} />
            ))}
          </div>
          <div className={s.legend}>
            {REV_SPLIT.map((r) => (
              <span key={r.label} className={s.legendItem}>
                <span className={s.legendDot} style={{ background: r.color }} />
                {r.label} · {r.text}
              </span>
            ))}
          </div>

          <span className={`${d.cardTitle} ${d.pushed}`}>Структура затрат</span>
          {COSTS.map((c) => (
            <div key={c.label} className={d.bar} style={{ gap: 5 }}>
              <div className={d.barHead} style={{ gap: 12 }}>
                <span className={d.barLabel}>{c.label}</span>
                <b className={d.barValue}>{c.text}</b>
              </div>
              <div className={d.track}>
                <div className={d.fill} style={{ width: c.width }} />
              </div>
            </div>
          ))}
        </div>

        <div className={d.card}>
          <span className={d.cardTitle}>Что получит собственник земли</span>
          <div className={d.kpiPair}>
            {OWNER_DEAL.map((o) => (
              <div key={o.k} className={d.kpiTiny}>
                <span className={d.kpiKSmall}>{o.k}</span>
                <b className={d.kpiVSmall}>{o.v}</b>
              </div>
            ))}
          </div>

          <span className={`${d.cardTitle} ${d.pushed}`}>Запас до нуля по ключевым параметрам</span>
          <div className={d.barsWide}>
            {ECON_MARGIN.map((m) => (
              <div key={m.label} className={d.bar} style={{ gap: 5 }}>
                <div className={d.barHead}>
                  <span className={d.barLabel}>{m.label}</span>
                  <b className={d.barValue} style={{ color: m.color }}>
                    {m.text}
                  </b>
                </div>
                <div className={`${d.track} ${d.trackThick}`}>
                  <div className={d.fill} style={{ width: m.width, background: m.color }} />
                </div>
              </div>
            ))}
          </div>

          <span className={`${d.cardTitle} ${d.pushed}`}>Денежный поток по годам, млрд ₽</span>
          <div className={s.cashflow}>
            {CASHFLOW.map((c) => (
              <div key={c.y} className={s.cashColumn}>
                <b className={s.cashValue}>{c.v}</b>
                <div className={s.cashBar} style={{ height: c.h }} />
                <span className={s.cashYear}>{c.y}</span>
              </div>
            ))}
          </div>
          <span className={s.cashNote}>
            Пиковая потребность в финансировании — 2,10 млрд ₽ в 2027 году, выход в плюс — 3 кв. 2028
            года.
          </span>
        </div>
      </div>
    </>
  );
}
