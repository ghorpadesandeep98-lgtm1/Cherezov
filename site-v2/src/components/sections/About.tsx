'use client';

import { useState } from 'react';
import styles from './About.module.css';

const STAGES = [
  {
    num: '01',
    name: 'Земля',
    text: 'Границы, ГПЗУ, ограничения и предельные параметры застройки',
    tile: styles.stageWhite,
    ball: styles.ball1,
  },
  {
    num: '02',
    name: 'Продукт',
    text: 'ТЭП, квартирография, стадийность застройки',
    tile: styles.stageMint,
    ball: styles.ball2,
  },
  {
    num: '03',
    name: 'Экономика',
    text: 'Затраты, выручка, график финансирования, IRR',
    tile: styles.stageWhite,
    ball: styles.ball3,
  },
  {
    num: '04',
    name: 'Сценарии',
    text: 'Сравнение вариантов и чувствительность к допущениям',
    tile: styles.stageMint,
    ball: styles.ball4,
  },
  {
    num: '05',
    name: 'Решение',
    text: 'Один вывод, который можно защитить перед банком',
    tile: styles.stageSalad,
    ball: styles.ball5,
    accent: true,
  },
];

export function About() {
  // Наведение на любую половину крутит общий шар целиком
  const [orbSpin, setOrbSpin] = useState(false);
  const orbTransform = { transform: `rotate(${orbSpin ? 180 : 0}deg)` };
  const orbHandlers = {
    onMouseEnter: () => setOrbSpin(true),
    onMouseLeave: () => setOrbSpin(false),
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.overline}>культура девелопмента</div>

        <div className={styles.grid}>
          <div className={styles.lead}>
            <div className={styles.orbBigLight} style={orbTransform} {...orbHandlers}>
              <span className={styles.meridian} />
            </div>
            <div className={styles.orbSmall}>
              <span className={styles.meridianSmall} />
            </div>

            <h2 className={styles.leadTitle}>
              Мы собираем участок, продукт и экономику в{' '}
              <span className={styles.leadTitleAccent}>одно решение</span>
            </h2>
            <p className={styles.leadText}>
              Fee-девелопер и системный интегратор. Проверяем землю, считаем продукт и экономику,
              сравниваем сценарии — и доводим проект до вывода, который выдерживает проверку банка,
              инвестора и государства.
            </p>
          </div>

          <div className={styles.aside}>
            <div className={styles.orbBigDark} style={orbTransform} {...orbHandlers}>
              <span className={styles.meridian} />
            </div>

            <div className={styles.asideTop}>
              <span className={styles.asideKicker}>fee-девелопер</span>
              <span className={styles.asideTitle}>
                Земля, экономика, градрегулирование и банк — в одной модели
              </span>
            </div>
            <div className={styles.asideBottom}>
              <span className={styles.asideNumber}>5</span>
              <span className={styles.asideCaption}>
                шагов до решения,
                <br />
                которое можно защитить
              </span>
            </div>
          </div>

          <div className={styles.stages}>
            {STAGES.map((s) => (
              <div key={s.num} className={s.tile}>
                <span className={s.ball}>
                  <span className={styles.ballHighlight} />
                  <span className={styles.ballMeridian} />
                </span>
                <span className={s.accent ? styles.stageNumOnSalad : styles.stageNum}>{s.num}</span>
                <span className={styles.stageName}>{s.name}</span>
                <span className={s.accent ? styles.stageTextOnSalad : styles.stageText}>
                  {s.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
