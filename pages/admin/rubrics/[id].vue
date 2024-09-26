<template>
  <PagesRubricMutation
    :pageTitle="`Рубрика #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "rubrics.get",
  params: {
    // extends: "",
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.rubrics.update({
    id,
    data,
  });
</script>
