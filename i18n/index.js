import en from './locales/en.json';
import zhTw from './locales/zh-tw.json';

export const debug = process.env.NODE_ENV === 'development';
export const defaultLang = 'zh';
export const fallbackLocale = 'en';
export const strategy = 'prefix_and_default';
export const locales = [
  {
    code: 'zh',
    iso: 'zh-TW',
    file: 'zh-tw.json'
  },
  {
    code: 'en',
    iso: 'en-US',
    file: 'en.json'
  }
  // 'zh',
  // 'en'
];
export const langDir = 'i18n/locales';
export const detectBrowserLanguage = {
  fallbackLocale,
  useCookie: true,
  redirectOn: 'root'
};
export const messages = { en, zh: zhTw };
export const bundle = {
  compositionOnly: true,
  runtimeOnly: true,
  fullInstall: true
};

export default {
  debug,
  legacy: false,
  defaultLocale: defaultLang,
  langDir,
  locale: defaultLang,
  locales,
  messages,
  strategy,
  detectBrowserLanguage,
  bundle
};
