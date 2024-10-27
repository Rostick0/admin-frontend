<template>
  <UiModal class="modal-delete" :name="name">
    <UiModalBlock>
      <div class="modal-delete__title">Подтверждение удаления</div>
      <p class="modal-delete__p">Вы уверены, что хотите удалить?</p>
      <slot></slot>
      <UiStack gap="1">
        <UiButton class="modal-delete__btn" @click="$emit('confirm')">Да</UiButton>
        <UiButton
          class="modal-delete__btn"
          @click="$emit('cancel')"
          variant="outlined"
          >Нет</UiButton
        >
      </UiStack>
    </UiModalBlock>
  </UiModal>
</template>

<script setup>
defineEmits(["confirm", "cancel"]);

defineProps({
  name: {
    default: "data-delete",
  },
});
</script>

<style lang="scss" scoped>
.modal-delete {
  text-align: center;

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  &__p {
    margin-bottom: 1.25rem;
  }

  &__btn {
    flex-grow: 1;
    flex-basis: calc(50% - 5px);
  }
}
</style>
