import { Logo } from '@/components/ds/Logo';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Logo width={210} tone="light" dot="primary" descriptor />

          <div className={styles.cols}>
            <div className={styles.col}>
              <span className={styles.colLabel}>ПРОДУКТ</span>
              <a href="#calculator" className={styles.link}>
                Калькулятор девелопера
              </a>
              <a href="#screen" className={styles.link}>
                Интерфейс
              </a>
              <a href="#team" className={styles.link}>
                Команда
              </a>
            </div>

            <div className={styles.col}>
              <span className={styles.colLabel}>СВЯЗЬ</span>
              <span>+7 912 826-80-70</span>
              <span>468070@mail.ru</span>
              <span>г. Киров, ул. Молодой Гвардии, 82</span>
            </div>
          </div>
        </div>

        <div className={styles.legal}>
          Показатели на странице — демонстрационные и приведены для примера расчёта.
        </div>
      </div>
    </footer>
  );
}
