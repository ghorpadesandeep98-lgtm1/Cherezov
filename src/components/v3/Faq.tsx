'use client';

import { useState, type ReactNode } from 'react';
import { FAQ } from '@/data/v3/content';
import styles from './Faq.module.css';

/**
 * Элемент блока вопрос-ответов.
 *
 * `facts` — короткие утверждения под прямым ответом: их пишут специально под
 * цитирование поиском и нейропоиском. `note` — оговорка, если ответ касается
 * расчётов.
 */
export type FaqItem = {
  readonly q: string;
  readonly a: string;
  readonly facts?: readonly string[];
  readonly note?: string;
};

type FaqProps = {
  /** Чем наполнять блок. По умолчанию — общие вопросы с главной. */
  items?: readonly FaqItem[];
  title?: ReactNode;
  lead?: string;
  /** Якорь секции: на главной `faq`, на странице раздела может быть свой. */
  id?: string;
};

const DEFAULT_TITLE = (
  <>
    Остались вопросы?<span className={styles.titleArrow}>↗</span>
  </>
);

const DEFAULT_LEAD =
  'Свяжитесь с нами, если у вас остались вопросы или нужна консультация — разберём ваш ' +
  'участок и ответим по существу.';

/**
 * Аккордеон вопросов: открыт ровно один пункт, по умолчанию первый.
 *
 * Закрытые ответы остаются в DOM и прячутся стилем — так требует разметка
 * `FAQPage`, которая собирается из этого же массива в `JsonLd`.
 */
export function Faq({
  items = FAQ,
  title = DEFAULT_TITLE,
  lead = DEFAULT_LEAD,
  id = 'faq',
}: FaqProps = {}) {
  const [open, setOpen] = useState(0);

  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.head}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.lead}>{lead}</p>
          </div>

          <div className={styles.rows}>
            {items.map((item, i) => {
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
                    {/* Ответ рендерится всегда и у закрытого пункта скрывается стилем.
                        Это обязательное условие разметки FAQPage: `acceptedAnswer`
                        каждого вопроса должен присутствовать в HTML страницы. Если
                        ответ вынимать из DOM по `isOpen`, разметка обещает поиску
                        десять ответов, а на странице лежит один, и её перестают
                        учитывать целиком. */}
                    <span className={isOpen ? styles.collapseOpen : styles.collapse}>
                      <span className={styles.answer}>{item.a}</span>
                      {/* Список размечен ролями, а не ul/li: строка целиком —
                          это <button>, внутрь которого блочные теги нельзя. */}
                      {item.facts && item.facts.length > 0 && (
                        <span className={styles.facts} role="list">
                          {item.facts.map((fact) => (
                            <span key={fact} className={styles.fact} role="listitem">
                              {fact}
                            </span>
                          ))}
                        </span>
                      )}
                      {item.note && <span className={styles.note}>{item.note}</span>}
                    </span>
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
