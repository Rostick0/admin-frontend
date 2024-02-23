// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/styles/index.scss"],
  build: { transpile: ["vue-toastification"] },
  runtimeConfig: {
    public: {
      HOST: process.env.HOST,
      API_URL: `${process.env.API_URL}`,
    },
  },
  devtools: { enabled: true }
})
