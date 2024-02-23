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

const { data, get } = await useApi({
  name: "vendors.get",
  requestParams: {
    id: useRoute().params.id,
  },
  params: {
    extends: 'images.image'
  },
  init: false
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

const images = ref({
  type: "multiple-photo-loader",
  name: "images",
  modelValue: data.value?.images?.map(i => ({
    ...i.image,
    path: i?.image?.path + '?w=350&h=350'
  })),

  bind: {
    label: "Фотографии",
  },
});

const onSubmit = handleSubmit(async ({ images, ...values }) => {
  const { getImageIdsFrom } = useImage();

  let imagesIds = await getImageIdsFrom(images);

  const res = await api.vendors.update({
    id: useRoute().params.id,
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
  // nextTick(() => {
  //   navigateTo({
  //     name: "admin-vendors-id",
  //     params: {
  //       id: res?.data?.id,
  //     },
  //   });
  // });
  // useRouter().push("/posts");
}, invalidValuesForm);
</script>

<style></style>
