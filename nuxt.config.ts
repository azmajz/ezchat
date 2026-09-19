// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['@nuxt/icon'],

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

  app: {
    head: {
      title: 'EzChat — Chat made easy.',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'EzChat — a fast, modern realtime chat app for teams and friends.' },
        { name: 'theme-color', content: '#6366f1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/chatfill.svg' },
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
