export type Tone = 'good' | 'bad' | 'info' | 'warn' | 'neutral';

const TONES: Tone[] = ['good', 'bad', 'info', 'warn', 'neutral'];

function toTone(value: string | undefined): Tone {
  const tone = value?.trim().toLowerCase() as Tone | undefined;
  return tone && TONES.includes(tone) ? tone : 'neutral';
}

function toNumber(value: string): number {
  return Number(value.replace(/,/g, ''));
}

/* ---------- candles ---------- */

export type Candle = {
  open: number;
  high: number;
  low: number;
  close: number;
  label: string;
};

export type Level = {value: number; label: string; tone: Tone};
export type Zone = {from: number; to: number; label: string; tone: Tone};

export type CandlePanel = {
  title: string;
  candles: (Candle | null)[];
  levels: Level[];
  zones: Zone[];
};

export type CandleSpec = {
  title: string;
  axis: boolean;
  panels: CandlePanel[];
};

/**
 * Syntax, one item per line:
 *   title: Caption for the whole figure
 *   axis: true                      show the price scale
 *   panel: Name                     start a new side-by-side panel
 *   candle: open high low close [label]
 *   gap                             an empty slot (for gaps between sessions)
 *   level: price label [| tone]
 *   zone: from to label [| tone]
 */
export function parseCandles(source: string): CandleSpec {
  const spec: CandleSpec = {title: '', axis: false, panels: []};
  let panel: CandlePanel | null = null;
  const current = (): CandlePanel => {
    if (!panel) {
      panel = {title: '', candles: [], levels: [], zones: []};
      spec.panels.push(panel);
    }
    return panel;
  };

  for (const raw of source.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const [key, ...restParts] = line.split(':');
    const rest = restParts.join(':').trim();
    switch (key.trim().toLowerCase()) {
      case 'title':
        spec.title = rest;
        break;
      case 'axis':
        spec.axis = rest.toLowerCase() !== 'false';
        break;
      case 'panel':
        panel = {title: rest, candles: [], levels: [], zones: []};
        spec.panels.push(panel);
        break;
      case 'candle': {
        const parts = rest.split(/\s+/);
        const [open, high, low, close] = parts.slice(0, 4).map(toNumber);
        current().candles.push({open, high, low, close, label: parts.slice(4).join(' ')});
        break;
      }
      case 'gap':
        current().candles.push(null);
        break;
      case 'level': {
        const [body, tone] = rest.split('|');
        const [value, ...label] = body.trim().split(/\s+/);
        current().levels.push({value: toNumber(value), label: label.join(' '), tone: toTone(tone)});
        break;
      }
      case 'zone': {
        const [body, tone] = rest.split('|');
        const [from, to, ...label] = body.trim().split(/\s+/);
        current().zones.push({
          from: toNumber(from),
          to: toNumber(to),
          label: label.join(' '),
          tone: toTone(tone),
        });
        break;
      }
      default:
        break;
    }
  }
  return spec;
}

/* ---------- xychart-beta (the subset used in the lessons) ---------- */

export type Series = {kind: 'line' | 'bar'; name: string; values: number[]};

export type XYSpec = {
  title: string;
  xTitle: string;
  xLabels: string[];
  yTitle: string;
  yMin: number | null;
  yMax: number | null;
  series: Series[];
};

function parseList(text: string): string[] {
  const inner = text.slice(text.indexOf('[') + 1, text.lastIndexOf(']'));
  const items: string[] = [];
  const re = /"([^"]*)"|([^,\s][^,]*)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(inner))) {
    items.push((match[1] ?? match[2]).trim());
  }
  return items;
}

function leadingTitle(text: string): string {
  const match = /^\s*"([^"]*)"/.exec(text);
  return match ? match[1] : '';
}

export function isXYChart(source: string): boolean {
  return /^\s*xychart(-beta)?\b/.test(source);
}

export function parseXYChart(source: string): XYSpec {
  const spec: XYSpec = {
    title: '',
    xTitle: '',
    xLabels: [],
    yTitle: '',
    yMin: null,
    yMax: null,
    series: [],
  };
  for (const raw of source.split('\n').slice(1)) {
    const line = raw.trim();
    if (line.startsWith('title')) {
      spec.title = leadingTitle(line.slice(5)) || line.slice(5).trim();
    } else if (line.startsWith('x-axis')) {
      const rest = line.slice(6);
      spec.xTitle = leadingTitle(rest);
      if (rest.includes('[')) spec.xLabels = parseList(rest);
    } else if (line.startsWith('y-axis')) {
      const rest = line.slice(6);
      spec.yTitle = leadingTitle(rest);
      const range = /(-?[\d.]+)\s*-->\s*(-?[\d.]+)/.exec(rest);
      if (range) {
        spec.yMin = Number(range[1]);
        spec.yMax = Number(range[2]);
      }
    } else if (line.startsWith('line') || line.startsWith('bar')) {
      const kind = line.startsWith('line') ? 'line' : 'bar';
      const rest = line.slice(kind.length);
      spec.series.push({kind, name: leadingTitle(rest), values: parseList(rest).map(Number)});
    }
  }
  const count = Math.max(0, ...spec.series.map((s) => s.values.length));
  if (spec.xLabels.length < count) {
    spec.xLabels = Array.from({length: count}, (_, i) => spec.xLabels[i] ?? String(i + 1));
  }
  return spec;
}

/* ---------- levels ---------- */

export type LadderItem =
  | {type: 'line'; value: number; label: string; note: string; tone: Tone}
  | {type: 'band'; from: number; to: number; label: string; tone: Tone};

export type LadderSpec = {title: string; unit: string; items: LadderItem[]};

/**
 * Syntax, one item per line:
 *   title: Caption
 *   price | label | note | tone     a horizontal level
 *   band: from to | label | tone    a shaded zone between two prices
 */
export function parseLevels(source: string): LadderSpec {
  const spec: LadderSpec = {title: '', unit: '', items: []};
  for (const raw of source.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (/^title:/i.test(line)) {
      spec.title = line.slice(6).trim();
    } else if (/^unit:/i.test(line)) {
      spec.unit = line.slice(5).trim();
    } else if (/^band:/i.test(line)) {
      const [range, label = '', tone] = line.slice(5).split('|').map((p) => p.trim());
      const [from, to] = range.split(/\s+/).map(toNumber);
      spec.items.push({type: 'band', from, to, label, tone: toTone(tone)});
    } else {
      const [value, label = '', note = '', tone] = line.split('|').map((p) => p.trim());
      spec.items.push({type: 'line', value: toNumber(value), label, note, tone: toTone(tone)});
    }
  }
  return spec;
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '';
  const rounded = Math.abs(value) >= 100 ? Math.round(value) : Math.round(value * 100) / 100;
  return rounded.toLocaleString('en-IN');
}
