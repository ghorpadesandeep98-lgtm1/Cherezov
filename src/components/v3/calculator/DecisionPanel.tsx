import { CHECKLIST, DECISION_BARS, DECISION_KPIS, NEXT_STEPS, type Scenario } from '@/data/v3/calculator';
import d from './Dashboard.module.css';
import s from './DecisionPanel.module.css';

/** Вкладка «Решение»: вывод инвесткомитета, запас прочности и план действий. */
export function DecisionPanel({ scenario }: { scenario: Scenario }) {
  return (
    <div className={s.block}>
      <div className={s.verdict}>
        <span className={s.verdictOverline}>РЕШЕНИЕ</span>
        <span className={s.verdictTitle}>Проект проходит по доходности — покупать участок</span>
        <span className={s.verdictText}>
          IRR выше порога инвесткомитета (18 %), запас прочности по цене — 11 %. Риски по темпу
          продаж контролируемые.
        </span>
      </div>

      <div className={s.headline}>
        <div className={s.headlineCell}>
          <span className={d.kpiK}>Порог IRR</span>
          <b className={d.kpiV}>18,0 %</b>
        </div>
        <div className={s.headlineCell}>
          <span className={d.kpiK}>Факт IRR</span>
          <b className={s.headlineAccent}>{scenario.irr}</b>
        </div>
        <div className={s.headlineCell}>
          <span className={d.kpiK}>Срок выхода</span>
          <b className={d.kpiV}>31 мес.</b>
        </div>
      </div>

      <div className={s.kpis}>
        {DECISION_KPIS.map((k) => (
          <div key={k.k} className={s.kpiCell}>
            <span className={d.footKSmall}>{k.k}</span>
            <b className={d.kpiVMid}>{k.v}</b>
          </div>
        ))}
      </div>

      <div className={s.columns}>
        <div className={s.column}>
          <span className={s.columnTitle}>ЧТО ДАЁТ ЗАПАС ПРОЧНОСТИ</span>
          {DECISION_BARS.map((b) => (
            <div key={b.label} className={d.bar}>
              <div className={d.barHead} style={{ gap: 12 }}>
                <span className={d.barLabel}>{b.label}</span>
                <b className={d.barValue}>{b.text}</b>
              </div>
              <div className={d.track}>
                <div className={d.fill} style={{ width: b.width }} />
              </div>
            </div>
          ))}

          <div className={s.checklist}>
            {CHECKLIST.map((c) => (
              <div key={c.t} className={s.checkRow}>
                <span className={s.checkMark}>✓</span>
                <span className={s.checkText}>{c.t}</span>
                <b className={s.checkValue}>{c.v}</b>
              </div>
            ))}
          </div>
        </div>

        <div className={s.columnSteps}>
          <span className={s.columnTitle}>ЧТО ДЕЛАТЬ ДАЛЬШЕ</span>
          {NEXT_STEPS.map((n) => (
            <div key={n.n} className={s.step}>
              <span className={s.stepNum}>{n.n}</span>
              <div className={s.stepBody}>
                <b className={s.stepTitle}>{n.t}</b>
                <span className={s.stepText}>{n.d}</span>
              </div>
              <span className={s.stepTerm}>{n.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
