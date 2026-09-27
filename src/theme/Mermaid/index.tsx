import React, {useEffect, useMemo, useRef, useState} from 'react';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {ErrorBoundaryErrorMessageFallback, useColorMode} from '@docusaurus/theme-common';
import {
  MermaidContainerClassName,
  useMermaidConfig,
} from '@docusaurus/theme-mermaid/client';
import type MermaidType from '@theme/Mermaid';
import type {WrapperProps} from '@docusaurus/types';
import type {MermaidConfig, RenderResult} from 'mermaid';
import XYChart from '@site/src/components/charts/XYChart';
import {isXYChart} from '@site/src/components/charts/parse';

type Props = WrapperProps<typeof MermaidType>;

// Mermaid is a mutable singleton: overlapping initialize/render calls on first
// page load can return an empty SVG, so every diagram renders one at a time.
let queue: Promise<unknown> = Promise.resolve();

function renderQueued(id: string, text: string, config: MermaidConfig): Promise<RenderResult> {
  const job = queue.then(async () => {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize(config);
    try {
      return await mermaid.render(id, text);
    } catch (e) {
      document.querySelector(`#d${id}`)?.remove();
      throw e;
    }
  });
  queue = job.catch(() => undefined);
  return job;
}

// Both modes use Mermaid's 'base' theme, which is the only one that reads themeVariables.
const themeVariables: Record<'light' | 'dark', MermaidConfig['themeVariables']> = {
  light: {
    darkMode: false,
    background: '#ffffff',
    primaryColor: '#e3f3ec',
    primaryBorderColor: '#0f7a5f',
    primaryTextColor: '#102a23',
    secondaryColor: '#fff4e0',
    tertiaryColor: '#eef2ff',
    textColor: '#1f2933',
    lineColor: '#5b6b7d',
    edgeLabelBackground: '#ffffff',
    quadrant1Fill: '#bbf7d0',
    quadrant2Fill: '#e7f8ee',
    quadrant3Fill: '#fdecea',
    quadrant4Fill: '#fecaca',
    quadrant1TextFill: '#14532d',
    quadrant2TextFill: '#166534',
    quadrant3TextFill: '#991b1b',
    quadrant4TextFill: '#7f1d1d',
    quadrantPointFill: '#0f7a5f',
    quadrantPointTextFill: '#102a23',
    quadrantTitleFill: '#102a23',
    quadrantXAxisTextFill: '#1f2933',
    quadrantYAxisTextFill: '#1f2933',
    quadrantInternalBorderStrokeFill: '#cbd5e1',
    quadrantExternalBorderStrokeFill: '#94a3b8',
    fontSize: '15px',
  },
  dark: {
    darkMode: true,
    background: '#151b1f',
    primaryColor: '#173a2f',
    primaryBorderColor: '#3ddc97',
    primaryTextColor: '#e8f5ef',
    secondaryColor: '#3a2a0c',
    tertiaryColor: '#1e2a36',
    textColor: '#d9e1e4',
    lineColor: '#8fa3b3',
    edgeLabelBackground: '#1f2a30',
    quadrant1Fill: '#14432f',
    quadrant2Fill: '#172b23',
    quadrant3Fill: '#2d1b1b',
    quadrant4Fill: '#4a1d1d',
    quadrant1TextFill: '#bbf7d0',
    quadrant2TextFill: '#a7e3c0',
    quadrant3TextFill: '#f5b5b5',
    quadrant4TextFill: '#fecaca',
    quadrantPointFill: '#3ddc97',
    quadrantPointTextFill: '#e8f5ef',
    quadrantTitleFill: '#f1f5f4',
    quadrantXAxisTextFill: '#d9e1e4',
    quadrantYAxisTextFill: '#d9e1e4',
    quadrantInternalBorderStrokeFill: '#334155',
    quadrantExternalBorderStrokeFill: '#475569',
    fontSize: '15px',
  },
};

function MermaidDiagram({value}: {value: string}): React.JSX.Element | null {
  const {colorMode} = useColorMode();
  const siteConfig = useMermaidConfig();
  const config = useMemo(
    () => ({...siteConfig, theme: 'base' as const, themeVariables: themeVariables[colorMode]}),
    [siteConfig, colorMode],
  );
  const [id] = useState(() => `mermaid-svg-${Math.round(Math.random() * 1e7)}`);
  const [result, setResult] = useState<RenderResult | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    renderQueued(id, value, config)
      .then((r) => active && setResult(r))
      .catch((e) => {
        if (active) {
          setResult(() => {
            throw e;
          });
        }
      });
    return () => {
      active = false;
    };
  }, [id, value, config]);

  useEffect(() => {
    if (result && ref.current) result.bindFunctions?.(ref.current);
  }, [result]);

  if (!result) return null;
  return (
    <div
      ref={ref}
      className={MermaidContainerClassName}
      dangerouslySetInnerHTML={{__html: result.svg}}
    />
  );
}

export default function MermaidWrapper(props: Props): React.JSX.Element {
  if (isXYChart(props.value)) return <XYChart source={props.value} />;
  return (
    <ErrorBoundary fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}>
      <MermaidDiagram value={props.value} />
    </ErrorBoundary>
  );
}
