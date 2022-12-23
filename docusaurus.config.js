// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Andres Alcocer',
  tagline:
    'I like everything involving the world of frontend development. When I am not coding or writing for my blog I like to try new grilling recipes and keep up with the latest football ⚽ stats.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo4.svg',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-M827TKJ5P9',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'devandres.tech',
        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo4.svg',
        },
        items: [
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://twitter.com/devandres_tech',
            className: 'header-twitter-link',
            position: 'right',
          },
          {
            href: 'https://github.com/devandres-tech',
            className: 'header-github-link',
            position: 'right',
          },
          {
            href: 'https://www.linkedin.com/in/andres-io/',
            className: 'header-linkedin-link',
            position: 'right',
          },
          {
            type: 'custom-email-navbar',
            position: 'right',
            href: '#',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} devandres.tech, All rights reserved. Built with Docusaurus ❤️`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {
          name: 'keywords',
          content:
            'Andres Alcocer Blog, React, JavaScript, Andres Software Developer, TypeScript, NodeJS, CSS, SASS, Frontend Developer, Docusarus',
        },
      ],
    }),
}

module.exports = config
