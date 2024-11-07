<template>
  <form class="chat-form" @submit="onSubmit">
    <UiButton class="chat-form__btn">
      <IconClip />
    </UiButton>
    <VFormComponent :field="content" />
    <UiButton class="chat-form__btn">
      <IconArrowSend />
    </UiButton>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const emits = defineEmits(["messageAdd"]);

const route = useRoute();

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async (values) => {
  const data = {
    ...values,
    chat_id: route.query?.id,
  };

  const res = await api.messages.create({ data });

//   emits("messageAdd", await res?.data);
  content.value.modelValue = "";
});

const content = ref({
  type: "textarea",
  name: "content",
  //   rules: "required|max:255",
  modelValue: "",

  bind: {
    placeholder: "Сообщение",
    rows: 1,
  },
});
</script>

<style lang="scss" scoped>
.chat-form {
  display: flex;
  align-items: flex-end;
  column-gap: 10px;

  &__btn {
    background-color: transparent;
    border: none;
    padding: 0;
    margin-bottom: 11px;
  }
}
</style>

<style lang="scss">
.chat-form {
  .control__textarea {
    background-color: rgb(var(--color-pre-white), 0.25);
  }
}
</style>
