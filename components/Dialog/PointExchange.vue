<template>
  <div class="dialog_point_exchange_popup_content">
    <div class="dialog_point_exchange_popup_content-title">
      <p class="dialog_point_exchange_popup_content-title-text">
        <!-- 點數兌換集章 -->
        {{ $t('points.exchange-popup-trigger') }}
      </p>
      <p class="dialog_point_exchange_popup_content-title-subtitle">
        <!-- 每1,000點數可兌換1集章 -->
        {{ $t('points.exchange-popup-remark') }}
      </p>
    </div>

    <div class="dialog_point_exchange_popup_content-content">
      <div class="dialog_point_exchange_popup_content-content-quantity_input">
        <label
          class="dialog_point_exchange_popup_content-content-quantity_input-label_text"
        >
          <!-- 輸入兌換集章數量 -->
          {{ $t('points.exchange-popup-quantity-label') }}
        </label>
        <NumberInput
          :error="exchangePointError"
          :min="0"
          :max="
            Math.floor(Number(`${currentPoint}`.replaceAll(/\,/g, '')) / 1000)
          "
          :value="exchangePoint"
          @update:model-value="handleCheckExchangePoint"
        />
      </div>

      <div class="dialog_point_exchange_popup_content-content-estimate">
        <p class="dialog_point_exchange_popup_content-content-estimate-diff">
          <!-- 預計扣除點數： -->
          {{ $t('points.exchange-popup-diff') }}
          {{ diffPoint }}
        </p>
        <p
          class="dialog_point_exchange_popup_content-content-estimate-remaining"
          :style="{
            '--remaining_text_color': exchangePointError ? '#ea4335' : ''
          }"
        >
          <!-- 剩餘點數： -->
          {{ $t('points.exchange-popup-remaining') }}
          {{ remainingPoint }}
        </p>
      </div>
    </div>

    <div class="dialog_point_exchange_popup_content-action">
      <v-btn
        class="dialog_point_exchange_popup_content-action-btn"
        color="primary"
        variant="outlined"
        size="large"
        @click="handleCancelExchange"
      >
        <!-- 取消 -->
        {{ $t('points.exchange-popup-cancel-btn') }}
      </v-btn>
      <v-btn
        class="dialog_point_exchange_popup_content-action-btn"
        color="primary"
        size="large"
        :disabled="exchangePointError"
        @click="handleExchange"
      >
        <!-- 確認送出 -->
        {{ $t('points.exchange-popup-confirm-btn') }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const { $amountFormat, $customers, $store, $i18n, $localePath } = useNuxtApp();
const router = useRouter();

const props = defineProps({
  complete: { type: Function, default: null },
  handleError: { type: Function, default: null },
  always: { type: Function, default: null },
  cancel: { type: Function, default: null },
  currentPoint: { type: Number, default: 0 }
});
const emit = defineEmits(['close']);

const exchangePoint = ref('0');
const exchangePointError = ref(false);

const diffPoint = computed(() =>
  $amountFormat(Number(`${exchangePoint.value}`.replaceAll(/\,/g, '')) * 1000)
);
const remainingPoint = computed(() =>
  $amountFormat(
    Number(`${props.currentPoint}`.replaceAll(/\,/g, '')) -
      Number(`${exchangePoint.value}`.replaceAll(/\,/g, '')) * 1000
  )
);

function handleCancelExchange() {
  exchangePoint.value = '0';
  if (typeof props.cancel === 'function') {
    props.cancel();
  }
  emit('close');
}

function handleCheckExchangePoint(_newValue) {
  const newValue = Number(_newValue.replaceAll(/\,/g, ''));
  exchangePointError.value = props.currentPoint - newValue < 0;
  exchangePoint.value = _newValue;
}

async function handleExchange() {
  let error = false;
  if (Number(exchangePoint.value) === 0) {
    // $store.system.setMessageState({
    //   text: '請輸入有效的點數數量',
    //   type: 'warning'
    // });
    $store.system.setMessageState({
      text: $i18n.t('system.exchange-point-warning'),
      type: 'warning'
    });
    error = true;
  }
  if (error === true) return;
  $store.system.setLoading(true);
  try {
    await $customers.POST_exchangeToStamps(
      {
        exchangePoints:
          Number(`${exchangePoint.value}`.replaceAll(/\,/g, '')) * 1000
      },
      $store.user.token
    );
    exchangePoint.value = '0';

    $store.system.setMessageState({
      text: $i18n.t('system.exchange-stamps-success-2'),
      type: 'success'
    });

    if (typeof props.complete === 'function') {
      await props.complete();
    }
  } catch (error) {
    console.log(error);
    const errorCode = error?.response?.status;
    if (errorCode === 401 && $store.user.token !== '') {
      // $store.system.setMessageState({
      //   text: '登入超時，請重新登入',
      //   type: 'error'
      // });
      $store.system.setMessageState({
        text: $i18n.t('system.login-invalid'),
        type: 'error'
      });
      router.push($localePath('/login'));
    }
    if (typeof props.handleError === 'function') {
      await props.handleError(error);
    }
  }
  $store.system.setLoading(false);
  if (typeof props.always === 'function') {
    props.always();
  }
}
</script>

<style lang="scss" scoped>
.dialog_point_exchange_popup_content {
  &-title {
    padding: 24px;
    padding-bottom: 40px;
    text-align: center;
    &-text {
      color: #333;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 150%;
    }
    &-subtitle {
      padding-top: 8px;
      color: #ea4335;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
      font-size: 1rem;
      font-weight: 700;
      line-height: 150%;
    }
  }
  &-content {
    width: 314px;
    margin: auto;
    margin-bottom: 63px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    @include tablet {
      width: 287px;
    }
    &-quantity_input {
      margin-bottom: 24px;
      &-label_text {
        display: block;
        margin-bottom: 8px;
        color: #4d4d4d;
        // font-family: Taipei Sans TC Beta;
        font-family: Noto Sans TC;
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 150%;
      }
    }
    &-member_id_input {
      margin-bottom: 24px;
    }
    &-estimate {
      --remaining_text_color: #666;
      &-diff {
        color: #666;
        // font-family: Taipei Sans TC Beta;
        font-family: Noto Sans TC;
        font-size: 1rem;
        font-weight: 700;
        line-height: 150%;
        margin-bottom: 24px;
      }
      &-remaining {
        // color: #ea4335;
        color: var(--remaining_text_color);
        // font-family: Taipei Sans TC Beta;
        font-family: Noto Sans TC;
        font-size: 1rem;
        font-weight: 700;
        line-height: 150%;
      }
    }
  }
  &-action {
    display: flex;
    justify-content: center;
    margin-bottom: 39px;
    margin-left: 40px;
    margin-right: 40px;
    gap: 24px;
    @include mobile {
      margin-left: 20px;
      margin-right: 20px;
      gap: 8px;
    }
    &-btn {
      width: 159px;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
      font-size: 1.25rem;
      font-weight: 700;
      line-height: normal;
      @include mobile {
        width: 140px;
      }
    }
  }
}
</style>

<style lang="scss">
.dialog_point_exchange_popup_content {
  .input_field-label {
    margin-bottom: 8px;
    color: #4d4d4d;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 150%;
  }
  input {
    color: #4d4d4d;
    text-align: center;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  }
  .v-input__details {
    display: none;
  }
  .v-field--error {
    background-color: #fff5f5;
  }
  &-content-member_id_input {
    input {
      text-align: left;
      color: var(--gift_account_id_color);
    }
  }
}
</style>
