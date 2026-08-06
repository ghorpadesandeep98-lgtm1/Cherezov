import Image from 'next/image';
import styles from './Hero.module.css';

const STATS = [
  { value: '300+', label: 'проектов' },
  { value: '8 млн м²', label: 'просчитанной недвижимости' },
  { value: '11', label: 'регионов' },
];

export function Hero() {
  return (
    <section id="top" className={styles.section}>
      <Image
        src="/assets/renders/hero-aerial.png"
        alt="Аэросъёмка: участок и построенный квартал"
        fill
        priority
        sizes="100vw"
        className={styles.render}
      />
      <div className={styles.scrim} />
      <div className={styles.ghost} aria-hidden="true">
        культура девелопмента
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            бюро земельных возможностей
          </span>

          <h1 className={styles.title}>
            Земля — это ещё не актив.{' '}
            <span className={styles.titleAccent}>
              <br />
              Активом её делает правильный девелопмент
            </span>
          </h1>

          <p className={styles.lead}>
            Калькулятор девелопера превращает участок в решение: показывает потенциал, экономику и
            риски до старта.
          </p>

          <div className={styles.buttons}>
            <a href="#form" className={styles.primary}>
              Запросить демо <span className={styles.primaryArrow}>↗</span>
            </a>
            <a href="#screen" className={styles.secondary}>
              Посмотреть интерфейс
            </a>
          </div>
        </div>

        <div className={styles.stats}>
          {STATS.map((s) => (
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
