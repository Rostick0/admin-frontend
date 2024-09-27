<template>
  <PagesCategoryMutation
    :pageTitle="`Создание категории`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.categories.create({
    data,
  });
</script>
