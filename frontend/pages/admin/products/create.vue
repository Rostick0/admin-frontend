<template>
  <PagesProductMutation
    :pageTitle="`Создание товара`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.products.create({
    data,
  });
</script>
