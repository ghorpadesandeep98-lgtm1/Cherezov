'use client';

import { useState, type CSSProperties } from 'react';

const SERIES = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
];

export type BarDatum = { label: string; value: number; color?: string };

export type BarChartProps = {
  data?: BarDatum[];
  height?: number;
  unit?: string;
  selected?: string;
  onSelect?: (label: string) => void;
  tone?: 'light' | 'dark';
  showGrid?: boolean;
  format?: (value: number) => string;
  style?: CSSProperties;
};

/**
 * Интерактивная гистограмма. Наведение подсвечивает столбец и показывает
 * значение на стеклянной подсказке, клик выбирает столбец.
 */
export function BarChart({
  data = [],
  height = 220,
  unit = '',
  selected,
  onSelect,
  tone = 'light',
  showGrid = true,
  format,
  style,
}: BarChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value), 1);
  const dark = tone === 'dark';
  const fmt = format || ((v: number) => String(v).replace('.', ',') + (unit ? ' ' + unit : ''));

  return (
    <div style={{ position: 'relative', ...style }}>
      {showGrid && (
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height }}>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <div
              key={t}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: t * height,
                height: 1,
                background: dark ? 'rgba(255,255,255,.10)' : 'var(--chart-grid)',
                opacity: t === 1 ? 1 : 0.55,
              }}
            />
          ))}
        </div>
      )}

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 'var(--space-3)',
          height,
        }}
      >
        {data.map((d, i) => {
          const on = hover === i || selected === d.label;
          const h = Math.max(2, (d.value / max) * 100);
          return (
            <div
              key={d.label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect && onSelect(d.label)}
              style={{
                flex: 1,
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative',
                cursor: onSelect ? 'pointer' : 'default',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  background: dark ? 'rgba(255,255,255,.06)' : 'var(--chart-track)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: h + '%',
                    background: d.color || SERIES[i % SERIES.length],
                    borderRadius: 'var(--radius-md)',
                    filter: on ? 'brightness(1.06)' : 'none',
                    boxShadow: on ? '0 -6px 18px -6px rgba(15,95,60,.45)' : 'none',
                    transform: on ? 'scaleY(1.015)' : 'none',
                    transformOrigin: 'bottom',
                    transition:
                      'height var(--dur-slow) var(--ease-out),filter var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-spring),box-shadow var(--dur-fast) var(--ease-standard)',
                  }}
                />
              </div>

              {hover === i && (
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: `calc(${h}% + 10px)`,
                    transform: 'translateX(-50%)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    fontSize: 'var(--text-caption-size)',
                    fontWeight: 'var(--font-weight-semibold)' as CSSProperties['fontWeight'],
                    backgroundImage:
                      'linear-gradient(148deg,rgba(255,255,255,.30),rgba(255,255,255,.06))',
                    backdropFilter: 'blur(6px) saturate(170%)',
                    WebkitBackdropFilter: 'blur(6px) saturate(170%)',
                    border: '1px solid rgba(255,255,255,.5)',
                    boxShadow: 'var(--glass-cast)',
                    color: dark ? 'var(--kd-glass)' : 'var(--kd-ink)',
                    zIndex: 3,
                  }}
                >
                  {fmt(d.value)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
        {data.map((d, i) => (
          <div key={d.label} style={{ flex: 1, textAlign: 'center' }}>
            <div
              style={{
                fontSize: 'var(--text-caption-size)',
                fontWeight: hover === i || selected === d.label ? 700 : 500,
                color: dark ? 'var(--kd-glass)' : 'var(--text-primary)',
              }}
            >
              {d.label}
            </div>
            <div
              style={{
                fontSize: 'var(--text-caption-size)',
                color: dark ? 'var(--text-secondary)' : 'var(--text-muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {fmt(d.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
