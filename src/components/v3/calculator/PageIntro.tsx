import styles from './PageIntro.module.css';

/**
 * Первый экран страницы «Калькулятор девелопера».
 *
 * Зачем нужен: у страницы не было h1 — она открывалась сразу блоком «Пять
 * вопросов», и поиск не видел, о чём страница. Здесь ровно один h1 и короткий
 * ввод. Новых формулировок целевого действия сознательно не добавляем: их
 * пересборкой занимается отдельная задача по карте CTA.
 */
export function PageIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.overline}>инструмент</span>
        <h1 className={styles.title}>
          Калькулятор девелопера — <span className={styles.titleAccent}>модель</span> предпроектной
          оценки участка
        </h1>
        <p className={styles.lead}>
          Земля, продукт, экономика и сценарии живут в одной модели: площади, сроки,
          себестоимость, выручка и NPV. Она отвечает на вопрос, стоит ли заходить в участок
          и по какой цене.
        </p>
      </div>
    </section>
  );
}
