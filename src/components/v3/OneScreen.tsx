'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SCENARIOS, TABS, insightFor, type TabId } from '@/data/v3/calculator';
import { DecisionPanel } from './calculator/DecisionPanel';
import { EconPanel } from './calculator/EconPanel';
import { LandPanel } from './calculator/LandPanel';
import { ProductPanel } from './calculator/ProductPanel';
import { ScenariosPanel } from './calculator/ScenariosPanel';
import styles from './OneScreen.module.css';

/** Габариты сцены интерфейса: она рисуется в пикселях и целиком масштабируется. */
const STAGE_HEIGHT = 840;
const STAGE_WIDTH = 1169;
/** Ниже этой ширины макбук прячется, а сцена листается по горизонтали. */
const NARROW = 820;

export function OneScreen() {
  const [tab, setTab] = useState<TabId>('land');
  const [scenName, setScenName] = useState(SCENARIOS[0].name);
  const [atEnd, setAtEnd] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS.find((r) => r.name === scenName) ?? SCENARIOS[0];
  const insight = insightFor(tab, scenario);

  /* Сцена фиксированного размера вписывается в экран макбука масштабированием:
     так интерфейс остаётся пропорциональным на любой ширине окна. */
  useEffect(() => {
    const box = boxRef.current;
    const stage = stageRef.current;
    if (!box || !stage) return;

    let lastBoxHeight = '';

    const apply = () => {
      if (window.innerWidth < NARROW) {
        const scale = Math.max(Math.min(box.clientWidth / 620, 1), 0.5);
        stage.style.width = `${STAGE_WIDTH}px`;
        stage.style.transform = `scale(${scale})`;
        stage.style.marginRight = `${Math.round(-STAGE_WIDTH * (1 - scale))}px`;
        stage.style.marginBottom = `${Math.round(-STAGE_HEIGHT * (1 - scale))}px`;
        const height = `${Math.round(STAGE_HEIGHT * scale)}px`;
        if (height !== lastBoxHeight) {
          lastBoxHeight = height;
          box.style.height = height;
        }
        return;
      }

      if (lastBoxHeight) {
        lastBoxHeight = '';
        box.style.height = '';
      }
      stage.style.marginRight = '';
      stage.style.marginBottom = '';

      // Ширину сцены подбираем под пропорции экрана, чтобы не оставалось полей.
      const width = Math.max(
        1060,
        Math.min(1500, Math.round((STAGE_HEIGHT * box.clientWidth) / box.clientHeight)),
      );
      const scale = Math.min(box.clientWidth / width, box.clientHeight / STAGE_HEIGHT, 1.6);
      stage.style.width = `${width}px`;
      stage.style.transform = `translate(${(box.clientWidth - width * scale) / 2}px,0) scale(${scale})`;
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(box);
    window.addEventListener('resize', apply);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  const onScroll = useCallback(() => {
    const box = boxRef.current;
    if (box) setAtEnd(box.scrollLeft >= box.scrollWidth - box.clientWidth - 4);
  }, []);

  const nudge = () => {
    const box = boxRef.current;
    if (!box) return;
    const max = box.scrollWidth - box.clientWidth;
    box.scrollTo({ left: atEnd ? 0 : Math.min(box.scrollLeft + box.clientWidth * 0.85, max), behavior: 'smooth' });
  };

  return (
    <section id="screen" className={styles.section}>
      <div className={styles.plate}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.body}>
          <div className={styles.head}>
            <h2 className={styles.title}>
              <span className={styles.titleLight}>Один экран</span>
              <span className={styles.titleAccent}>вся логика</span>
            </h2>
            <p className={styles.lead}>
              Демонстрационная модель условного проекта. Все значения приведены для показа логики
              расчёта.
            </p>
          </div>

          <div className={styles.stageWrap}>
            <span className={styles.hint}>Листайте, чтобы посмотреть интерфейс →</span>

            <div className={styles.frame}>
              <button
                type="button"
                aria-label="Показать правую часть интерфейса"
                className={styles.swipe}
                onClick={nudge}
              >
                {atEnd ? '←' : '→'}
              </button>

              {/* Рамка макбука — часть иллюстрации, поэтому обычный img поверх сцены. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/v3/macbook.png"
                alt="MacBook с интерфейсом калькулятора"
                className={styles.macbook}
              />

              <div ref={boxRef} className={styles.screen} onScroll={onScroll}>
                <span className={styles.sheen} aria-hidden="true" />

                <div ref={stageRef} className={styles.stage}>
                  <div className={styles.topbar}>
                    <span className={styles.appName}>Калькулятор девелопера</span>
                    <span className={styles.appProject}>Проект «Северный квартал» · г. Москва, САО</span>
                    <span className={styles.appStatus}>
                      <span className={styles.appStatusDot} />
                      Модель актуальна · обновлено сегодня
                    </span>
                  </div>

                  <div className={styles.tabs}>
                    {TABS.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        aria-pressed={t.value === tab}
                        onClick={() => setTab(t.value)}
                        className={t.value === tab ? styles.tabActive : styles.tab}
                      >
                        {t.label}
                      </button>
                    ))}
                    <span className={styles.export}>↓ Экспорт</span>
                  </div>

                  <div className={styles.content}>
                    {tab === 'land' && <LandPanel />}
                    {tab === 'product' && <ProductPanel />}
                    {tab === 'econ' && <EconPanel scenario={scenario} />}
                    {tab === 'scen' && <ScenariosPanel current={scenName} onSelect={setScenName} />}
                    {tab === 'decision' && <DecisionPanel scenario={scenario} />}
                  </div>

                  <div className={styles.insight}>
                    <div className={styles.insightCopy}>
                      <span className={styles.insightTitle}>{insight.t}</span>
                      <span className={styles.insightText}>{insight.d}</span>
                    </div>
                    <div className={styles.insightKpis}>
                      {insight.k.map((k) => (
                        <div key={k.k} className={styles.insightKpi}>
                          <span className={styles.insightKpiK}>{k.k}</span>
                          <b className={styles.insightKpiV}>{k.v}</b>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <span className={styles.disclaimer}>
            Все данные и показатели на экране — демонстрационные и приведены для примера расчёта. Они
            не являются инвестиционной рекомендацией.
          </span>

          <div className={styles.ctas}>
            <a href="#form" className={styles.ctaPrimary}>
              Показать демо на моём участке
            </a>
            <a href="#form" className={styles.ctaGhost}>
              Скачать пример итогового отчёта
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
