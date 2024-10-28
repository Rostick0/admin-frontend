<template>
  <Layout>
    <template #title>
      <div>
        {{ pageTitle }}
      </div>
    </template>
    <UiStack flex-direction="column" gap="2">
      <UiCard padding="4">
        <UiStack flex-direction="column" gap="2">
          <form @submit="onSubmit">
            <UiStack flex-direction="column" gap="3">
              <VFormComponent :field="name" />
              <VFormComponent :field="link_name" />
              <UiStack>
                <UiButton>Сохранить</UiButton>
              </UiStack>
            </UiStack>
          </form>
        </UiStack>
      </UiCard>
    </UiStack>
  </Layout>
</template>

<script setup>
import { useForm } from "vee-validate";

const { data, dataMutation, ...props } = defineProps({
  data: Object,
  dataMutation: Function,
  pageTitle: String,
});

const { handleSubmit, setErrors } = useForm();

const name = ref({
  type: "text",
  name: "name",
  rules: "required",
  modelValue: data?.name,

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const link_name = ref({
  type: "text",
  name: "link_name",
  rules: "required|max:255",
  modelValue: data?.link_name,

  bind: {
    label: "Ссылка*",
    placeholder: "Название ссылки",
  },
});

const onSubmit = handleSubmit(async ({ ...values }) => {
  const res = await dataMutation(values);

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
