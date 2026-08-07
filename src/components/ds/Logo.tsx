import type { CSSProperties } from 'react';
import { LOGO_DOT_D, LOGO_WORD_D } from './logoPaths';

type Tone = 'dark' | 'light' | 'graphite' | 'forest';
type Dot = keyof typeof DOT_COLORS | (string & {});

const DOT_COLORS = {
  primary: 'var(--kd-salad)',
  emerald: 'var(--kd-green)',
  business: 'var(--kd-ink)',
  graphite: 'var(--kd-slate)',
  forest: 'var(--kd-forest)',
  digital: 'var(--kd-green)',
  image: 'var(--kd-mustard)',
  warm: 'var(--kd-terracotta)',
  neutral: 'var(--kd-stone)',
  inherit: 'currentColor',
} as const;

const WORD_COLORS: Record<Tone, string> = {
  light: 'var(--kd-white)',
  graphite: 'var(--kd-slate)',
  forest: 'var(--kd-forest)',
  dark: 'var(--kd-ink)',
};

export type LogoProps = {
  width?: number;
  tone?: Tone;
  dot?: Dot;
  descriptor?: boolean;
  descriptorText?: string;
  clearspace?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Основной логотип «культура девелопмента» + опциональный дескриптор «fee-девелопер». */
export function Logo({
  width = 260,
  tone = 'dark',
  dot = 'primary',
  descriptor = false,
  descriptorText = 'fee-девелопер',
  clearspace = false,
  className,
  style,
}: LogoProps) {
  const word = WORD_COLORS[tone] ?? WORD_COLORS.dark;
  const dotFill = DOT_COLORS[dot as keyof typeof DOT_COLORS] ?? dot;
  const x = width * 0.0357; // X = диаметр фирменной точки

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: x * 0.9,
        padding: clearspace ? x : 0,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 644 186"
        width={width}
        height={(width * 186) / 644}
        role="img"
        aria-label="культура девелопмента"
        style={{ overflow: 'visible' }}
      >
        <path fill={word} fillRule="evenodd" clipRule="evenodd" d={LOGO_WORD_D} />
        <path fill={dotFill} fillRule="evenodd" clipRule="evenodd" d={LOGO_DOT_D} />
      </svg>
      {descriptor && (
        <span
          style={{
            fontFamily: 'var(--font-core)',
            fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
            fontSize: Math.max(11, width * 0.062),
            letterSpacing: '0.02em',
            color: tone === 'light' ? 'var(--kd-white)' : 'var(--kd-ink)',
          }}
        >
          {descriptorText}
        </span>
      )}
    </div>
  );
}
