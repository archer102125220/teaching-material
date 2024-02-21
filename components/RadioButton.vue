<template>
  <v-radio-group
    v-model="value"
    class="radio_button"
    :inline="inline"
    :style="disabled === true ? 'cursor: not-allowed;' : ''"
  >
    <div class="radio_button-option" :style="`flex:${optionsFlex};`">
      <v-radio
        v-for="(item, key) in options"
        :key="key"
        color="primary"
        :label="item.label"
        :value="item.value"
        :disabled="disabled"
      />
    </div>
    <div
      v-if="hasOrther === true"
      class="radio_button-orther"
      :style="`flex:${ortherFlex};`"
    >
      <v-radio
        class="radio_button-orther-radio"
        color="primary"
        value="|_|"
        :disabled="disabled"
      />
      <div
        class="radio_button-orther-input_block"
        @click="disabled === false ? (value = '|_|') : ''"
      >
        <slot
          name="ortherInput"
          :disabled="value !== '|_|' || disabled"
          :is-updated="isUpdated"
          :label="statusOrtherLabel"
        >
          <v-text-field
            v-model="ortherValue"
            :clearable="statusClearable"
            :label="statusOrtherLabel"
            :disabled="value !== '|_|'"
            :bg-color="isUpdated ? '#e8effd' : undefined"
            class="radio_button-orther-input_block-input"
          />
        </slot>
      </div>
    </div>
  </v-radio-group>
</template>

<script setup>
const props = defineProps({
  options: { type: Array, default: () => [{ label: '', value: '' }] },
  value: { type: [String, Number], default: '' },
  ortherLabel: { type: String, default: '其他' },
  optionsFlex: { type: String, default: '' },
  ortherFlex: { type: String, default: '' },
  hasOrther: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  isUpdated: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  needClearOrtherLabel: { type: Boolean, default: true }
});
const emit = defineEmits(['change']);

const value = ref(null);
const ortherValue = ref('');
const statusClearable = ref(null);
const statusOrtherLabel = ref('');
const propsValue = computed(() => props.value);
const propsOptions = computed(() => props.options);

watch(
  () => [propsValue.value, propsOptions.value],
  ([newPropsValue, newPropsOptions]) => {
    if (
      newPropsOptions.find(
        (propsOption) => propsOption.value === newPropsValue
      ) === undefined
    ) {
      value.value = '|_|';
      ortherValue.value = newPropsValue;
    } else if (newPropsValue !== value.value) {
      value.value = newPropsValue;
      statusOrtherLabel.value = props.ortherLabel;
    }
  },
  { immediate: true }
);
watch(
  () => value.value,
  (newValue) => {
    if (newValue !== '|_|' && propsValue.value !== newValue) {
      emit('change', newValue);
      statusOrtherLabel.value = props.ortherLabel;
    } else if (newValue === '|_|') {
      emit('change', ortherValue.value);
    }
  }
);
watch(
  () => ortherValue.value,
  (newValue) => {
    if (propsValue.value !== newValue) {
      emit('change', newValue);
    }
    if (props.needClearOrtherLabel === false || !newValue) {
      statusOrtherLabel.value = props.ortherLabel;
    } else {
      statusOrtherLabel.value = '';
    }
  }
);
onMounted(() => {
  statusClearable.value = props.clearable;
});
onUpdated(() => {
  statusClearable.value = props.clearable;
});
</script>

<style lang="scss" scoped>
.radio_button {
  &-option,
  &-orther {
    display: flex;
    :deep(.v-field) {
      min-height: 62px;
    }
    :deep(.v-field__field) {
      align-items: center;
    }
    :deep(.v-field__input) {
      padding-bottom: 0;
    }
    :deep(textarea.v-field__input) {
      // padding: 15px 6px;
      overflow-y: auto;
    }
    &-radio {
      flex-grow: 0;
    }
    &-input_block {
      flex: 1;
      cursor: pointer;
      &-input {
        font-size: 1.5rem;
      }
    }
    &-disabled {
      flex: 1;
      display: flex;
      &-input {
        flex: 1;
      }
    }
  }
}
</style>

<style lang="scss">
.radio_button {
  .v-input__details {
    display: none;
  }
  &.v-field--error {
    background-color: #fff5f5;
  }
  .v-selection-control .v-label {
    font-size: 20px;
  }
}
</style>
