<template>
  <AdminLayout>
    <Table
      title="Производители"
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
  name: "rubrics.getAll",
  params: {},
  filters: filters,
  init: true,
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
  {
    name: "actions",
    renderComponent: () =>
      h(TableActions, {
        onUpdate(id) {
          navigateTo({
            name: "admin-vendors-id",
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
