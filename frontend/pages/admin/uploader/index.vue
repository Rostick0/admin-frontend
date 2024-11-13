<template>
  <Layout>
    <template #title>Экспорт или импорт файлов товаров</template>
    <h3>Вы можете скачать нужный вам тип файла</h3>
    <UiStack
      class=""
      align-items="flex-end"
      gap="2"
      margin-top="1"
      margin-bottom="5"
    >
      <VFormComponent :field="type" />
      <UiButton @click="download">Скачать</UiButton>
    </UiStack>
    <!-- <h3>Или же экспортировать файл</h3> -->
  </Layout>
</template>

<script setup>
import api from "~/api";

const typesUpload = ["Csv", "Json", "Xml"];

const typesUploadOptions = typesUpload.map((el) => ({ id: el, name: el }));

const type = ref({
  type: "select",
  name: "type",

  modelValue: typesUploadOptions[0],

  bind: {
    label: "Выберите тип",
    options: typesUploadOptions,
  },
});

const download = async () => {
  const res = await api.uploader.download({
    params: {
      model: "Product",
      type: type.value.modelValue.id,
    },
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    return;
  }

  success("Ожидайте уведомления" ?? res?.message);
};
// api
</script>
