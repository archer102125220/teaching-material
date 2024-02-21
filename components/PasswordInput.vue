<template>
  <v-text-field
    v-model="password"
    hide-details="auto"
    :label="placeholder"
    :clearable="clearable"
    :type="showPassword === true ? 'text' : 'password'"
    :autocomplete="props.autocomplete === true ? 'on' : 'off'"
    :class="['password_input', passwordError ? 'v-field--error' : ''].join(' ')"
    @input="handlePasswordChange"
    @blur="handleClearPlacehlder"
    @click:clear="handlePasswordChange"
  >
    <template #append-inner>
      <v-btn
        icon=""
        tabindex="-1"
        class="password_input-show_password"
        @click="handleShowPasswordChange"
      >
        <img
          alt=""
          class="password_input-show_password-icon"
          :src="`${showPassword === true ? eyeSlashSvgData : eyeSvgData}`"
        />
      </v-btn>
    </template>
  </v-text-field>
</template>

<script setup>
const props = defineProps({
  clearable: { type: Boolean, default: true },
  placeholder: { type: String, default: '密碼' },
  password: { type: String, default: '' },
  passwordError: { type: Boolean, default: false },
  change: { type: Function, default: () => {} },
  autocomplete: { type: Boolean, default: true },
  needClearPlacehlder: { type: Boolean, default: true }
});
const emit = defineEmits(['input', 'errorChange']);

const eyeSvgData = useState('eyeSvg', () => '/img/icons/eye.svg');
const eyeSlashSvgData = useState(
  'eyeSlashSvg',
  () => '/img/icons/eye-slash.svg'
);
const showPassword = ref(false);
const password = ref(null);
const placeholder = ref('');

const propsPassword = computed(() => props.password);
const passwordError = computed(() => props.passwordError);

watch(
  propsPassword,
  (newValue) => {
    if (password.value !== newValue) {
      password.value = newValue;
    }
    if (props.needClearPlacehlder === false) return;
    if (!newValue) {
      placeholder.value = props.placeholder;
    } else {
      placeholder.value = '';
    }
  },
  { immediate: true }
);

function handlePasswordChange(e) {
  const value = e?.target?.value || '';
  props.change(value);
  emit('input', value);
  if (value === '') emit('errorChange', false);
}
function handleShowPasswordChange() {
  showPassword.value = !showPassword.value;
}
function handleClearPlacehlder() {
  if (props.needClearPlacehlder === false) return;
  const _password = password.value || '';
  if (_password !== '') {
    placeholder.value = '';
  } else {
    placeholder.value = props.placeholder;
  }
}
onMounted(() => {
  if (props.disabled === false || !props.password) {
    placeholder.value = props.placeholder;
  }
});
</script>

<style lang="scss" scoped>
.password_input {
  font-size: 1.25rem;
  :deep(.v-field) {
    min-height: 62px;
  }
  :deep(.v-field__field) {
    align-items: center;
  }
  :deep(.v-field__input) {
    padding-bottom: 0;
  }
  &-show_password {
    background-color: #fff0;
    box-shadow: none;
    &-icon {
      min-width: 18px;
      min-height: 16px;
    }
  }
}
</style>

<style lang="scss">
.password_input {
  .v-input__details {
    display: none;
  }
  &.v-field--error {
    background-color: #fff5f5;
  }
}
</style>
