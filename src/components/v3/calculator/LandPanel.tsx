import {
  ENTRY_COST,
  GBA_MIX,
  LAND_CHECKS,
  LAND_FOOT,
  LAND_KPIS,
  LAND_LIMITS,
  LAND_MARKET,
} from '@/data/v3/calculator';
import d from './Dashboard.module.css';

/** Вкладка «Земля»: паспорт участка, структура GBA и цена входа. */
export function LandPanel() {
  return (
    <div className={d.topGrid}>
      <div className={d.card}>
        <div className={d.cardHead}>
          <span className={d.cardTitle}>Участок</span>
          <span className={d.badge}>Подобран</span>
        </div>

        <div className={d.split}>
          <div className={d.splitLeft} style={{ flex: '1 1 46%', gap: 8 }}>
            {/* Сцена рисуется в фиксированном масштабе, поэтому обычный img. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/v3/plot.jpg" alt="Участок" className={d.thumb} style={{ height: 112 }} />
            <div className={d.meta}>
              28 450 м² · зона Ж-4
              <br />
              ВРИ · многоквартирные дома
              <br />
              GBA · 78 600 м²
            </div>
          </div>
          <div className={d.splitRight} style={{ flex: '1 1 54%', gap: 6 }}>
            <span className={d.overline}>ПРОВЕРКА УЧАСТКА</span>
            {LAND_CHECKS.map((c) => (
              <div key={c.t} className={d.check}>
                <span className={d.checkDot} style={{ background: c.color }} />
                <span className={d.checkText}>{c.t}</span>
                <b className={d.checkStatus} style={{ color: c.color }}>
                  {c.s}
                </b>
              </div>
            ))}
          </div>
        </div>

        <span className={d.overline}>СТРУКТУРА GBA, М²</span>
        <div className={d.bars}>
          {GBA_MIX.map((g) => (
            <div key={g.label} className={d.bar}>
              <div className={d.barHead}>
                <span className={d.barLabel}>{g.label}</span>
                <b className={d.barValue}>{g.text}</b>
              </div>
              <div className={d.track}>
                <div className={d.fill} style={{ width: g.width }} />
              </div>
            </div>
          ))}
        </div>

        <span className={`${d.overline} ${d.pushed}`}>ИЗ ЧЕГО СКЛАДЫВАЕТСЯ ЦЕНА ВХОДА, МЛН ₽</span>
        <div className={d.bars} style={{ gap: 7 }}>
          {ENTRY_COST.map((e) => (
            <div key={e.label} className={d.rowBar}>
              <span className={d.rowBarLabel}>{e.label}</span>
              <div className={d.rowBarTrack}>
                <div className={d.rowBarFill} style={{ width: e.width, background: e.color }} />
              </div>
              <b className={d.rowBarValue}>{e.text}</b>
            </div>
          ))}
        </div>

        <div className={d.foot}>
          {LAND_FOOT.map((f) => (
            <div key={f.k} className={d.footCell}>
              <span className={d.footK}>{f.k}</span>
              <b className={d.footV}>{f.v}</b>
            </div>
          ))}
        </div>
      </div>

      <div className={d.card}>
        <span className={d.cardTitle}>Ключевые показатели участка</span>
        <div className={d.kpiGrid}>
          {LAND_KPIS.map((k) => (
            <div key={k.k} className={d.kpi}>
              <span className={d.kpiK}>{k.k}</span>
              <b className={d.kpiV}>{k.v}</b>
            </div>
          ))}
        </div>

        <span className={`${d.cardTitle} ${d.pushed}`}>Цена земли к рынку САО, ₽/м² GBA</span>
        <div className={d.barsWide}>
          {LAND_MARKET.map((m) => (
            <div key={m.label} className={d.bar} style={{ gap: 5 }}>
              <div className={d.barHead} style={{ gap: 12 }}>
                <span className={d.barLabel}>{m.label}</span>
                <b className={d.barValue} style={{ color: m.color }}>
                  {m.text}
                </b>
              </div>
              <div className={`${d.track} ${d.trackTall}`}>
                <div className={d.fill} style={{ width: m.width, background: m.color }} />
              </div>
            </div>
          ))}
        </div>

        <span className={d.subTitle} style={{ marginTop: 6 }}>
          Градостроительные ограничения
        </span>
        <div className={d.limits}>
          {LAND_LIMITS.map((l) => (
            <div key={l.t} className={d.limit}>
              <span className={d.limitText}>{l.t}</span>
              <span className={d.badge}>{l.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
