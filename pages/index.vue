<template>
  <div>
    <p>教材測試</p>
    <NuxtLink to="/desmos">
      <v-btn color="primary">desmos</v-btn>
    </NuxtLink>
    <NuxtLink to="/geometric-optics">
      <v-btn color="primary">geometric-optics</v-btn>
    </NuxtLink>
  </div>
</template>
<script setup>
definePageMeta({ title: 'follow_player.pageTitle' });
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 教材測試` : '教材測試';
  }
});
</script>
