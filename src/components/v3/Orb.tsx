import type { CSSProperties } from 'react';
import styles from './Orb.module.css';

export type OrbTone = 'salad' | 'mint' | 'green' | 'deep' | 'forest';

type OrbProps = {
  tone: OrbTone;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Фирменный объёмный шар: ядро градиента, блик сверху-слева и кольцо кромки.
 * Кольцо крутится — отсюда ощущение стеклянного объёма без 3D.
 */
export function Orb({ tone, size = 62, className, style }: OrbProps) {
  return (
    <span
      aria-hidden="true"
      className={[styles.orb, styles[tone], className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
    >
      <span className={styles.gloss} />
      <span className={styles.rim} />
    </span>
  );
}
