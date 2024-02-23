<template>
  <div class="default_layout">
    <LayoutHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup>
console.log(132);
</script>

<style lang="scss" scoped>
.default_layout {
  height: 100vh;
  width: 100vw;
}
</style>
