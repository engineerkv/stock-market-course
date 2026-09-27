import type {CSSProperties, ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

type Card = {title: string; to: string; body: string};

// Heights, offsets and colours for the decorative candle strip in the hero.
const heroCandles: [number, number, 'up' | 'down'][] = [
  [26, 6, 'down'], [34, 0, 'up'], [22, 18, 'up'], [40, 14, 'up'], [18, 38, 'down'],
  [30, 26, 'up'], [46, 30, 'up'], [20, 58, 'down'], [36, 48, 'up'], [52, 50, 'up'],
];

const cards: Card[] = [
  {
    title: 'Step 1: Foundations',
    to: '/course/foundations',
    body: 'Trend, support and resistance, moving averages, oscillators, and position sizing.',
  },
  {
    title: 'Step 2: Candlesticks',
    to: '/course/candlesticks',
    body: 'Single, two-candle, and three-candle patterns, and when to ignore them.',
  },
  {
    title: 'Step 3: Chart patterns',
    to: '/course/chart-patterns',
    body: 'Reversal and continuation shapes, and how to measure their targets.',
  },
  {
    title: 'Step 4: Price action',
    to: '/course/price-action',
    body: 'Accumulation, failed breakouts, mother candles, gaps, and confirming indicators.',
  },
  {
    title: 'Step 5: Wave setups',
    to: '/course/wave-setups',
    body: 'Judge whether a trend is young or tired, and trade the wave setups with a clear stop.',
  },
  {
    title: 'Step 6: Futures and options',
    to: '/course/futures-and-options',
    body: 'Choose futures, option buying, option selling, or a spread for the view you already have.',
  },
  {
    title: 'MCX breakout playbook',
    to: '/course/mcx-intraday-breakout-playbook',
    body: 'The live form for Crude Oil, Natural Gas, Gold, and Silver breakout trades.',
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Learn technical analysis step by step" description={siteConfig.tagline}>
      <header className="hero hero--course">
        <div className="container">
          <div className="hero-candles" aria-hidden="true">
            {heroCandles.map(([h, b, dir], i) => (
              <span
                key={i}
                style={
                  {
                    '--h': `${h}%`,
                    '--b': `${b * 0.35}px`,
                    '--i': i,
                    '--c': dir === 'up' ? '#16a34a' : '#dc2626',
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <Heading as="h1" className="hero__title">
            Learn Technical Analysis, Step by Step
          </Heading>
          <p className="hero__subtitle">
            Read a price chart, spot the setup, and plan your entry, stop, and target. Six steps
            in plain language, with a worked example for every idea.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary button--lg" to="/course">
              Start the course
            </Link>
            <Link
              className="button button--secondary button--outline button--lg"
              to="/course/mcx-intraday-breakout-playbook">
              Open the playbook
            </Link>
          </div>
        </div>
      </header>
      <main className="container">
        <div className="home-cards">
          {cards.map((card, i) => (
            <Link
              key={card.to}
              className="home-card"
              to={card.to}
              style={{'--i': i} as CSSProperties}>
              <span className="home-card__step">{i < 6 ? i + 1 : '★'}</span>
              <Heading as="h3">{card.title.replace(/^Step \d+: /, '')}</Heading>
              <p>{card.body}</p>
              <span className="home-card__more">{i < 6 ? 'Open step' : 'Open playbook'}</span>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
