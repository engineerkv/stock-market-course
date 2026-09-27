import {useEffect, useRef} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import type {DeepPartial, ChartOptions, Time} from 'lightweight-charts';
import {formatNumber, type Tone} from './parse';

export type LW = typeof import('lightweight-charts');

export type Palette = {
  bull: string;
  bear: string;
  text: string;
  muted: string;
  grid: string;
  series: string[];
  tone: Record<Tone, string>;
};

const LIGHT: Palette = {
  bull: '#16a34a',
  bear: '#dc2626',
  text: '#334155',
  muted: '#64748b',
  grid: 'rgba(100, 116, 139, 0.14)',
  series: ['#2563eb', '#f59e0b', '#7c3aed', '#0d9488', '#db2777', '#65a30d'],
  tone: {good: '#16a34a', bad: '#dc2626', info: '#2563eb', warn: '#d97706', neutral: '#64748b'},
};

const DARK: Palette = {
  bull: '#22c55e',
  bear: '#ef4444',
  text: '#cbd5e1',
  muted: '#94a3b8',
  grid: 'rgba(148, 163, 184, 0.14)',
  series: ['#60a5fa', '#fbbf24', '#a78bfa', '#2dd4bf', '#f472b6', '#a3e635'],
  tone: {good: '#22c55e', bad: '#f87171', info: '#60a5fa', warn: '#fbbf24', neutral: '#94a3b8'},
};

export function withAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Bars are placed at times 1, 2, 3, ... and the labels are looked up by that index. */
export function labelFor(labels: string[], time: Time): string {
  return labels[Number(time) - 1] ?? '';
}

export function baseOptions(
  lw: LW,
  palette: Palette,
  labels: string[],
  {priceScale, timeScale}: {priceScale: boolean; timeScale: boolean},
): DeepPartial<ChartOptions> {
  return {
    autoSize: true,
    layout: {
      background: {type: lw.ColorType.Solid, color: 'transparent'},
      textColor: palette.text,
      fontSize: 12,
      fontFamily: '"Inter Variable", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      attributionLogo: true,
    },
    grid: {vertLines: {color: palette.grid}, horzLines: {color: palette.grid}},
    rightPriceScale: {visible: priceScale, borderVisible: false, scaleMargins: {top: 0.1, bottom: 0.1}},
    timeScale: {
      visible: timeScale,
      borderVisible: false,
      fixLeftEdge: true,
      fixRightEdge: true,
      lockVisibleTimeRangeOnResize: true,
      tickMarkFormatter: (time: Time) => labelFor(labels, time),
    },
    localization: {
      timeFormatter: (time: Time) => labelFor(labels, time),
      priceFormatter: formatNumber,
    },
    crosshair: {mode: lw.CrosshairMode.Normal},
    // The wheel keeps scrolling the page; drag to pan, pinch or drag an axis to zoom.
    handleScroll: {mouseWheel: false, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: false},
    handleScale: {mouseWheel: false, pinch: true, axisPressedMouseMove: true, axisDoubleClickReset: true},
  };
}

/**
 * Loads lightweight-charts in the browser only, and rebuilds the chart when the
 * colour mode or the inputs change. `build` returns its own cleanup.
 */
export function useLightweightChart(
  build: (lw: LW, container: HTMLDivElement, palette: Palette) => () => void,
  deps: unknown[],
) {
  const ref = useRef<HTMLDivElement>(null);
  const {colorMode} = useColorMode();
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import('lightweight-charts').then((lw) => {
      if (disposed || !ref.current) return;
      cleanup = build(lw, ref.current, colorMode === 'dark' ? DARK : LIGHT);
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode, ...deps]);
  return ref;
}
