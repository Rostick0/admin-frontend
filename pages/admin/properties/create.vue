<template>
  <PagesPropertyMutation
    :pageTitle="`Создание свойтсва`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.properties.create({
    data,
  });
</script>
