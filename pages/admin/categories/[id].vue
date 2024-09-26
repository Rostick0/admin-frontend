<template>
  <AdminLayout>
    <template #title>
      <div :title="`Редактирование производителя - ${data?.name}`">
        Производитель #{{ data?.id }}
      </div>
    </template>
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

const { data, get } = await useApi({
  name: "categories.get",
  params: {
    extends: "parent",
  },
  requestParams: {
    id: useRoute().params.id,
  },
});

await get();

const { handleSubmit, setErrors } = useForm();


const name = ref({
  type: "text",
  name: "name",
  rules: "required",
  modelValue: data.value?.name,

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const description = ref({
  type: "textarea",
  name: "description",
  rules: "required",
  modelValue: data.value?.description,

  bind: {
    label: "Описание*",
    placeholder: "Введите описание",
  },
});

const parent = ref({
  type: "select",
  name: "parent",
  rules: "required",
  modelValue: data.value?.parent,

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const onSubmit = handleSubmit(async ({ parent, ...values }) => {
  const res = await api.categories.update({
    id: useRoute().params.id,
    data: {
      ...values,
      parent_id: parent?.id,
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

<style></style>
