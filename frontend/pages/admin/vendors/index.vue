<template>
  <Layout>
    <NuxtLink class="d-inline-flex mb-1" to="/admin/vendors/create">
      <UiButton>Создать</UiButton>
    </NuxtLink>
    <Table
      title="Производители"
      :data="computedData"
      :cols="cols"
      :meta="meta"
      :filters="filters"
    />
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
  name: "vendors.getAll",
  params: {},
  filters,
  init: true,
});

const computedData = computed(() =>
  data.value?.map(({ created_at, ...item }) => ({
    ...item,
    created_at: new Date(created_at).toLocaleString(),
  }))
);

const { deleteId, deleteConfirm, deleteCancel } = useDeleteConfirm({
  apiName: "vendors",
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
          open();

          deleteId.value = id;
        },
        id: 1,
      }),
    width: 30,
  },
];
</script>
