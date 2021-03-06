const env = require("dotenv").config();

module.exports = {
  env: env.parsed,
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "ko-KR"
    },
    title: "초성성경 - 간편한 성경검색",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "초성성경은 초성과 숫자만 입력하여 성경을 간편하게 검색할 수 있는 서비스입니다. 초성과 숫자대신 단어 또는 문장을 입력하여 성경의 내용을 검색하는 서비스도 제공합니다."
      },
      { name: "og:type", content: "website" },
      { name: "og:title", content: "초성성경" },
      {
        name: "og:description",
        content: "초성과 숫자로 간편하게 성경을 검색해보세요."
      },
      { name: "og:image", content: "/ogImage.png" },
      { name: "og:url", content: "https://www.chosungbible.com" },
      {
        name: "naver-site-verification",
        content: process.env.NAVER_KEY
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: ["~/assets/style.css"],
  /*
   * pwa manifest
   */
  manifest: {
    name: "초성성경", //앱 로딩 화면에서 보여줄 이름
    short_name: "초성성경", //아이콘 밑에 표시할 이름
    start_url: "/", // '/' = pages/index.vue
    display: "minimal-ui",
    background_color: "#000"
  },
  /**
   * offline 지원을 위한 모듈
   * 현재 앱에서는 offline 모드를 지원하지는 않지만 홈화면에 추가기능을 위해 설정추가
   */
  workbox: {
    offline: false,
    runtimeCaching: [
      {
        urlPattern: "/*",
        handler: "networkFirst",
        method: "GET"
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  buildModules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: process.env.GOOGLE_ANALYTICS_ID,
        debug: {
          sendHitTask: process.env.NODE_ENV === "production" //production 모드일때만 사용
        }
      }
    ]
  ],
  cache: true,
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios", "@nuxtjs/pwa"],
  plugins: [
    "~/plugins/autocomplete.js",
    "~/plugins/axios.js",
    { src: "~/plugins/highlight.js", ssr: false }
  ],
  serverMiddleware: [{ path: "/api", handler: "~/api/server.ts" }],
  axios: {
    proxy: true
  },
  proxy: {
    "/api/": process.env.BASE_URL
  }
};
