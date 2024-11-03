<template>
  <Layout>
    <NuxtLink class="d-inline-flex mb-1" to="/admin/categories/create">
      <UiButton>Создать</UiButton>
    </NuxtLink>
    <Table :data="computedData" :cols="cols" :meta="meta" :filters="filters" />
    <UiModalDelete
      @confirm="deleteConfirm"
      @cancel="deleteCancel"
    />
  </Layout>
</template>

<script setup>
import TableActions from "@/components/table/TableActions.vue";

const { close, open } = useModal({ name: "data-delete" });

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

const { deleteId, deleteConfirm, deleteCancel } = useDeleteConfirm({
  apiName: "categories",
  get,
  close,
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
            name: "admin-categories-id",
            params: {
              id,
            },
          });
        },
        async onDelete(id) {
          open();

          deleteId.value = id;
        },
        id: 1,
      }),
    width: 30,
  },
];
</script>
