<template>
  <AdminLayout>
    <Table
      :data="computedData"
      :cols="cols"
      :meta="meta"
      :filterForm="filterForm"
    ></Table>
    <!-- <pre>
      {{ data?.[1] }}
    </pre> -->
  </AdminLayout>
</template>

<script setup>
const { filterForm, filters } = useFilters({
  page: 1,
  limit: 20,
});

const { data, meta, get } = await useApi({
  name: "vendors.getAll",
  params: {},
  filters: filters,
  init: false,
});

const computedData = computed(() => {
  return data.value?.map(({ created_at, ...item }) => ({
    ...item,
    created_at: new Date(created_at).toLocaleString(),
  }));
});

const cols = [
  {
    title: "ID",
    name: "id",
    resizable: true,
  },
  {
    title: "Имя",
    name: "name",
    resizable: true,
  },
  {
    title: "Создан",
    name: "created_at",
    resizable: true,
  },
];

// watch(() => data.value, function () {

//   console.log(data.value);
// })

// const cols = ["id", "price", "completed"].map((item) => ({
//   title: item,
//   name: item,
//   resizable: true,
// }));
</script>

<style></style>
