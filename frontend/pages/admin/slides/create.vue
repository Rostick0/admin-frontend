<template>
  <PagesSlideMutation
    :pageTitle="`Слайда рубрики`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.slides.create({
    data,
  });
</script>
