import React, {useMemo, useRef, useState} from 'react';
import type {ISeriesApi, SeriesType, Time} from 'lightweight-charts';
import {parseXYChart, formatNumber, type Series} from './parse';
import {baseOptions, useLightweightChart, withAlpha} from './lightweight';
import styles from './styles.module.css';

type Role = 'main' | 'bar' | 'level' | 'guide';
type Prepared = Series & {role: Role; colorIndex: number; label: string};
type Readout = {label: string; rows: {name: string; color: string; value: number}[]} | null;

function isFlat(values: number[]): boolean {
  return values.every((v) => v === values[0]);
}

function isStraight(values: number[]): boolean {
  if (values.length < 2) return false;
  const step = values[1] - values[0];
  return values.every((v, i) => i === 0 || Math.abs(v - values[i - 1] - step) < 1e-9);
}

function prepare(series: Series[]): Prepared[] {
  const moving = series.filter((s) => s.kind === 'line' && !isFlat(s.values)).length;
  let lineNumber = 0;
  return series.map((s, i) => {
    let role: Role = 'main';
    if (s.kind === 'bar') role = 'bar';
    else if (isFlat(s.values)) role = 'level';
    else if (i > 0 && isStraight(s.values)) role = 'guide';
    if (role === 'main' || role === 'guide') lineNumber += 1;
    const fallback =
      role === 'level'
        ? `Level ${formatNumber(s.values[0])}`
        : role === 'bar' || moving === 1
          ? 'Value'
          : role === 'guide'
            ? `Guide line ${lineNumber}`
            : `Line ${lineNumber}`;
    return {...s, role, colorIndex: i, label: s.name || fallback};
  });
}

/** Named points ("Head", "Wave 3") read better as labels on the line than as axis ticks. */
function usesPointLabels(labels: string[]): boolean {
  return labels.length <= 14 && labels.some((l) => !/^[\d\s.,%()+-]*$/.test(l) && l.length > 3);
}

export default function XYChart({source}: {source: string}) {
  const spec = useMemo(() => parseXYChart(source), [source]);
  const series = useMemo(() => prepare(spec.series), [spec]);
  const [readout, setReadout] = useState<Readout>(null);
  const setReadoutRef = useRef(setReadout);
  const resetRef = useRef<() => void>(() => {});

  const ref = useLightweightChart(
    (lw, container, palette) => {
      const labels = spec.xLabels;
      const pointLabels = usesPointLabels(labels);
      const chart = lw.createChart(container, {
        ...baseOptions(lw, palette, labels, {priceScale: true, timeScale: true}),
        timeScale: {
          visible: true,
          borderVisible: false,
          fixLeftEdge: true,
          fixRightEdge: true,
          lockVisibleTimeRangeOnResize: true,
          tickMarkFormatter: (time: Time) => (pointLabels ? '' : labels[Number(time) - 1] ?? ''),
        },
      });

      const all = spec.series.flatMap((s) => s.values);
      const minValue = spec.yMin ?? Math.min(...all);
      const maxValue = spec.yMax ?? Math.max(...all);
      const autoscale = {autoscaleInfoProvider: () => ({priceRange: {minValue, maxValue}})};
      const quiet = {priceLineVisible: false, lastValueVisible: false, ...autoscale};
      const crossesZero = minValue < 0 && maxValue > 0;
      const color = (s: Prepared) => palette.series[s.colorIndex % palette.series.length];
      const points = (values: number[]) => values.map((value, i) => ({time: (i + 1) as Time, value}));

      const drawn: {s: Prepared; api: ISeriesApi<SeriesType>; color: string}[] = [];
      const mains = series.filter((s) => s.role === 'main');

      series.forEach((s) => {
        if (s.role === 'bar') {
          const api = chart.addSeries(lw.HistogramSeries, {...quiet, color: color(s), base: 0});
          api.setData(
            s.values.map((value, i) => ({
              time: (i + 1) as Time,
              value,
              color: value < 0 ? withAlpha(palette.bear, 0.85) : withAlpha(color(s), 0.85),
            })),
          );
          drawn.push({s, api, color: color(s)});
        } else if (s.role === 'main' && s === mains[0] && crossesZero) {
          const api = chart.addSeries(lw.BaselineSeries, {
            ...quiet,
            baseValue: {type: 'price', price: 0},
            lineWidth: 3,
            topLineColor: palette.bull,
            topFillColor1: withAlpha(palette.bull, 0.35),
            topFillColor2: withAlpha(palette.bull, 0.05),
            bottomLineColor: palette.bear,
            bottomFillColor1: withAlpha(palette.bear, 0.05),
            bottomFillColor2: withAlpha(palette.bear, 0.35),
          });
          api.setData(points(s.values));
          drawn.push({s, api, color: palette.bull});
        } else if (s.role === 'main' && s === mains[0]) {
          const strength = mains.length > 1 ? 0.18 : 0.35;
          const api = chart.addSeries(lw.AreaSeries, {
            ...quiet,
            lineWidth: 3,
            lineColor: color(s),
            topColor: withAlpha(color(s), strength),
            bottomColor: withAlpha(color(s), 0.02),
          });
          api.setData(points(s.values));
          drawn.push({s, api, color: color(s)});
        } else if (s.role === 'main' || s.role === 'guide') {
          const api = chart.addSeries(lw.LineSeries, {
            ...quiet,
            color: color(s),
            lineWidth: s.role === 'guide' ? 2 : 3,
            lineStyle: s.role === 'guide' ? lw.LineStyle.Dashed : lw.LineStyle.Solid,
            crosshairMarkerVisible: s.role !== 'guide',
          });
          api.setData(points(s.values));
          drawn.push({s, api, color: color(s)});
        }
      });

      const host = drawn[0]?.api;
      if (host) {
        series
          .filter((s) => s.role === 'level')
          .forEach((s) =>
            host.createPriceLine({
              price: s.values[0],
              color: color(s),
              lineWidth: 2,
              lineStyle: lw.LineStyle.Dashed,
              axisLabelVisible: true,
              title: s.name,
            }),
          );
      }

      const first = drawn.find((d) => d.s.role === 'main');
      if (first && pointLabels) {
        const values = first.s.values;
        lw.createSeriesMarkers(
          first.api,
          values.flatMap((v, i) => {
            if (!labels[i]?.trim()) return [];
            const neighbours = [values[i - 1], values[i + 1]].filter((n) => n !== undefined);
            const isLow = neighbours.length > 0 && neighbours.every((n) => n >= v);
            return [{
              time: (i + 1) as Time,
              position: isLow ? ('belowBar' as const) : ('aboveBar' as const),
              shape: 'circle' as const,
              size: 0.5,
              color: first.color,
              text: labels[i],
            }];
          }),
        );
      }

      chart.timeScale().fitContent();
      chart.subscribeCrosshairMove((param) => {
        if (param.time === undefined) {
          setReadoutRef.current(null);
          return;
        }
        const index = Number(param.time) - 1;
        setReadoutRef.current({
          label: labels[index] ?? '',
          rows: series
            .filter((s) => s.values[index] !== undefined)
            .map((s) => ({
              name: s.label,
              color: drawn.find((d) => d.s === s)?.color ?? color(s),
              value: s.values[index],
            })),
        });
      });
      resetRef.current = () => {
        chart.timeScale().fitContent();
        chart.priceScale('right').applyOptions({autoScale: true});
      };
      return () => chart.remove();
    },
    [spec, series],
  );

  return (
    <figure className={styles.figure}>
      <div className={styles.toolbar}>
        <span className={styles.figureTitle}>{spec.title || spec.yTitle}</span>
        <button type="button" className={styles.button} onClick={() => resetRef.current()}>
          ⟲ Reset view
        </button>
      </div>
      <div ref={ref} className={styles.xyCanvas} />
      {spec.xTitle && <div className={styles.axisCaption}>{spec.xTitle}</div>}
      <figcaption className={styles.legend}>
        {readout ? (
          <>
            <strong>{readout.label}</strong>
            {readout.rows.map((r) => (
              <span key={r.name} className={styles.legendItem}>
                <span className={styles.swatch} style={{background: r.color}} />
                {r.name}: {formatNumber(r.value)}
              </span>
            ))}
          </>
        ) : series.length > 1 ? (
          series.map((s) => (
            <span key={s.label + s.colorIndex} className={styles.legendItem}>
              <span
                className={`${s.role === 'level' || s.role === 'guide' ? styles.swatchDashed : styles.swatch} ${
                  styles[`fill_c${(s.colorIndex % 6) + 1}`]
                }`}
              />
              {s.label}
            </span>
          ))
        ) : (
          <span>Hover over or tap the chart to read the values. Drag to pan, pinch or drag an axis to zoom.</span>
        )}
      </figcaption>
    </figure>
  );
}
