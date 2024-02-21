<template>
  <v-progress-linear
    v-if="loading"
    :height="height"
    indeterminate
    color="primary"
    class="loading_bar"
    :style="`--loading_width:${width};--loading_position:${position}`"
  />
</template>
<script setup>
const props = defineProps({
  position: { type: String, default: 'absolute' },
  loading: { type: Boolean, default: false },
  height: { type: String, default: '6' },
  width: { type: String, default: '100%' },
});
const loading = computed(() => props.loading);
</script>

<style lang="scss" scoped>
.loading_bar {
  position: var(--loading_position);
  top: 0;
  z-index: 10;
  width: var(--loading_width);
}
</style>
