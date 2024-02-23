<template>
  <div class="dialog_member_qr_code">
    <!-- <p class="dialog_member_qr_code-title">會員條碼</p> -->
    <p class="dialog_member_qr_code-title">
      {{ $t('member_information.qrcoed-popup-title') }}
    </p>
    <QRcode class="dialog_member_qr_code-qr_code" :qr-code-value="userId" />
    <div class="dialog_member_qr_code-action">
      <v-btn
        :block="true"
        color="primary"
        variant="text"
        @click="emit('close')"
      >
        <!-- 關閉 -->
        {{ $t('member_information.qrcoed-popup-close-btn') }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  qrCodeTemplate: { type: String, default: null }
});
const emit = defineEmits(['close']);

const runtimeConfig = useRuntimeConfig();
const { $store } = useNuxtApp();

const userId = computed(() =>
  props.qrCodeTemplate
    ? props.qrCodeTemplate.replaceAll(/\[id\]/g, $store.user.guid)
    : `${runtimeConfig.public.CONSOLE_URL}/stamp-mamage/${$store.user.guid}?name=${$store.user.name}`
);
</script>

<style lang="scss" scoped>
.dialog_member_qr_code {
  border-radius: 16px;
  background: #4f26de;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  padding-top: 24px;
  text-align: center;
  &-title {
    // padding: 20px;
    padding-bottom: 24px;
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 700;
  }
  &-qr_code {
    margin: 0 auto 40px auto;
  }
  &-action {
    padding: 20px;
    background: #fff;
    font-size: 1.5rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding: 28px 140px 28px 140px;
  }
}
</style>

<style lang="scss">
.dialog_member_qr_code {
  &-action {
    .v-btn__content {
      font-size: 1.5rem;
    }
  }
  .qr_code {
    min-width: 256px;
    min-height: 256px;
  }
}
</style>
