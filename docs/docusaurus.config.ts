import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'React Native ML Kit',
  tagline: 'React Native On-Device Machine Learning w/ Google ML Kit',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  url: 'https://a7medev.github.io',
  baseUrl: '/react-native-ml-kit/',

  organizationName: 'a7medev',
  projectName: 'react-native-ml-kit',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          path: 'content',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/a7medev/react-native-ml-kit/tree/main/docs/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'RN ML Kit',
      logo: {
        alt: 'React Native ML Kit Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/a7medev/react-native-ml-kit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/react-native-ml-kit',
            },
            {
              label: 'GitHub Issues',
              href: 'https://github.com/a7medev/react-native-ml-kit/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/a7medev/react-native-ml-kit',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} React Native ML Kit. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
