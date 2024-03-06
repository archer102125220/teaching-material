// prettier-ignore
module.exports = {
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    babelOptions: {
      parserOpts: {
        plugins: ['jsx']
      }
    }
  },
  extends: ['@nuxtjs/eslint-config', 'plugin:vue/vue3-recommended', 'prettier'],
  env: {
    browser: true,
    node: true
  },
  plugins: ['vue','typescript'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'vue/no-deprecated-destroyed-lifecycle': 1,
    'vue/no-v-for-template-key-on-child': 0,
    'vue/multi-word-component-names': 0,
    'no-extra-semi': 2,
    semi: [1, 'always'],
    quotes: [1, 'single'],
    'prefer-const': 2,
    'no-var': 2,
    'no-console': 0,
    'no-const-assign': 2,
    'no-useless-escape': 1,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'after-used'
      }
    ],
    'no-irregular-whitespace': 0,
    'no-trailing-spaces': 1,
    'no-undef': 2,
    curly: 0,
    'space-before-function-paren': 0,
    'import/no-mutable-exports': 1,
    'new-cap': 1,
    'unicorn/escape-case': 1,
    camelcase: 0,
    'vue/no-dupe-keys': 1,
    'import/order': 0
  },
  // https://github.com/nuxt/nuxt/discussions/16871
  globals: {
    defineNuxtConfig: false,
    useAsyncData: false,
    useLazyAsyncData: false,
    defineNuxtComponent: false,
    useNuxtApp: false,
    defineNuxtPlugin: false,
    useRuntimeConfig: false,
    useHead: false,
    useState: false,
    useLazyFetch: false,
    useCookie: false,
    setCookie: false,
    useRequestHeaders: false,
    useRouter: false,
    useRoute: false,
    defineNuxtRouteMiddleware: false,
    navigateTo: false,
    abortNavigation: false,
    addRouteMiddleware: false,
    useMeta: false,
    isVue2: false,
    isVue3: false,
    onActivated: false,
    onBeforeMount: false,
    onBeforeUnmount: false,
    onBeforeUpdate: false,
    onDeactivated: false,
    onErrorCaptured: false,
    onMounted: false,
    onServerPrefetch: false,
    onUnmounted: false,
    onUpdated: false,
    computed: false,
    customRef: false,
    isReactive: false,
    isReadonly: false,
    isRef: false,
    markRaw: false,
    proxyRefs: false,
    reactive: false,
    readonly: false,
    ref: false,
    shallowReactive: false,
    shallowReadonly: false,
    shallowRef: false,
    toRaw: false,
    toRef: false,
    toRefs: false,
    triggerRef: false,
    unref: false,
    watch: false,
    watchEffect: false,
    effectScope: false,
    getCurrentScope: false,
    onScopeDispose: false,
    defineComponent: false,
    defineAsyncComponent: false,
    getCurrentInstance: false,
    h: false,
    inject: false,
    nextTick: false,
    provide: false,
    useAttrs: false,
    useCssModule: false,
    useSlots: false,
    asyncComputed: false,
    autoResetRef: false,
    biSyncRef: false,
    computedInject: false,
    controlledComputed: false,
    controlledRef: false,
    createEventHook: false,
    createGlobalState: false,
    createReactiveFn: false,
    createSharedComposable: false,
    createUnrefFn: false,
    debouncedRef: false,
    debouncedWatch: false,
    eagerComputed: false,
    extendRef: false,
    ignorableWatch: false,
    isDefined: false,
    makeDestructurable: false,
    onClickOutside: false,
    onKeyStroke: false,
    onLongPress: false,
    onStartTyping: false,
    pausableWatch: false,
    reactify: false,
    reactifyObject: false,
    reactiveComputed: false,
    reactiveOmit: false,
    reactivePick: false,
    refDefault: false,
    syncRef: false,
    templateRef: false,
    throttledRef: false,
    throttledWatch: false,
    toReactive: false,
    tryOnBeforeUnmount: false,
    tryOnMounted: false,
    tryOnScopeDispose: false,
    tryOnUnmounted: false,
    unrefElement: false,
    until: false,
    useActiveElement: false,
    useAsyncQueue: false,
    useAsyncState: false,
    useBase64: false,
    useBattery: false,
    useBreakpoints: false,
    useBroadcastChannel: false,
    useBrowserLocation: false,
    useCached: false,
    useClamp: false,
    useClipboard: false,
    useColorMode: false,
    useConfirmDialog: false,
    useCounter: false,
    useCssVar: false,
    useCycleList: false,
    useDark: false,
    useDebounce: false,
    useDebouncedRefHistory: false,
    useDebounceFn: false,
    useDeviceMotion: false,
    useDeviceOrientation: false,
    useDevicePixelRatio: false,
    useDevicesList: false,
    useDisplayMedia: false,
    useDocumentVisibility: false,
    useDraggable: false,
    useElementBounding: false,
    useElementByPoint: false,
    useElementHover: false,
    useElementSize: false,
    useElementVisibility: false,
    useEventBus: false,
    useEventListener: false,
    useEventSource: false,
    useEyeDropper: false,
    useFavicon: false,
    useFocus: false,
    useFocusWithin: false,
    useFps: false,
    useFullscreen: false,
    useGeolocation: false,
    useIdle: false,
    useInfiniteScroll: false,
    useIntersectionObserver: false,
    useInterval: false,
    useIntervalFn: false,
    useKeyModifier: false,
    useLastChanged: false,
    useLocalStorage: false,
    useMagicKeys: false,
    useManualRefHistory: false,
    useMediaControls: false,
    useMediaQuery: false,
    useMemoize: false,
    useMemory: false,
    useMounted: false,
    useMouse: false,
    useMouseInElement: false,
    useMousePressed: false,
    useMutationObserver: false,
    useNavigatorLanguage: false,
    useNetwork: false,
    useNow: false,
    useOffsetPagination: false,
    useOnline: false,
    usePageLeave: false,
    useParallax: false,
    usePermission: false,
    usePointer: false,
    usePointerSwipe: false,
    usePreferredColorScheme: false,
    usePreferredDark: false,
    usePreferredLanguages: false,
    useRafFn: false,
    useRefHistory: false,
    useResizeObserver: false,
    useScreenSafeArea: false,
    useScriptTag: false,
    useScroll: false,
    useScrollLock: false,
    useSessionStorage: false,
    useShare: false,
    useSpeechRecognition: false,
    useSpeechSynthesis: false,
    useStorage: false,
    useStorageAsync: false,
    useStyleTag: false,
    useSwipe: false,
    useTemplateRefsList: false,
    useTextSelection: false,
    useThrottle: false,
    useThrottledRefHistory: false,
    useThrottleFn: false,
    useTimeAgo: false,
    useTimeout: false,
    useTimeoutFn: false,
    useTimestamp: false,
    useTitle: false,
    useToggle: false,
    useTransition: false,
    useUrlSearchParams: false,
    useUserMedia: false,
    useVibrate: false,
    useVirtualList: false,
    useVModel: false,
    useVModels: false,
    useWakeLock: false,
    useWebNotification: false,
    useWebSocket: false,
    useWebWorker: false,
    useWebWorkerFn: false,
    useWindowFocus: false,
    useWindowScroll: false,
    useWindowSize: false,
    watchAtMost: false,
    watchOnce: false,
    watchWithFilter: false,
    whenever: false,
    useNuxt2Meta: false,
    defineProps: false,
    defineEmits: false,
    defineExpose: false,
    withDefaults: false,
    defineEventHandler: false,
    readBody: false,
    parseCookies: false,
    useRequestURL: false,
    definePageMeta: false,
    useSeoMeta: false,
    useI18n: false,
    $: false,
    $$: false,
    $ref: false,
    $shallowRef: false,
    $computed: false,
    useRouteBaseName: false,
    useSwitchLocalePath: false
  }
};
