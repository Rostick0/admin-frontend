<template>
  <AdminLayout>
    <NuxtLink class="d-inline-flex mb-1" to="/admin/posts/create">
      <UiButton>Создать</UiButton>
    </NuxtLink>
    <Table
      title="Производители"
      :data="computedData"
      :cols="cols"
      :meta="meta"
      :filters="filters"
    />
    <AdminComponentsModalDelete
      @confirm="deleteConfirm"
      @cancel="deleteCancel"
    />
  </AdminLayout>
</template>

<script setup>
import TableActions from "@/components/table/TableActions.vue";
import api from "~/api";

const { close, open } = useModal({ name: "data-delete" });

const { filters } = useFilters({
  initialFilters: {
    page: 1,
    sort: "id",
    limit: 20,
  },
});

const { data, meta, get } = await useApi({
  name: "posts.getAll",
  params: {
    extends: "rubric",
  },
  filters: filters,
  init: true,
});

const computedData = computed(() => {
  return data.value?.map(({ created_at, ...item }) => ({
    ...item,
    created_at: new Date(created_at).toLocaleString(),
  }));
});

const { deleteId, deleteConfirm, deleteCancel } = useDeleteConfirm({
  apiName: "posts",
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
    title: "Заголовок",
    name: "title",
    resizable: true,
  },
  {
    title: "Рубрика",
    name: "rubric.name",
    resizable: true,
  },
  {
    title: "Статус",
    name: "status",
    resizable: true,
  },
  {
    title: "Просмотры",
    name: "count_view",
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
            name: "admin-posts-id",
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

async function getRubricsOptions(params) {
  try {
    const { data } = await api.rubrics.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item.name, item }));
  } catch (e) {
    console.log(error);
  }
}
</script>
