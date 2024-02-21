<template>
  <div class="number_box" :style="cssVariable">
    <v-text-field
      v-model="value"
      :class="['number_box-input', error ? 'v-field--error' : '']"
      :disabled="disabled"
      :clearable="clearable"
      @keyup="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template v-if="reduceBtn === true" #prepend-inner>
        <v-btn
          icon=""
          tabindex="-1"
          class="number_box-input-reduce_btn"
          @click="handleClick(0 - step)"
        >
          <img src="/img/icons/reduce-icon.svg" />
        </v-btn>
      </template>

      <template v-if="addBtn === true" #append-inner>
        <v-btn
          icon=""
          tabindex="-1"
          class="number_box-input-add_btn"
          @click="handleClick(step)"
        >
          <img src="/img/icons/add-icon.svg" />
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>
<script setup>
const { $amountFormat } = useNuxtApp();

const props = defineProps({
  min: { type: [Number, String], default: undefined },
  max: { type: [Number, String], default: undefined },
  value: { type: [String, Number], default: '0' },
  modelValue: { type: [String, Number], default: '0' },
  step: { type: Number, default: 1 },
  thousandth: { type: Boolean, default: true },
  clearable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  addBtn: { type: Boolean, default: true },
  reduceBtn: { type: Boolean, default: true },
  textAlign: { type: String, default: 'center' },
  error: { type: Boolean, default: false }
});
const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur']);

const value = ref(null);
const propsValue = computed(() => props.value);
const propsMin = computed(() => props.min);
const propsMax = computed(() => props.max);
const cssVariable = computed(() => {
  const _cssVariable = {};
  if (typeof props.textAlign === 'string' && props.textAlign !== '') {
    _cssVariable['--number_text_align'] = props.textAlign;
  }
  if (props.disabled === true) {
    _cssVariable['--number_cursor'] = 'not-allowed';
  }
  return _cssVariable;
});

watch(
  () => propsValue.value,
  (newValue) => {
    if (isNaN(Number(`${newValue}`.replaceAll(/\,/g, '')))) {
      value.value = 0;
      emit('input', 0);
      emit('update:modelValue', 0);
    } else if (value.value !== newValue) {
      value.value = newValue;
    }
  },
  { immediate: true }
);
watch(
  () => [propsMin, propsMax],
  () => {
    const _value = Number(`${value.value}`.replaceAll(/\,/g, ''));
    const inputData = handelLlimit(_value);
    if (inputData !== _value) {
      value.value = _value;
      emit('input', inputData);
      emit('update:modelValue', inputData);
    }
  }
);
watch(
  () => value.value,
  async (newValue, oldValue) => {
    if (newValue === null || newValue === 'null') {
      value.value = '';
      emit('input', '');
      emit('update:modelValue', '');
    } else if (
      newValue !== '' &&
      newValue !== oldValue &&
      isNaN(Number(`${newValue}`.replaceAll(/\,/g, '')))
    ) {
      await nextTick();
      value.value = oldValue;
      emit('input', oldValue);
      emit('update:modelValue', oldValue);
    }
  }
);

function handelFormat(_value = '', inputData = '_') {
  let value;
  if (props.thousandth === false) {
    value = _value;
  } else {
    value = $amountFormat(_value.replaceAll(/\,/g, ''));
  }

  return inputData.indexOf('.') === inputData.length - 1 ? `${value}.` : value;
}

function handelLlimit(_value = 0) {
  if (
    isNaN(propsMin.value) === false &&
    Number(propsMin.value) > Number(_value)
  ) {
    return propsMin.value;
  } else if (
    isNaN(propsMax.value) === false &&
    Number(propsMax.value) < Number(_value)
  ) {
    return propsMax.value;
  }
  return _value;
}

function handleInput(e) {
  const keyCode = e.keyCode;
  if ([36, 36, 37, 38, 39, 39, 46, 17, 65].includes(keyCode)) {
    return;
  }

  const inputData = e?.target?.value || (typeof e === 'string' ? e : '0');
  const newValue = handelLlimit(Number(inputData.replaceAll(/\,/g, '')));
  if (isNaN(newValue)) {
    value.value = 0;
    return;
  }
  const _newValue = handelFormat(`${newValue}`, inputData);

  value.value = _newValue;
  emit('input', _newValue);
  emit('update:modelValue', _newValue);
}
function handleClick(term) {
  const _value = Number(`${value.value || '0'}`.replaceAll(/\,/g, ''));
  const newValue = handelFormat(`${handelLlimit(_value + term)}`);

  value.value = newValue;
  emit('input', newValue);
  emit('update:modelValue', newValue);
}
function handleFocus(...arg) {
  emit('focus', ...arg);
}
function handleBlur(...arg) {
  emit('blur', ...arg);
}
</script>

<style lang="scss" scoped>
.number_box {
  cursor: var(--number_cursor);
  &-input {
    :deep(.v-field__input) {
      padding: 15px 16px;
    }
  }
}
</style>

<style lang="scss">
.number_box-input {
  .v-input__details {
    display: none;
  }
  &.v-field--error {
    background-color: #fff5f5;
    input {
      color: rgb(176, 0, 32);
    }
  }
  .v-field__input {
    padding: 15px 16px;
  }
  input {
    // text-align: center;
    text-align: var(--number_text_align);
  }
  &-add_btn {
    &.v-btn--icon.v-btn--density-default {
      background-color: #fff0;
      box-shadow: none;
    }
  }
  &-reduce_btn {
    &.v-btn--icon.v-btn--density-default {
      background-color: #fff0;
      box-shadow: none;
    }
  }
}
</style>
