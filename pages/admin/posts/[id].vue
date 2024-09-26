<template>
  <PagesPostMutation
    :pageTitle="`Пост #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "posts.get",
  params: {
    extends: "rubric,files.file,images.image",
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.posts.update({
    id,
    data,
  });
</script>
