import Image from 'next/image';
import { CASE_STATS, CASE_STEPS } from '@/data/v3/content';
import styles from './CaseStudy.module.css';

/** Кейс в Новосибирске: 4,5 га и +1,2 млрд ₽ к финансовому результату. */
export function CaseStudy() {
  return (
    <section id="case" className={styles.section}>
      <div className={styles.hero}>
        <Image
          src="/assets/v3/case-novosibirsk.jpg"
          alt="Квартал в Новосибирске с высоты"
          fill
          sizes="100vw"
          className={styles.render}
        />
        <div className={styles.scrim} />

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              реальный кейс · Новосибирск
            </span>
            <h2 className={styles.title}>
              4,5 га. <br />
              Более <span className={styles.titleAccent}>+1,2 млрд ₽</span> <br />к финансовому
              результату
            </h2>
          </div>
          <p className={styles.heroLead}>
            Даже небольшой участок может скрывать большой резерв стоимости. В проекте в Новосибирске
            мы пересобрали девелоперскую модель и нашли сценарий, который улучшил финансовый
            результат более чем на 1,2 млрд ₽.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.stats}>
          {CASE_STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <b className={s.accent ? styles.statValueAccent : styles.statValue}>{s.value}</b>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.steps}>
          {CASE_STEPS.map((s) => (
            <div key={s.title} className={styles.step}>
              <b className={styles.stepTitle}>{s.title}</b>
              <span className={styles.stepText}>{s.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.closing}>
          <p className={styles.closingLead}>
            Масштаб результата определяет не размер участка, а качество решений, принятых до начала
            строительства.
          </p>
          <div className={styles.closingSide}>
            <span className={styles.closingText}>
              Разберём ваш участок в той же логике: сценарии, экономика и вывод, который можно
              защитить.
            </span>
            <a href="#form" className={styles.cta}>
              Найти потенциал моего участка
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
