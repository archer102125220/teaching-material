<template>
  <div
    class="time_picker"
    :style="`--bg_color: ${error ? errorBgColor : bgColor};`"
    @click="handleOpenPicker"
  >
    <el-config-provider :locale="locale">
      <span v-if="value === ''" class="time_picker-placeholder">
        {{ placeholder }}
      </span>
      <v-no-ssr>
        <el-time-picker
          ref="timePickerRef"
          v-model="statusValue"
          prefix-icon=""
          :editable="false"
          :disabled="statusDisabled"
          :format="timeFormat"
          :clearable="false"
          @update:model-value="handleChangeTime"
          @focus="handleFocus"
          @blur="handleBlur"
          @visible-change="handleVisibleChange"
        />
      </v-no-ssr>
      <img
        alt=""
        src="/img/time-picker/down-icon.svg"
        :class="['time_picker-icon', isPickerOpen && 'time_picker-icon_open']"
      />
    </el-config-provider>
  </div>
</template>

<script setup>
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';
import en from 'element-plus/dist/locale/en.mjs';

const { $dayjs, $i18n } = useNuxtApp();

const props = defineProps({
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  bgColor: { type: String, default: '#e4e4e5' },
  errorBgColor: { type: String, default: '#fbdfdf' },

  format: { type: String, default: 'HH:mm' },
  placeholder: { type: String, default: '' },
  value: { type: String, default: '' }
});
const emit = defineEmits(['change', 'focus', 'blur', 'getDateObj']);

const statusDisabled = ref(false);
const timePickerRef = ref(null);
const statusValue = ref('');
const isPickerOpen = ref(false);

const timeFormat = computed(() => props.format || 'HH:mm');
const propsValue = computed(() => props.value);
const propsDisabled = computed(() => props.disabled);
const locale = computed(() => ($i18n.locale.value === 'en' ? en : zhTw));

watch(
  () => propsDisabled.value,
  async (newValue) => {
    if (statusDisabled.value !== newValue) {
      await nextTick();

      statusDisabled.value = newValue;
    }
  },
  { immediate: true }
);
watch(
  () => propsValue.value,
  (newValue) => {
    if (statusValue.value !== newValue) {
      statusValue.value = $dayjs(
        $dayjs().format('YYYY/MM/DD ') + (newValue || '')
      ).format('YYYY/MM/DD ' + timeFormat.value);
    }
  },
  { immediate: true }
);

function handleChangeTime(newValue) {
  if (newValue === '') {
    emit('change', '');
    emit('getDateObj', null);
  } else {
    emit('change', $dayjs(newValue || undefined).format(timeFormat.value));
    emit('getDateObj', newValue);
  }
}

function handleOpenPicker() {
  if (props.disabled === true) return;
  timePickerRef.value.focus();
  timePickerRef.value.handleOpen();
}

function handleVisibleChange(newValue) {
  isPickerOpen.value = newValue;
}

function handleFocus(...e) {
  handleVisibleChange(true, ...e);
  emit('focus', ...e);
}
function handleBlur(...e) {
  handleVisibleChange(false, ...e);
  emit('blur', ...e);
}
</script>

<style lang="scss" scoped>
.time_picker {
  position: relative;
  // min-height: 6.5vh;
  min-height: 60px;
  &-input {
    z-index: 2;
    transition: height 0.3s;
    grid-auto-rows: unset;
    min-width: 100%;
    @include mobile {
      overflow: auto;
      max-width: 100%;
    }
  }
  &-placeholder {
    z-index: 1;
    position: absolute;
    left: 35px;
    // top: 20%;
    top: 25%;
    color: #999;
    font-size: 1.25rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  &-icon {
    position: absolute;
    right: 18px;
    top: 45%;
    user-select: none;
    -webkit-user-drag: none;
  }
  &-icon_open {
    transform: rotate(180deg);
  }
}
</style>
<style lang="scss">
.time_picker {
  --bg_color: #e4e4e5;
  .v-input__details {
    display: none;
  }
  &.v-field--error {
    background-color: #fff5f5;
  }
  // .v-picker.v-sheet{}
  .el-input.el-input--prefix.el-input--suffix.el-date-editor.el-date-editor--time.el-tooltip__trigger.el-tooltip__trigger {
    // min-height: 6.5vh;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    height: auto;
    font-size: 1.25rem;
    width: 100%;
    max-width: 100%;
    .el-input__wrapper {
      // background-color: #e4e4e5;
      background-color: var(--bg_color);
    }
    .el-icon.el-input__icon {
      visibility: hidden;
      // display: none;
    }
    .el-input__wrapper {
      padding: 0 18px;
    }
    .el-input__prefix-inner {
      display: none;
    }
    ::placeholder {
      color: #999;
      font-size: 1.25rem;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
    }
    ::-webkit-input-placeholder {
      color: #999;
      font-size: 1.25rem;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
    }
    :-ms-input-placeholder {
      color: #999;
      font-size: 1.25rem;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
    }
    :-moz-placeholder {
      color: #999;
      font-size: 1.25rem;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
    }
    ::-moz-placeholder {
      color: #999;
      font-size: 1.25rem;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
    }
  }
  .el-input.is-statusDisabled .el-input__inner {
    color: #3d4044;
    -webkit-text-fill-color: #3d4044;
    user-select: none;
  }
  // .el-input__inner {
  //   visibility: hidden;
  // }
}
</style>
