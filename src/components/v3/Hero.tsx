import Image from 'next/image';
import Link from 'next/link';
import { HERO_STATS } from '@/data/v3/content';
import styles from './Hero.module.css';

/** Первый экран: аэросъёмка, обещание и четыре плитки с масштабом практики. */
export function Hero() {
  return (
    <section id="top" className={styles.section}>
      <Image
        src="/assets/v3/hero-aerial.jpg"
        alt="Аэросъёмка: участок и построенный квартал"
        fill
        priority
        sizes="100vw"
        className={styles.render}
      />
      <div className={styles.scrim} />
      <div className={styles.watermark} aria-hidden="true">
        культура девелопмента
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Оценка девелоперского потенциала участка
          </span>

          <h1 className={styles.title}>
            Проверьте потенциал участка{' '}
            <span className={styles.titleAccent}>до покупки и проектирования</span>
          </h1>

          <p className={styles.lead}>
            Собираем землю, продукт, экономику и риски в одной модели — и готовим решение, которое
            можно защитить перед инвестором, банком и городом.
          </p>

          <div className={styles.action}>
            <div className={styles.buttons}>
              <a href="#form" className={styles.primary}>
                Разобрать участок <span className={styles.primaryArrow}>↗</span>
              </a>
              <a href="#screen" className={styles.secondary}>
                Посмотреть пример результата
              </a>
            </div>

            {/* Гипотеза аналитика 24.09.2026: все посторонние визиты за 15–24.09
                закончились на первом экране (глубина ровно 1,00), а в первом экране
                два действия и ни одной строки о том, что за ними последует.
                Срок ответа сюда не ставим, пока открыт блокер 8(в). */}
            <p className={styles.promise}>
              В ответ пришлём разбор участка: что на нём можно построить, сколько это стоит и
              что с этим делать дальше. Бесплатно, без обязательств.
            </p>

            {/* Первый элемент первого экрана, ведущий на вторую страницу сайта:
                обе кнопки выше — якоря внутри главной. Поэтому ссылка, а не кнопка,
                и порог нулевой: человек уходит читать, а не оставлять контакты. */}
            <Link href="/calculator" className={styles.calcLink}>
              <span className={styles.calcLinkFull}>
                Сначала посмотрите, как считается участок → «Калькулятор девелопера»
              </span>
              <span className={styles.calcLinkShort}>
                Как считается участок → «Калькулятор девелопера»
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.stats}>
          {HERO_STATS.map((s) => (
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
