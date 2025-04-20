// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss', '~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image', '@vueuse/nuxt', '@pinia/nuxt'],
  plugins: ['~/plugins/initBreeds.ts'],
});
