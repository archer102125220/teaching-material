<template>
  <v-item-group
    v-model="statusValue"
    :multiple="multiple"
    :style="cssVariable"
    class="seletor_button"
    @update:model-value="handleChange"
  >
    <template v-for="(item, index) in options" :key="index">
      <v-item v-slot="{ isSelected, toggle }">
        <slot
          name="option"
          :item="item"
          :index="index"
          :toggle="toggle"
          :loading="loading"
          :disabled="disabled"
          :is-selected="isSelected"
        >
          <v-btn
            :color="isSelected ? selectedColor : unselectedColor"
            :variant="isSelected ? selectedVariant : unselectedVariant"
            class="seletor_button-option"
            :disabled="disabled"
            :loading="loading"
            @click="toggle"
          >
            <slot
              name="btn_content"
              :item="item"
              :index="index"
              :loading="loading"
              :is-selected="isSelected"
            >
              <span class="seletor_button-option-label">
                {{ item[itemTitle] || item }}
              </span>
              <span
                v-if="hasIcon === true"
                class="seletor_button-option-label"
                :style="isSelected ? 'width:20px;' : 'width:0px;'"
              >
                x
              </span>
            </slot>
          </v-btn>
        </slot>
      </v-item>
    </template>
  </v-item-group>
</template>

<script setup>
const props = defineProps({
  options: { type: Array, default: () => [] },
  value: { type: [String, Array, Number, Object], default: null },
  modelValue: { type: [String, Array, Number, Object], default: null },
  multiple: { type: Boolean, default: true },
  hasIcon: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  valueByKey: { type: Boolean, default: false },

  unselectedVariant: { type: String, default: 'tonal' },
  selectedVariant: { type: String, default: 'elevated' },
  unselectedColor: { type: String, default: '' },
  selectedColor: { type: String, default: 'primary' },

  btnRadius: { type: String, default: '50px' },

  lastBtnFlex: { type: String, default: undefined },

  itemTitle: { type: String, default: 'display' },
  loading: { type: Boolean, default: false },
  canCancel: { type: Boolean, default: true },
  btnWidth: { type: String, default: null },
  btnHeight: { type: String, default: null },
  btnFlex: { type: String, default: null },
  btnJustifyContent: { type: String, default: 'center' },
  justifyContent: { type: String, default: 'space-around' },
  btnGap: { type: String, default: '8px' },
  gap: { type: String, default: null }
});
const emit = defineEmits(['change', 'update:modelValue', 'errorChange']);

const statusValue = ref([]);
const propsValue = computed(() => props.value || props.modelValue);
const cssVariable = computed(() => {
  let _cssVariable = '';

  if (typeof props.btnWidth === 'string' && props.btnWidth !== '') {
    _cssVariable += `--btn_width:${props.btnWidth};`;
  }

  if (typeof props.btnHeight === 'string' && props.btnHeight !== '') {
    _cssVariable += `--btn_height:${props.btnHeight};`;
  }

  if (typeof props.gap === 'string' && props.gap !== '') {
    _cssVariable += `--root_gap:${props.gap};`;
  }

  if (typeof props.justifyContent === 'string' && props.justifyContent !== '') {
    _cssVariable += ` --root_justify_content: ${props.justifyContent};`;
  }

  if (typeof props.btnFlex === 'string' && props.btnFlex !== '') {
    _cssVariable += `--btn_flex:${props.btnFlex};`;
  }

  if (
    typeof props.btnJustifyContent === 'string' &&
    props.btnJustifyContent !== ''
  ) {
    _cssVariable += `--btn_justify_content:${props.btnJustifyContent};`;
  }

  if (typeof props.btnGap === 'string' && props.btnGap !== '') {
    _cssVariable += `--btn_gap:${props.btnGap};`;
  }

  if (typeof props.btnRadius === 'string' && props.btnRadius !== '') {
    _cssVariable += `--btn_radius:${props.btnRadius};`;
  }

  if (typeof props.lastBtnFlex === 'string' && props.lastBtnFlex !== '') {
    _cssVariable += `--last_btn_flex:${props.lastBtnFlex};`;
  }

  return _cssVariable;
});

watch(
  () => propsValue.value,
  async (newValue) => {
    const newValueArray = findPropsValue(newValue);

    await nextTick();

    if (JSON.stringify(statusValue.value) !== JSON.stringify(newValueArray)) {
      statusValue.value = newValueArray;
    }
  },
  { immediate: true }
);

async function handleChange(newValue) {
  let valueKey = 0;
  const _newValue =
    (Array.isArray(newValue) === true
      ? props.options.filter((_, key) => {
          if (key === newValue.find((_key) => _key === key)) {
            valueKey = key;
            return true;
          }
          return false;
        })
      : props.options.find((_, key) => {
          if (key === newValue) {
            valueKey = key;
            return true;
          }
          return false;
        })) || null;

  if (props.canCancel === false && _newValue === null) {
    await nextTick();
    statusValue.value = findPropsValue(propsValue.value);
    emit('change', propsValue.value);
    emit('update:modelValue', propsValue.value);
  } else {
    emit('change', props.valueByKey === true ? valueKey : _newValue);
    emit('update:modelValue', props.valueByKey === true ? valueKey : _newValue);
  }
  emit('errorChange', false);
}

function findPropsValue(newValue) {
  return props.options
    .map((option, key) =>
      Array.isArray(newValue) === true
        ? newValue.find((_newValue) =>
            props.valueByKey === true
              ? key === _newValue?.value || key === _newValue
              : (option?.value === _newValue?.value &&
                  option?.value !== undefined &&
                  _newValue?.value !== undefined) ||
                option === _newValue?.value ||
                option?.value === _newValue ||
                option === _newValue
          ) !== undefined
          ? key
          : null
        : (
            props.valueByKey === true
              ? key === newValue?.value || key === newValue
              : (option?.value === newValue?.value &&
                  option?.value !== undefined &&
                  newValue?.value !== undefined) ||
                option === newValue?.value ||
                option?.value === newValue ||
                option === newValue
          )
        ? key
        : null
    )
    .filter((option) => option !== null);
}
</script>

<style lang="scss" scoped>
.seletor_button {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--root_gap);
  row-gap: 10px;
  justify-content: var(--root_justify_content);
  &-option {
    min-width: var(--btn_width);
    min-height: var(--btn_height);
    flex: var(--btn_flex);
    // border-radius: 50px;
    border-radius: var(--btn_radius);
    display: flex;
    &:last-child {
      flex: var(--last_btn_flex, var(--btn_flex));
    }
    :deep(.v-btn__content) {
      text-transform: none;
      flex: 1;
      gap: var(--btn_gap);
      justify-content: var(--btn_justify_content);
    }
    &-label {
      overflow: hidden;
    }
  }
}
</style>
