import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Akello',
  tagline: 'Open Source Registry for the Collaborative Care Model (CoCM)',
  favicon: 'img/AkelloLogo.png',

  trailingSlash: true,

  // Set the production url of your site here
  url: 'https://akello.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'akello-io', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/akello-io/akello/tree/main/packages/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/akello-io/akello/tree/main/packages/docs',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/akello-social.png',
    algolia: {
      // The application ID provided by Algolia
      appId: 'ZPW8AHLDRJ',

      // Public API key: it is safe to commit it
      apiKey: '129743335fc9e341bf6f16e1686294dc',

      indexName: 'akello',

    },

    navbar: {
      title: 'Akello',
      logo: {
        alt: 'Akello Logo',
        src: 'img/AkelloLogo.png'
      },
      items: [
        {
          to: '/products',
          position: 'left',
          label: 'Products',
        },
        {
          to: '/solutions',
          position: 'left',
          label: 'Solutions',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: 'https://github.com/akello-io/akello',
          label: 'GitHub',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Developers',
          items: [
            {
              label: 'Getting started',
              to: '/docs/category/getting-started',
            },
            {
              label: 'Developer Docs',
              to: '/docs/developers/contributing',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              to: 'https://discord.gg/WSqNrWBKKw',
            },
            {
              label: 'GitHub',
              to: 'https://github.com/akello-io/akello',
            },
            {
              label: 'Contributing',
              to: '/docs/developers/contributing',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About us',
              to: '/blog',
            },
            {
              label: 'Trust Center',
              to: 'https://trust.akello.io',
            },
            {
              label: 'Terms of Service',
              to: '/terms',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Akello Health, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
