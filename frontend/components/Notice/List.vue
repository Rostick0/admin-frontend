<template>
  <div class="notice-list">
    <NoticeItem v-for="notice in notices" :key="notice.id" :notice="notice" />
  </div>
</template>

<script setup>
const props = defineProps({
  notices: Array,
});
</script>
