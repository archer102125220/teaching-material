<template>
  <div class="input_box" :style="cssVariable">
    <v-text-field
      v-if="autocomplete.length <= 0 && type !== 'textarea'"
      ref="inputRef"
      v-model="value"
      v-bind="$attrs"
      :type="type"
      :bg-color="bgColor"
      :loading="loading"
      :disabled="disabled"
      :label="placeholder"
      :clearable="statusClearable"
      :class="['input_box-input', error ? 'v-field--error' : '']"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleClearPlacehlder"
      @update:model-value="handleInput"
    >
      <template
        v-for="(item, key, index) in $slots"
        :key="index"
        #[key]="{ ...arg }"
      >
        <slot :name="key" v-bind="arg" />
      </template>
    </v-text-field>
    <v-textarea
      v-if="autocomplete.length <= 0 && type === 'textarea'"
      ref="inputRef"
      v-model="value"
      v-bind="$attrs"
      :rows="rows"
      :loading="loading"
      :bg-color="bgColor"
      :disabled="disabled"
      :label="placeholder"
      :auto-grow="autoGrow"
      :clearable="statusClearable"
      :class="['input_box-input', error ? 'v-field--error' : '']"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleClearPlacehlder"
      @update:model-value="handleInput"
    >
      <template
        v-for="(item, key, index) in $slots"
        :key="index"
        #[key]="{ ...arg }"
      >
        <slot :name="key" v-bind="arg" />
      </template>
    </v-textarea>
    <v-autocomplete
      v-if="
        Array.isArray(autocomplete) &&
        autocomplete.length > 0 &&
        type !== 'textarea'
      "
      ref="inputRef"
      v-model="value"
      v-bind="$attrs"
      :type="type"
      auto-select-first
      :bg-color="bgColor"
      :disabled="disabled"
      :loading="loading"
      :label="placeholder"
      :items="autocomplete"
      :clearable="statusClearable"
      :custom-filter="customFilter"
      :class="['input_box-input', error ? 'v-field--error' : '']"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleClearPlacehlder"
      @update:model-value="handleInput"
      @update:menu="handleAutocomplete"
    >
      <template
        v-for="(item, key, index) in $slots"
        :key="index"
        #[key]="{ ...arg }"
      >
        <slot :name="key" v-bind="arg" />
      </template>
    </v-autocomplete>
  </div>
</template>

<script setup>
const props = defineProps({
  clearable: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: null },
  autocompleteOnly: { type: Boolean, default: false },
  autocomplete: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  value: { type: [String, Number, Array], default: '' },
  error: { type: Boolean, default: false },
  height: { type: String, default: '62px' },
  inputHeight: { type: String, default: '36px' },
  needClearPlacehlder: { type: Boolean, default: true },
  autoBlur: { type: Boolean, default: true },
  rows: { type: [String, Number], default: '1' },
  autoGrow: { type: Boolean, default: true },
  bgColor: { type: String, default: null },
  textAlign: { type: String, default: 'left' },
  loading: { type: Boolean, default: false },
  customFilter: { type: Function, default: null },
  chipsMarginTop: { type: [String, Number], default: '16px' }
});
const emit = defineEmits(['input', 'focus', 'blur']);

const inputRef = ref(null);
const statusClearable = ref(false);
const value = ref(null);
const propsValue = computed(() => props.value);
const placeholder = ref('');
// const placeholder = computed(() => {
//   return props.disabled === true && props.value ? '' : props.placeholder;
// });
const cssVariable = computed(() => {
  const _cssVariable = {};
  if (typeof props.height === 'string' && props.height !== '') {
    _cssVariable['--input_box_height'] = props.height;
  }
  if (typeof props.inputHeight === 'string' && props.inputHeight !== '') {
    _cssVariable['--input_box_input_height'] = props.inputHeight;
  }

  if (typeof props.textAlign === 'string' && props.textAlign !== '') {
    _cssVariable['--input_box_text_align'] = props.textAlign;
  }

  if (props.disabled === true) {
    _cssVariable['--input_box_cursor'] = 'not-allowed';
  }

  if (
    typeof props.value === 'string' &&
    props.value !== '' &&
    props.needClearPlacehlder === false
  ) {
    _cssVariable['--input_box_align_items'] = null;
  }
  if (props.needClearPlacehlder === false) {
    _cssVariable['--input_padding_top'] =
      'calc(var(--v-field-padding-top, 4px) + var(--v-input-padding-top,  8px))';
  } else {
    _cssVariable['--input_padding_top'] = '0px';
  }

  if (
    Array.isArray(props.autocomplete) &&
    props.autocomplete.length > 0 &&
    props.type !== 'textarea' &&
    ((value.value !== '' && value.value !== null) ||
      placeholder.value === '' ||
      placeholder.value === null)
  ) {
    _cssVariable['--input_box_align_items'] = 'flex-start';
    // _cssVariable['--input_box_margin_top'] = '16px';
    // _cssVariable['--input_box_margin_top'] = '5.5%';
    _cssVariable['--input_box_margin_top'] =
      typeof props.chipsMarginTop === 'string'
        ? props.chipsMarginTop
        : typeof props.chipsMarginTop === 'number'
        ? `${props.chipsMarginTop}px`
        : '16px';
    // _cssVariable['--input_padding_top'] =
    //   'calc(var(--v-field-padding-top, 4px) + var(--v-input-padding-top,  8px))';
    _cssVariable['--input_padding_top'] = '0px';
    _cssVariable['--input_box_input_height'] = '100%';
  }

  return _cssVariable;
});

watch(
  () => propsValue.value,
  (newValue) => {
    if (value.value !== newValue) {
      value.value = newValue;
    }
    if (props.needClearPlacehlder === false) {
      placeholder.value = props.placeholder;
      return;
    }
    if (!newValue) {
      placeholder.value = props.placeholder;
    } else {
      placeholder.value = '';
    }
  },
  { immediate: true }
);

function handleInput(e) {
  const newValue = e?.target?.value || (typeof e === 'string' ? e : '');
  value.value = newValue;
  emit('input', newValue);
}
function handleFocus(...arg) {
  emit('focus', ...arg);
}
function handleClearPlacehlder(...arg) {
  if (
    props.autocompleteOnly === true &&
    Array.isArray(props.autocomplete) === true &&
    props.autocomplete.length > 0 &&
    props.autocomplete.includes(value.value) === false
  ) {
    value.value = null;
    emit('input', null);
    placeholder.value = props.placeholder;
    emit('blur', ...arg);
    return;
  }
  emit('blur', ...arg);
  if (props.needClearPlacehlder === false) return;
  const _value = value.value || '';
  if (_value !== '') {
    placeholder.value = '';
  } else {
    placeholder.value = props.placeholder;
  }
}
function handleAutocomplete(newValue) {
  if (props.autoBlur === true && newValue === false) {
    inputRef.value.blur();
  }
}
onMounted(() => {
  if (props.disabled === false && !props.value) {
    placeholder.value = props.placeholder;
  }
  statusClearable.value = props.clearable;
});
onUpdated(() => {
  statusClearable.value = props.clearable;
});
</script>

<style lang="scss" scoped>
.input_box {
  cursor: var(--input_box_cursor);
  --input_box_text_align: left;
  --input_box_align_items: center;
  &-input {
    font-size: 1.25rem;
    text-align: var(--input_box_text_align);
    :deep(.v-field__clearable > .v-icon) {
      font-size: 20px;
    }
    :deep(input) {
      text-align: var(--input_box_text_align);
    }
    // :deep(.v-field__input) {
    //   padding: 15px 16px;
    // }
    // :deep(div.v-field__input) {
    //   padding: 15px 16px;
    // }
    :deep(.v-field) {
      --v-input-chips-margin-top: var(--input_box_margin_top);
      // min-height: 62px;
      min-height: var(--input_box_height);
    }
    :deep(div.v-autocomplete__selection) {
      // min-height: 36px;
      min-height: var(--input_box_input_height);
    }
    :deep(.v-field__field) {
      align-items: var(--input_box_align_items);
    }
    :deep(.v-field__input:not(textarea)) {
      --v-field-input-padding-bottom: 0px;
      // padding-bottom: 0;
    }
    :deep(div.v-field__input) {
      --v-field-input-padding-top: var(--input_padding_top);
      // min-height: 36px;
      min-height: var(--input_box_input_height);
    }
    :deep(textarea.v-field__input) {
      --v-field-input-padding-top: 16px;
      --v-field-input-padding-bottom: 16px;
      // padding: 16px;
      // padding-bottom: 6px;
      overflow-y: auto;
    }
  }
}
</style>

<style lang="scss">
.input_box {
  .v-input__details {
    display: none;
  }
  .v-field__input {
    // padding: 15px 16px;
    // &div {
    //   padding: 15px 16px;
    // }
    &textarea {
      // padding: 15px 6px;
      overflow-y: auto;
    }
  }
  &-input.v-field--error {
    background-color: #fff5f5;
  }
}
</style>
