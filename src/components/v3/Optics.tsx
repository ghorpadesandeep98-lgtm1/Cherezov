import Image from 'next/image';
import { OPTICS_LEFT_STEPS, OPTICS_RIGHT_STEPS } from '@/data/v3/content';
import styles from './Optics.module.css';

/** Две точки входа: земли ещё нет — или земля уже есть. */
export function Optics() {
  return (
    <section id="optics" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>
            Мы находим не землю.
            <br />
            <span className={styles.titleAccent}>Мы находим будущий актив.</span>
          </h2>
          <p className={styles.headLead}>
            Две точки входа — земли ещё нет или земля уже есть. В обеих мы отвечаем на один вопрос:
            каким проектом территория должна стать.
          </p>
        </div>

        <div className={styles.panels}>
          <div className={styles.panel}>
            <Image
              src="/assets/v3/territory.jpg"
              alt="Территория с высоты"
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              className={styles.panelImage}
            />
            <div className={styles.panelScrim} />

            <div className={styles.panelBody}>
              <div className={styles.panelHead}>
                <span className={styles.panelOverline}>СИТУАЦИЯ 01</span>
                <b className={styles.panelTitle}>
                  Земли
                  <br />
                  ещё нет
                </b>
              </div>

              <div className={styles.callout}>
                <b className={styles.calloutTitle}>Ищем территорию под вашу стратегию</b>
                <p className={styles.calloutText}>
                  Не список свободных участков, а критерии под капитал, рынок и будущий продукт.
                </p>
                <div className={styles.calloutFoot}>
                  <span className={styles.calloutLabel}>ТОЧКА ВХОДА</span>
                  <span className={styles.calloutArrow}>→</span>
                </div>
              </div>

              <div className={styles.stepsWrap}>
                <div className={styles.steps}>
                  {OPTICS_LEFT_STEPS.map((s) => (
                    <div key={s.n} className={styles.step}>
                      <span className={styles.stepNum}>{s.n}</span>
                      <span className={styles.stepText}>{s.title}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.outcome}>
                  <span className={styles.outcomeLabel}>РЕШЕНИЕ НА ВЫХОДЕ</span>
                  <span className={styles.outcomeText}>Где покупать и по какой цене входить</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true">
            <span className={styles.dividerLineTop} />
            <span className={styles.dividerBadge}>или</span>
            <span className={styles.dividerLineBottom} />
          </div>

          <div className={styles.panel}>
            <Image
              src="/assets/v3/masterplan.jpg"
              alt="Мастер-план квартала"
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              className={styles.panelImage}
            />
            <div className={styles.panelScrimRight} />

            <div className={styles.panelBody}>
              <div className={styles.panelHead}>
                <span className={styles.panelOverline}>СИТУАЦИЯ 02</span>
                <b className={styles.panelTitle}>
                  Земля
                  <br />
                  уже есть
                </b>
              </div>

              <div className={styles.frame}>
                <span className={styles.frameTag}>ЧТО МЫ ВИДИМ</span>
                <b className={styles.frameTitle}>
                  Потенциал, которого
                  <br />
                  ещё нет на бумаге
                </b>
                <span className={styles.frameText}>
                  Проект не заложен в исходных параметрах — он появляется, когда территорию
                  пересобирают заново
                </span>
                <div className={styles.chips}>
                  <span className={styles.chipMuted}>было по ГПЗУ</span>
                  <span className={styles.chipBrand}>стало в модели: +26 200 м² GBA</span>
                </div>
              </div>

              <div className={styles.stepsWrap}>
                <div className={styles.steps}>
                  {OPTICS_RIGHT_STEPS.map((s) => (
                    <div key={s.n} className={styles.step}>
                      <span className={styles.stepNum}>{s.n}</span>
                      <span className={styles.stepText}>{s.title}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.outcome}>
                  <span className={styles.outcomeLabel}>РЕШЕНИЕ НА ВЫХОДЕ</span>
                  <span className={styles.outcomeText}>Что строить и сколько это принесёт</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.closing}>
          <span className={styles.closingText}>
            Не отчёт о том, что есть.{' '}
            <b className={styles.closingAccent}>Решение о том, что делать дальше.</b>
          </span>
          <a href="#form" className={styles.cta}>
            Показать потенциал проекта
          </a>
        </div>
      </div>
    </section>
  );
}
