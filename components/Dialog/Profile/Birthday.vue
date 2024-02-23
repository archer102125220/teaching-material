<template>
  <div class="dialog_profile_birthday_popup_content">
    <!-- <p class="dialog_profile_birthday_popup_content-title">好康這裡瞧</p> -->
    <p class="dialog_profile_birthday_popup_content-title">
      {{ $t('member_information.birthday-popup-title') }}
    </p>
    <p class="dialog_profile_birthday_popup_content-content">
      <!-- ※ 僅能修改一次生日，請填寫正確。 -->
      {{ $t('member_information.birthday-popup-row-1') }}
    </p>
    <p class="dialog_profile_birthday_popup_content-content">
      <!-- ※ 註冊完成的會員將享有額外的生日禮。 -->
      {{ $t('member_information.birthday-popup-row-2') }}
    </p>
    <p class="dialog_profile_birthday_popup_content-content">
      <!-- ※ 生日禮將提前2個月系統自動發送。 -->
      {{ $t('member_information.birthday-popup-row-3') }}
    </p>
    <div class="dialog_profile_birthday_popup_content-action">
      <v-btn
        class="dialog_profile_birthday_popup_content-action-action_btn"
        color="primary"
        @click="emit('close')"
      >
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
.dialog_profile_birthday_popup_content {
  padding: 24px 28px 40px 28px;
  &-title {
    color: #2c64e3;
    font-size: 1.5rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-weight: 700;
    line-height: 150%;
    margin-bottom: 24px;
    text-align: center;
  }
  &-content {
    color: #ea4335;
    font-size: 1.25rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 150%;
  }
  &-action {
    text-align: center;
    margin: auto;
    margin-top: 46px;
    &-action_btn {
      padding: 16px;
      height: auto;
      font-size: 1.25rem;
    }
  }
}
</style>
