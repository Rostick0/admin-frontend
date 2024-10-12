<template>
  <PagesPropertyItemMutation
    :pageTitle="`Тип свойства #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "propertyItems.get",
  params: {
    extends: "property",
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.propertyItems.update({
    id,
    data,
  });
</script>
