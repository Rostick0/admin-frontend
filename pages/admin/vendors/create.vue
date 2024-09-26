<template>
  <PagesVendorMutation
    :pageTitle="`Создание производителя`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.vendors.create({
    data,
  });
</script>
