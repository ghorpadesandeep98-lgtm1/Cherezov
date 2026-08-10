'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { LIFECYCLE } from '@/data/v3/content';
import styles from './Lifecycle.module.css';

/** Пять этапов проекта: три наших до старта стройки и два — заказчика. */
export function Lifecycle() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (track) setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  }, []);

  const nudge = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    track.scrollTo({
      left: atEnd ? 0 : Math.min(track.scrollLeft + track.clientWidth * 0.9, max),
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Где мы подключаемся{' '}
          <span className={styles.titleAccent}>
            к проекту
            <span className={styles.titleDot} aria-hidden="true" />
          </span>
        </h2>

        <div className={styles.carousel}>
          <button
            type="button"
            aria-label="Показать следующий этап"
            className={styles.arrow}
            onClick={nudge}
          >
            {atEnd ? '←' : '→'}
          </button>

          <div ref={trackRef} className={styles.track} onScroll={onScroll}>
            {LIFECYCLE.map((stage) => (
              <div key={stage.title} className={stage.ours ? styles.card : styles.cardMuted}>
                <span className={stage.ours ? styles.cardTitle : styles.cardTitleMuted}>
                  {stage.title}
                </span>
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  width={420}
                  height={420}
                  sizes="(max-width: 719px) 76vw, 260px"
                  className={stage.ours ? styles.cardImage : styles.cardImageMuted}
                />
                <div className={stage.ours ? styles.cardLines : styles.cardLinesMuted}>
                  {stage.lines.map((line) => (
                    <span key={line} className={styles.cardLine}>
                      {line}
                    </span>
                  ))}
                </div>

                {stage.result && (
                  <>
                    <div className={styles.result}>
                      <div className={styles.resultLabel}>РЕЗУЛЬТАТ</div>
                      <div className={styles.resultText}>{stage.result}</div>
                    </div>
                    <span className={styles.badge}>
                      <span className={styles.badgeDot} />
                      Наша экспертиза
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.notes}>
          <div className={styles.noteOurs}>
            <div className={styles.braceOurs} />
            <span className={styles.noteTextOurs}>
              Наша зона ответственности — три этапа до старта строительства, где создаётся вся
              экономика проекта.
            </span>
          </div>
          <div className={styles.note}>
            <div className={styles.brace} />
            <span className={styles.noteText}>
              Строительство и продажи ведёт заказчик. Мы можем сопровождать пересчёт модели и
              ключевые решения.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
