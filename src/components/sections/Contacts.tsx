import styles from './Contacts.module.css';

const ITEMS = [
  { label: 'АДРЕС ОФИСА', value: 'г. Киров, ул. Молодой Гвардии, д. 82, офис 418' },
  { label: 'ТЕЛЕФОН', value: '+7 912 826-80-70' },
  { label: 'ЭЛЕКТРОННАЯ ПОЧТА', value: '468070@mail.ru' },
];

export function Contacts() {
  return (
    <section id="contacts" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            Свяжитесь <span className={styles.titleAccent}>с нами</span>
          </h2>
          <p className={styles.lead}>
            Обсудим ваш проект, территорию или девелоперскую задачу. Мы на связи и готовы к
            предметному разговору.
          </p>

          {ITEMS.map((i) => (
            <div key={i.label} className={styles.item}>
              <div className={styles.itemLabel}>{i.label}</div>
              <div className={styles.itemValue}>{i.value}</div>
            </div>
          ))}
        </div>

        <div className={styles.map}>
          <div className={styles.mapHead}>
            <div>
              <div className={styles.mapLabel}>ОФИС</div>
              <div className={styles.mapAddress}>Молодой Гвардии, 82, офис 418</div>
            </div>
            <a href="#contacts" className={styles.route}>
              Маршрут →
            </a>
          </div>
          <div className={styles.canvas}>Интерактивная карта — Яндекс.Карты, метка офиса</div>
        </div>
      </div>
    </section>
  );
}
