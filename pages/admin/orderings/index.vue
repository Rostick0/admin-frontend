<template>
  <AdminLayout>
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

const { t } = useI18n();

const { close, open } = useModal({ name: "data-delete" });

const { filters } = useFilters({
  initialFilters: {
    page: 1,
    sort: "-date",
    limit: 20,
  },
});

const { data, meta, get } = await useApi({
  name: "orderings.getAll",
  params: {
    extends: "user",
  },
  filters,
  init: true,
});

const computedData = computed(() =>
  data.value?.map(({ date, price, status, ...item }) => ({
    ...item,
    status: t(status),
    price: `${formatFloatNumber(price)} ₽`,
    date: new Date(date).toLocaleString(),
    // created_at: new Date(created_at).toLocaleString(),
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
    title: "Пользователь",
    name: "user.name",
    resizable: true,
  },
  {
    title: "Адрес",
    name: "address",
    resizable: true,
  },
  {
    title: "Дата доставки",
    name: "date",
    resizable: true,
  },
  {
    title: "Цена",
    name: "price",
    resizable: true,
  },
  {
    title: "Статус",
    name: "status",
    resizable: true,
  },
  {
    name: "actions",
    renderComponent: () =>
      h(TableActions, {
        onUpdate(id) {
          navigateTo({
            name: "admin-orderings-id",
            params: {
              id,
            },
          });
        },
        id: 1,
        hideDelete: true,
      }),
    width: 30,
  },
];
</script>
