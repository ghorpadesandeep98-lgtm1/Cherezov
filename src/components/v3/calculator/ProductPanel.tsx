import {
  COMPETITORS,
  FLATS,
  PLAN_IMPACT,
  PLAN_RULES,
  PREMIUM,
  PRICE_RAMP,
  PROD_FOOT,
  PROD_TOTALS,
} from '@/data/v3/calculator';
import d from './Dashboard.module.css';
import s from './ProductPanel.module.css';

/** Вкладка «Продукт»: концепция, линейка конкурентов и квартирография. */
export function ProductPanel() {
  return (
    <div className={d.topGrid}>
      <div className={d.cardTight}>
        <div className={d.cardHead}>
          <span className={d.cardTitle}>Продукт</span>
          <span className={d.badge}>Оптимальный</span>
        </div>

        <div className={d.split}>
          <div className={d.splitLeft} style={{ flex: '1 1 44%', gap: 7 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/v3/quarter.jpg" alt="Квартал" className={d.thumb} style={{ height: 80 }} />
            <div className={d.meta}>
              Комфорт+ · GBA 78 600 м²
              <br />1 122 квартиры · 6 корпусов
            </div>
          </div>
          <div className={d.splitRight} style={{ flex: '1 1 56%', gap: 5 }}>
            <span className={d.overline}>ЛОГИКА ПЛАНИРОВОК</span>
            {PLAN_RULES.map((r) => (
              <div key={r.t} className={s.rule}>
                <b className={s.ruleTitle}>{r.t}</b>
                <span className={s.ruleText}>{r.d}</span>
              </div>
            ))}
          </div>
        </div>

        <span className={d.overline}>ЛИНЕЙКА КОНКУРЕНТОВ, ₽/М²</span>
        <div className={d.bars} style={{ gap: 7 }}>
          {COMPETITORS.map((c) => (
            <div key={c.label} className={d.bar}>
              <div className={d.barHead}>
                <span className={d.barLabel}>{c.label}</span>
                <b className={d.barValue} style={{ color: c.color }}>
                  {c.text}
                </b>
              </div>
              <div className={d.track}>
                <div className={d.fill} style={{ width: c.width, background: c.color }} />
              </div>
            </div>
          ))}
        </div>

        <span className={d.overline} style={{ marginTop: 2 }}>
          ЦЕНА ПО СТАДИЯМ ГОТОВНОСТИ, ТЫС. ₽/М²
        </span>
        <div className={d.columns}>
          {PRICE_RAMP.map((p) => (
            <div key={p.k} className={d.column}>
              <b className={d.columnValue}>{p.v}</b>
              <div className={d.columnBar} style={{ height: p.h, background: p.color }} />
              <span className={d.columnKey}>{p.k}</span>
            </div>
          ))}
        </div>

        <div className={d.foot}>
          {PROD_FOOT.map((f) => (
            <div key={f.k} className={d.footCellTight}>
              <span className={d.footKSmall}>{f.k}</span>
              <b className={d.footVSmall}>{f.v}</b>
            </div>
          ))}
        </div>
      </div>

      <div className={d.cardTight} style={{ gap: 8 }}>
        <span className={d.cardTitle}>Квартирография</span>

        <div className={s.flatsHead}>
          <span>ТИП</span>
          <span>ШТ.</span>
          <span>СРЕДНЯЯ</span>
          <span>₽/М²</span>
        </div>
        {FLATS.map((f) => (
          <div key={f.t} className={s.flatsRow}>
            <span className={s.flatsType}>{f.t}</span>
            <span>{f.n}</span>
            <span>{f.s}</span>
            <span>{f.p}</span>
          </div>
        ))}
        <span className={d.hint} style={{ fontSize: 12 }}>
          Продаваемая площадь · 52 380 м² · выход 67 % от GBA
        </span>

        <span className={d.overline} style={{ marginTop: 2 }}>
          ЧТО ДАЁТ ПЛАНИРОВОЧНОЕ РЕШЕНИЕ
        </span>
        <div className={d.bars}>
          {PLAN_IMPACT.map((p) => (
            <div key={p.label} className={d.thinBar}>
              <span className={d.thinBarLabel}>{p.label}</span>
              <div className={d.thinBarTrack}>
                <div className={d.thinBarFill} style={{ width: p.width }} />
              </div>
              <b className={d.thinBarValue}>{p.text}</b>
            </div>
          ))}
        </div>
        <span className={d.note}>
          Разница между первой и утверждённой версией квартирографии — на одном и том же участке и
          бюджете
        </span>

        <span className={d.overline} style={{ marginTop: 2 }}>
          ЧТО ДАЁТ ПРЕМИЮ К ЦЕНЕ, ₽/М²
        </span>
        <div className={d.bars}>
          {PREMIUM.map((p) => (
            <div key={p.label} className={d.thinBar}>
              <span className={d.thinBarLabel}>{p.label}</span>
              <div className={d.thinBarTrack}>
                <div className={`${d.thinBarFill} ${d.thinBarFillSoft}`} style={{ width: p.width }} />
              </div>
              <b className={d.thinBarValue}>{p.text}</b>
            </div>
          ))}
        </div>

        <div className={s.totals}>
          {PROD_TOTALS.map((t) => (
            <div key={t.k} className={d.footCellTight}>
              <span className={d.footKSmall}>{t.k}</span>
              <b className={d.footVSmall}>{t.v}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
