<template>
  <div class="dialog_profile_confirm_popup_content">
    <div class="dialog_profile_confirm_popup_content-title">
      <v-icon color="primary" icon="mdi-information" />
      <!-- <p class="dialog_profile_confirm_popup_content-title-text">提醒</p> -->
      <p class="dialog_profile_confirm_popup_content-title-text">
        {{ $t('member_information.confirm-popup-title') }}
      </p>
    </div>
    <div class="dialog_profile_confirm_popup_content-content">
      <p class="dialog_profile_confirm_popup_content-content-text">
        <!-- ※ 填齊所有會員資料後，可額外享有 -->
        {{ $t('member_information.profile-welcome-gift-alert-1') }}
      </p>
      <p class="dialog_profile_confirm_popup_content-content-highlight">
        <!-- 「會員大禮包」 -->
        {{ $t('member_information.profile-welcome-gift-alert-2') }}
      </p>
      <!-- <p class="dialog_profile_confirm_popup_content-content-text">好禮。</p> -->
      <p class="dialog_profile_confirm_popup_content-content-text">
        {{ $t('member_information.profile-welcome-gift-alert-3') }}
      </p>
      <!-- <p>確定要送出？</p> -->
      <p>{{ $t('member_information.profile-welcome-gift-alert-4') }}</p>
    </div>
    <div class="dialog_profile_confirm_popup_content-action">
      <v-btn
        color="primary"
        variant="outlined"
        size="large"
        @click="emit('close')"
      >
        <!-- 取消 -->
        {{ $t('member_information.confirm-popup-cancel-btn') }}
      </v-btn>
      <v-btn color="primary" size="large" @click="handleConfirm">
        <!-- 確認送出 -->
        {{ $t('member_information.confirm-popup-confirm-btn') }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  confirm: { type: Function, default: null }
});
const emit = defineEmits(['close']);

async function handleConfirm(...arg) {
  if (typeof props.confirm === 'function') {
    await props.confirm(...arg);
  }
  // emit('close');
}
</script>

<style lang="scss" scoped>
.dialog_profile_confirm_popup_content {
  width: 20vw;
  // min-width: 25vw;
  // min-height: 65vh;
  padding: 24px 32px 39px 33px;
  @include tablet {
    min-height: auto;
    width: auto;
  }
  &-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    &-text {
      color: #2c64e3;
      font-size: 1.5rem;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: 700;
      line-height: 150%;
    }
  }
  &-content {
    color: #333;
    text-align: center;
    font-size: 1.25rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    margin-top: 14px;
    margin-bottom: 54px;
    &-text {
      display: inline;
    }
    &-highlight {
      color: #ea4335;
      display: inline;
    }
  }
  &-action {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-around;
    gap: 24px;
    button {
      min-width: 120px;
    }
  }
}
</style>
