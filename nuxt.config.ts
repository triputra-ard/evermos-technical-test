// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Evermos Technical Assesment",
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        // { src: "https://awesome-lib.js" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/icons/evermos_icon.ico" },
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        // { rel: "stylesheet", href: "https://awesome-lib.css" },
      ],
      // please note that this is an area that is likely to change
      style: [
        // <style type="text/css">:root { color: red }</style>
        // { children: ":root { color: red }", type: "text/css" },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: "JavaScript is required" },
      ],
    },
    // baseURL: "/your-site-route",
    pageTransition: { name: "fade", mode: "out-in" },
  },
  experimental: {
    componentIslands: false, //for global components
  },

  components: [
    { path: "~/components", extensions: ["vue"] },
    { path: "~/components/pages", extensions: ["vue"] },
    { path: "~/components/ui", extensions: ["vue"] },
  ],
  css: [
    "@/styles/css/bootstrap.css",
    "@/styles/scss/main.scss",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  modules: [
    "@pinia/nuxt",
    "nuxt-svgo",
    "@nuxtjs/device",
    "pinia-plugin-persistedstate/nuxt",
  ],
  plugins: ["@/plugins/bootstrap.client.ts", "@/plugins/v-toast.client.ts"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/scss/_variables.scss" as *;',
        },
      },
    },
  },

  pinia: {
    storesDirs: [
      //Pinia storage
      "data",
    ],
  },
  runtimeConfig: {
    server: {},
    public: {
      apiHostUrl: process.env.APP_API_URL,
    },
  },
});
