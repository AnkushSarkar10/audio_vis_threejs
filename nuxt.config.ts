import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  head: {
    title: "my first nuxt proj - main page",
  },
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons"
    ],
  },
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
});
