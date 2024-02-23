<template>
  <AdminLayout>
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
  modelValue: "",
  name: "description",
  rules: "required",

  bind: {
    label: "Описание*",
    placeholder: "Введите описание",
  },
});

const images = ref({
  type: "multiple-photo-loader",
  name: "images",

  bind: {
    label: "Фотографии",
  },
});

const onSubmit = handleSubmit(async ({ images, ...values }) => {
  const { getImageIdsFrom } = useImage();

  let imagesIds = await getImageIdsFrom(images);

  const res = await api.vendors.create({
    data: {
      ...values,
      images: imagesIds,
    },
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    if (res?.errorResponse?.data?.errors)
      setErrors(res?.errorResponse?.data?.errors);

    return;
    // errorMessage(
    //   res?.errorResponse?.data?.message,
    //   res?.errorResponse?.data?.errors,
    //   setErrors
    // );
  }

  console.log(res);
  nextTick(() => {
    navigateTo({
      name: 'admin-vendors-id',
      params: {
        id: res?.data?.id
      }
    })
  })
  // useRouter().push("/posts");
}, invalidValuesForm);
</script>

<style></style>
