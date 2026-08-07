import styles from './SectionsTable.module.css';

const ROWS = [
  { num: '01', name: 'Земля', question: 'Стоит ли покупать участок?', metric: '28 450 м²' },
  { num: '02', name: 'Продукт', question: 'Что именно строим?', metric: '24 600 м²' },
  {
    num: '03',
    name: 'Экономика',
    question: 'Сколько проект зарабатывает?',
    metric: '700 млн ₽',
    accent: true,
  },
  {
    num: '04',
    name: 'Сценарии',
    question: 'Что будет, если рынок изменится?',
    metric: 'IRR 18—28 %',
  },
];

export function SectionsTable() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>
            Каждый раздел ведёт <span className={styles.titleAccent}>к своему решению</span>
          </h2>
          <p className={styles.lead}>
            Не набор вкладок, а последовательность управленческого решения
          </p>
        </div>

        <div className={styles.table}>
          <div className={styles.header}>
            <span>РАЗДЕЛ</span>
            <span>НАЗВАНИЕ</span>
            <span>ВОПРОС</span>
            <span>ПОКАЗАТЕЛЬ</span>
            <span />
          </div>

          {ROWS.map((r) => (
            <div key={r.num} className={styles.body}>
              <span className={styles.num}>{r.num}</span>
              <span className={styles.name}>{r.name}</span>
              <span className={styles.question}>{r.question}</span>
              <span className={r.accent ? styles.metricAccent : styles.metric}>{r.metric}</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
