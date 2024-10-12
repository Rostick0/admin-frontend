<template>
  <PagesPropertyCategoryMutation
    :pageTitle="`Создание свойтсва для объединения с категорией`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.propertyCategories.create({
    data,
  });
</script>
