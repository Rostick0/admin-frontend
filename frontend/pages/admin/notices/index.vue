<template>
  <Layout>
    <template #title>Уведомления</template>
    <div class="container">
      <div class="d-flex mb-1 justify-content-between">
        <div>
          Наведите на уведомление, чтоб прочесть его или<br />
          вы можете нажать прочесть все уводемления, нажав кнопку
        </div>
        <UiButton @click="readAll">Прочесть все</UiButton>
      </div>
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
import api from "~/api";
import last from "lodash/last";

const { filters } = useFilters({
  initialFilters: {
    page: 1,
  },
});

const limit = 10;

const { data, meta } = await useApi({
  name: "notices.getAll",
  filters,
  init: true,
  params: {
    sort: "id",
    limit,
  },
});

const readAll = async () => {
  await api.notices.readAll();

  // data.value = data.value?.map((item) => ({
  //   ...item,
  //   is_read: true,
  // }));
};

const tempNotices = useState("tempNotices");

watch(
  () => tempNotices.value?.length,
  (cur, pre) => {
    if (cur <= pre) return;

    data.value = [last(tempNotices.value), ...[...data.value].slice(0, limit)];
  }
);
</script>

<style lang="css" scoped>
.notice-page {
  background-color: rgb(var(--color-white));
  border-radius: 0.33rem;
  padding: 1rem;
}
</style>
