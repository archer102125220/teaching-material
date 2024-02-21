<template>
  <div class="phone_block">
    <template v-if="disabled === true">
      <v-text-field
        v-if="hasCountryCode"
        v-model="countryCode"
        type="number"
        disabled
        :prepend-inner-icon="hasPrependIcon ? 'mdi-plus' : undefined"
        :class="
          [
            'phone_block-area_code',
            countryCodeClass,
            countryCodeError ? 'v-field--error' : ''
          ].join(' ')
        "
      />

      <v-text-field
        v-model="phone"
        type="number"
        disabled
        :class="[
          'phone_block-phone',
          phoneClass,
          phoneError ? 'v-field--error' : ''
        ]"
      />
    </template>
    <template v-else-if="disabled !== true">
      <v-text-field
        v-if="hasCountryCode"
        type="number"
        :label="countryCodeLabel"
        :clearable="disabled === false"
        :value="countryCode"
        :disabled="disabled"
        :prepend-inner-icon="hasPrependIcon ? 'mdi-plus' : undefined"
        :class="
          [
            'phone_block-area_code',
            countryCodeClass,
            countryCodeError ? 'v-field--error' : ''
          ].join(' ')
        "
        :bg-color="countryCodeBgColor"
        @update:model-value="handleCountryCodeChange"
        @blur="handleCountryCodeBlur"
        @click:clear="handleCountryCodeChange"
      />

      <v-text-field
        type="number"
        :label="phoneLabel"
        :clearable="disabled === false"
        :value="phone"
        :disabled="disabled"
        :class="
          [
            'phone_block-phone',
            phoneClass,
            phoneError ? 'v-field--error' : ''
          ].join(' ')
        "
        :bg-color="phoneBgColor"
        @update:model-value="handlePhoneChange"
        @blur="handlePhoneBlur"
        @click:clear="handlePhoneChange"
      />
    </template>
  </div>
</template>

<script setup>
// import { PHONE_AREA_CODE } from '@/assets/phoneCountryCode';

const props = defineProps({
  disabled: { type: Boolean, default: false },
  hasCountryCode: { type: Boolean, default: true },
  countryCodeError: { type: Boolean, default: false },
  countryCodeLabel: { type: String, default: '區碼' },
  countryCode: { type: String, default: '' },
  countryCodeClass: { type: String, default: '' },
  phoneLabel: { type: String, default: '電話號碼' },
  phone: { type: String, default: '' },
  phoneClass: { type: String, default: '' },
  phoneError: { type: Boolean, default: false },
  hasPrependIcon: { type: Boolean, default: false },
  countryCodeBgColor: { type: String, default: null },
  phoneBgColor: { type: String, default: null }
});
const emit = defineEmits([
  'input',
  'change',
  'phoneInput',
  'countryCodeInput',
  'blur',
  'phoneBlur',
  'countryCodeBlur'
]);

const countryCode = ref('');
const phone = ref('');

const propsCountryCode = computed(() => props.countryCode);
const propsPhone = computed(() => props.phone);
const hasCountryCode = computed(() => props.hasCountryCode);
const countryCodeError = computed(() => props.countryCodeError);
const phoneError = computed(() => props.phoneError);
// const flag = computed(() => {
//   if (countryCode.value === '') return 'TW';

//   return (
//     PHONE_AREA_CODE.find(
//       (_phoneCountryCode) =>
//         _phoneCountryCode.phoneCode.padStart(3, 0) === countryCode.value
//     )?.countryCode || ''
//   );
// });

watch(
  propsCountryCode,
  (newValue) => {
    if (countryCode.value !== newValue) {
      countryCode.value = newValue;
    }
  },
  { immediate: true }
);

watch(
  propsPhone,
  async (newValue) => {
    if (phone.value !== newValue) {
      await nextTick();
      phone.value = newValue;
    }
  },
  { immediate: true }
);

function handleCountryCodeChange(e) {
  const countryCodeData = e?.data || e || '';
  if (isNaN(countryCodeData) === true && countryCodeData !== '') {
    return;
  }
  const countryCodeValue = e?.target?.value || e?.data || e || '';
  // const countryCodeValue = countryCode.value + countryCodeData;
  // console.log({ countryCodeData, countryCodeValue });

  countryCode.value = countryCodeValue;
  const value = countryCodeValue + phone.value;
  emit('input', { value, countryCode: countryCode.value, phone: phone.value });
  emit('phoneInput', {
    value,
    countryCode: countryCode.value,
    phone: phone.value
  });
}
function handlePhoneChange(e) {
  let phoneValue = e?.target?.value || e?.data || e || '';
  if (
    countryCode.value === '886' &&
    phoneValue !== '' &&
    phoneValue.substring(0, 1) !== '0'
  ) {
    phoneValue = '0' + phoneValue;
  }
  phone.value = phoneValue;
  const value = phoneValue + countryCode.value;
  emit('input', { value, countryCode: countryCode.value, phone: phone.value });
  emit('countryCodeInput', {
    value,
    countryCode: countryCode.value,
    phone: phone.value
  });
}
function handlePhoneBlur(...arg) {
  emit('blur', ...arg);
  emit('phoneBlur', ...arg);
}
function handleCountryCodeBlur(...arg) {
  emit('blur', ...arg);
  emit('countryCodeBlur', ...arg);
}
</script>

<style lang="scss" scoped>
.phone_block {
  font-size: 1.25rem;
  display: flex;
  // margin-bottom: 20px;
  margin-bottom: 10px;
  :deep(.v-field) {
    min-height: 62px;
  }
  :deep(.v-field__field) {
    align-items: center;
  }
  :deep(.v-field__input) {
    padding-bottom: 5px;
  }
  :deep(textarea.v-field__input) {
    // padding: 15px 6px;
    overflow-y: auto;
  }
  &-area_code {
    flex: 0;
    // flex-basis: 35%;
    flex-basis: 38%;
    margin-right: 12px;
    @include tablet {
      flex-basis: 40%;
      // flex-basis: 30%;
    }
    &-prepend_inner {
      width: 40px;
      display: flex;
      align-items: center;
      margin-right: 5px;
    }
  }
  &-phone {
    flex: 1;
    @include tablet {
      flex-basis: 60%;
    }
  }
}
</style>

<style lang="scss">
.phone_block {
  .v-input__details {
    display: none;
  }
  .v-field {
    @include tablet {
      padding: 0;
    }
  }
  .v-field--error {
    background-color: #fff5f5;
  }
  input {
    &::-webkit-inner-spin-button {
      display: none;
    }
  }
}
</style>
