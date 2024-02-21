<template>
  <div class="error_page">
    <p>{{ props.error.statusCode }}</p>
    <p>{{ props.error.statusMessage }}</p>
    <p>{{ props.error.message }}</p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="props.error.stack" />
  </div>
</template>
<script setup>
const props = defineProps({
  error: { type: Object, default: null }
});
console.error(props);
</script>

<style lang="scss" scoped>
.error_page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
}
</style>
