import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import {parseLevels, formatNumber} from './parse';
import styles from './styles.module.css';

const WIDTH = 720;
const AXIS = 86;
const TOP = 22;
const ROW = 38;

export default function LevelLadder({source}: {source: string}) {
  const spec = useMemo(() => parseLevels(source), [source]);
  const [active, setActive] = useState<number | null>(null);

  const lines = spec.items.flatMap((item, index) => (item.type === 'line' ? [{...item, index}] : []));
  const bands = spec.items.flatMap((item, index) => (item.type === 'band' ? [{...item, index}] : []));
  const values = spec.items.flatMap((i) => (i.type === 'line' ? [i.value] : [i.from, i.to]));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const plotHeight = Math.max(200, (lines.length + bands.length) * ROW);
  const height = plotHeight + TOP * 2;
  const y = (v: number) => (max === min ? TOP + plotHeight / 2 : TOP + ((max - v) / (max - min)) * plotHeight);

  // Keep labels readable when two levels sit close together.
  const sorted = [...lines].sort((a, b) => b.value - a.value);
  const labelY = new Map<number, number>();
  let last = -Infinity;
  for (const line of sorted) {
    const next = Math.max(y(line.value), last + 20);
    labelY.set(line.index, next);
    last = next;
  }

  return (
    <figure className={styles.figure} onPointerLeave={() => setActive(null)}>
      {spec.title && (
        <div className={styles.toolbar}>
          <span className={styles.figureTitle}>{spec.title}</span>
        </div>
      )}
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className={clsx(styles.svg, styles.wide)}
        role="img"
        aria-label={spec.title || 'Price levels'}>
        <line x1={AXIS} x2={AXIS} y1={TOP - 8} y2={TOP + plotHeight + 8} className={styles.axisLine} />
        {bands.map((b) => {
          const top = y(Math.max(b.from, b.to));
          const h = Math.abs(y(b.from) - y(b.to));
          return (
            <g
              key={b.index}
              className={clsx(styles.ladderRow, {[styles.dimmed]: active !== null && active !== b.index})}
              onPointerEnter={() => setActive(b.index)}
              onPointerDown={() => setActive(b.index)}>
              <rect
                x={AXIS}
                y={top}
                width={WIDTH - AXIS - 8}
                height={h}
                className={clsx(styles.band, styles[`tone_${b.tone}`])}
              />
              <text
                x={WIDTH - 18}
                y={top + h / 2 + 4}
                textAnchor="end"
                className={clsx(styles.bandLabel, styles[`toneText_${b.tone}`])}>
                {b.label}
              </text>
            </g>
          );
        })}
        {lines.map((l) => {
          const ly = y(l.value);
          const ty = labelY.get(l.index) ?? ly;
          return (
            <g
              key={l.index}
              className={clsx(styles.ladderRow, {[styles.dimmed]: active !== null && active !== l.index})}
              onPointerEnter={() => setActive(l.index)}
              onPointerDown={() => setActive(l.index)}>
              <rect x={0} y={ty - 14} width={WIDTH} height={22} fill="transparent" />
              <line
                x1={AXIS}
                x2={WIDTH - 8}
                y1={ly}
                y2={ly}
                className={clsx(styles.ladderLine, styles[`toneStroke_${l.tone}`])}
              />
              <circle cx={AXIS} cy={ly} r={active === l.index ? 6 : 4} className={styles[`toneFill_${l.tone}`]} />
              <text x={AXIS - 12} y={ty + 4} textAnchor="end" className={styles.ladderValue}>
                {formatNumber(l.value)}
                {spec.unit}
              </text>
              <text x={AXIS + 14} y={ty - 5} className={styles.ladderLabel}>
                <tspan className={styles[`toneText_${l.tone}`]}>{l.label}</tspan>
                {l.note && <tspan className={styles.ladderNote}>{`  ${l.note}`}</tspan>}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
