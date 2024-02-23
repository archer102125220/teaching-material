<template>
  <div class="dialog_stamp_gift_popup_content">
    <div class="dialog_stamp_gift_popup_content-title">
      <!-- <p class="dialog_stamp_gift_popup_content-title-text">轉贈集章確認</p> -->
      <p class="dialog_stamp_gift_popup_content-title-text">
        {{ $t('collect_stamps.transfer-popup-title') }}
      </p>
      <p class="dialog_stamp_gift_popup_content-title-subtitle">
        <!-- 經確認轉贈後，集章將無法返還 -->
        {{ $t('collect_stamps.transfer-popup-alert') }}
      </p>
    </div>

    <div class="dialog_stamp_gift_popup_content-content">
      <div class="dialog_stamp_gift_popup_content-content-quantity_input">
        <label
          class="dialog_stamp_gift_popup_content-content-quantity_input-label_text"
        >
          <!-- 輸入轉贈的集章數量 -->
          {{ $t('collect_stamps.transfer-popup-quantity-label') }}
        </label>
        <NumberInput
          min="0"
          :max="currentStamp"
          :value="giftStamp"
          :error="giftStampError"
          @update:model-value="handleCheckGiftStamp"
        />
      </div>

      <div
        class="dialog_stamp_gift_popup_content-content-member_id_input"
        @click="handleClearGiftAccountIdError"
      >
        <!-- <ProfileInputField
              label="轉贈的會員ID"
              :value="giftAccountId"
              :error="giftAccountIdError"
              @input="handleGiftAccountIdInput"
              :style="{
                '--gift_account_id_color': giftAccountIdError ? '#F00' : '',
              }"
            /> -->
        <ProfileInputField
          :label="$t('collect_stamps.transfer-popup-id-label')"
          :value="giftAccountId"
          :error="giftAccountIdError"
          :style="{
            '--gift_account_id_color': giftAccountIdError ? '#F00' : ''
          }"
          @input="handleGiftAccountIdInput"
        />
      </div>

      <div class="dialog_stamp_gift_popup_content-content-estimate">
        <p class="dialog_stamp_gift_popup_content-content-estimate-diff">
          <!-- 預計扣除集章：{{ $amountFormat(giftStamp) }} -->
          {{ $t('collect_stamps.transfer-popup-diff') + giftStampFormated }}
        </p>
        <div
          class="dialog_stamp_gift_popup_content-content-estimate-remaining"
          :style="{
            '--remaining_text_color': giftStampError ? '#ea4335' : ''
          }"
        >
          <!-- <p>
                剩餘集章：{{
                  $amountFormat(
                    currentStamp - Number(`${giftStamp}`.replaceAll(/\,/g, ''))
                  )
                }}
              </p> -->
          <p>
            {{ $t('collect_stamps.transfer-popup-remaining') + remaining }}
          </p>
          <!-- <p v-if="giftStampError">（數量不足）</p> -->
          <p v-if="giftStampError">
            {{ $t('collect_stamps.transfer-popup-quantity-warn') }}
          </p>
        </div>
      </div>
    </div>

    <div class="dialog_stamp_gift_popup_content-action">
      <v-btn
        size="large"
        color="primary"
        variant="outlined"
        class="dialog_stamp_gift_popup_content-action-btn"
        @click="emit('close')"
      >
        <!-- 取消 -->
        {{ $t('collect_stamps.transfer-popup-cancle-btn') }}
      </v-btn>
      <v-btn
        color="primary"
        size="large"
        class="dialog_stamp_gift_popup_content-action-btn"
        :disabled="giftAccountIdError || giftStampError"
        @click="handleGift"
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
  currentStamp: { type: [Number, String], default: 0 }
});
const emit = defineEmits(['close']);

const giftStamp = ref(0);
const giftStampError = ref(false);
const giftAccountId = ref('');
const giftAccountIdError = ref(false);

const currentStamp = computed(() =>
  Number(`${props.currentStamp || 0}`.replaceAll(/\,/g, ''))
);
const remaining = computed(() =>
  $amountFormat(
    currentStamp.value - Number(`${giftStamp.value}`.replaceAll(/\,/g, ''))
  )
);
const giftStampFormated = computed(() =>
  $amountFormat(Number(`${giftStamp.value}`.replaceAll(/\,/g, '')))
);

function handleCheckGiftStamp(_newValue) {
  const newValue = Number(_newValue.replaceAll(/\,/g, ''));
  giftStampError.value = currentStamp.value - newValue < 0;
  giftStamp.value = _newValue;
}

function handleGiftAccountIdInput(newValue) {
  giftAccountId.value = newValue;
  giftAccountIdError.value = false;
}
function handleClearGiftAccountIdError() {
  if (giftAccountIdError.value === true) {
    giftAccountId.value = '';
    giftAccountIdError.value = false;
  }
}

async function handleGift() {
  const always = props.always;
  let error = false;
  if (giftAccountId.value === '') {
    // giftAccountId.value = '請輸入有效的ID';
    giftAccountId.value = $i18n.t(
      'collect_stamps.transfer-popup-valid-id-warn'
    );
    giftAccountIdError.value = true;
    error = true;
  }
  if (Number(giftStamp.value) === 0) {
    // $store.system.setMessageState({
    //   text: '請輸入有效的集章數量',
    //   type: 'warning'
    // });
    $store.system.setMessageState({
      text: $i18n.t('system.exchange-stamps-warning-1'),
      type: 'warning'
    });
    error = true;
  }
  if (error === true) return;
  $store.system.setLoading(true);
  try {
    const customersStampsDeliver = await $customers.POST_customersStampsDeliver(
      {
        stamp_num: giftStamp.value,
        guid: giftAccountId.value
      },
      $store.user.token
    );
    console.log(customersStampsDeliver);
    // $store.system.setMessageState({
    //     text: '登入超時，請重新登入',
    //     type: 'error'
    //   });

    const message = $i18n.t('system.exchange-stamps-success-1');
    const text = message.replace('$__gift_account_id__$', giftAccountId.value);

    const defaultMessage = '轉贈集張給$__gift_account_id__$成功';
    const defaultText = defaultMessage.replace(
      '$__gift_account_id__$',
      giftAccountId.value
    );

    $store.system.setMessageState({
      text: text.includes(giftAccountId.value) === false ? defaultText : text,
      type: 'success'
    });
    giftAccountId.value = '';
    giftStamp.value = '0';
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
    } else {
      // $store.system.setMessageState({
      //   text: '轉贈集章錯誤',
      //   type: 'error'
      // });
      $store.system.setMessageState({
        text: $i18n.t('system.exchange-stamps-error-1'),
        type: 'error'
      });
    }
    if (typeof props.handleError === 'function') {
      await props.handleError(error);
    }
  }
  $store.system.setLoading(false);
  if (typeof always === 'function') {
    always();
  }
}
</script>

<style lang="scss" scoped>
.dialog_stamp_gift_popup_content {
  background-color: #fff;
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
        display: flex;
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
.dialog_stamp_gift_popup_content {
  &-content-member_id_input {
    input {
      text-align: left;
      color: var(--gift_account_id_color);
    }
  }
}
</style>
