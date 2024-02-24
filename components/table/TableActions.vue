<template>
  <UiDropdownMenu class="table-action">
    <template #body>
      <div class="table-action__body">
        <IconTableMenu />
      </div>
    </template>
    <template #drop>
      <div class="table-action__drop">
        <div class="table-action__drop_item">
          <div @click="$emit('update', id)">Редактировать</div>
        </div>
        <div v-if="!hideDelete" class="table-action__drop_item">
          <div @click="$emit('delete', id)">Удалить</div>
        </div>
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
  &__body {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin: -1rem;
  }

  &__drop {
    background-color: rgb(var(--color-white));
    border-radius: 0.33rem;
    box-shadow: 0 0 1rem 0rem rgba(var(--color-dark), 0.25);
    overflow: hidden;

    &_item {
      cursor: pointer;
      font-size: 0.8rem;
      padding: 0.75rem 1rem;
      transition: 0.3s;

      &:hover {
        background-color: rgb(var(--color-blue-light));
        color: rgb(var(--color-white));
      }

      &:active {
        transform: scale(1.03);
      }
    }
  }
}
</style>
