<template>
  <PagesPropertyCategoryMutation
    :pageTitle="`Свойтсва для объединения с категорией #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "propertyCategories.get",
  params: {
    extends: "property_item,category",
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.propertyCategories.update({
    id,
    data,
  });
</script>
