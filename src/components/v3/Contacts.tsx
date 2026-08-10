'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Logo } from '@/components/ds/Logo';
import { CONTACTS, NAV_LINKS } from '@/data/v3/content';
import styles from './Contacts.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

/** Маска +7 (000) 000-00-00: в поле остаются только цифры номера. */
function maskPhone(raw: string) {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits[0] === '8') digits = `7${digits.slice(1)}`;
  if (digits[0] !== '7') digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let out = '+7';
  if (rest.length) out += ` (${rest.slice(0, 3)}`;
  if (rest.length > 3) out += `) ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

export function Contacts() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const sceneRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  /* Карточка всплывает при первом появлении в кадре, фон едет медленнее скролла. */
  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    if (!scene || !card) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      card.style.opacity = '1';
      card.style.transform = 'none';
    } else {
      const reveal = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            card.style.animation = 'kdModelRise 1.1s cubic-bezier(.22,.68,.24,1) forwards';
            reveal.disconnect();
          });
        },
        { threshold: 0, rootMargin: '0px 0px -12% 0px' },
      );
      reveal.observe(scene);
    }

    const bg = bgRef.current;
    if (!bg || reduce || window.innerWidth < 820) return;

    const onScroll = () => {
      const rect = scene.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const shift = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      bg.style.transform = `translateY(${(shift * 34).toFixed(1)}px)`;
    };

    const scheduled = () => requestAnimationFrame(onScroll);
    window.addEventListener('scroll', scheduled, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', scheduled);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const company = new FormData(form).get('company');

    setStatus('sending');
    setErrors({});

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, phone, company, source: 'Форма в контактах' }),
      });

      if (response.status === 422) {
        const body = (await response.json()) as { errors?: { name?: string; phone?: string } };
        setErrors(body.errors ?? {});
        setStatus('idle');
        return;
      }

      if (!response.ok) {
        setStatus('failed');
        return;
      }

      setName('');
      setPhone('');
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <section id="contacts" ref={sceneRef} className={styles.section}>
      <Image
        ref={bgRef}
        src="/assets/v3/district-aerial.png"
        alt="Жилой квартал с высоты"
        fill
        loading="lazy"
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div ref={cardRef} className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <span className={styles.overline}>контакты</span>
            <h2 className={styles.title}>Обсудим ваш проект</h2>
            <p className={styles.lead}>
              Расскажите об участке или идее — начнём с предметного разговора.
            </p>
            <div className={styles.details}>
              <a href={CONTACTS.phoneHref} className={styles.phone}>
                {CONTACTS.phone}
              </a>
              <a href={`mailto:${CONTACTS.email}`} className={styles.email}>
                {CONTACTS.email}
              </a>
              <span className={styles.address}>{CONTACTS.address}</span>
            </div>
          </div>

          <form id="form" className={styles.form} onSubmit={onSubmit} noValidate>
            <span className={styles.formLabel}>получить второе мнение</span>

            {status === 'sent' ? (
              <div className={styles.done}>
                <span className={styles.doneTitle}>Заявка принята</span>
                <span className={styles.doneText}>
                  Свяжемся с вами в течение двух рабочих дней и разберём ваш участок.
                </span>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Имя"
                  autoComplete="name"
                  inputMode="text"
                  aria-label="Имя"
                  aria-invalid={Boolean(errors.name)}
                  value={name}
                  onChange={(e) => setName(e.target.value.replace(/[^A-Za-zА-Яа-яЁё\s-]/g, ''))}
                  className={styles.input}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}

                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-label="Телефон"
                  aria-invalid={Boolean(errors.phone)}
                  value={phone}
                  onChange={(e) => setPhone(maskPhone(e.target.value))}
                  className={styles.input}
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}

                {/* Ловушка для ботов: скрыта от людей и от скринридеров */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className={styles.honeypot}
                />

                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Отправляем…' : 'Обсудить проект'}
                </button>

                {status === 'failed' && (
                  <span className={styles.error} role="alert">
                    Заявка не ушла. Попробуйте ещё раз или напишите на{' '}
                    <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>.
                  </span>
                )}
              </>
            )}
          </form>
        </div>

        <div className={styles.office}>
          <span className={styles.officeText}>{CONTACTS.office}</span>
          <a href={CONTACTS.route} target="_blank" rel="noreferrer" className={styles.route}>
            Построить маршрут →
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Logo width={210} tone="light" dot="primary" descriptor descriptorText="fee-девелопер" />
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              title="Telegram"
              className={styles.telegram}
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                <path d="M21.5 3.2 2.9 10.4c-1 .4-1 1.8.1 2.1l4.6 1.4 1.8 5.5c.3.9 1.4 1.1 2 .4l2.5-2.6 4.6 3.4c.7.5 1.7.1 1.9-.7l3.2-15c.2-.9-.7-1.7-1.6-1.3zM8.9 13.6l9-5.7-7.4 6.6c-.2.2-.3.4-.3.6l-.3 2.3-1-3.8z" />
              </svg>
            </a>
          </div>

          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <span className={styles.footerLabel}>РАЗДЕЛЫ</span>
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className={styles.footerLink}>
                  {link.title}
                </a>
              ))}
            </div>
            <div className={styles.footerColumn}>
              <span className={styles.footerLabel}>СВЯЗЬ</span>
              <a href={CONTACTS.phoneHref} className={styles.footerLink}>
                {CONTACTS.phone}
              </a>
              <a href={`mailto:${CONTACTS.email}`} className={styles.footerLink}>
                {CONTACTS.email}
              </a>
              <span className={styles.footerPlain}>г. Киров, ул. Молодой Гвардии, 82</span>
            </div>
            <div className={styles.footerColumn}>
              <span className={styles.footerLabel}>ДОКУМЕНТЫ</span>
              <a href="#contacts" className={styles.footerLink}>
                Политика конфиденциальности
              </a>
              <a href="#contacts" className={styles.footerLink}>
                Согласие на обработку персональных данных
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span className={styles.footerLegal}>
            {CONTACTS.legal}
            <br />
            Представленные расчёты являются демонстрационными и не являются инвестиционной
            рекомендацией.
          </span>
          <span className={styles.footerYear}>© 2026</span>
        </div>
      </footer>
    </section>
  );
}
