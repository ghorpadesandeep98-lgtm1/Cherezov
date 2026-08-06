'use client';

import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
  z: number;
  k: number;
  sp: number;
  fx: number;
  fy: number;
  fz: number;
};

/**
 * Ядро-мозг: точки набраны по силуэту мозга (контур, борозды коры, ствол),
 * связаны нейронными линиями и медленно покачиваются. При наведении все точки
 * разлетаются по всей ширине секции, связи гаснут; при уходе курсора мозг
 * собирается обратно.
 */
export function BrainCore({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    // силуэт мозга (вид сбоку) → маска, по которой рассыпаем точки
    const MW = 1000;
    const MH = 800;
    const mk = document.createElement('canvas');
    mk.width = MW;
    mk.height = MH;
    const mc = mk.getContext('2d');
    if (!mc) return;

    const brain = new Path2D();
    brain.moveTo(146, 392);
    brain.bezierCurveTo(126, 296, 186, 196, 288, 156);
    brain.bezierCurveTo(340, 136, 386, 146, 414, 128);
    brain.bezierCurveTo(452, 104, 516, 100, 556, 128);
    brain.bezierCurveTo(596, 104, 660, 108, 692, 146);
    brain.bezierCurveTo(760, 150, 826, 200, 852, 268);
    brain.bezierCurveTo(878, 336, 858, 400, 812, 436);
    brain.bezierCurveTo(830, 470, 818, 512, 782, 534);
    brain.bezierCurveTo(742, 558, 686, 552, 656, 526);
    brain.bezierCurveTo(636, 556, 596, 570, 556, 566);
    brain.bezierCurveTo(540, 604, 486, 626, 430, 610);
    brain.bezierCurveTo(370, 592, 330, 546, 322, 500);
    brain.bezierCurveTo(258, 490, 190, 462, 162, 428);
    brain.bezierCurveTo(150, 414, 146, 402, 146, 392);

    const stem = new Path2D();
    stem.moveTo(600, 548);
    stem.bezierCurveTo(616, 616, 604, 672, 570, 700);
    stem.bezierCurveTo(546, 668, 552, 604, 560, 546);
    stem.closePath();

    mc.fillStyle = '#000';
    mc.fill(brain);
    mc.fill(stem);
    const md = mc.getImageData(0, 0, MW, MH).data;
    const solid = (x: number, y: number) => md[((y | 0) * MW + (x | 0)) * 4 + 3] > 128;

    mc.clearRect(0, 0, MW, MH);
    mc.lineWidth = 5;
    mc.strokeStyle = '#000';
    mc.stroke(brain);
    mc.stroke(stem);

    // борозды коры
    const sulci = [
      [
        [200, 360],
        [268, 286],
        [356, 268],
        [430, 224],
      ],
      [
        [214, 432],
        [300, 392],
        [392, 382],
        [456, 336],
      ],
      [
        [418, 166],
        [452, 246],
        [520, 286],
        [600, 282],
      ],
      [
        [566, 148],
        [586, 232],
        [652, 278],
        [742, 268],
      ],
      [
        [676, 190],
        [724, 246],
        [790, 262],
      ],
      [
        [268, 268],
        [300, 338],
        [286, 404],
      ],
      [
        [470, 352],
        [540, 392],
        [620, 388],
        [684, 352],
      ],
      [
        [372, 478],
        [440, 506],
        [520, 500],
        [576, 464],
      ],
      [
        [700, 436],
        [746, 470],
        [790, 478],
      ],
      [
        [330, 532],
        [400, 566],
        [470, 568],
      ],
    ];
    for (const s of sulci) {
      mc.beginPath();
      mc.moveTo(s[0][0], s[0][1]);
      for (let i = 1; i < s.length; i++) mc.lineTo(s[i][0], s[i][1]);
      mc.stroke();
    }
    const ed = mc.getImageData(0, 0, MW, MH).data;
    const edge = (x: number, y: number) => ed[((y | 0) * MW + (x | 0)) * 4 + 3] > 100;

    const nx = (x: number) => (x - 500) / 380;
    const ny = (y: number) => (y - 400) / 380;

    const pts: Point[] = [];
    let guard = 0;
    while (pts.length < 620 && guard++ < 120000) {
      const x = rnd(120, 880);
      const y = rnd(100, 700);
      if (!solid(x, y)) continue;
      if (Math.random() > 0.34) continue;
      pts.push({ x: nx(x), y: ny(y), z: rnd(-0.34, 0.34) } as Point);
    }
    guard = 0;
    while (pts.length < 1080 && guard++ < 200000) {
      const x = rnd(120, 880);
      const y = rnd(100, 700);
      if (!edge(x, y)) continue;
      pts.push({ x: nx(x), y: ny(y), z: rnd(-0.16, 0.16) } as Point);
    }

    const N = pts.length;
    for (const p of pts) {
      p.k = 0;
      p.sp = rnd(0.5, 1);
      p.fx = rnd(-0.97, 0.97);
      p.fy = rnd(-0.95, 0.95);
      p.fz = rnd(-0.6, 0.6);
    }

    const links: [number, number][] = [];
    for (let i = 0; i < N && links.length < 1500; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = pts[i];
        const b = pts[j];
        const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
        if (d < 0.0022) {
          links.push([i, j]);
          break;
        }
      }
    }

    let hovered = false;
    let t = 0;
    let raf = 0;
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    cvs.addEventListener('mouseenter', onEnter);
    cvs.addEventListener('mouseleave', onLeave);

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cvs.clientWidth;
      const h = cvs.clientHeight;
      if (cvs.width !== w * dpr || cvs.height !== h * dpr) {
        cvs.width = w * dpr;
        cvs.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (!reduce) t += 0.0032;

      const wide = w > 900;
      const scale = Math.min(wide ? w * 0.26 : w * 0.44, h * 0.44);
      const cx = wide ? w * 0.735 : w / 2;
      const cy = h / 2;
      const sway = reduce ? 0 : Math.sin(t * 2.4) * 0.16;
      const cos = Math.cos(sway);
      const sin = Math.sin(sway);

      let open = 0;
      const proj = pts.map((p) => {
        p.k += ((hovered ? 1 : 0) - p.k) * (hovered ? 0.045 * p.sp : 0.055);
        open += p.k;
        const k = p.k;
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;
        const per = 2.9 / (2.9 + rz);
        const bx = cx + rx * scale * per;
        const by = cy + p.y * scale * per;
        const tx = w / 2 + p.fx * (w / 2) * 0.97;
        const ty = h / 2 + p.fy * (h / 2) * 0.95;
        return {
          sx: bx + (tx - bx) * k,
          sy: by + (ty - by) * k,
          d: rz,
          per: per + (1 - per) * k * 0.6,
          k,
        };
      });
      open /= N;

      ctx.lineWidth = 1;
      for (const [i, j] of links) {
        const a = proj[i];
        const b = proj[j];
        const al = (1 - open) * 0.4 * (0.4 + 0.6 * a.per);
        if (al < 0.012) continue;
        ctx.strokeStyle = 'rgba(34,174,107,' + al.toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      for (const p of proj) {
        const r = (1.05 + 1.5 * (p.per - 0.78)) * (1 + p.k * 0.5);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.7, r), 0, 6.2832);
        ctx.fillStyle =
          p.d < 0
            ? 'rgba(197,245,140,' + (0.7 + 0.3 * p.per).toFixed(2) + ')'
            : 'rgba(63,203,132,' + (0.4 + 0.4 * p.per).toFixed(2) + ')';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      cvs.removeEventListener('mouseenter', onEnter);
      cvs.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
