<template>
  <v-select
    ref="seletorRef"
    v-model="statusValue"
    class="seletor"
    :error="error"
    :loading="loading"
    :disabled="disabled"
    :label="statusPlaceholder"
    :items="options"
    :multiple="multiple"
    :clearable="clearable"
    :item-title="itemTitle"
    :item-value="itemValue"
    @update:model-value="handleChange"
    @update:focused="handleFocused"
  >
    <template v-if="multiple === true" #selection="{ item, index }">
      <v-chip
        v-if="index < Number(statusShowMultipleMax)"
        class="seletor-selected_option"
      >
        <span>{{ item.title }}</span>
      </v-chip>
      <span
        v-if="index === Number(statusShowMultipleMax)"
        class="seletor-selected_orther"
      >
        {{ statusOrtherLabel }}
      </span>
    </template>
    <template v-if="hasIcon === true" #item="{ item, index, props: _props }">
      <slot name="item" :item="item" :index="index" :props="_props">
        <v-list-item v-bind="_props">
          <template
            v-if="
              typeof (
                (Array.isArray(optionsIcon) && optionsIcon[index]) ||
                options[index]?.icon
              ) === 'string'
            "
            #prepend
          >
            <img
              alt=""
              class="seletor-item_icon"
              :src="
                (Array.isArray(optionsIcon) && optionsIcon[index]) ||
                options[index]?.icon
              "
            />
          </template>
          <template #append="{ isSelected }">
            <img
              alt=""
              class="seletor-checked_icon"
              :style="isSelected === true ? 'opacity:1;' : ''"
              src="/img/seletor/checked-icon.svg"
            />
          </template>
        </v-list-item>
      </slot>
    </template>
    <template
      v-for="(item, key, index) in $slots"
      :key="index"
      #[key]="{ ...arg }"
    >
      <slot :name="key" v-bind="arg" />
    </template>
  </v-select>
</template>

<script setup>
const props = defineProps({
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  optionsIcon: { type: Array, default: null },
  value: { type: [String, Array, Number], default: null },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  showMultipleMax: { type: Number, default: null },
  needClearPlacehlder: { type: Boolean, default: true },
  itemTitle: { type: String, default: null },
  itemValue: { type: String, default: null },
  error: { type: Boolean, default: false },
  ortherLabel: { type: String, default: '(以及其他$___num___$項)' },
  loading: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false }
});
const emit = defineEmits(['change', 'errorChange', 'focus', 'blur']);

const seletorRef = ref(null);
const statusValue = ref(null);
const statusPlaceholder = ref('');
const statusShowMultipleMax = ref(null);
const propsValue = computed(() => props.value);
const hasIcon = computed(() => {
  if (Array.isArray(props.optionsIcon) && props.optionsIcon.length > 0) {
    return true;
  }
  if (Array.isArray(props.options) && props.options.length > 0) {
    const icon = props.options.find(
      (options) => typeof options.icon === 'string'
    );
    return icon !== undefined;
  }
  return false;
});
const statusOrtherLabel = computed(() => {
  const num = statusValue.value.length - Number(statusShowMultipleMax.value);
  return typeof props.ortherLabel?.replace === 'function'
    ? props.ortherLabel?.replace('$___num___$', num)
    : `(以及其他${num}項)`;
});

watch(
  () => propsValue.value,
  async (newValue) => {
    if (
      typeof newValue === 'number' ||
      (typeof newValue === 'string' && newValue !== '') ||
      Array.isArray(newValue) === true
    ) {
      if (statusValue.value !== newValue) {
        statusValue.value = newValue;
      }
      handleClearPlacehlder(newValue);
      await nextTick();
      handleShowMultipleMax();
    } else {
      statusValue.value = null;
    }
  },
  { deep: true, immediate: true }
);
watch(
  () => statusValue.value,
  (newValue) => {
    handleClearPlacehlder(newValue);
  },
  { deep: true }
);
watch(
  () => props.placeholder,
  (newValue) => {
    handleClearPlacehlder(statusValue.value, newValue);
  },
  { deep: true }
);

function handleChange(newValue) {
  emit('change', newValue);
  emit('errorChange', false);
}
async function handleShowMultipleMax() {
  const seletorRefEl = seletorRef.value?.$el || {};
  const selectorEl = seletorRefEl?.querySelector?.('.v-field__input') || {};
  const selectedRefEl = Array.from(
    seletorRefEl?.querySelectorAll?.('.v-select__selection') || []
  );

  if (
    process.client &&
    (typeof selectorEl.clientWidth !== 'number' ||
      selectorEl.clientWidth === 0 ||
      selectedRefEl.length <= 0)
  ) {
    await nextTick();
    return setTimeout(handleShowMultipleMax, 500);
  }

  let _showMultipleMax = props.showMultipleMax || 100;
  let width = 250;
  selectedRefEl.find((element, index) => {
    width += element.offsetWidth || 0;
    if (selectorEl.clientWidth < width) {
      _showMultipleMax = index + 1;
      return true;
    }
    return false;
  });
  statusShowMultipleMax.value = _showMultipleMax;
}
function handleClearPlacehlder(newValue, newPlaceholder) {
  if (props.needClearPlacehlder === false) return;
  if (
    (typeof newValue === 'string' && newValue !== '') ||
    typeof newValue === 'number' ||
    (Array.isArray(newValue) && newValue.length > 0)
  ) {
    statusPlaceholder.value = '';
  } else {
    statusPlaceholder.value = newPlaceholder || props.placeholder;
  }
}
function handleFocused(newValue) {
  if (newValue === true) {
    emit('focus');
  } else {
    emit('blur');
  }
}

onMounted(() => {
  if (props.disabled === false || !props.value) {
    handleClearPlacehlder(props.value);
  }
  handleShowMultipleMax();
});
</script>

<style lang="scss" scoped>
.seletor {
  font-size: 1.25rem;
  // :deep(.v-field__input) {
  //   padding: 15px 6px 15px 16px;
  //   height: 56px;
  // }
  :deep(.v-field) {
    min-height: 62px;
  }
  :deep(.v-field__field) {
    align-items: center;
  }
  :deep(.v-field__input) {
    padding-bottom: 0;
  }
  :deep(.v-chip.v-chip--density-default) {
    --v-chip-height: 1.85rem;
  }
  // :deep(.seletor-selected_option.v-chip.v-chip--size-default) {
  //   @extend .seletor-selected_option;
  // }
  &-selected_option {
    font-size: 1.25rem;
    :deep(*) {
      font-size: 1.25rem;
    }
  }
  &-selected_orther {
    font-size: 1.25rem;
    color: #9e9e9e;
  }
  &-item_icon {
    margin-right: 12px;
  }
  &-checked_icon {
    opacity: 0;
  }
}
</style>

<style lang="scss">
.seletor {
  &.v-select .v-input__details {
    display: none;
  }
  .v-field--error {
    background-color: #fff5f5;
    color: #b00020;
  }
}
</style>
