'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  COSTS,
  FLATS,
  SCENARIOS,
  SENSITIVITY,
  TABS,
  econKpis,
  insightFor,
  type TabValue,
} from '@/data/calculator';
import styles from './OneScreen.module.css';

export function OneScreen() {
  const [tab, setTab] = useState<TabValue>('land');
  const [scen, setScen] = useState('Базовый');

  const cur = SCENARIOS.find((r) => r.name === scen) || SCENARIOS[0];
  const insight = insightFor(tab, cur);

  return (
    <section id="screen" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.glow} />

        <div className={styles.content}>
          <div className={styles.head}>
            <div className={styles.headCopy}>
              <h2 className={styles.title}>
                Один экран.
                <br />
                <span className={styles.titleAccent}>Вся логика</span>
              </h2>
              <p className={styles.lead}>
                Участок, продукт, экономика, сценарии и решение — без десятков таблиц.
              </p>
            </div>
            <span className={styles.headTag}>Калькулятор девелопера</span>
          </div>

          <div className={styles.laptop}>
            <div className={styles.lid}>
              <div className={styles.notch}>
                <span className={styles.camera} />
              </div>

              <div className={styles.screen}>
                <div className={styles.topbar}>
                  <span className={styles.appName}>Калькулятор девелопера</span>
                  <span className={styles.project}>
                    Проект «Северный квартал» · г. Москва, САО
                  </span>
                  <span className={styles.status}>
                    <span className={styles.statusDot} />
                    Модель актуальна · обновлено сегодня
                  </span>
                </div>

                <div className={styles.tabs}>
                  {TABS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTab(t.value)}
                      aria-pressed={tab === t.value}
                      className={tab === t.value ? styles.tabActive : styles.tab}
                    >
                      {t.label}
                    </button>
                  ))}
                  <span className={styles.export}>↓ Экспорт</span>
                </div>

                <div className={styles.panels}>
                  {tab === 'land' && (
                    <div className={styles.card}>
                      <div className={styles.cardHead}>
                        <span className={styles.cardTitle}>Участок</span>
                        <span className={styles.chip}>Подобран</span>
                      </div>
                      <Image
                        src="/assets/renders/plot-pin.jpg"
                        alt="Карта участка"
                        width={640}
                        height={480}
                        className={styles.shot}
                        sizes="(max-width: 620px) 90vw, 300px"
                      />
                      <div className={styles.specs}>
                        Площадь участка · 28 450 м²
                        <br />
                        Адрес · г. Москва, САО
                        <br />
                        Территориальная зона · Ж-4
                        <br />
                        ВРИ · Многоквартирные дома
                        <br />
                        Потенциал застройки (GBA) · 78 600 м²
                      </div>
                    </div>
                  )}

                  {tab === 'product' && (
                    <>
                      <div className={styles.card}>
                        <div className={styles.cardHead}>
                          <span className={styles.cardTitle}>Продукт</span>
                          <span className={styles.chip}>Оптимальный</span>
                        </div>
                        <Image
                          src="/assets/renders/masterplan.jpg"
                          alt="Квартал"
                          width={640}
                          height={480}
                          className={styles.shot}
                          sizes="(max-width: 620px) 90vw, 300px"
                        />
                        <div className={styles.specs}>
                          Класс · Комфорт+
                          <br />
                          Тип · Квартиры
                          <br />
                          GBA · 78 600 м²
                          <br />
                          Квартир · 1 122 шт.
                        </div>
                      </div>

                      <div className={styles.card}>
                        <span className={styles.cardTitle}>Квартирография</span>
                        <div className={styles.tableHead}>
                          <span>ТИП</span>
                          <span>КОЛ-ВО</span>
                          <span>СРЕДНЯЯ</span>
                          <span>ЦЕНА</span>
                        </div>
                        {FLATS.map((f) => (
                          <div key={f.t} className={styles.tableRow}>
                            <span className={styles.tableRowKey}>{f.t}</span>
                            <span>{f.n}</span>
                            <span>{f.s}</span>
                            <span>{f.p}</span>
                          </div>
                        ))}
                        <span className={styles.note}>Продаваемая площадь · 52 380 м²</span>
                      </div>
                    </>
                  )}

                  {/* Финансовый результат виден на любой вкладке */}
                  <div className={styles.result}>
                    <span className={styles.resultTitle}>Финансовый результат</span>
                    <span className={styles.resultScen}>Сценарий «{cur.name}»</span>
                    <div className={styles.resultValue}>{cur.profit}</div>
                    <div className={styles.resultSpecs}>
                      IRR проекта · {cur.irr}
                      <br />
                      NPV проекта · {cur.npv}
                      <br />
                      Выручка · {cur.rev}
                      <br />
                      Срок проекта · 31 мес.
                      <br />
                      Инвестиции · 2,68 млрд ₽
                    </div>
                  </div>
                </div>

                {tab === 'econ' && (
                  <div className={styles.panelsWide}>
                    <div className={styles.card}>
                      <span className={styles.cardTitle}>Экономика проекта</span>
                      <div className={styles.kpiGrid}>
                        {econKpis(cur).map((e) => (
                          <div key={e.k} className={styles.kpi}>
                            <span className={styles.kpiLabel}>{e.k}</span>
                            <b className={styles.kpiValue}>{e.v}</b>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.card}>
                      <span className={styles.cardTitle}>Структура затрат</span>
                      {COSTS.map((c) => (
                        <div key={c.label} className={styles.meter}>
                          <div className={styles.meterHead}>
                            <span className={styles.meterLabel}>{c.label}</span>
                            <b className={styles.meterValue}>{c.text}</b>
                          </div>
                          <div className={styles.track}>
                            <div className={styles.fill} style={{ width: c.width }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'decision' && (
                  <div className={styles.decision}>
                    <div className={styles.decisionCopy}>
                      <span className={styles.decisionKicker}>РЕШЕНИЕ</span>
                      <span className={styles.decisionTitle}>
                        Проект проходит по доходности — покупать участок
                      </span>
                      <span className={styles.decisionText}>
                        IRR выше порога инвесткомитета (18 %), запас прочности по цене — 11 %. Риски
                        по темпу продаж контролируемые.
                      </span>
                    </div>
                    <div className={styles.decisionKpis}>
                      <div className={styles.decisionKpi}>
                        <span className={styles.kpiLabel}>Порог IRR</span>
                        <b className={styles.kpiValue}>18,0 %</b>
                      </div>
                      <div className={styles.decisionKpi}>
                        <span className={styles.kpiLabel}>Факт IRR</span>
                        <b className={styles.decisionKpiValueAccent}>{cur.irr}</b>
                      </div>
                      <div className={styles.decisionKpi}>
                        <span className={styles.kpiLabel}>Срок выхода</span>
                        <b className={styles.kpiValue}>31 мес.</b>
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'scen' && (
                  <div className={styles.panelsWide}>
                    <div className={`${styles.card} ${styles.scenScroll}`}>
                      <span className={styles.cardTitle}>Сценарии</span>
                      <div className={styles.scenTable}>
                        <div className={styles.scenHead}>
                          <span>СЦЕНАРИЙ</span>
                          <span>ВЫРУЧКА</span>
                          <span>ПРИБЫЛЬ</span>
                          <span>IRR</span>
                          <span>NPV</span>
                        </div>
                        {SCENARIOS.map((s) => {
                          const on = s.name === scen;
                          return (
                            <button
                              key={s.name}
                              type="button"
                              onClick={() => setScen(s.name)}
                              aria-pressed={on}
                              className={on ? styles.scenRowActive : styles.scenRow}
                            >
                              <span className={on ? styles.scenNameActive : styles.scenName}>
                                {s.name}
                              </span>
                              <span>{s.rev}</span>
                              <span>{s.profit}</span>
                              <span>{s.irr}</span>
                              <span>{s.npv}</span>
                            </button>
                          );
                        })}
                      </div>
                      <span className={styles.note}>
                        Нажмите на сценарий — показатели пересчитаются
                      </span>
                    </div>

                    <div className={styles.card}>
                      <span className={styles.cardTitle}>Чувствительность (IRR)</span>
                      {SENSITIVITY.map((k) => (
                        <div key={k.label} className={styles.meter}>
                          <div className={styles.meterHead}>
                            <span className={styles.meterLabelLg}>{k.label}</span>
                            <b className={styles.meterValueLg}>{k.text}</b>
                          </div>
                          <div className={styles.track}>
                            <div className={styles.fill} style={{ width: k.width }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.insight}>
                  <div className={styles.insightCopy}>
                    <span className={styles.insightTitle}>{insight.t}</span>
                    <span className={styles.insightText}>{insight.d}</span>
                  </div>
                  <div className={styles.insightKpis}>
                    {insight.k.map((ik) => (
                      <div key={ik.k} className={styles.insightKpi}>
                        <span className={styles.insightKpiLabel}>{ik.k}</span>
                        <b className={styles.insightKpiValue}>{ik.v}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.hinge} />
            <div className={styles.base}>
              <div className={styles.notchBase} />
            </div>
            <div className={styles.contactShadow} />
          </div>
        </div>
      </div>
    </section>
  );
}
