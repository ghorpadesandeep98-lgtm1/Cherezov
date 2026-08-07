import styles from './BeforeAfter.module.css';

const BEFORE = [
  { v: '19 %', l: 'ROI' },
  { v: '0,3', l: 'NPV, млрд ₽' },
  { v: '8 %', l: 'IRR' },
];

const AFTER = [
  { v: '47 %', l: 'ROI' },
  { v: '1,4', l: 'NPV, млрд ₽' },
  { v: '24 %', l: 'IRR' },
];

export function BeforeAfter() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>
            Калькулятор показывает не цифры.{' '}
            <span className={styles.titleAccent}>Он помогает выбрать решение</span>
          </h2>
          <p className={styles.lead}>
            Участок зашёл как идея. Вышел как понятное управленческое решение.
          </p>
        </div>

        <div className={styles.pair}>
          <div className={styles.before}>
            <span className={styles.cardTitle}>Было</span>
            <div className={styles.stats}>
              {BEFORE.map((s) => (
                <div key={s.l}>
                  <div className={styles.statValue}>{s.v}</div>
                  <div className={styles.statLabel}>{s.l}</div>
                </div>
              ))}
            </div>
            <span className={styles.tag}>Базовая гипотеза</span>
          </div>

          <div className={styles.after}>
            <span className={styles.cardTitleAccent}>Стало</span>
            <div className={styles.stats}>
              {AFTER.map((s) => (
                <div key={s.l}>
                  <div className={styles.statValueAccent}>{s.v}</div>
                  <div className={styles.statLabelLight}>{s.l}</div>
                </div>
              ))}
            </div>
            <span className={styles.tagAccent}>После перерасчёта сценария</span>
          </div>
        </div>

        <div className={styles.decision}>
          <span className={styles.decisionLabel}>Принятое решение:</span>
          <span className={styles.decisionText}>
            изменить концепцию, повысить плотность и скорректировать продукт.
          </span>
        </div>

        <div className={styles.outcomes}>
          <div className={styles.outcome}>Слабые места видны</div>
          <div className={styles.outcome}>Сценарии сравнимы</div>
          <div className={styles.outcomeAccent}>Решение можно защитить</div>
        </div>
      </div>
    </section>
  );
}
