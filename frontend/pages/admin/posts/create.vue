<template>
  <PagesPostMutation
    :pageTitle="`Создание поста`"
    :dataMutation="dataMutation"
  />
</template>

<script setup>
import api from "~/api";

const dataMutation = async (data) =>
  await api.posts.create({
    data,
  });
</script>
