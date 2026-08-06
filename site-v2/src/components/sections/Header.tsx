'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/ds/Logo';
import styles from './Header.module.css';

const LINKS = [
  { href: '#calculator', label: 'Калькулятор девелопера', lead: true },
  { href: '#screen', label: 'Интерфейс' },
  { href: '#team', label: 'Команда' },
  { href: '#contacts', label: 'Контакты' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  // Меню закрывается по Escape и не даёт скроллить страницу под собой
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <a href="#top" className={styles.logo} aria-label="культура девелопмента — на главную">
          <Logo width={150} tone="light" dot="primary" />
        </a>

        <nav className={styles.nav}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={l.lead ? styles.linkLead : styles.link}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#form" className={styles.cta}>
            Запросить демо <span className={styles.ctaArrow}>↗</span>
          </a>

          <button
            type="button"
            className={styles.burger}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            aria-controls="kd-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={open ? styles.burgerBarTop : styles.burgerBar} />
            <span className={open ? styles.burgerBarHidden : styles.burgerBar} />
            <span className={open ? styles.burgerBarBottom : styles.burgerBar} />
          </button>
        </div>
      </div>

      {/* Мобильное меню: панель под пилюлей + затемнение страницы */}
      <div
        id="kd-mobile-menu"
        className={open ? styles.menuOpen : styles.menu}
        hidden={!open}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className={styles.menuLink} onClick={() => setOpen(false)}>
            {l.label}
            <span aria-hidden="true">→</span>
          </a>
        ))}
        <a href="#form" className={styles.menuCta} onClick={() => setOpen(false)}>
          Запросить демо ↗
        </a>
      </div>

      {open && (
        <button
          type="button"
          className={styles.scrim}
          aria-label="Закрыть меню"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
