<template>
  <Layout>
    <template #title>
      <div>
        {{ pageTitle }}
      </div>
    </template>
    <UiStack flex-direction="column" gap="4">
      <PagesOrderingsMutation
        :pageTitle="`Заказ #${dataOrdering?.id}`"
        :data="dataOrdering"
        :dataMutation="dataMutation"
      />

      <UiListInfo :data="orderingInfo" title="Информация о заказе" />

      <Table
        title="Товары"
        :data="computedData"
        :cols="cols"
        :meta="meta"
        :filters="filters"
      />
    </UiStack>
  </Layout>
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data: dataOrdering, get: getOrdering } = await useApi({
  name: "orderings.get",
  params: {
    extends: "user",
  },
  requestParams: {
    id,
  },
});
await getOrdering();

const dataMutation = async (data) =>
  await api.orderings.update({
    id,
    data,
  });

const { filters } = useFilters({
  initialFilters: {
    page: 1,
    sort: "-id",
    limit: 20,
  },
});

const { data, meta, get } = await useApi({
  name: "orderingProducts.getAll",
  params: {
    extends: "product",
    "filterEQ[ordering_id]": id,
  },
  filters,
  init: true,
});
await get();

const computedData = computed(() =>
  data.value?.map(({ product, ...item }) => ({
    ...item,
    product: {
      ...product,
      price: `${formatFloatNumber(+product?.price)} ₽`,
    },
  }))
);

const orderingInfo = computed(() => [
  {
    name: "Имя заказчика",
    value: dataOrdering.value?.user?.name,
  },
  {
    name: "Почта",
    value: dataOrdering.value?.user?.email,
  },
  {
    name: "Адрес",
    value: dataOrdering.value?.address,
  },
  {
    name: "Сумма",
    value: `${formatFloatNumber(+dataOrdering.value?.price)} ₽`,
  },
]);

const cols = [
  {
    title: "ID",
    name: "id",
  },
  {
    title: "Название",
    name: "product.title",
  },

  {
    title: "Цена",
    name: "product.price",
  },
  {
    title: "Количество",
    name: "quantity",
  },
];
</script>
