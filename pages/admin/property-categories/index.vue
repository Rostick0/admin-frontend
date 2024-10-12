<template>
  <AdminLayout>
    <AdminFilter>
      <VFormComponent v-model="filters['filterLIKE[name]']" :field="name" />
    </AdminFilter>
    <NuxtLink class="d-inline-flex mb-1" to="/admin/property-categories/create">
      <UiButton>Создать</UiButton>
    </NuxtLink>
    <Table
      :data="computedData"
      :cols="cols"
      :meta="meta"
      :filters="filters"
      title="Тип свойств"
    />
    <AdminComponentsModalDelete
      @confirm="deleteConfirm"
      @cancel="deleteCancel"
    />
  </AdminLayout>
</template>

<script setup>
import api from "~/api";
import TableActions from "@/components/table/TableActions.vue";

const { close, open } = useModal({ name: "data-delete" });

const { filters } = useFilters({
  initialFilters: {
    "filterLIKE[name]": "",
    page: 1,
    sort: "id",
    limit: 20,
  },
});

const name = ref({
  type: "text",
  name: "name",

  bind: {
    label: "Название",
    placeholder: "Введите название",
  },
});

const { data, meta, get } = await useApi({
  name: "propertyCategories.getAll",
  params: {
    extends: "property_item,category",
  },
  filters,
});
await get();

const computedData = computed(() => data.value);

const { deleteId, deleteConfirm, deleteCancel } = useDeleteConfirm({
  apiName: "propertyCategories",
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
    title: "Свойство",
    name: "property_item.name",
    resizable: true,
  },
  {
    title: "Категория",
    name: "category.name",
    resizable: true,
  },
  {
    name: "actions",
    renderComponent: () =>
      h(TableActions, {
        onUpdate(id) {
          navigateTo({
            name: "admin-property-categories-id",
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
