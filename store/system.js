import { defineStore } from 'pinia';

import { getLocalLanguage } from '@/utils/get-local-language';

export const useSystemStore = defineStore('system', {
  state: () => ({
    isIndexPage: useState('system__isIndexPage', () => false),
    layoutName: useState('system__layoutName', () => 'default'),
    accessToken: useState('system__access_token', () => null),
    loading: true,
    messageState: { text: '', type: 'success' },
    position: null,
    cantResendOTPTime: Date.now(),
    isMobile: useState('system__isMobile', () => false),
    isTabletOnly: useState('system__isTabletOnly', () => false),
    isTablet: useState('system__isTablet', () => false),
    dialog: useState('system__dialog', () => ({
      trigger: false,
      width: null,
      bgColor: '#fff',
      radius: '4px',
      content: null,
      contentClass: null,
      contentProps: null
    }))
  }),
  actions: {
    async getCurrentPosition() {
      const { $getCurrentPosition } = useNuxtApp();
      try {
        this.position = await $getCurrentPosition();
      } catch (error) {
        console.log(error);
        this.position = 'error';
      }
    },

    setIsIndexPage(payload) {
      this.isIndexPage = payload;
    },
    setAccessToken(payload) {
      this.accessToken = payload;
    },
    setLayoutName(payload) {
      this.layoutName = payload;
    },
    setLoading(payload) {
      this.loading = payload;
    },
    setMessageState(payload) {
      this.messageState = payload;
    },
    setCantResendOTPTime(payload) {
      const { $dayjs } = useNuxtApp();
      this.cantResendOTPTime = $dayjs(payload).add(120, 'second').valueOf();
    },
    setIsMobile(payload = false) {
      this.isMobile = payload;
    },
    setIsTablet(payload = false) {
      this.isTablet = payload;
    },
    setIsTabletOnly(payload = false) {
      this.isTabletOnly = payload;
    },
    setWindowInnerSize(payload = {}) {
      const {
        width,
        height,
        isMobile = false,
        isTabletOnly = false,
        isTablet = false
      } = payload;
      this.windowInnerWidth = width;
      this.windowInnerHeight = height;
      this.isMobile = isMobile;
      this.isTabletOnly = isTabletOnly;
      this.isTablet = isTablet;
    },
    setDialog(
      payload = {
        trigger: false,
        width: null,
        content: null,
        contentClass: null,
        contentProps: null
      }
    ) {
      this.dialog = payload;
    }
  },
  getters: {
    broswerInfo() {
      const broswerInfo = {
        type: '',
        version: '',
        isEdge: false,
        isIe: false,
        isFirefox: false,
        isChrome: false,
        isOpera: false,
        isSafari: false
      };
      if (typeof window === 'undefined') {
        return broswerInfo;
      }
      const userAgent = (window?.navigator?.userAgent || '').toLowerCase();

      if (userAgent.match(/edge\/([\d.]+)/)) {
        broswerInfo.type = 'Edge';
        broswerInfo.version = userAgent.match(/edge\/([\d.]+)/)[1];
        broswerInfo.isEdge = true;
      } else if (
        userAgent.match(/rv:([\d.]+)\) like gecko/) ||
        userAgent.match(/msie ([\d.]+)/)
      ) {
        const _version =
          userAgent.match(/rv:([\d.]+)\) like gecko/) ||
          userAgent.match(/msie ([\d.]+)/);

        broswerInfo.type = 'IE';
        broswerInfo.version = _version[1];
        broswerInfo.isIe = true;
      } else if (userAgent.match(/firefox\/([\d.]+)/)) {
        broswerInfo.type = 'Firefox';
        broswerInfo.version = userAgent.match(/firefox\/([\d.]+)/)[1];
        broswerInfo.isFirefox = true;
      } else if (userAgent.match(/chrome\/([\d.]+)/)) {
        broswerInfo.type = 'Chrome';
        broswerInfo.version = userAgent.match(/chrome\/([\d.]+)/)[1];
        broswerInfo.isChrome = true;
      } else if (userAgent.match(/opera.([\d.]+)/)) {
        broswerInfo.type = 'Opera';
        broswerInfo.version = userAgent.match(/opera.([\d.]+)/)[1];
        broswerInfo.isOpera = true;
      } else if (userAgent.match(/version\/([\d.]+).*safari/)) {
        broswerInfo.type = 'Safari';
        broswerInfo.version = userAgent.match(/version\/([\d.]+).*safari/)[1];
        broswerInfo.isSafari = true;
      }

      return broswerInfo;
    },
    localLanguage() {
      const { $i18n } = useNuxtApp();
      return getLocalLanguage($i18n?.local?.value);
    }
  }
});
