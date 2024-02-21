<template>
  <div>教材測試</div>
</template>
<script setup>
definePageMeta({ title: 'follow_player.pageTitle' });
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | 教材測試` : '教材測試';
  }
});
</script>
