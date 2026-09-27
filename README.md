# Technical Analysis Course: From Chart to Trade

A plain-language technical analysis course. You learn to read a price chart, name what you see, and turn it into a trade with a clear entry, stop, and target. It covers candlesticks, chart patterns, price action, wave setups, and futures and options, with a worked example for every idea. The same rules work for stocks, indexes, commodities, and currencies. The course ends with a live playbook for MCX Crude Oil, Natural Gas, Gold, and Silver breakouts.

Read it online at [engineerkv.github.io/stock-market-course](https://engineerkv.github.io/stock-market-course/). The site updates each time a change lands on `main`.

## Contents

Start with the [course overview](src/content/README.md), then work through the steps in order.

| Step | Lesson folder |
|---|---|
| 1 | [Foundations](src/content/01-foundations/README.md) |
| 2 | [Candlesticks](src/content/02-candlesticks/README.md) |
| 3 | [Chart patterns](src/content/03-chart-patterns/README.md) |
| 4 | [Price action](src/content/04-price-action/README.md) |
| 5 | [Wave setups](src/content/05-wave-setups/README.md) |
| 6 | [Futures and options](src/content/06-futures-and-options/README.md) |
| Playbook | [MCX Intraday Breakout Playbook](src/content/mcx_intraday_breakout_playbook.md) |

## Repository layout

```text
src/
  content/
    README.md                        course overview
    01-foundations/ … 06-futures-and-options/   lessons, one folder per step
    mcx_intraday_breakout_playbook.md   live breakout playbook
  components/charts/                 interactive candle, line, and level charts
  theme/                             renders the chart blocks inside the lessons
  css/, pages/                       site styling and home page
static/img/                          logo and favicon
docusaurus.config.ts, sidebars.ts    site configuration
```

## Preview the site locally

```bash
npm install
npm start
```

Educational material only. Nothing here promises that a trade will make money.
