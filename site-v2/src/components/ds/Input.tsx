'use client';

import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react';
import { KD_GLASS_DEFS } from './glassDefs';

/* Преломление по мотивам liquid-glass: карта смещения + расщепление каналов.
   Фильтр внедряется один раз на документ. */
function useLiquidDefs() {
  useEffect(() => {
    if (document.getElementById('kd-liquid-defs')) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'kd-liquid-defs');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;opacity:0';
    svg.innerHTML = '<defs>' + KD_GLASS_DEFS + '</defs>';
    document.body.appendChild(svg);
  }, []);
}

const RIM = [
  'inset 0 0 2px 1px rgba(255,255,255,.55)',
  'inset 0 0 10px 4px rgba(255,255,255,.22)',
  'inset 0 4px 16px rgba(17,17,26,.05)',
  'inset 0 8px 24px rgba(17,17,26,.05)',
  'inset 0 6px 56px rgba(17,17,26,.05)',
].join(',');

const RIM_DARK = [
  'inset 0 0 2px 1px rgba(255,255,255,.24)',
  'inset 0 0 10px 4px rgba(255,255,255,.08)',
  'inset 0 6px 24px rgba(0,0,0,.28)',
  'inset 0 -8px 24px rgba(0,0,0,.30)',
].join(',');

type GlassOptions = {
  depth?: 'soft' | 'base' | 'deep';
  tone?: 'light' | 'dark';
  radius?: number;
  frost?: number;
  lift?: 'rest' | 'up';
};

/** Поверхность стекла: преломление фона + тонкая молочная пелена + оптика кромки. */
function glassSurface({
  depth = 'base',
  tone = 'light',
  radius = 999,
  frost = 0.1,
  lift = 'rest',
}: GlassOptions = {}): CSSProperties {
  const id = depth === 'soft' ? 'kd-glass-soft' : depth === 'deep' ? 'kd-glass-deep' : 'kd-glass';
  const dark = tone === 'dark';
  const f = 'url(#' + id + ') saturate(1.24) brightness(1.02)';
  return {
    position: 'relative',
    borderRadius: radius,
    isolation: 'isolate',
    background: dark ? `hsl(158 42% 8% / ${frost + 0.42})` : `hsl(0 0% 100% / ${frost})`,
    backdropFilter: f,
    WebkitBackdropFilter: f,
    boxShadow:
      (dark ? RIM_DARK : RIM) +
      ',' +
      (lift === 'up'
        ? '0 22px 48px -20px rgba(15,31,25,.30)'
        : '0 10px 30px -18px rgba(15,31,25,.22)'),
    border: 'none',
    transition:
      'box-shadow var(--dur-base) var(--ease-glass),background var(--dur-base) var(--ease-glass),transform var(--dur-fast) var(--ease-spring)',
  } as CSSProperties;
}

function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
}: {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && (
        <span
          style={{
            paddingLeft: 18,
            fontSize: 'var(--text-caption-size)',
            fontWeight: 'var(--font-weight-semibold)' as CSSProperties['fontWeight'],
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: 'rgba(15,31,25,.68)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--kd-terracotta)' }}> *</span>}
        </span>
      )}
      {children}
      {(error || hint) && (
        <span
          style={{
            paddingLeft: 18,
            fontSize: 'var(--text-caption-size)',
            color: error ? 'var(--status-risk)' : 'rgba(15,31,25,.58)',
          }}
        >
          {error || hint}
        </span>
      )}
    </label>
  );
}

const controlBase = (
  focus: boolean,
  error: string | undefined,
  disabled: boolean | undefined,
  radius: number,
): CSSProperties => ({
  ...glassSurface({
    depth: 'soft',
    radius,
    frost: disabled ? 0.28 : focus ? 0.18 : 0.12,
    lift: focus ? 'up' : 'rest',
  }),
  width: '100%',
  padding: '14px 22px',
  minHeight: 50,
  fontFamily: 'var(--font-core)',
  fontSize: 'var(--text-body-size)',
  lineHeight: 1.4,
  color: 'var(--text-primary)',
  outline: 'none',
  boxShadow:
    glassSurface({ radius }).boxShadow +
    (error ? ',0 0 0 2px rgba(201,111,83,.55)' : focus ? ',0 0 0 2px rgba(122,203,46,.62)' : ''),
  opacity: disabled ? 0.7 : 1,
});

export type InputProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Показывать звёздочку у подписи. По умолчанию — как в дизайн-системе. */
  requiredMark?: boolean;
  multiline?: boolean;
  rows?: number;
  id?: string;
  style?: CSSProperties;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style' | 'required'>;

/** Текстовое поле или многострочная область — скруглённая стеклянная плашка. */
export function Input({
  label,
  hint,
  error,
  required,
  requiredMark,
  multiline = false,
  rows = 4,
  id,
  style,
  ...rest
}: InputProps) {
  useLiquidDefs();
  const [focus, setFocus] = useState(false);
  const generated = useId();
  const uid = id || generated;

  const shared = {
    id: uid,
    required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...controlBase(focus, error, rest.disabled, multiline ? 24 : 999),
      resize: multiline ? ('vertical' as const) : undefined,
      ...style,
    },
  };

  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      required={requiredMark ?? required}
      htmlFor={uid}
    >
      {multiline ? (
        <textarea
          rows={rows}
          {...shared}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input {...shared} {...rest} />
      )}
    </Field>
  );
}
