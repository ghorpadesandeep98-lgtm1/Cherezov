import Image from 'next/image';
import { HERO_STATS } from '@/data/v3/content';
import styles from './Hero.module.css';

/** Первый экран: аэросъёмка, обещание и четыре плитки с масштабом практики. */
export function Hero() {
  return (
    <section id="top" className={styles.section}>
      <Image
        src="/assets/v3/hero-aerial.jpg"
        alt="Аэросъёмка: участок и построенный квартал"
        fill
        priority
        sizes="100vw"
        className={styles.render}
      />
      <div className={styles.scrim} />
      <div className={styles.watermark} aria-hidden="true">
        культура девелопмента
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Оценка девелоперского потенциала участка
          </span>

          <h1 className={styles.title}>
            Проверьте потенциал участка{' '}
            <span className={styles.titleAccent}>до покупки и проектирования</span>
          </h1>

          <p className={styles.lead}>
            Собираем землю, продукт, экономику и риски в одной модели — и готовим решение, которое
            можно защитить перед инвестором, банком и городом.
          </p>

          <div className={styles.buttons}>
            <a href="#form" className={styles.primary}>
              Разобрать мой участок <span className={styles.primaryArrow}>↗</span>
            </a>
            <a href="#screen" className={styles.secondary}>
              Посмотреть пример результата
            </a>
          </div>
        </div>

        <div className={styles.stats}>
          {HERO_STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
          <div className={styles.statAccent}>
            <div className={styles.statAccentValue}>100 млрд ₽</div>
            <div className={styles.statAccentLabel}>потенциала</div>
          </div>
        </div>
      </div>
    </section>
  );
}
