import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
// import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll';
// import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
// import enUS from 'date-fns/locale/en-US';
// import zhTW from 'date-fns/locale/zh-TW';
import '@mdi/font/css/materialdesignicons.css';
// import 'vuetify/styles';

// https://nuxt.com/docs/migration/plugins-and-middleware#plugins-and-middleware
export default defineNuxtPlugin((nuxtApp) => {
  const i18n = { global: nuxtApp.$i18n };

  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme: {
          dark: false,
          colors: {
            primary: '#2C64E3'
          }
        },
        gray: {
          dark: false,
          colors: {
            surface: '#edeff3'
          }
        }
      }
    },
    locale: {
      adapter: createVueI18nAdapter({ i18n, useI18n })
    }
    // components: {
    //   // VInfiniteScroll,
    //   // VSkeletonLoader,
    // },
  });

  nuxtApp.vueApp.use(vuetify);
});
