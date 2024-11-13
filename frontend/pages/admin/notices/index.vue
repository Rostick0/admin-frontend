<template>
  <Layout>
    <template #title>Уведомления</template>
    <div class="container">
      <div class="notice-page">
        <NoticeList :notices="data" />
      </div>
      <br />
      <BasePagination
        :total="meta?.total"
        :limit="meta?.per_page"
        v-if="filters"
        v-model:current-page="filters.page"
      />
    </div>
  </Layout>
</template>

<script setup>
const { filters } = useFilters({
  initialFilters: {
    page: 1,
  },
});

const { data, meta } = await useApi({
  name: "notices.getAll",
  filters,
  init: true,
  params: {
    sort: "id",
    limit: 10,
  },
});
</script>

<style lang="css" scoped>
.notice-page {
  background-color: rgb(var(--color-white));
  border-radius: 0.33rem;
  padding: 1rem;
}
</style>
