import { defineConfig } from 'vitepress'

const HOSTNAME = 'https://docs.goldnat.ai'

export default defineConfig({
  title: 'Goldnat Docs',
  description: 'Documentation for Goldnat — the AI agents platform that connects websites to large language models via the Servio protocol.',
  base: '/',
  cleanUrls: true,

  sitemap: {
    hostname: HOSTNAME,
    transformItems: (items) => items.filter(item => !item.url.includes('AGENTS')),
  },

  head: [
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Goldnat Docs' }],
    ['link', { rel: 'canonical', href: HOSTNAME }],
  ],

  transformPageData(pageData) {
    const title = pageData.frontmatter.layout === 'home'
      ? 'Goldnat Documentation — AI Agents Platform'
      : `${pageData.title} | Goldnat Docs`

    const description = pageData.frontmatter.description || pageData.description || 'Documentation for Goldnat — AI agents platform for connecting websites to AI.'

    const canonicalUrl = `${HOSTNAME}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['link', { rel: 'canonical', href: canonicalUrl }],
    )
  },

  themeConfig: {
    siteTitle: 'Goldnat',
    logo: undefined,

    nav: [
      { text: 'Getting Started', link: '/getting-started/quickstart' },
      { text: 'Features', link: '/features/chat' },
      {
        text: 'Guides',
        items: [
          { text: 'Prompt Engineering', link: '/guides/prompt-engineering' },
          { text: 'Agent Best Practices', link: '/guides/agent-best-practices' },
          { text: 'BYOK', link: '/guides/byok' },
          { text: 'Webhook Triggers', link: '/guides/webhooks' },
          { text: 'Cost Optimization', link: '/guides/cost-optimization' },
        ],
      },
      { text: 'Tutorials', link: '/tutorials/customer-support-bot' },
      { text: 'Reference', link: '/reference/tier-features' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Quickstart', link: '/getting-started/quickstart' },
            { text: 'Connecting Sites', link: '/getting-started/connecting-sites' },
            { text: 'Understanding Credits', link: '/getting-started/understanding-credits' },
          ],
        },
      ],

      '/features/': [
        {
          text: 'Features',
          items: [
            { text: 'Chat Interface', link: '/features/chat' },
            { text: 'Site Vault', link: '/features/vault' },
            { text: 'Site Groups', link: '/features/groups' },
            { text: 'Autonomous Agents', link: '/features/agents' },
            { text: 'Team Workspaces', link: '/features/workspaces' },
            { text: 'File Manager', link: '/features/files' },
            { text: 'Artifacts', link: '/features/artifacts' },
            { text: 'Analytics', link: '/features/analytics' },
            { text: 'Billing & Payments', link: '/features/billing' },
            { text: 'Settings', link: '/features/settings' },
            { text: 'Site Directory', link: '/features/directory' },
          ],
        },
      ],

      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Prompt Engineering', link: '/guides/prompt-engineering' },
            { text: 'Agent Best Practices', link: '/guides/agent-best-practices' },
            { text: 'Bring Your Own Key', link: '/guides/byok' },
            { text: 'Webhook Triggers', link: '/guides/webhooks' },
            { text: 'Cost Optimization', link: '/guides/cost-optimization' },
          ],
        },
      ],

      '/site-owners/': [
        {
          text: 'Site Owners',
          items: [
            { text: 'What is Servio', link: '/site-owners/what-is-servio' },
            { text: 'Adding Servio to Your Site', link: '/site-owners/adding-servio' },
            { text: 'Manifest Format', link: '/site-owners/manifest-format' },
            { text: 'Authentication', link: '/site-owners/authentication' },
            { text: 'Registering in the Directory', link: '/site-owners/registering' },
          ],
        },
      ],

      '/tutorials/': [
        {
          text: 'Tutorials',
          items: [
            { text: 'Customer Support Bot', link: '/tutorials/customer-support-bot' },
            { text: 'Auto-translate Forum Posts', link: '/tutorials/forum-auto-translate' },
            { text: 'Daily Digest Agent', link: '/tutorials/daily-digest-agent' },
            { text: 'Product Update Monitor', link: '/tutorials/product-update-monitor' },
            { text: 'Multi-Site Workflows', link: '/tutorials/multi-site-workflow' },
          ],
        },
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Error Codes', link: '/reference/error-codes' },
            { text: 'Tier Feature Matrix', link: '/reference/tier-features' },
            { text: 'Rate Limits', link: '/reference/rate-limits' },
            { text: 'Supported Platforms', link: '/reference/platforms' },
          ],
        },
      ],

      '/resources/': [
        {
          text: 'Resources',
          items: [
            { text: 'FAQ', link: '/resources/faq' },
            { text: 'Troubleshooting', link: '/resources/troubleshooting' },
          ],
        },
      ],
    },

    footer: {
      message: 'Goldnat',
      copyright: 'goldnat.ai',
    },

    search: {
      provider: 'local',
    },

    editLink: undefined,
  },
})
