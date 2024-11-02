<template>
  <PagesCategoryMutation
    :pageTitle="`Категория #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "categories.get",
  params: {
    extends: "parent",
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.categories.update({
    id,
    data,
  });
</script>
