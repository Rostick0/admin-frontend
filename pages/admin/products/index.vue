<template>
  <Layout>
    <Filter>
      <VFormComponent v-model="filters['filterLIKE[title]']" :field="title" />
      <VFormComponent v-model="filters['filterGEQ[price]']" :field="priceGeq" />
      <VFormComponent v-model="filters['filterLEQ[price]']" :field="priceLeq" />
      <VFormComponent
        v-model="filters['filterEQ[category_id]']"
        :field="category_id"
      />
      <VFormComponent
        v-model="filters['filterEQ[vendor_id]']"
        :field="vendor_id"
      />
    </Filter>
    <NuxtLink class="d-inline-flex mb-1" to="/admin/products/create">
      <UiButton>Создать</UiButton>
    </NuxtLink>
    <Table
      :data="computedData"
      :cols="cols"
      :meta="meta"
      :filters="filters"
      title="Товары"
    />
    <UiModalDelete
      @confirm="deleteConfirm"
      @cancel="deleteCancel"
    />
  </Layout>
</template>

<script setup>
import api from "~/api";
import TableActions from "@/components/table/TableActions.vue";

const { close, open } = useModal({ name: "data-delete" });

const { filters } = useFilters({
  initialFilters: {
    "filterLIKE[title]": "",
    "filterGEQ[price]": "",
    "filterLEQ[price]": "",
    "filterEQ[category_id]": "",
    "filterEQ[vendor_id]": "",
    page: 1,
    sort: "id",
    limit: 20,
  },
});

const title = ref({
  type: "text",
  name: "title",

  bind: {
    label: "Название",
    placeholder: "Введите название",
  },
});

const priceGeq = ref({
  type: "text",
  name: "price",
  rules: "max:7",

  bind: {
    label: "Стоимость (от)",
    dataMaska: maskaOnlyNumber.mask,
    maskaTokens: maskaOnlyNumber.tokens,
  },
});

const priceLeq = ref({
  type: "text",
  name: "price",
  rules: "max:7",

  bind: {
    label: "Стоимость (до)",
    dataMaska: maskaOnlyNumber.mask,
    maskaTokens: maskaOnlyNumber.tokens,
  },
});

const category_id = ref({
  type: "select",
  name: "category_id",

  bind: {
    label: "Категория",
    modelValueIsNumber: true,
    debounceMs: 200,
    limit: 20,
    searchFn: async (_ctx, search, limit, page) => {
      return await getCategoriesOptions({
        limit,
        page,
        "filterLIKE[name]": search,
      });
    },
  },
});

const vendor_id = ref({
  type: "select",
  name: "vendor_id",

  bind: {
    label: "Производитель",
    modelValueIsNumber: true,
    debounceMs: 200,
    limit: 20,
    searchFn: async (_ctx, search, limit, page) => {
      return await getVendorsOptions({
        limit,
        page,
        "filterLIKE[name]": search,
      });
    },
  },
});

const { data, meta, get } = await useApi({
  name: "products.getAll",
  params: {
    extends: "category,vendor",
  },
  filters,
});
await get();

const computedData = computed(() => {
  return data.value?.map(({ count, price, ...item }) => ({
    ...item,
    price: (+price)?.toLocaleString(),
    count: item?.is_infinitely ? "ထ" : count,
  }));
});

const { deleteId, deleteConfirm, deleteCancel } = useDeleteConfirm({
  apiName: "products",
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
    name: "title",
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
    title: "Производитель",
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
          open();

          deleteId.value = id;
        },
        id: 1,
      }),
    width: 30,
  },
];

async function getCategoriesOptions(params) {
  try {
    const { data } = await api.categories.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item.name, item }));
  } catch (e) {
    console.log(error);
  }
}

async function getVendorsOptions(params) {
  try {
    const { data } = await api.vendors.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item.name, item }));
  } catch (e) {
    console.log(error);
  }
}
</script>
