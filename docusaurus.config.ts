import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const repoUrl = 'https://github.com/engineerkv/stock-market-course';

const config: Config = {
  title: 'Technical Analysis Course',
  tagline:
    'Learn to read price charts and turn them into trades: candlesticks, chart patterns, price action, wave setups, and futures and options, in plain language with a worked example for every idea.',
  favicon: 'img/favicon.svg',

  url: 'https://engineerkv.github.io',
  // GitHub Pages serves the site under /stock-market-course/; the deploy workflow sets BASE_URL for that.
  baseUrl: process.env.BASE_URL ?? '/',
  organizationName: 'engineerkv',
  projectName: 'stock-market-course',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  markdown: {
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // The lessons are plain markdown under src/content/, so they stay readable on GitHub as-is.
          path: 'src/content',
          include: ['README.md', '0[1-9]-*/**/*.md', 'mcx_*.md'],
          routeBasePath: 'course',
          sidebarPath: './sidebars.ts',
          // The overview is pinned first in sidebars.ts, and the playbook has its own sidebar.
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const items = await defaultSidebarItemsGenerator(args);
            const pinned = new Set(['README', 'mcx_intraday_breakout_playbook']);
            return items.filter((item) => !(item.type === 'doc' && pinned.has(item.id)));
          },
          editUrl: `${repoUrl}/edit/main/src/content/`,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('@fontsource-variable/inter/index.css'),
            require.resolve('@fontsource-variable/jetbrains-mono/index.css'),
            require.resolve('@fontsource-variable/lexend/index.css'),
            './src/css/custom.css',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // lightweight-charts only exports an "import" entry, which the server bundle cannot resolve on its own.
    () => ({
      name: 'resolve-lightweight-charts',
      configureWebpack: () => ({
        resolve: {
          alias: {
            'lightweight-charts$': path.resolve(
              __dirname,
              'node_modules/lightweight-charts/dist/lightweight-charts.production.mjs',
            ),
          },
        },
      }),
    }),
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsDir: 'src/content',
        docsRouteBasePath: 'course',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'technical analysis, candlestick patterns, chart patterns, price action, Elliott wave, support and resistance, futures and options, MCX, crude oil, gold, silver, natural gas',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Technical Analysis',
      logo: {
        alt: 'Technical Analysis Course logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'courseSidebar',
          position: 'left',
          label: 'Course',
        },
        {
          type: 'docSidebar',
          sidebarId: 'playbooksSidebar',
          position: 'left',
          label: 'Playbooks',
        },
        {
          href: repoUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {label: 'Course overview', to: '/course'},
            {label: 'Foundations', to: '/course/foundations'},
          ],
        },
        {
          title: 'Trade',
          items: [
            {label: 'MCX Intraday Breakout Playbook', to: '/course/mcx-intraday-breakout-playbook'},
          ],
        },
      ],
      copyright:
        'Educational material only. Nothing here is a promise that a trade will make money.',
    },
    mermaid: {
      // Colours for each mode live in src/theme/Mermaid.
      theme: {light: 'base', dark: 'base'},
      options: {
        fontFamily: '"Inter Variable", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        flowchart: {curve: 'basis', padding: 20, nodeSpacing: 50, rankSpacing: 60},
        quadrantChart: {
          chartWidth: 620,
          chartHeight: 460,
          quadrantLabelFontSize: 14,
          quadrantPadding: 10,
          titlePadding: 18,
          xAxisLabelPadding: 12,
          yAxisLabelPadding: 12,
        },
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
