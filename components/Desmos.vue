<template>
  <div class="desmos_root">
    <div ref="desmosEl" :style="cssVariable" :class="className" />
  </div>
</template>
<script setup>
import DESMOS_LOCALES from '@/i18n/desmosLocales';
const { $i18n } = useNuxtApp();

// https://www.npmjs.com/package/desmos
const props = defineProps({
  height: { type: String, default: '80vh' },
  width: { type: String, default: null },
  className: { type: String, default: null }
});

const desmosEl = ref(null);
const desmosModule = ref(null);
const calculator = ref(null);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.height === 'string') {
    _cssVariable['--desmos_height'] = props.height;
  }

  if (typeof props.width === 'string') {
    _cssVariable['--desmos_width'] = props.width;
  }

  return _cssVariable;
});

function handleDesmos() {
  if (document.querySelector('#desmos-srcipt') !== null) {
    initDesmos();
    return;
  }
  window.desmosLocales = DESMOS_LOCALES;
  const srciptEl = document.createElement('script');
  srciptEl.id = 'desmos-srcipt';
  srciptEl.src = '/js/desmos.js';
  srciptEl.setAttribute('id', 'desmos-srcipt');
  srciptEl.setAttribute('src', '/js/desmos.js');
  // srciptEl.onload = initDesmos;
  srciptEl.addEventListener('load', initDesmos);
  document.head.append(srciptEl);
}
function initDesmos() {
  if (typeof window.Desmos !== 'object') {
    setTimeout(initDesmos, 500);
    return;
  }
  const _desmosModule = window.Desmos;

  const _calculator = _desmosModule.GraphingCalculator(desmosEl.value);
  _calculator.updateSettings({ language: 'zh-TW' });

  _calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
  _calculator.setExpression({ id: 'graph2', latex: 'y=x^2 + v' });
  _calculator.setExpression({
    id: 'graph2-2',
    latex: 'v = 1',
    hidden: true
  });
  // console.log(_calculator.getState());
  // console.log(_calculator);

  desmosModule.value = _desmosModule;
  calculator.value = _calculator;
}

watch(
  () => $i18n.locale.value,
  (newLocale) => {
    if (typeof calculator.value?.updateSettings === 'function') {
      calculator.value.updateSettings({
        language: newLocale.includes('zh') ? 'zh-TW' : newLocale
      });
    }
  }
);

onMounted(() => {
  handleDesmos();
});
</script>

<style lang="scss" scoped>
.desmos_root {
  height: var(--desmos_height);
  width: var(--desmos_width);
  :deep(.dcg-calculator-api-container) {
    .dcg-settings-container .dcg-editable-mathquill-container {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
    }
    .dcg-settings-container
      .dcg-braille-container
      .dcg-braille-options-buttons
      .dcg-modern-btn.dcg-braille-option {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
