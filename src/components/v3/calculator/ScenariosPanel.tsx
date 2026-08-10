import {
  ASSUMPTIONS,
  IRR_BARS,
  RISK_MAP,
  SCEN_GUARDS,
  SCENARIOS,
  SENSITIVITY,
} from '@/data/v3/calculator';
import d from './Dashboard.module.css';
import s from './ScenariosPanel.module.css';

type Props = {
  current: string;
  onSelect: (name: string) => void;
};

/** Вкладка «Сценарии»: сравнение трёх вариантов, допущения и карта рисков. */
export function ScenariosPanel({ current, onSelect }: Props) {
  return (
    <div className={s.grid}>
      <div className={`${d.cardTight} ${s.scroller}`}>
        <span className={d.cardTitle}>Сценарии</span>

        <div className={s.table}>
          <div className={s.tableHead}>
            <span>СЦЕНАРИЙ</span>
            <span>ВЫРУЧКА</span>
            <span>ПРИБЫЛЬ</span>
            <span>IRR</span>
            <span>NPV</span>
          </div>
          {SCENARIOS.map((row) => {
            const active = row.name === current;
            return (
              <button
                key={row.name}
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(row.name)}
                className={active ? s.tableRowActive : s.tableRow}
              >
                <span className={active ? s.nameActive : s.name}>{row.name}</span>
                <span>{row.rev}</span>
                <span>{row.profit}</span>
                <span>{row.irr}</span>
                <span>{row.npv}</span>
              </button>
            );
          })}
        </div>
        <span className={d.hint}>Нажмите на сценарий — показатели пересчитаются</span>

        <span className={d.subTitle} style={{ marginTop: 6 }}>
          Допущения сценариев
        </span>
        <div className={d.limits}>
          <div className={s.assumeHead}>
            <span>ДОПУЩЕНИЕ</span>
            <span>КОНСЕРВ.</span>
            <span>БАЗОВЫЙ</span>
            <span>ОПТИМИСТ.</span>
          </div>
          {ASSUMPTIONS.map((a) => (
            <div key={a.k} className={s.assumeRow}>
              <span className={s.assumeKey}>{a.k}</span>
              <span>{a.c}</span>
              <b className={s.assumeBase}>{a.b}</b>
              <span>{a.o}</span>
            </div>
          ))}
        </div>

        <span className={d.subTitle} style={{ marginTop: 6 }}>
          IRR по сценариям и порог инвесткомитета
        </span>
        <div className={s.irrChart}>
          <div className={s.threshold}>
            <span className={s.thresholdLabel}>порог 18 %</span>
          </div>
          {IRR_BARS.map((b) => (
            <div key={b.k} className={s.irrColumn}>
              <b className={s.irrValue} style={{ color: b.color }}>
                {b.v}
              </b>
              <div className={s.irrBar} style={{ height: b.h, background: b.color }} />
              <span className={s.irrKey}>{b.k}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={d.cardTight}>
        <span className={d.cardTitle}>Вероятность и запас прочности</span>
        <div className={s.guards}>
          {SCEN_GUARDS.map((g) => (
            <div key={g.k} className={s.guard}>
              <span className={d.kpiKSmall}>{g.k}</span>
              <b className={d.kpiVSmall}>{g.v}</b>
            </div>
          ))}
        </div>

        <span className={`${d.subTitle} ${d.pushed}`}>Карта рисков</span>
        <div className={d.zonesTight}>
          {RISK_MAP.map((r) => (
            <div key={r.t} className={d.zone} style={{ background: r.bg, border: `1px solid ${r.line}` }}>
              <span className={d.zoneDot} style={{ background: r.color }} />
              <span className={d.zoneText}>{r.t}</span>
              <b className={d.zoneValueSmall} style={{ color: r.color }}>
                {r.v}
              </b>
            </div>
          ))}
        </div>

        <span className={`${d.subTitle} ${d.pushed}`}>Чувствительность (IRR)</span>
        {SENSITIVITY.map((k) => (
          <div key={k.label} className={d.bar} style={{ gap: 5 }}>
            <div className={d.barHead} style={{ gap: 12 }}>
              <span className={d.barLabel}>{k.label}</span>
              <b className={d.barValue}>{k.text}</b>
            </div>
            <div className={d.track}>
              <div className={d.fill} style={{ width: k.width }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
