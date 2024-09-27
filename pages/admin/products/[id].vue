<template>
  <PagesProductMutation
    :pageTitle="`Товар #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "products.get",
  params: {
    extends: "vendor,category,files.file,images.image",
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.products.update({
    id,
    data,
  });
</script>
