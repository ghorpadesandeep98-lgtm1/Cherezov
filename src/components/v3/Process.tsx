'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PROCESS_STEPS } from '@/data/v3/content';
import styles from './Process.module.css';

const CURVE = 'M40 14 C 300 14, 380 76, 600 76 C 820 76, 900 14, 1160 14';

/**
 * Пять шагов работы. На широком экране шаг подсвечивается по наведению,
 * на узком — сам следует за скроллом.
 */
export function Process() {
  const [step, setStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 719px)');
    if (!narrow.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index > -1) setStep(index);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onHover = (index: number) => {
    if (!window.matchMedia('(max-width: 719px)').matches) setStep(index);
  };

  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <span className={styles.overline}>как проходит работа</span>
            <h2 className={styles.title}>
              От участка — к решению, которое{' '}
              <span className={styles.titleAccent}>сходится в цифрах</span>.
            </h2>
          </div>
          <p className={styles.headLead}>
            Мы одновременно рассматриваем продукт, архитектуру и экономику. Поэтому решения не
            противоречат друг другу и не требуют дорогостоящей переделки на следующем этапе.
          </p>
        </div>

        <div className={styles.steps}>
          {PROCESS_STEPS.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              onMouseEnter={() => onHover(i)}
              className={i === step ? styles.stepActive : styles.step}
            >
              <span className={styles.stepNum}>{s.n}</span>
              <b className={styles.stepTitle}>{s.title}</b>
              <p className={styles.stepText}>{s.text}</p>
              <div className={styles.stepResult}>
                <span className={styles.stepResultLabel}>результат</span>
                <span className={styles.stepResultText}>{s.result}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.funnel}>
          <svg viewBox="0 0 1200 90" preserveAspectRatio="none" className={styles.curve} aria-hidden="true">
            <path d={CURVE} fill="none" stroke="rgba(15,95,60,.14)" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d={CURVE}
              pathLength={1}
              fill="none"
              stroke="var(--kd-green-mid)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="1"
              strokeDashoffset={1 - (step + 1) / PROCESS_STEPS.length}
              className={styles.curveLive}
            />
          </svg>

          <Image
            src="/assets/v3/funnel.png"
            alt="Файлы сходятся в «Калькулятор девелопера»"
            width={1520}
            height={340}
            sizes="(max-width: 860px) 100vw, 760px"
            className={styles.funnelImage}
          />
          <span className={styles.funnelNote}>Каждый этап добавляет данные в одну модель проекта</span>
        </div>
      </div>
    </section>
  );
}
