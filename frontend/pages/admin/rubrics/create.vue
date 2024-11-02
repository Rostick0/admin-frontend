<template>
  <PagesRubricMutation
    :pageTitle="`Создание рубрики`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.rubrics.create({
    data,
  });
</script>
