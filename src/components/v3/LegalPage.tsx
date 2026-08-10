import Link from 'next/link';
import type { ReactNode } from 'react';
import { Logo } from '@/components/ds/Logo';
import { CONTACTS } from '@/data/v3/content';
import styles from './LegalPage.module.css';

type LegalPageProps = {
  title: string;
  /** Дата редакции документа — её видно в шапке и она же фиксирует версию. */
  revision: string;
  children: ReactNode;
};

/** Общая обложка для правовых документов: шапка, колонка текста, реквизиты. */
export function LegalPage({ title, revision, children }: LegalPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Культура девелопмента — на главную">
          <Logo width={150} tone="dark" dot="primary" />
        </Link>
        <Link href="/" className={styles.back}>
          ← На главную
        </Link>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.revision}>Редакция от {revision}</p>
        <div className={styles.body}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <span className={styles.legal}>{CONTACTS.legal}</span>
        <span className={styles.contacts}>
          <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a> · {CONTACTS.address}
        </span>
      </footer>
    </div>
  );
}
