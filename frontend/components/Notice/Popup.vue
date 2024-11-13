<template>
  <div class="notice-popup">
    <NoticeList :notices="notices" />
    <NuxtLink class="d-flex" to="/admin/notices">
      <UiButton class="notice-popup__more">Посмотреть все</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  notices: Array,
  isInitNotices: Boolean,
  fetchNotices: Function,
});

const emits = defineEmits(["setInit"]);

onMounted(async () => {
  if (props.isInitNotices) return;
  
  await props?.fetchNotices();
  console.log(props)

  emits("setInit", true);
});
</script>

<style lang="scss" scoped>
.notice-popup {
  background-color: rgb(var(--color-white));
  border-radius: 0.33rem;
  padding: 0.75rem;
  margin-top: 12px;
  margin-right: 16px;
  max-width: 500px;

  .notice-popup__more {
    border-radius: 0;
    display: block;
    text-align: center;
    padding: 12px 0;
    width: 100%;
  }
}
</style>
