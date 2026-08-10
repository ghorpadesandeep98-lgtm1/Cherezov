import { QUESTIONS } from '@/data/v3/content';
import { Orb, type OrbTone } from './Orb';
import styles from './Questions.module.css';

const CARD_TONE: Record<string, string> = {
  white: styles.cardWhite,
  veil: styles.cardVeil,
  brand: styles.cardBrand,
};

/** Пять вопросов, на которые нужно ответить до старта проекта. */
export function Questions() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.overline}>культура девелопмента</div>

        <div className={styles.row}>
          <div className={styles.lead}>
            <span className={styles.orbBig} aria-hidden="true">
              <span className={styles.orbRing} />
            </span>
            <span className={styles.orbSmall} aria-hidden="true">
              <span className={styles.orbRing} />
            </span>
            <h2 className={styles.leadTitle}>
              Пять вопросов, на которые нужно ответить{' '}
              <span className={styles.leadTitleAccent}>до старта проекта</span>
            </h2>
            <p className={styles.leadText}>
              Пока ответов нет, любое решение по участку — ставка. Мы отвечаем на все пять до того,
              как деньги зашли в проект.
            </p>
          </div>

          <div className={styles.aside}>
            <span className={styles.asideOrb} aria-hidden="true">
              <span className={styles.orbRing} />
            </span>
            <div className={styles.asideTop}>
              <span className={styles.asideOverline}>культура девелопмента</span>
              <span className={styles.asideTitle}>
                Команда предпроектной оценки и разработки девелоперских решений
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

          <div className={styles.grid}>
            {QUESTIONS.map((q) => (
              <div key={q.n} className={`${styles.card} ${CARD_TONE[q.tone]}`}>
                <Orb tone={q.orb as OrbTone} />
                <span className={q.tone === 'brand' ? styles.cardNumBrand : styles.cardNum}>
                  {q.n}
                </span>
                <span className={styles.cardTitle}>{q.title}</span>
                <span className={q.tone === 'brand' ? styles.cardTextBrand : styles.cardText}>
                  {q.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
