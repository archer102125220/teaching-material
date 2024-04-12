<template>
  <div>
    <ClientOnly>
      <GeometricOptics height="80vh" @loading="$store.system.setLoading" />
    </ClientOnly>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped></style>
