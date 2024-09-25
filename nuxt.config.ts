// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/styles/index.scss"],
  build: { transpile: ["vue-toastification"] },
  devServer: {
    port: 3031,
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_URL: process.env.API_URL,
      BACK_URL: process.env.BACK_URL,
    },
  },
  devtools: { enabled: true },
});
