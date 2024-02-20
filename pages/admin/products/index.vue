<template>
  <AdminLayout>
    <Table :data="data" :cols="cols" :meta="meta"></Table>
  </AdminLayout>
</template>

<script setup>
const { data, meta } = await useApi({
  name: "todos.getAll"
});

const cols = ["id", "title", "completed"].map((item) => ({
  title: item,
  name: item,
  resizable: true,
}));

</script>

<style></style>
