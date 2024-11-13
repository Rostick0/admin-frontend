<template>
  <div class="notice-popup">
    <NoticeList :notices="data" />
    <NuxtLink class="d-flex" to="/admin/notices">
      <UiButton class="notice-popup__more">Посмотреть все</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
const { data } = await useApi({
  name: "notices.getAll",
  params: {
    sort: "id",
    limit: 5,
  },
  init: true,
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
