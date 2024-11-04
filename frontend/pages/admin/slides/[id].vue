<template>
  <PagesSlideMutation
    :pageTitle="`Слайд #${data?.id}`"
    :data="data"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const id = useRoute().params.id;

const { data, get } = await useApi({
  name: "slides.get",
  params: {
    extends: "image.image",
  },
  requestParams: {
    id,
  },
});
await get();

const dataMutation = async (data) =>
  await api.slides.update({
    id,
    data,
  });
</script>
