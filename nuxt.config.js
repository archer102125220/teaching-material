import vuetify from 'vite-plugin-vuetify';
import autoprefixer from 'autoprefixer';
import postcssPxtorem from 'postcss-pxtorem';
import {
  // eslint-disable-next-line no-unused-vars
  debug,
  strategy,
  langDir,
  locales,
  messages,
  defaultLang,
  fallbackLocale,
  detectBrowserLanguage,
  bundle
} from './i18n';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  vite: {
    server: {
      hmr: process.env.HMR !== 'false' ? undefined : false
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/style/mixin.scss" as *;'
        }
      },
      postcss: {
        plugins: [
          autoprefixer,
          postcssPxtorem({
            rootValue: 16, // 1rem 對應的 px
            propWhiteList: ['*']
          }),
          // https://github.com/cuth/postcss-pxtorem/blob/master/index.js#L119C37-L119C37
          // https://juejin.cn/post/7033773414363955230#heading-3
          {
            postcssPlugin: 'postcss-zerorem',
            Declaration(decl) {
              if (/\+\s0\)/gi.test(decl.value)) {
                decl.value = decl.value.replace(/\+\s0\)/gi, '+ 0rem)');
              }
            }
          }
        ]
      }
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: defaultLang || 'zh-TW'
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  css: ['@/style/global.scss', '@/style/animation.scss'],

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        config.plugins.push(vuetify())
      );
    }
  ],
  i18n: {
    // debug,
    strategy,
    langDir,
    locales,
    messages,
    defaultLocale: defaultLang,
    fallbackLocale,
    detectBrowserLanguage,
    bundle
  },

  build: {
    transpile: ['vuetify', 'date-fns']
  }
});
