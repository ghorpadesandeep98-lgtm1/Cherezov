'use client';

import { useState } from 'react';
import { FAQ } from '@/data/v3/content';
import styles from './Faq.module.css';

/** Аккордеон вопросов: открыт ровно один пункт, по умолчанию первый. */
export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.head}>
            <h2 className={styles.title}>
              Остались вопросы?<span className={styles.titleArrow}>↗</span>
            </h2>
            <p className={styles.lead}>
              Свяжитесь с нами, если у вас остались вопросы или нужна консультация — разберём ваш
              участок и ответим по существу.
            </p>
          </div>

          <div className={styles.rows}>
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className={isOpen ? styles.rowOpen : styles.row}
                >
                  <span className={styles.rowBody}>
                    <b className={isOpen ? styles.questionOpen : styles.question}>{item.q}</b>
                    {isOpen && <span className={styles.answer}>{item.a}</span>}
                  </span>
                  <span className={isOpen ? styles.toggleOpen : styles.toggle}>↘</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
