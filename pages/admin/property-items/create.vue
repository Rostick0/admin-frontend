<template>
  <PagesPropertyItemMutation
    :pageTitle="`Создание типа свойтсва`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.propertyItems.create({
    data,
  });
</script>
