import Image from 'next/image';
import styles from './Team.module.css';

export function Team() {
  return (
    <section id="team" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.overline}>команда</span>
          <h2 className={styles.title}>
            Соединяем рынок, участок, экономику, архитектуру и проектирование{' '}
            <span className={styles.titleAccent}>в единую девелоперскую систему</span>
          </h2>

          <div className={styles.tags}>
            <span className={styles.tag}>Экспертиза</span>
            <span className={styles.tag}>Система</span>
            <span className={styles.tagAccent}>Результат</span>
          </div>

          <div className={styles.quote}>
            <span className={styles.quoteMark}>”</span>
            <span className={styles.quoteText}>
              Мы не продаём расчёт. Мы отвечаем за то, чтобы решение о проекте можно было защитить
              перед банком, инвестором и городом.
            </span>
            <span>
              <span className={styles.quoteName}>Черезов Алексей</span>
              <br />
              <span className={styles.quoteRole}>управляющий партнёр</span>
            </span>
          </div>
        </div>

        <div className={styles.photo}>
          <Image
            src="/assets/team/alexey.png"
            alt="Алексей Черезов"
            fill
            sizes="(max-width: 900px) 100vw, 620px"
            className={styles.photoImg}
          />
          <div className={styles.caption}>Алексей Черезов · управляющий партнёр</div>
        </div>
      </div>
    </section>
  );
}
