import Image from 'next/image';
import { BarChart } from '@/components/ds/BarChart';
import { GROWTH_BARS } from '@/data/calculator';
import styles from './Value.module.css';

const STEPS = [
  {
    step: '1. Покупка земли',
    src: '/assets/renders/plot.jpg',
    alt: 'Участок',
    text: 'Оцениваем потенциал и справедливую цену',
  },
  {
    step: '2. Концепция продукта',
    src: '/assets/renders/masterplan.jpg',
    alt: 'Концепция',
    text: 'Создаём продукт, который будет востребован рынком',
  },
  {
    step: '3. Проектирование',
    src: '/assets/renders/blueprint.jpg',
    alt: 'Проектирование',
    text: 'Архитектура, техрешения и финансовая модель',
  },
  {
    step: '4. РНС и старт продаж',
    src: '/assets/renders/approval.jpg',
    alt: 'РНС',
    text: 'Получаем разрешение и запускаем продажи',
  },
];

export function Value() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>
            Как создаётся{' '}
            <span className={styles.titleAccent}>финансовая ценность проекта</span>
          </h2>
          <p className={styles.lead}>Ключевые решения принимаются до начала строительства.</p>
        </div>

        <div className={styles.grid}>
          {STEPS.map((s) => (
            <div key={s.step} className={styles.card}>
              <span className={styles.step}>{s.step}</span>
              <Image
                src={s.src}
                alt={s.alt}
                width={480}
                height={360}
                className={styles.shot}
                sizes="(max-width: 720px) 45vw, 240px"
              />
              <span className={styles.text}>{s.text}</span>
            </div>
          ))}

          {/* График на белой карточке шириной в две ячейки — подписи не вылезают */}
          <div className={styles.chartCard}>
            <span className={styles.chartTitle}>Рост прибыли проекта</span>
            <div className={styles.chartScroll}>
              <div className={styles.chartInner}>
                <BarChart data={GROWTH_BARS} height={130} unit="млн ₽" tone="light" />
              </div>
            </div>
            <span className={styles.chartNote}>Максимальная прибыль при минимальных рисках</span>
          </div>
        </div>

        <div className={styles.banner}>
          <span className={styles.bannerText}>Все ключевые финансовые решения принимаются</span>
          <span className={styles.bannerPill}>ДО начала строительства</span>
        </div>
      </div>
    </section>
  );
}
