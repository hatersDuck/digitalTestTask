// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [
    "@nuxtjs/tailwindcss"
  ],

  runtimeConfig: {
    proxyUrl: "http://127.0.0.1:3005"
  }
})
