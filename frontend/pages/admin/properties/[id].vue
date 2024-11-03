<template>
  <PagesPropertyMutation
    :pageTitle="`Свойство #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "properties.get",
  params: {
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.properties.update({
    id,
    data,
  });
</script>
