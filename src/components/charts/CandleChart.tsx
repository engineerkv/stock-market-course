import React, {useCallback, useMemo, useRef, useState} from 'react';
import type {CandlestickData, Time, WhitespaceData, IChartApi, ISeriesApi} from 'lightweight-charts';
import {parseCandles, formatNumber, type Candle, type CandlePanel} from './parse';
import {baseOptions, useLightweightChart} from './lightweight';
import styles from './styles.module.css';

type Hover = {panel: string; candle: Candle; index: number} | null;
type Controls = {replay: () => void; reset: () => void};

function describe(c: Candle): string {
  const change = c.close - c.open;
  const sign = change > 0 ? '+' : change < 0 ? '−' : '±';
  return `Open ${formatNumber(c.open)} · High ${formatNumber(c.high)} · Low ${formatNumber(
    c.low,
  )} · Close ${formatNumber(c.close)} (${sign}${formatNumber(Math.abs(change))})`;
}

/** Shows a short pattern in the middle of the panel at a readable width. */
function visibleRange(count: number) {
  const pad = (Math.max(count + 2, 7) - count) / 2;
  return {from: -pad, to: count - 1 + pad};
}

function priceRange(panel: CandlePanel): [number, number] {
  const values: number[] = [];
  panel.candles.forEach((c) => c && values.push(c.high, c.low));
  panel.levels.forEach((l) => values.push(l.value));
  panel.zones.forEach((z) => values.push(z.from, z.to));
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const pad = (max - min) * 0.1;
  return [min - pad, max + pad];
}

function Panel({
  panel,
  axis,
  onHover,
  register,
}: {
  panel: CandlePanel;
  axis: boolean;
  onHover: (h: Hover) => void;
  register: (c: Controls) => void;
}) {
  const hoverRef = useRef(onHover);
  hoverRef.current = onHover;
  const registerRef = useRef(register);
  registerRef.current = register;

  const ref = useLightweightChart(
    (lw, container, palette) => {
      const count = panel.candles.length;
      const labels = panel.candles.map((c) => c?.label ?? '');
      const showScale = axis || panel.levels.length > 0 || panel.zones.length > 0;
      const options = baseOptions(lw, palette, labels, {priceScale: showScale, timeScale: false});
      const chart: IChartApi = lw.createChart(container, {
        ...options,
        rightPriceScale: {...options.rightPriceScale, scaleMargins: {top: 0.08, bottom: 0.16}},
        timeScale: {...options.timeScale, fixLeftEdge: false, fixRightEdge: false},
      });
      const series: ISeriesApi<'Candlestick'> = chart.addSeries(lw.CandlestickSeries, {
        upColor: palette.bull,
        downColor: palette.bear,
        borderUpColor: palette.bull,
        borderDownColor: palette.bear,
        wickUpColor: palette.bull,
        wickDownColor: palette.bear,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      const [min, max] = priceRange(panel);
      series.applyOptions({autoscaleInfoProvider: () => ({priceRange: {minValue: min, maxValue: max}})});

      const timeOf = (i: number) => (i + 1) as Time;
      const full: (CandlestickData | WhitespaceData)[] = panel.candles.map((c, i) =>
        c ? {time: timeOf(i), open: c.open, high: c.high, low: c.low, close: c.close} : {time: timeOf(i)},
      );
      const upTo = (shown: number) => full.map((d, i) => (i < shown ? d : {time: d.time}));
      const fit = () => chart.timeScale().setVisibleLogicalRange(visibleRange(count));
      series.setData(full);

      lw.createSeriesMarkers(
        series,
        panel.candles.flatMap((c, i) =>
          c?.label
            ? [{time: timeOf(i), position: 'belowBar' as const, shape: 'arrowUp' as const, color: palette.muted, size: 0.6, text: c.label}]
            : [],
        ),
      );
      panel.levels.forEach((l) =>
        series.createPriceLine({
          price: l.value,
          color: palette.tone[l.tone],
          lineWidth: 2,
          lineStyle: lw.LineStyle.Dashed,
          axisLabelVisible: true,
          title: l.label,
        }),
      );
      panel.zones.forEach((z) => {
        [z.from, z.to].forEach((price, k) =>
          series.createPriceLine({
            price,
            color: palette.tone[z.tone],
            lineWidth: 1,
            lineStyle: lw.LineStyle.Dotted,
            axisLabelVisible: true,
            title: k === 1 ? z.label : '',
          }),
        );
      });
      fit();

      chart.subscribeCrosshairMove((param) => {
        const index = param.time === undefined ? -1 : Number(param.time) - 1;
        const candle = panel.candles[index];
        hoverRef.current(candle ? {panel: panel.title, candle, index} : null);
      });

      let timer: ReturnType<typeof setInterval> | undefined;
      registerRef.current({
        replay: () => {
          clearInterval(timer);
          let shown = 0;
          series.setData(upTo(0));
          timer = setInterval(() => {
            shown += 1;
            series.setData(upTo(shown));
            if (shown >= panel.candles.length) clearInterval(timer);
          }, 450);
        },
        reset: () => {
          fit();
          chart.priceScale('right').applyOptions({autoScale: true});
        },
      });

      return () => {
        clearInterval(timer);
        chart.remove();
      };
    },
    [panel, axis],
  );

  return (
    <div className={styles.candlePanel}>
      {panel.title && <div className={styles.panelTitle}>{panel.title}</div>}
      <div ref={ref} className={styles.candleCanvas} />
    </div>
  );
}

export default function CandleChart({source}: {source: string}) {
  const spec = useMemo(() => parseCandles(source), [source]);
  const [hover, setHover] = useState<Hover>(null);
  const controls = useRef<Controls[]>([]);
  const longest = Math.max(0, ...spec.panels.map((p) => p.candles.length));
  const register = useCallback((i: number) => (c: Controls) => {
    controls.current[i] = c;
  }, []);

  return (
    <figure className={styles.figure}>
      <div className={styles.toolbar}>
        <span className={styles.figureTitle}>{spec.title}</span>
        <span className={styles.buttons}>
          {longest > 1 && (
            <button type="button" className={styles.button} onClick={() => controls.current.forEach((c) => c?.replay())}>
              ▶ Replay
            </button>
          )}
          <button type="button" className={styles.button} onClick={() => controls.current.forEach((c) => c?.reset())}>
            ⟲ Reset view
          </button>
        </span>
      </div>
      <div className={styles.candlePanels}>
        {spec.panels.map((panel, i) => (
          <Panel key={i} panel={panel} axis={spec.axis} onHover={setHover} register={register(i)} />
        ))}
      </div>
      <figcaption className={styles.info}>
        {hover ? (
          <>
            <strong>
              {[hover.panel, hover.candle.label || `candle ${hover.index + 1}`].filter(Boolean).join(', ')}:
            </strong>{' '}
            {describe(hover.candle)}
          </>
        ) : (
          'Hover over or tap a candle to see its open, high, low, and close. Drag to pan, pinch or drag the price axis to zoom.'
        )}
      </figcaption>
    </figure>
  );
}
