import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
require("dotenv").config();

const config: Config = {
  title: "Doc Detective",
  tagline: "Keep your docs in sync with your product. Always.",
  favicon: "img/favicon.ico",
  staticDirectories: ["public", "static"],

  // Set the production url of your site here
  url: "https://doc-detective.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "doc-detective", // Usually your GitHub org/user name.
  projectName: "doc-detective.github.io", // Usually your repo name.
  trailingSlash: false,
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.dev/doc-detective/doc-detective.github.io/blob/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.dev/doc-detective/doc-detective.github.io/blob/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/social-card.jpg",
    navbar: {
      title: "Doc Detective",
      logo: {
        alt: "Doc Detective Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Get started",
        },
        {
          type: "docSidebar",
          sidebarId: "referencesSidebar",
          position: "left",
          label: "References",
        },
        { to: "/app", label: "Action Builder (beta)", position: "left" },
        // {to: '/blog', label: 'Blog', position: 'left'},
        { to: "/support", label: "Support ❤️", position: "right" },
        {
          type: "docSidebar",
          sidebarId: "contributeSidebar",
          position: "right",
          label: "Contribute",
        },
        {
          href: "https://github.com/doc-detective",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Get started",
              to: "/docs/get-started/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/2M7wXEThfF",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/doc-detective",
            },
          ],
        },
        {
          title: "More",
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: "GitHub",
              href: "https://github.com/doc-detective",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Doc Detective.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    inkeepConfig: {
      baseSettings: {
        apiKey: process.env.INKEEP_API_KEY, // required
        integrationId: process.env.INKEEP_INTEGRATION_ID, // required
        organizationId: process.env.INKEEP_ORGANIZATION_ID, // required
        primaryBrandColor: "#00c122", // required -- your brand color, the widget color scheme is derived from this
        organizationDisplayName: "Doc Detective", // required -- your organization name
        // ...optional settings
        theme: {
          //   stylesheetUrls: ['/path/to/stylesheets'], // optional
          syntaxHighlighter: {
            lightTheme: prismThemes.github, // optional -- pass in the Prism theme you're using
            darkTheme: prismThemes.dracula, // optional -- pass in the Prism theme you're using
          },
        },
      },
      modalSettings: {
        // optional settings
      },
      searchSettings: {
        // optional settings
      },
      aiChatSettings: {
        // optional settings
        // botAvatarSrcUrl: "/img/logo.svg", // use your own bot avatar
        quickQuestions: [
          "How can I test my docs with Doc Detective?",
          "What does a test look like?",
          "What actions can Doc Detective perform?",
        ],
      },
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    require.resolve("./src/plugins/webpack-browserify"),
    "@inkeep/docusaurus/chatButton",
    "@inkeep/docusaurus/searchBar",
    async function tailwindPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
    // [
    //   "posthog-docusaurus",
    //   {
    //     apiKey: process.env.POSTHOG_API_KEY || "", // required
    //     appUrl: "https://us.i.posthog.com", // optional, defaults to "https://us.i.posthog.com"
    //     enableInDevelopment: false, // optional
    //   },
    // ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  stylesheets: [
    {
      href: "src/css/custom.css",
    },
  ],
};

export default config;
