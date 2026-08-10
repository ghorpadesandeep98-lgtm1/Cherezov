import { AUDIENCES, COMPARE_ROWS } from '@/data/v3/content';
import styles from './Audiences.module.css';

const CARD_TONE: Record<string, string> = {
  bright: styles.cardBright,
  white: styles.cardWhite,
  forest: styles.cardForest,
};

/** Аудитории и сравнение «Excel-модель против модели проекта». */
export function Audiences() {
  return (
    <section id="audience" className={styles.section}>
      <div className={styles.plate}>
        <div className={styles.dots} aria-hidden="true" />
        <div className={styles.sheet} aria-hidden="true" />
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.head}>
          <span className={styles.overline}>
            <span className={styles.overlineDot} />
            аудитории
          </span>
          <h2 className={styles.title}>
            Для тех, кто отвечает за деньги.
            <br />А не за <span className={styles.titleAccent}>файл Excel</span>
          </h2>
          <p className={styles.lead}>
            Превращаем разрозненные расчёты в прозрачную модель, с которой работает вся проектная
            команда.
          </p>
        </div>

        <div className={styles.cards}>
          {AUDIENCES.map((a, i) => (
            <div
              key={a.title}
              className={`${styles.card} ${CARD_TONE[a.tone]} ${i % 2 === 1 ? styles.cardDropped : ''}`}
            >
              <span className={styles.cardDotWrap}>
                <span className={styles.cardDot} />
              </span>
              <b className={styles.cardTitle}>{a.title}</b>
              <span className={styles.cardText}>{a.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.compareOverline}>Сравнение</div>

        <div className={styles.table}>
          <div className={styles.band} aria-hidden="true" />

          <div className={styles.tableHead}>
            <span className={styles.tableHeadKey}>критерий</span>
            <span className={styles.tableHeadExcel}>Excel-модель</span>
            <span className={styles.tableHeadModel}>
              <span className={styles.tableHeadModelDot} />
              <span className={styles.labelWide}>Модель «Калькулятор девелопера»</span>
              <span className={styles.labelNarrow}>Калькулятор девелопера</span>
            </span>
          </div>

          {COMPARE_ROWS.map((row) => (
            <div key={row.key} className={styles.tableRow}>
              <span className={styles.rowKey}>{row.key}</span>
              <span className={styles.rowExcel}>
                <span className={styles.rowDash} />
                {row.excel}
              </span>
              <span className={styles.rowModel}>
                <span className={styles.rowCheck}>✓</span>
                {row.model}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
