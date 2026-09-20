// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['@nuxt/icon', '@vite-pwa/nuxt'],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'EzChat',
      short_name: 'EzChat',
      description: 'A fast, modern real-time chat app for teams and friends.',
      theme_color: '#9396ff',
      background_color: '#1a1a2e',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: false,
      type: 'module',
    },
  },

  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'lucide:sun',
        'lucide:moon'
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
      cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
    }
  },

  app: {
    head: {
      title: 'EzChat — Chat made easy.',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'EzChat is a fast, modern real-time chat app for teams and friends. Start conversations, create groups, and stay connected — all in one place.' },
        { name: 'theme-color', content: '#4f46e5' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'EzChat' },
        { name: 'keywords', content: 'chat, messaging, real-time, group chat, teams, EzChat' },
        { name: 'google-site-verification', content: 'rfAfah7CjJme68pjChHlTRbTYDJNOkHtWQjvkppSKrE' },

        // Open Graph (WhatsApp, Facebook, iMessage, Telegram previews)
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'EzChat' },
        { property: 'og:title', content: 'EzChat — Chat made easy.' },
        { property: 'og:description', content: 'A fast, modern real-time chat app for teams and friends. Start conversations, create groups, and stay connected.' },
        { property: 'og:url', content: 'https://ezct.web.app' },
        { property: 'og:image', content: 'https://ezct.web.app/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'EzChat — Chat made easy.' },

        // Twitter / X card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'EzChat — Chat made easy.' },
        { name: 'twitter:description', content: 'A fast, modern real-time chat app for teams and friends.' },
        { name: 'twitter:image', content: 'https://ezct.web.app/og-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/chatfill.svg' },
        { rel: 'apple-touch-icon', href: '/chatfill.svg' },
        { rel: 'canonical', href: 'https://ezct.web.app' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Firebase SDK is client-only
  ssr: false,
})
