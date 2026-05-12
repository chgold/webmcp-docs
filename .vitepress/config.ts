import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WebMCP Master Docs',
  description: 'Documentation for WebMCP Master — AI agents platform',
  base: '/',
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'WebMCP Master Docs' }],
  ],

  themeConfig: {
    siteTitle: 'WebMCP Master',
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
            { text: 'Choosing a Plan', link: '/getting-started/choosing-a-plan' },
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
            { text: 'What is WebMCP', link: '/site-owners/what-is-webmcp' },
            { text: 'Adding WebMCP to Your Site', link: '/site-owners/adding-webmcp' },
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
            { text: 'Changelog', link: '/resources/changelog' },
            { text: 'Troubleshooting', link: '/resources/troubleshooting' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/webmcp-master' },
    ],

    footer: {
      message: 'WebMCP Master',
      copyright: 'webmcp-master.ai',
    },

    search: {
      provider: 'local',
    },

    editLink: undefined,
  },
})
