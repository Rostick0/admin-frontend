<template>
  <PagesVendorMutation
    :pageTitle="`Производитель #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "vendors.get",
  params: {
    extends: "images.image",
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.vendors.update({
    id,
    data,
  });
</script>
