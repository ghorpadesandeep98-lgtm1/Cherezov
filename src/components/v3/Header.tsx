'use client';

import { useState } from 'react';
import { Logo } from '@/components/ds/Logo';
import { NAV_LINKS } from '@/data/v3/content';
import styles from './Header.module.css';

/**
 * Стеклянная «таблетка» с навигацией. До 720px ссылки и CTA прячутся,
 * их место занимает бургер с выпадающей панелью.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <a href="#top" className={styles.logo} aria-label="Культура девелопмента — наверх">
          {/* Логотип у Logo задан инлайновым display, поэтому прячем обёртку. */}
          <span className={styles.logoDesktop}>
            <Logo width={150} tone="light" dot="primary" />
          </span>
          <span className={styles.logoMobile}>
            <Logo width={122} tone="light" dot="primary" />
          </span>
        </a>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link, i) => (
            <a key={link.href} href={link.href} className={i === 0 ? styles.navLinkLead : styles.navLink}>
              {link.title}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#form" className={styles.cta}>
            Разобрать участок <span className={styles.ctaArrow}>↗</span>
          </a>
          <button
            type="button"
            aria-label="Меню"
            aria-expanded={open}
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={open ? styles.burgerTopOpen : styles.burgerLine} />
            <span className={open ? styles.burgerMidOpen : styles.burgerLine} />
            <span className={open ? styles.burgerBotOpen : styles.burgerLine} />
          </button>
        </div>
      </div>

      <div className={styles.menuWrap}>
        <div className={open ? styles.menuOpen : styles.menu}>
          <div className={styles.menuInner}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.menuLink}
                onClick={() => setOpen(false)}
              >
                {link.title}
                <span className={styles.menuArrow}>↗</span>
              </a>
            ))}
            <a href="#form" className={styles.menuCta} onClick={() => setOpen(false)}>
              Разобрать участок ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
