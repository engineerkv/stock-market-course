import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import type {WrapperProps} from '@docusaurus/types';
import CandleChart from '@site/src/components/charts/CandleChart';
import LevelLadder from '@site/src/components/charts/LevelLadder';

type Props = WrapperProps<typeof CodeBlockType>;

function language(className: string | undefined): string | undefined {
  return /language-([\w-]+)/.exec(className ?? '')?.[1];
}

export default function CodeBlockWrapper(props: Props): React.JSX.Element {
  const lang = language(props.className);
  const source = typeof props.children === 'string' ? props.children : null;
  if (source !== null && lang === 'candles') return <CandleChart source={source} />;
  if (source !== null && lang === 'levels') return <LevelLadder source={source} />;
  return <CodeBlock {...props} />;
}
