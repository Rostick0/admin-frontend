<template>
  <AdminLayout>
    <UiStack flex-direction="column" gap="2">
      <UiCard padding="4">
        <UiStack flex-direction="column" gap="2">
          <form @submit="onSubmit" gap="2">
            <UiStack flex-direction="column" gap="3">
              <VFormComponent :field="title" />
              <VFormComponent :field="content" />
              <VFormComponent :field="images" />
              <VFormComponent :field="source" />
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

const form = useForm();

const title = ref({
  type: "text",
  modelValue: "",
  name: "title",
  rules: "required|min:6",

  bind: {
    label: "Заголовок",
    placeholder: "Введите заголовок новости",
    message: "Обязательное*",
  },
});

const content = ref({
  type: "textarea",
  modelValue: "",
  name: "content",
  rules: "required|min:100",

  bind: {
    label: "Текст статьи",
    placeholder: "Введите текст статьи",
    message: "Обязательное*",
  },
});

const images = ref({
  type: "multiple-photo-loader",
  name: "images",

  bind: {
    label: "Выберите фото статьи",
  },
});

const source = ref({
  type: "text",
  name: "source",
  rules: "required",

  bind: {
    label: "Ссылка на источник",
    placeholder: "Введите ссылку на источник",
    message: "Обязательное*",
  },
});

const onSubmit = form.handleSubmit(async ({ image, images, ...values }) => {
  const { getImageIdFrom, getImageIdsFrom } = useImage();

  let imagesIds = await getImageIdsFrom(images);

  await api.vendors.create({
    data: {
      ...values,
      images: imagesIds,
    },
  });

  useRouter().push("/posts");
});
</script>

<style></style>
