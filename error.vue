<template>
  <div class="error_page">
    <p>{{ error.statusCode }}</p>
    <p>{{ error.statusMessage }}</p>
    <p>{{ error.message }}</p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="error.stack" />
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
