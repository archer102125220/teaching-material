<template>
  <div :style="$store.system.loading === true ? 'cursor: wait;' : ''">
    <NuxtLayout :name="layoutName">
      <NuxtPage :page-key="handleLayoutName" />
    </NuxtLayout>
    <ClientOnly>
      <Loading :loading="loading" position="fixed" />
      <Message
        :message-state="messageState"
        @reset-message-state="resetMessageState"
      />
      <Dialog
        :trigger="$store.system.dialog?.trigger"
        :width="$store.system.dialog?.width"
        :content="$store.system.dialog?.content"
        :bg-color="$store.system.dialog?.bgColor"
        :radius="$store.system.dialog?.radius"
        :content-class="$store.system.dialog?.contentClass"
        :content-props="$store.system.dialog?.contentProps"
        :broswer-info="$store.system.broswerInfo"
        @handle-trigger="$store.system.setDialog"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
const LAYOUT_SETTING = [{ name: 'index', layout: 'default' }];

const runtimeConfig = useRuntimeConfig();
const GA_ID = runtimeConfig.public.GOOGLE_GA_ID;
const headers = useRequestHeaders();
const nuxtApp = useNuxtApp();
const { $googleGAInit, $i18n, $dayjs, $store } = nuxtApp;
const router = useRouter();
const route = useRoute();
const getRouteBaseName = useRouteBaseName();
const switchLocalePath = useSwitchLocalePath();
if (process.server) {
  const lang = useCookie('___i18n_locale', {
    default: () => ''
  });
  const _lang = headers?.['accept-language']
    ?.split(';')?.[0]
    ?.split(',')?.[0]
    ?.split('-')?.[0];
  if (lang.value !== _lang && lang.value === '') {
    lang.value = _lang;
    await navigateTo({
      path: switchLocalePath(_lang),
      query: route.query
    });
  }
}
// useHead({
//   titleTemplate: (titleChunk) => {
//     return titleChunk ? `${titleChunk} | 愛嬉遊臺灣青年旅館聯盟` : '愛嬉遊臺灣青年旅館聯盟';
//   },
// });
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | ${$i18n.t('system.titleTemplate')}`
      : $i18n.t('system.titleTemplate');
  }
});

nuxtApp.hook('page:start', () => {
  $store.system.setLoading(true);
});
nuxtApp.hook('page:finish', () => {
  $store.system.setLoading(false);
});

const loading = computed(() => $store.system.loading);
const messageState = computed(() => $store.system.messageState || {});
const layoutName = computed(() => $store.system.layoutName);

function handleLayoutName(newRoute) {
  const newLayoutName = LAYOUT_SETTING.find(
    ({ path, exact, name }) =>
      (exact === true
        ? path === newRoute.href
        : newRoute.href.includes(path)) || getRouteBaseName(newRoute) === name
  )?.layout;
  $store.system.setIsIndexPage(getRouteBaseName(newRoute) === 'index');
  $store.system.setLayoutName(
    typeof newLayoutName === 'boolean'
      ? newLayoutName
      : newLayoutName || 'default'
  );
}
handleLayoutName(route);

function resetMessageState() {
  $store.system.setMessageState({ text: '', type: 'success' });
}

watch(
  () => $i18n.locale.value,
  (newLocale) => {
    $dayjs.locale(newLocale.includes('en') ? 'en' : 'zh-tw');
    useHead({
      htmlAttrs: {
        lang: newLocale || 'zh'
      }
    });
  },
  { immediate: true }
);

onBeforeMount(() => {
  $googleGAInit(GA_ID);
});
onMounted(async () => {
  const query = route.query || {};
  const errorMsg = query.errorMsg;
  if (typeof errorMsg === 'string' && errorMsg !== '') {
    $store.system.setMessageState({
      text: errorMsg,
      type: 'error'
    });
  }
  const infoMsg = query.infoMsg;
  if (typeof infoMsg === 'string' && infoMsg !== '') {
    $store.system.setMessageState({
      text: infoMsg,
      type: 'info'
    });
  }
  const warnMsg = query.warnMsg;
  if (typeof warnMsg === 'string' && warnMsg !== '') {
    $store.system.setMessageState({
      text: warnMsg,
      type: 'warning'
    });
  }
  const successMsg = query.successMsg;
  if (typeof successMsg === 'string' && successMsg !== '') {
    $store.system.setMessageState({
      text: successMsg,
      type: 'success'
    });
  }
  if (typeof $store.clientInit === 'function') {
    await $store.clientInit();
  }
  router.push({
    query: {
      ...query,
      errorMsg: undefined,
      successMsg: undefined,
      warnMsg: undefined,
      infoMsg: undefined
    }
  });
});
onUnmounted(() => {
  window.removeEventListener('resize', window._pluginwareHandleResize_);
});
</script>

<style>
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s ease-out;
}
.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  filter: blur(1rem);
}
.page-enter-from,
.layout-enter-from {
  opacity: 0;
}
.page-leave-to,
.layout-leave-to {
  opacity: 1;
}
</style>
