'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ds/Input';
import type { LeadFields } from '@/lib/lead';
import styles from './LeadForm.module.css';

const PERKS = [
  { title: 'Риски до старта', text: 'видим слабые места заранее' },
  { title: 'Сценарии и чувствительность', text: 'понимаем, как меняется результат' },
  { title: 'Защита решения', text: 'цифры, которые легко объяснить партнёру и инвестору' },
];

type Status = 'idle' | 'sending' | 'sent' | 'failed';

export function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFields, string>>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus('sending');
    setErrors({});

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'Форма «Второе мнение»' }),
      });

      if (response.status === 422) {
        const body = (await response.json()) as { errors?: Partial<Record<keyof LeadFields, string>> };
        setErrors(body.errors ?? {});
        setStatus('idle');
        return;
      }

      if (!response.ok) {
        setStatus('failed');
        return;
      }

      form.reset();
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
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

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.formTitle}>
            Получите второе <span className={styles.formTitleAccent}>мнение по проекту</span>
          </div>

          {status === 'sent' ? (
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
                error={errors.email}
              />
              <Input
                label="Имя"
                name="name"
                autoComplete="name"
                placeholder="Как к вам обращаться"
                required
                requiredMark={false}
                error={errors.name}
              />
              <Input
                label="Телефон"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+7 (000) 000-00-00"
                required
                requiredMark={false}
                error={errors.phone}
              />

              {/* Ловушка для ботов: скрыта от людей и от скринридеров */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />

              <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                {status === 'sending' ? 'Отправляем…' : 'Запросить демо ↗'}
              </button>

              {status === 'failed' && (
                <span className={styles.failed} role="alert">
                  Заявка не ушла. Попробуйте ещё раз или напишите на{' '}
                  <a href="mailto:468070@mail.ru">468070@mail.ru</a>.
                </span>
              )}
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
