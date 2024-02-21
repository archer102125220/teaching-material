<template>
  <div class="pagination">
    <v-pagination
      v-model="statusPage"
      class="pagination-btn_block"
      :length="lastPage"
      :show-first-last-page="showFirstLastPage"
      variant="text"
      @update:model-value="handlePage"
    >
      <template #prev="{ disabled, ..._props }">
        <v-btn
          v-bind="_props"
          icon="mdi mdi-arrow-left"
          color="primary"
          variant="outlined"
          aria-label="page_prev"
          class="pagination-btn_block-prev"
          :disabled="disabled"
          :style="disabled === false ? 'opacity: 1;' : 'opacity: 0;'"
        >
          <img alt="" src="/img/icons/Vector.svg" />
        </v-btn>
      </template>
      <template #item="{ page: _page, isActive, props: _props }">
        <v-btn
          class="pagination-btn_block-page"
          v-bind="_props"
          icon=""
          color="primary"
          :variant="isActive ? 'tonal' : 'text'"
        >
          {{ _page }}
        </v-btn>
      </template>
      <template #next="{ disabled, ..._props }">
        <v-btn
          v-bind="_props"
          color="primary"
          variant="outlined"
          aria-label="page_next"
          class="pagination-btn_block-next"
          :disabled="disabled"
          :style="disabled === false ? 'opacity: 1;' : 'opacity: 0;'"
        >
          <img alt="" src="/img/icons/Vector.svg" />
        </v-btn>
      </template>
    </v-pagination>
    <slot
      :start="statusPage > 1 ? (statusPage - 1) * perPage + 1 : statusPage"
      :end="statusPage * perPage > total ? total : statusPage * perPage"
      :total="total"
    >
      <p v-if="hasLabel === true" class="pagination-label">
        <!-- 顯示第 {{
          statusPage > 1 ? (statusPage - 1) * perPage + 1 : statusPage
        }}
        -
        {{ statusPage * perPage > total ? total : statusPage * perPage }}
        筆搜尋結果，共 {{ total }} 筆 -->
        {{ lable }}
      </p>
    </slot>
  </div>
</template>
<script setup>
const props = defineProps({
  page: { type: [Number, String], default: 0 },
  modelValue: { type: [Number, String], default: 0 },
  lastPage: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  hasLabel: { type: Boolean, default: true },
  showFirstLastPage: { type: Boolean, default: false },
  perPage: { type: Number, default: 10 },
  paginationLabel: {
    type: String,
    default: '顯示第 $__start__$ -  $__end__$ 筆搜尋結果，共 $__total__$ 筆'
  }
});
const emit = defineEmits(['update:modelValue', 'change']);

const statusPage = ref(0);
const lable = computed(() => {
  const start =
    statusPage.value > 1
      ? (statusPage.value - 1) * props.perPage + 1
      : statusPage.value;
  const end =
    statusPage.value * props.perPage > props.total
      ? props.total
      : statusPage.value * props.perPage;

  const _lable =
    typeof props.paginationLabel.replace === 'function'
      ? props.paginationLabel
      : '顯示第 $__start__$ -  $__end__$ 筆搜尋結果，共 $__total__$ 筆';
  return _lable
    .replace('$__start__$', start)
    .replace('$__end__$', end)
    .replace('$__total__$', props.total);
});

watch(
  () => props,
  (newProps, oldProps) => {
    const newPage = Number(newProps?.page);
    const oldPage = Number(oldProps?.page);
    const newModelValue = Number(newProps?.modelValue);
    const oldModelValue = Number(oldProps?.modelValue);
    if (
      newPage !== oldPage ||
      newModelValue !== oldModelValue ||
      newPage !== statusPage.value ||
      newModelValue !== statusPage.value
    ) {
      statusPage.value = newPage || newModelValue;
    }
  },
  { deep: true, immediate: true }
);
watch(
  () => statusPage.value,
  (newPage, oldPage) => {
    emit('update:modelValue', Number(newPage));
    emit('change', Number(newPage));
    if (
      Number(newPage) !== Number(oldPage) &&
      typeof window?.scrollTo === 'function'
    ) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  { deep: true, immediate: true }
);

function handlePage(_page, ...arg) {
  statusPage.value = Number(_page);
  emit('update:modelValue', Number(_page), ...arg);
  emit('change', Number(_page), ...arg);
}
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  --btn_border_radius: 30px;
  --btn_height: 40px;
  --btn_width: 40px;
  &-btn_block {
    :deep(.v-btn),
    .v-btn {
      border-radius: var(--btn_border_radius);
      height: var(--btn_height);
      width: var(--btn_width);
    }
    &-prev {
      // border-radius: 30px;
      transform: rotate(180deg);
      // width: 40px;
      // height: 40px;
      border-radius: var(--btn_border_radius);
      width: var(--btn_width);
      height: var(--btn_height);
      &.v-btn {
        border-radius: var(--btn_border_radius);
        height: var(--btn_height);
        width: var(--btn_width);
      }
    }
    &-page {
      // border-radius: 30px;
      border-radius: var(--btn_border_radius);
      color: #2c64e3;
      text-align: center;
      // font-family: Arial;
      font-family: Noto Sans TC;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 125% */
      &.v-btn {
        border-radius: var(--btn_border_radius);
        height: var(--btn_height);
        width: var(--btn_width);
      }
    }
    &-next {
      // border-radius: 30px;
      // width: 40px;
      // height: 40px;
      border-radius: var(--btn_border_radius);
      width: var(--btn_width);
      height: var(--btn_height);
      // margin: 5px 0;
      &.v-btn {
        border-radius: var(--btn_border_radius);
        height: var(--btn_height);
        width: var(--btn_width);
      }
    }
  }
  &-label {
    color: #666;
    text-align: center;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
    margin-top: 16px;
  }
}
</style>
