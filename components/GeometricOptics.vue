<template>
  <div class="geometric_optics_root" :style="cssVariable">
    <div ref="geometricOpticsEl" :class="className" />
  </div>
</template>
<script setup>
const props = defineProps({
  height: { type: String, default: '80vh' },
  width: { type: String, default: null },
  className: { type: [String, Array, Object], default: null }
});
const geometricOptics = ref(null);
const geometricOpticsEl = ref(null);
const geometricOpticsModule = ref(null);

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

async function handleGeometricOptics() {
  await import('@/utils/joist/splash');
  await import('@/utils/chipper/initialize-globals');
  await import('@/utils/assert/assert');
  await import('@/utils/tandem/PhetioIDUtils');
  // await import('@/utils/chipper/phet-io/phetioCompareAPIs');
  const _geometricOpticsModule = await import(
    '@/utils/geometric-optics/geometric-optics-main'
  );
  console.log({ _geometricOpticsModule });

  geometricOptics.value = await _geometricOpticsModule.GeometricOpticsInit(
    geometricOpticsEl.value
  );

  geometricOpticsModule.value = _geometricOpticsModule;
}

onMounted(() => {
  handleGeometricOptics();
});
</script>

<style lang="scss" scoped>
.geometric_optics_root {
  width: var(--geometric_optics_width);
  height: var(--geometric_optics_height);
  &-el {
    width: 100%;
    height: 100%;
  }
}
</style>
