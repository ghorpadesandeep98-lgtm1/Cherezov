import Image from 'next/image';
import styles from './Lifecycle.module.css';

type Stage = {
  name: string;
  src: string;
  alt: string;
  works: string[];
  result?: string;
};

/* Наша зона ответственности — первые три этапа */
const OURS: Stage[] = [
  {
    name: '1. Допроектный этап',
    src: '/assets/renders/stage-land.png',
    alt: 'Участок',
    works: [
      'Оценка рынка и локации',
      'Проверка потенциала',
      'Финмодель на этапе идеи',
      'Проектное решение о покупке',
    ],
    result: 'Решение о покупке и цена',
  },
  {
    name: '2. Предпроектный этап',
    src: '/assets/renders/stage-masterplan.png',
    alt: 'Мастер-план',
    works: [
      'Концепция продукта',
      'Анализ конкурентов',
      'Градостроительный анализ',
      'Финмодель проекта',
    ],
    result: 'Продукт и экономика, готовые к проектированию',
  },
  {
    name: '3. Проектный этап',
    src: '/assets/renders/stage-planning.png',
    alt: 'Проектная документация',
    works: [
      'Архитектурные решения',
      'Проектная документация',
      'Экспертиза и согласования',
      'Финмодель под проект',
    ],
    result: 'РНС и готовность к старту продаж',
  },
];

/* Дальнейшая реализация — на стороне заказчика */
const CLIENT: Stage[] = [
  {
    name: '4. Строительство',
    src: '/assets/renders/crane-cut.png',
    alt: 'Строительство',
    works: ['Строительство', 'ПНР', 'Контроль качества'],
  },
  {
    name: '5. Продажи',
    src: '/assets/renders/stage-finance.png',
    alt: 'Продажи',
    works: ['Маркетинг и продажи', 'Управление ценообразованием', 'Сопровождение'],
  },
];

function Works({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <div className={muted ? styles.worksMuted : styles.works}>
      {items.map((w, i) => (
        <span key={w}>
          {i > 0 && <br />}
          {w}
        </span>
      ))}
    </div>
  );
}

export function Lifecycle() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>
            Жизненный <span className={styles.titleAccent}>цикл</span> девелоперского проекта
          </h2>
          <p className={styles.lead}>
            Наша зона ответственности — три этапа до старта строительства, где создаётся вся
            экономика проекта.
          </p>
        </div>

        <div className={styles.grid}>
          {OURS.map((s) => (
            <div key={s.name} className={styles.cardOurs}>
              <span className={styles.name}>{s.name}</span>
              <Image
                src={s.src}
                alt={s.alt}
                width={420}
                height={420}
                className={styles.shot}
                sizes="(max-width: 760px) 50vw, 20vw"
              />
              <Works items={s.works} />
              <div className={styles.result}>
                <div className={styles.resultLabel}>РЕЗУЛЬТАТ</div>
                <div className={styles.resultText}>{s.result}</div>
              </div>
              <span className={styles.ours}>
                <span className={styles.oursDot} />
                Наша экспертиза
              </span>
            </div>
          ))}

          {CLIENT.map((s) => (
            <div key={s.name} className={styles.cardClient}>
              <span className={styles.nameMuted}>{s.name}</span>
              <Image
                src={s.src}
                alt={s.alt}
                width={420}
                height={420}
                className={styles.shotMuted}
                sizes="(max-width: 760px) 50vw, 20vw"
              />
              <Works items={s.works} muted />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
