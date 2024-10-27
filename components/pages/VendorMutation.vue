<template>
  <Layout>
    <template #title>
      <div>{{ pageTitle }}</div>
      <!-- <div>Производитель #{{ data?.id }}</div> -->
    </template>
    <UiStack flex-direction="column" gap="2">
      <UiCard padding="4">
        <UiStack flex-direction="column" gap="2">
          <form @submit="onSubmit">
            <UiStack flex-direction="column" gap="3">
              <VFormComponent :field="name" />
              <VFormComponent :field="description" />
              <VFormComponent :field="images" />
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
import api from "~/api";

const { data, dataMutation, ...props } = defineProps({
  data: Object,
  dataMutation: Function,
  pageTitle: String,
});

const { handleSubmit, setErrors } = useForm();

const name = ref({
  type: "text",
  name: "name",
  rules: "required|max:255",
  modelValue: data?.name,

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const description = ref({
  type: "textarea",
  name: "description",
  rules: "max:255",
  modelValue: data?.description,

  bind: {
    label: "Описание",
    placeholder: "Введите описание",
  },
});

const images = ref({
  type: "multiple-photo-loader",
  name: "images",
  modelValue:
    data?.images?.map((i) => ({
      ...i.image,
      path: i?.image?.path + "?w=350&h=350",
    })) ?? [],

  bind: {
    label: "Фотографии",
  },
});

const { getImageIdsFrom } = useImage();

const onSubmit = handleSubmit(async ({ images, ...values }) => {
  const images_load = await getImageIdsFrom(images);
  const res = await dataMutation({ ...values, images: images_load });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    if (res?.errorResponse?.data?.errors)
      setErrors(res?.errorResponse?.data?.errors);

    return;
  }

  nextTick(() => {
    navigateTo({
      name: "admin-vendors",
    });
  });
}, invalidValuesForm);
</script>

<style></style>
