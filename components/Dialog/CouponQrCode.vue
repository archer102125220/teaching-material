<template>
  <div class="dialog_coupon_qr_code">
    <p class="dialog_coupon_qr_code-title">{{ dialogCouponCnName }}</p>
    <p class="dialog_coupon_qr_code-subtitle">
      <!-- 代碼:{{ dialogCodeId }} -->
      {{ $t('coupons.code-field') }}:{{ dialogCodeId }}
    </p>
    <QRcode
      v-if="typeof dialogQrcode === 'string' && dialogQrcode !== ''"
      class="dialog_coupon_qr_code-qr_code"
      :qr-code-value="dialogQrcode"
    />
    <div class="dialog_coupon_qr_code-action">
      <v-btn
        :block="true"
        color="primary"
        variant="text"
        @click="emit('close')"
      >
        <!-- 關閉 -->
        {{ $t('coupons.coupon-popup-close') }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  dialogCouponCnName: { type: String, default: null },
  dialogCodeId: { type: String, default: null },
  dialogQrcode: { type: String, default: null }
});
const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped>
.dialog_coupon_qr_code {
  border-radius: 16px;
  background: #4f26de;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  padding-top: 24px;
  text-align: center;
  &-title {
    padding-bottom: 8px;
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 700;
  }
  &-subtitle {
    padding-bottom: 24px;
    text-align: center;
    color: #fff;
    font-size: 1rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 400;
  }
  &-qr_code {
    margin: 0 auto 40px auto;
  }
  &-action {
    background: #fff;
    font-size: 1.5rem;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding: 0 140px 0 140px;
  }
}
</style>

<style lang="scss">
.dialog_coupon_qr_code {
  &-qr_code {
    .qr_code {
      min-width: 256px;
      min-height: 256px;
    }
  }
  &-action {
    .v-btn.v-btn--density-default {
      color: #2c64e3;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      height: 80px;
    }
  }
}
</style>
