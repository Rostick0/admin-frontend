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
              <VFormComponent :field="title" />
              <VFormComponent :field="link_name" />
              <VFormComponent :field="image" />
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

const title = ref({
  type: "text",
  name: "title",
  rules: "required",
  modelValue: data?.title,

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

const image = ref({
  type: "photo-loader",
  name: "image",
  modelValue: data?.image?.image?.path_webp,

  bind: {
    label: "Фотографии",
  },
});

const { getImageFrom } = useImage();

const onSubmit = handleSubmit(async ({ image, ...values }) => {
  const image_upload = await getImageFrom(image).then((res) => res?.id);
  const res = await dataMutation({ ...values, image: image_upload });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    if (res?.errorResponse?.data?.errors)
      setErrors(res?.errorResponse?.data?.errors);

    return;
  }

  nextTick(() => {
    navigateTo({
      name: "admin-slides",
    });
  });
}, invalidValuesForm);
</script>

<style></style>
