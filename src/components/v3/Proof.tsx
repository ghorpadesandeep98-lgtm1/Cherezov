import Image from 'next/image';
import { PARTNERS, PROOF_STATS } from '@/data/v3/content';
import styles from './Proof.module.css';

/** Команда и доказательства: портрет, цифры опыта и партнёры. */
export function Proof() {
  return (
    <section id="proof" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.overline}>команда и доказательства</span>
          <h2 className={styles.title}>
            Экспертиза
            <br />
            <span className={styles.titleAccent}>не должна быть безликой.</span>
          </h2>
        </div>

        <div className={styles.person}>
          <div className={styles.portrait}>
            <div className={styles.portraitGlow} aria-hidden="true" />
            <Image
              src="/assets/v3/alexey.png"
              alt="Алексей Черезов"
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              className={styles.portraitImage}
            />
            <div className={styles.portraitVignette} aria-hidden="true" />
            <div className={styles.portraitFade} aria-hidden="true" />
          </div>

          <div className={styles.bio}>
            <div className={styles.bioHead}>
              <b className={styles.bioName}>Алексей Черезов</b>
              <span className={styles.bioRole}>Управляющий партнёр «Культуры девелопмента»</span>
            </div>
            <p className={styles.quote}>«Любое решение нужно переводить в деньги».</p>
            <div className={styles.bioText}>
              <p className={styles.bioParagraph}>
                Инженер, продуктолог и девелопер. Работал в крупнейших девелоперских компаниях
                России, отвечая за эффективность, себестоимость и продуктовые решения.
              </p>
              <p className={styles.bioParagraph}>
                Сегодня Алексей собирает вокруг проекта специалистов, которые рассматривают участок
                целиком — от рыночной гипотезы и финансовой модели до архитектуры и реализации.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.experience}>
          <span className={styles.experienceLabel}>опыт команды</span>
          <div className={styles.stats}>
            {PROOF_STATS.map((s, i) => (
              <div key={s.label} className={styles.stat} style={{ animationDelay: `${i * 0.12}s` }}>
                <b className={styles.statValue}>{s.value}</b>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.partners}>
          {PARTNERS.map((p) => (
            <div key={p.alt} className={styles.partner}>
              <Image
                src={p.image}
                alt={p.alt}
                width={p.width * 2}
                height={p.width}
                sizes={`${p.width}px`}
                className={p.multiply ? styles.partnerLogoMultiply : styles.partnerLogo}
                style={{ width: `min(100%, ${p.width}px)` }}
              />
              <span className={styles.partnerText}>{p.text}</span>
            </div>
          ))}
          <p className={styles.partnersNote}>
            Мы не содержим большую команду ради масштаба на фотографии. Мы подключаем к каждому
            проекту тех специалистов, которые действительно нужны для сильного результата.
          </p>
        </div>

        <div className={styles.closing}>
          <span className={styles.closingLine} aria-hidden="true" />
          <a href="#form" className={styles.cta}>
            Обсудить участок с Алексеем Черезовым
          </a>
          <a href="#case" className={styles.ctaGhost}>
            Посмотреть реальный кейс
          </a>
        </div>
      </div>
    </section>
  );
}
