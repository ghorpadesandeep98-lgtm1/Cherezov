import { BrainCore } from './BrainCore';
import styles from './Calculator.module.css';

const STEPS = [
  { num: '01', label: 'ЗЕМЛЯ', text: 'Потенциал и цена входа' },
  { num: '02', label: 'ПРОДУКТ', text: 'Концепция и сценарии' },
  { num: '03', label: 'ЭКОНОМИКА', text: 'Финмодель и доходность', accent: true },
  { num: '04', label: 'АРХИТЕКТУРА', text: 'Проектные решения и техэкономика' },
  { num: '05', label: 'ПРОЕКТИРОВАНИЕ', text: 'Документация и РНС' },
];

export function Calculator() {
  return (
    <section id="calculator" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.stage}>
          <div className={styles.glow} />
          <BrainCore className={styles.canvas} />

          <div className={styles.copy}>
            <span className={styles.kicker}>продукт</span>
            <h2 className={styles.title}>
              Калькулятор — цифровое{' '}
              <span className={styles.titleAccent}>ядро каждого этапа проекта</span>
            </h2>
            <p className={styles.lead}>
              Единая модель данных связывает участок, продукт, экономику и проект.
            </p>
          </div>
        </div>

        <div className={styles.steps}>
          {STEPS.map((s) => (
            <div key={s.num} className={s.accent ? styles.stepAccent : styles.step}>
              <span className={s.accent ? styles.stepNumAccent : styles.stepNum}>{s.num}</span>
              <span className={s.accent ? styles.stepLabelAccent : styles.stepLabel}>{s.label}</span>
              <span className={s.accent ? styles.stepTextAccent : styles.stepText}>{s.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.model}>
          <div>
            <div className={styles.modelTitle}>Единая модель данных</div>
            <div className={styles.modelText}>
              Участок, продукт, экономика и проект — всё связано и прозрачно.
            </div>
          </div>
          <a href="#screen" className={styles.modelCta}>
            Открыть интерфейс ↗
          </a>
        </div>
      </div>
    </section>
  );
}
