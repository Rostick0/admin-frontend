<template>
  <AdminLayout>
    <UiStack flex-direction="column" gap="2">
      <UiCard padding="4">
        <UiStack flex-direction="column" gap="2">
          <form @submit="onSubmit">
            <UiStack flex-direction="column" gap="3">
              <VFormComponent :field="name" />
              <VFormComponent :field="description" />
              <VFormComponent :field="parent" />
              <UiStack>
                <UiButton>Сохранить</UiButton>
              </UiStack>
            </UiStack>
          </form>
        </UiStack>
      </UiCard>
    </UiStack>
  </AdminLayout>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const { handleSubmit, setErrors } = useForm();

const name = ref({
  type: "text",
  modelValue: "",
  name: "name",
  rules: "required",

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const description = ref({
  type: "textarea",
  name: "description",
  rules: "required",
  modelValue: null,

  bind: {
    label: "Описание*",
    placeholder: "Введите описание",
  },
});

const parent = ref({
  type: "select",
  name: "parent",
  rules: "required",
  modelValue: null,

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const onSubmit = handleSubmit(async ({ ...values }) => {
  const res = await api.categories.create({
    data: {
      parent_id: parent?.id,
      ...values,
    },
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    if (res?.errorResponse?.data?.errors)
      setErrors(res?.errorResponse?.data?.errors);

    return;
  }

  nextTick(() => {
    navigateTo({
      name: "admin-rubrics",
    });
  });
}, invalidValuesForm);
</script>
