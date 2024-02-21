<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <ClientOnly>
    <template #fallback>
      <div
        class="infinite_scroll"
        v-bind="$attrs"
        :style="height ? `height:${height};${cssVariable}` : cssVariable"
      >
        <template v-for="(item, key, index) in $slots" :key="index">
          <slot :name="key" />
        </template>
      </div>
    </template>
    <v-infinite-scroll
      class="infinite_scroll"
      v-bind="$attrs"
      :height="height"
      :onLoad="handleLoad"
      :style="cssVariable"
    >
      <template v-for="(item, key, index) in $slots" :key="index" #[key]>
        <slot :name="key" />
      </template>
    </v-infinite-scroll>
  </ClientOnly>
</template>

<script setup>
import _debounce from 'lodash/debounce';

const props = defineProps({
  height: { type: String, default: null },
  overflow: { type: String, default: null },
  overflowY: { type: String, default: 'auto' },
  overflowX: { type: String, default: 'auto' },
  showLoadingIcon: { type: Boolean, default: false },
  load: {
    type: Function,
    default: async () => {}
  },
  wait: { type: Number, default: 500 }
});

const cssVariable = computed(() => {
  let _cssVariable = '';
  if (props.showLoadingIcon === true) {
    _cssVariable += '--infinite_show_loading_icon: flex;';
  } else {
    _cssVariable += '--infinite_show_loading_icon: none;';
  }

  if (typeof props.overflow === 'string' && props.overflow !== '') {
    _cssVariable += `--infinite_overflow_y: ${props.overflow};--infinite_overflow_x: ${props.overflowX};`;
  } else {
    if (typeof props.overflowY === 'string' && props.overflowY !== '') {
      _cssVariable += `--infinite_overflow_y: ${props.overflowY};`;
    }

    if (typeof props.overflowX === 'string' && props.overflowX !== '') {
      _cssVariable += `--infinite_overflow_x: ${props.overflowX};`;
    }
  }

  return _cssVariable;
});

async function handleLoad(...arg) {
  console.log('handleLoad');
  await _handleLoad(...arg);
}
const _handleLoad = _debounce(function (...arg) {
  const [{ done }] = arg;
  done('loading');

  try {
    const promise = props.load(...arg);
    if (typeof promise?.then === 'function') {
      promise.then((data) => {
        done('ok');
        return data;
      });
    } else {
      done('ok');
    }
    return promise;
  } catch (error) {
    done('error');
    throw error;
  }
}, props.wait);
</script>

<style lang="scss" scoped>
.infinite_scroll {
  overflow-y: var(--infinite_overflow_y);
  overflow-x: var(--infinite_overflow_x);
  @include mobile {
    overflow-y: hidden;
    overflow-x: hidden;
  }
  :deep(.v-infinite-scroll__side) {
    display: var(--infinite_show_loading_icon);
  }
}
</style>
