<template>
  <div class="default_layout">
    <LayoutHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup>
</script>

<style lang="scss" scoped>
.default_layout {
  height: 100vh;
  width: 100vw;
}
</style>
