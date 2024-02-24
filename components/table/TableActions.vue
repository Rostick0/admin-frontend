<template>
  <UiDropdownMenu>
    <template #body>
      <div class="table-action">
        <IconTableMenu />
      </div>
    </template>
    <template #drop>
      <div>
        <div @click="$emit('update', id)">Редактировать</div>
      </div>
      <div v-if="!hideDelete">
        <div @click="$emit('delete', id)">Удалить</div>
      </div>
    </template>
  </UiDropdownMenu>
</template>

<script setup>
const emits = defineEmits(["update", "delete"]);
const props = defineProps({
  id: Number,
  hideDelete: {
    type: Boolean,
    initialValue: false,
  },
});
</script>

<style lang="scss" scoped>
.table-action {
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__icon {
    cursor: pointer;
  }
}
</style>
