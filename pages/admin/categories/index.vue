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
import TableActions from "@/components/table/TableActions.vue";

const { filterForm, filters } = useFilters({
  page: 1,
  sort: 'id',
  limit: 20,
});

const { data, meta, get } = await useApi({
  name: "products.getAll",
  params: {
    extends: "category,vendor",
  },
  filters: filters,
  init: false,
});

const computedData = computed(() => {
  return data.value?.map(({ count, price, ...item }) => ({
    ...item,
    price: (+price)?.toLocaleString(),
    count: item?.is_infinitely ? "ထ" : count,
  }));
});

const cols = [
  {
    title: "ID",
    name: "id",
    resizable: true,
  },
  {
    title: "Цена",
    name: "price",
    resizable: true,
  },
  {
    title: "Количество",
    name: "count",
    resizable: true,
  },
  {
    title: "Просмотры",
    name: "views",
    resizable: true,
  },
  {
    title: "Категория",
    name: "category.name",
    resizable: true,
  },
  {
    title: "Категория",
    name: "vendor.name",
    resizable: true,
  },
  {
    name: "actions",
    renderComponent: () =>
      h(TableActions, {
        onUpdate(id) {
          navigateTo({
            name: "admin-products-id",
            params: {
              id,
            },
          });
        },
        async onDelete(id) {
          // await api.post.delete({ id });
          // await get();
          console.log(id);
        },
        id: 1,
      }),
    width: 30,
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
