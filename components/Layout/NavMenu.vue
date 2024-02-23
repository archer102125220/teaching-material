<template>
  <nav class="default_layout_nav_menu">
    <NuxtLink v-for="link in linkList" :key="link.path" :to="link.path">
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>
<script setup>
const linkList = computed(() => [{ path: '/desmos', label: 'desmos' }]);
</script>

<style lang="scss" scoped>
.default_layout_nav_menu {
  display: flex;
  align-items: center;
}
</style>
