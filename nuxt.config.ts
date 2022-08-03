import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  build: {

    transpile: [
      'three',
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons"
    ],
  },
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  modules: ["@nuxtjs/tailwindcss"],
  ssr: true,
  target: 'static'
});
