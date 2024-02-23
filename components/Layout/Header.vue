<template>
  <div class="default_layout_header">
    <div class="default_layout_header-title">
      <NuxtLink to="/">教材測試</NuxtLink>
      <LayoutNavMenu />
    </div>
    <div class="default_layout_header-seletor">
      <Seletor
        item-title="display"
        item-value="value"
        :value="lang"
        :options="langList"
        @change="handleLang"
      />
    </div>
  </div>
</template>
<script setup>
const { $store, $i18n, $nuxtServer } = useNuxtApp();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const route = useRoute();
const LANG_NAME = {
  zh: '中文',
  en: 'English'
};

const lang = computed(() => LANG_NAME[$i18n.locale.value || 'zh']);
const langList = computed(() =>
  ($i18n.locales.value || []).map((lang) => ({
    display: LANG_NAME[lang.code],
    value: lang.code
  }))
);

function handleLang(_lang = {}) {
  router.push({
    path: switchLocalePath(_lang),
    query: route.query
  });
  $nuxtServer
    .POST_setNuxtCookie({
      ___i18n_locale: _lang,
      __cookie_seting__: { httpOnly: false }
    })
    .catch(console.error);
}
</script>

<style lang="scss" scoped>
.default_layout_header {
  min-height: 80px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // box-shadow: -4px 5px #cdcdcd;
  border-bottom: 2px solid #cdcdcd;
  &-title {
    flex-basis: 200px;
    display: flex;
    gap: 20px;
  }
  &-seletor {
    width: 200px;
  }
}
</style>
