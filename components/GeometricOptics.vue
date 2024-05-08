<template>
  <div class="geometric_optics_root" :style="cssVariable">
    <div ref="geometricOpticsEl" :class="className" />
  </div>
</template>
<script setup>
import phetLocale from '@/assets/locales/phetLocale.json';

const { $i18n } = useNuxtApp();

const props = defineProps({
  height: { type: String, default: '80vh' },
  width: { type: String, default: null },
  className: { type: [String, Array, Object], default: null }
});
const emit = defineEmits(['loading']);

const geometricOpticsEl = ref(null);
const locale = ref(phetLocale.locale || null);
const localeListData = ref(phetLocale.localeListData || null);
const localeListMetadata = ref(phetLocale.localeListMetadata || null);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.height === 'string') {
    _cssVariable['--geometric_optics_height'] = props.height;
  }

  if (typeof props.width === 'string') {
    _cssVariable['--geometric_optics_width'] = props.width;
  }

  return _cssVariable;
});
const className = computed(() => {
  const _className = ['geometric_optics_root-el'];

  if (typeof props.className === 'string') {
    _className.push(props.className);
  } else if (Array.isArray(props.className) && props.className.length > 0) {
    _className.push(...props.className);
  } else if (typeof props.className === 'object' && props.className !== null) {
    Object.keys(props.className).forEach((key) => {
      if (props.className[key] !== false) {
        _className.push(key);
      }
    });
  }

  return _className;
});

async function handleLoadGeometricOptics() {
  emit('loading', true);
  window.getSplashContainer = function () {
    return geometricOpticsEl.value;
  };
  window.updatePhetChipperLocale = function () {
    return $i18n.locale.value.includes('zh') ? 'zh_TW' : 'en';
  };
  window.updatePhetChipperStrings = function () {
    return locale.value;
  };
  window.updatePhetChipperStringMetadata = function () {
    return localeListMetadata.value[
      $i18n.locale.value.includes('zh') ? 'zh_TW' : 'en'
    ];
  };

  if (document.querySelector('#geometric-optics-phet') === null) {
    const geometricOpticsPhet = document.createElement('script');
    geometricOpticsPhet.id = 'geometric-optics-phet';
    geometricOpticsPhet.src =
      '/phet/js/geometric-optics_en_adapted-from-phet.js';
    geometricOpticsPhet.setAttribute('id', 'geometric-optics-phet');
    geometricOpticsPhet.setAttribute(
      'src',
      'phet/js/geometric-optics_en_adapted-from-phet.js'
    );
    geometricOpticsPhet.addEventListener('load', handleGeometricOptics);
    document.head.append(geometricOpticsPhet);
  }
}

async function handleGeometricOptics() {
  try {
    await window.initGOSim(geometricOpticsEl.value);
  } catch (error) {
    console.log(error);
  }

  emit('loading', false);
}

onMounted(() => {
  handleLoadGeometricOptics();
});
</script>

<style lang="scss" scoped>
.geometric_optics_root {
  width: var(--geometric_optics_width);
  height: var(--geometric_optics_height);
  position: relative;
  &-el {
    width: 100%;
    height: 100%;
  }
}
</style>
