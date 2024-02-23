<template>
  <div class="dialog_profile_error_popup_content">
    <div class="dialog_profile_error_popup_content-title">
      <v-icon color="primary" icon="mdi-information" />
      <!-- <p class="dialog_profile_error_popup_content-title-text">提醒</p> -->
      <p class="dialog_profile_error_popup_content-title-text">
        {{ $t('member_information.confirm-popup-title') }}
      </p>
    </div>
    <!-- <p class="dialog_profile_error_popup_content-content">
          ※ 信箱重複，請重新確認
        </p> -->
    <p class="dialog_profile_error_popup_content-content">
      {{ $t('member_information.warn-1') }}
    </p>
    <div class="dialog_profile_error_popup_content-action">
      <v-btn color="primary" size="large" @click="emit('close')">
        <!-- 關閉 -->
        {{ $t('member_information.qrcoed-popup-close-btn') }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped>
.dialog_profile_error_popup_content {
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
  }
  &-action {
    margin: auto;
    margin-bottom: 15px;
    text-align: center;
  }
}
</style>
