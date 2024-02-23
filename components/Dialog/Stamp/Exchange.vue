<template>
  <div class="dialog_stamp_exchange_popup_content">
    <div class="dialog_stamp_exchange_popup_content-title">
      <!-- <p class="dialog_stamp_exchange_popup_content-title-text">集章兌換確認</p> -->
      <p class="dialog_stamp_exchange_popup_content-title-text">
        {{ $t('collect_stamps.qrcoed-popup-title') }}
      </p>
      <p class="dialog_stamp_exchange_popup_content-title-subtitle">
        <!-- 經確認兌換後，集章將無法返還 -->
        {{ $t('collect_stamps.exchange-popup-alert') }}
      </p>
    </div>

    <div class="dialog_stamp_exchange_popup_content-content">
      <div class="dialog_stamp_exchange_popup_content-content-row">
        <!-- <p>品項名稱</p> -->
        <p>{{ $t('collect_stamps.exchange-popup-iteam-name') }}</p>
        <p>{{ exchangeItemName }}</p>
      </div>
      <div class="dialog_stamp_exchange_popup_content-content-row">
        <!-- <p>兌換數量</p> -->
        <p>{{ $t('collect_stamps.exchange-popup-item-quatity') }}</p>
        <p>{{ exchangeNumFormated }}</p>
      </div>
      <div class="dialog_stamp_exchange_popup_content-content-row">
        <!-- <p>預計扣除集章</p> -->
        <p>{{ $t('collect_stamps.transfer-popup-diff') }}</p>
        <p>{{ spendStampNumFormated }}</p>
      </div>
      <div class="dialog_stamp_exchange_popup_content-content-row">
        <!-- <p>剩餘集章</p> -->
        <p>{{ $t('collect_stamps.transfer-popup-remaining') }}</p>
        <p>{{ remainStampNumFormated }}</p>
      </div>
    </div>

    <div class="dialog_stamp_exchange_popup_content-action">
      <v-btn
        class="dialog_stamp_exchange_popup_content-action-btn"
        color="primary"
        variant="outlined"
        size="large"
        @click="handleCancelExchange"
      >
        <!-- 取消 -->
        {{ $t('collect_stamps.transfer-popup-cancle-btn') }}
      </v-btn>
      <v-btn
        class="dialog_stamp_exchange_popup_content-action-btn"
        color="primary"
        size="large"
        @click="handleExchange"
      >
        <!-- 確認送出 -->
        {{ $t('collect_stamps.transfer-popup-confirm-btn') }}
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
  webSocketMessage: { type: Object, default: null },
  storeUid: { type: String, default: '' },
  exchangeItemId: { type: String, default: '' },
  exchangeItemName: { type: String, default: '' },
  exchangeNum: { type: [Number, String], default: 0 },
  spendStampNum: { type: [Number, String], default: 0 },
  remainStampNum: { type: [Number, String], default: 0 }
});
const emit = defineEmits(['close']);

// const storeUid = ref('');
// const exchangeItemId = ref('');
// const exchangeItemName = ref('');
// const exchangeNum = ref(0);
// const spendStampNum = ref(0);
// const remainStampNum = ref(0);

const exchangeNum = computed(() =>
  Number(`${props.exchangeNum || 0}`.replaceAll(/\,/g, ''))
);
const exchangeNumFormated = computed(() => $amountFormat(exchangeNum.value));
const spendStampNum = computed(() =>
  Number(`${props.spendStampNum || 0}`.replaceAll(/\,/g, ''))
);
const spendStampNumFormated = computed(() =>
  $amountFormat(spendStampNum.value)
);
const remainStampNum = computed(() =>
  Number(`${props.remainStampNum || 0}`.replaceAll(/\,/g, ''))
);
const remainStampNumFormated = computed(() =>
  $amountFormat(remainStampNum.value)
);

function handleCancelExchange() {
  // exchangeDialog.value = false;
  // webSocketMessage.value = null;
  // exchangeItemId.value = '';
  // exchangeItemName.value = 0;
  // exchangeNum.value = 0;
  // spendStampNum.value = 0;
  // remainStampNum.value = 0;
  if (typeof props.cancel === 'function') {
    props.cancel();
  }
  emit('close');
}
async function handleExchange() {
  const always = props.always;
  try {
    if (
      // exchangeItemId.value === '' ||
      props.exchangeItemId === '' ||
      exchangeNum.value <= 0 ||
      spendStampNum.value <= 0
      // props.exchangeItemId === '' ||
      // props.exchangeNum <= 0 ||
      // props.spendStampNum <= 0
    ) {
      // $store.system.setMessageState({
      //   text: '請重新執行兌換流程',
      //   type: 'warning'
      // });
      $store.system.setMessageState({
        text: $i18n.t('system.exchange-stamps-warning-2'),
        type: 'warning'
      });
      return;
    }
    $store.system.setLoading(true);
    await $customers.POST_customersExchangeStamp(
      {
        guid: $store.user.guid,
        // prize_id: exchangeItemId.value,
        exchange_num: exchangeNum.value,
        spend_stamp_num: spendStampNum.value,
        // uid: storeUid.value
        prize_id: props.exchangeItemId,
        // exchange_num: props.exchangeNum,
        // spend_stamp_num: props.spendStampNum,
        uid: props.storeUid
      },
      $store.user.token
    );

    if (typeof props.complete === 'function') {
      await props.complete();
    }
    // $store.system.setMessageState({
    //   text: '兌換成功',
    //   type: 'success'
    // });
    $store.system.setMessageState({
      text: $i18n.t('system.exchange-stamps-success-2'),
      type: 'success'
    });
  } catch (error) {
    console.log(error);
    const errorCode = error?.response?.status;
    const errorMessage = error?.data?.message;
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
    } else if (errorMessage !== '') {
      $store.system.setMessageState({
        text: errorMessage,
        type: 'error'
      });
    } else {
      // $store.system.setMessageState({
      //   text: '兌換失敗',
      //   type: 'error'
      // });
      $store.system.setMessageState({
        text: $i18n.t('system.exchange-stamps-error-2'),
        type: 'error'
      });
    }
    if (typeof props.handleError === 'function') {
      await props.handleError(error);
    }
  }
  // exchangeDialog.value = false;
  $store.system.setLoading(false);
  if (typeof always === 'function') {
    always();
  }
}
</script>

<style lang="scss" scoped>
.dialog_stamp_exchange_popup_content {
  background-color: #fff;
  min-width: 327.2px;
  min-height: 398px;
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
    &-row {
      color: #666;
      // font-family: Taipei Sans TC Beta;
      font-family: Noto Sans TC;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 30px */
      display: flex;
      justify-content: space-between;
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
      min-width: 159px;
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
.dialog_stamp_exchange_popup_content {
  &-content-member_id_input {
    input {
      text-align: left;
      color: var(--gift_account_id_color);
    }
  }
}
</style>
