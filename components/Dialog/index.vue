<template>
  <v-dialog
    :model-value="trigger"
    :width="width"
    @update:model-value="handleChange"
  >
    <component
      :is="contentComponent"
      :key="content"
      :class="contentClass"
      :style="cssVariable"
      v-bind="contentProps"
      @close="() => handleChange(false)"
    />
  </v-dialog>
</template>

<script setup>
const modules = {
  ...import.meta.glob('./*.vue'),
  ...import.meta.glob('./*/*.vue')
};

const props = defineProps({
  // trigger: { type: Boolean, default: false },
  width: { type: String, default: null },
  content: { type: String, default: null },
  bgColor: { type: String, default: '#fff' },
  radius: { type: String, default: '4px' },
  contentClass: { type: [String, Array, Object], default: null },
  contentProps: { type: Object, default: null },
  broswerInfo: { type: Object, default: null }
});
const emit = defineEmits(['handleTrigger']);

const contentComponent = shallowRef(null);

const trigger = ref(false);
const contentComponentLoaded = ref(false);

const contentClass = computed(() => {
  const defalutClass = 'dialog_content';
  if (typeof props.contentClass === 'string' && props.contentClass !== '') {
    return `${defalutClass} ${props.contentClass}`;
  } else if (
    Array.isArray(props.contentClass) &&
    props.contentClass.length > 0
  ) {
    return [defalutClass, ...props.contentClass];
  } else if (
    typeof props.contentClass === 'object' &&
    props.contentClass !== null
  ) {
    const _contentClass = [defalutClass];
    Object.keys(props.contentClass).forEach((key) => {
      if (props.contentClass[key] !== false) {
        _contentClass.push(key);
      }
    });
    return _contentClass;
  }

  return defalutClass;
});

const cssVariable = computed(() => {
  const _cssVariable = {};

  _cssVariable['--dialog_content_opacity'] =
    contentComponentLoaded.value === true ? 1 : 0;

  // if (typeof props.bgColor === 'string') {
  //   _cssVariable['--dialog_bg_color'] = props.bgColor;
  // }

  // if (typeof props.radius === 'string') {
  //   _cssVariable['--dialog_radius'] = props.radius;
  // }

  return _cssVariable;
});

watch(
  () => props.content,
  async (newValue) => {
    const contentName =
      typeof newValue === 'string' && newValue.includes('.vue') === false
        ? `${newValue}.vue`
        : newValue;

    if (typeof newValue === 'string' && newValue !== '') {
      contentComponent.value = defineAsyncComponent(
        modules[`./${contentName}`]
      );
      trigger.value = true;
      await nextTick();
      contentComponentLoaded.value = true;
    } else {
      contentComponentLoaded.value = false;
      trigger.value = false;
      document
        .querySelectorAll('html,body')
        .forEach((element) => (element.style.overflow = null));
      contentComponent.value = null;
      emit(
        'handleTrigger',
        {
          trigger: false,
          width: null,
          bgColor: '#fff',
          radius: '4px',
          content: null,
          contentClass: null,
          contentProps: null
        },
        false
      );
    }
  }
);

async function handleChange(newValue) {
  trigger.value = false;
  await nextTick();
  setTimeout(() => {
    let payload;
    if (newValue === false) {
      payload = {
        trigger: false,
        width: null,
        bgColor: '#fff',
        radius: '4px',
        content: null,
        contentClass: null,
        contentProps: null
      };
    } else {
      payload = JSON.parse(JSON.stringify(props));
    }
    emit('handleTrigger', payload, newValue);
  }, 100);
}
</script>

<style lang="scss" scoped>
.dialog_content {
  --dialog_content_opacity: 1;
  --dialog_bg_color: #fff;
  --dialog_radius: 4px;
  opacity: var(--dialog_content_opacity);
  // background: transparent;
  background: var(--dialog_bg_color);
  // border-radius: 4px;
  border-radius: var(--dialog_radius);
  overflow-y: auto;
  box-shadow: 0 0.6875rem 0.9375rem -0.4375rem var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0 1.5rem 2.375rem 0.1875rem
      var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0 0.5625rem 2.875rem 0.5rem
      var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
  // > * {
  //   background-color: #fff;
  // }
}
</style>
