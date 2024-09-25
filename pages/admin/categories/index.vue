<template>
  <AdminLayout>
    <Table
      :data="computedData"
      :cols="cols"
      :meta="meta"
      :filters="filters"
    ></Table>
    <!-- <pre>
      {{ data?.[1] }}
    </pre> -->
  </AdminLayout>
</template>

<script setup>
import TableActions from "@/components/table/TableActions.vue";

const { filters } = useFilters({
  initialFilters: {
    page: 1,
    sort: "id",
    limit: 20,
  },
});

const { data, meta, get } = await useApi({
  name: "categories.getAll",
  params: {
    // extends: "category,vendor",
  },
  filters: filters,
  init: false,
});
await get();

const computedData = computed(() => {
  return data.value?.map(({ count, price, ...item }) => ({
    ...item,
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
    title: "Название",
    name: "name",
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
