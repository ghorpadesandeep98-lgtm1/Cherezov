'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ds/Input';
import styles from './LeadForm.module.css';

const PERKS = [
  { title: 'Риски до старта', text: 'видим слабые места заранее' },
  { title: 'Сценарии и чувствительность', text: 'понимаем, как меняется результат' },
  { title: 'Защита решения', text: 'цифры, которые легко объяснить партнёру и инвестору' },
];

export function LeadForm() {
  const [sent, setSent] = useState(false);

  // Отправка пока не подключена к бэкенду — валидируем и показываем подтверждение.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="form" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            Второе мнение перед <span className={styles.titleAccent}>дорогим решением</span>
          </h2>
          <p className={styles.lead}>
            Не просто считаем. Помогаем запустить проект и довести до результата.
          </p>

          <div className={styles.perks}>
            {PERKS.map((p) => (
              <div key={p.title} className={styles.perk}>
                <div className={styles.perkTitle}>{p.title}</div>
                <div className={styles.perkText}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
          <div className={styles.formTitle}>
            Получите второе <span className={styles.formTitleAccent}>мнение по проекту</span>
          </div>

          {sent ? (
            <div className={styles.done}>
              <span className={styles.doneTitle}>Заявка принята</span>
              <span className={styles.doneText}>
                Свяжемся с вами в течение двух рабочих дней и покажем расчёт по вашему участку.
              </span>
            </div>
          ) : (
            <>
              <Input
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="name@company.ru"
                required
                requiredMark={false}
              />
              <Input
                label="Имя"
                name="name"
                autoComplete="name"
                placeholder="Как к вам обращаться"
                required
                requiredMark={false}
              />
              <Input
                label="Телефон"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+7 (000) 000-00-00"
                required
                requiredMark={false}
              />
              <button type="submit" className={styles.submit}>
                Запросить демо ↗
              </button>
            </>
          )}

          <span className={styles.note}>
            Ваши данные защищены. Ответим в течение двух рабочих дней.
          </span>
        </form>
      </div>
    </section>
  );
}
