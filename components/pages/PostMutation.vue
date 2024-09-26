<template>
  <AdminLayout>
    <template #title>
      <div :title="`Редактирование поста - ${data?.title}`">
        Производитель #{{ data?.id }}
      </div>
    </template>
    <UiStack flex-direction="column" gap="2">
      <UiCard padding="4">
        <UiStack flex-direction="column" gap="2">
          <form @submit="onSubmit">
            <UiStack flex-direction="column" gap="3">
              <VFormComponent :field="title" />
              <VFormComponent :field="description" />
              <VFormComponent :field="content" />
              <VFormComponent :field="rubric" />
              <VFormComponent :field="source" />
              <VFormComponent :field="images" />
              <VFormComponent :field="files" />
              <VFormComponent :field="status" />
              <VFormComponent :field="date_publication" />
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

const { data, dataMutation, ...props } = defineProps({
  data: Object,
  dataMutation: Function,
  title: String,
});
console.log(data);
// const { data, get } = await useApi({
//   name: "posts.get",
//   params: {
//     extends: "rubric,files.file,images.image",
//   },
//   requestParams: {
//     id: useRoute().params.id,
//   },
// });

// await get();
//         'is_private',

const { handleSubmit, setErrors } = useForm();

const title = ref({
  type: "text",
  name: "title",
  rules: "required|max:255",
  modelValue: data?.title,

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const description = ref({
  type: "textarea",
  name: "description",
  rules: "required|max:255",
  modelValue: data?.description,

  bind: {
    label: "Описание*",
    placeholder: "Введите описание",
  },
});

const content = ref({
  type: "textarea",
  name: "content",
  rules: "required",
  modelValue: data?.content,

  bind: {
    label: "Описание*",
    placeholder: "Введите описание",
  },
});

const rubric = ref({
  type: "select",
  name: "rubric",
  rules: "required",
  modelValue: data?.rubric,

  bind: {
    label: "Рубрика*",
    placeholder: "Введите название",
    searchFn: async (_ctx, search, limit, page) =>
      await getRubricsOptions({
        limit,
        page,
        "filterLIKE[name]": search,
      }),
  },
});

const source = ref({
  type: "text",
  name: "source",
  rules: "max:255",
  modelValue: data?.source,

  bind: {
    label: "Источник",
    placeholder: "Введите ссылку",
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

const files = ref({
  type: "multiple-file-loader",
  name: "files",
  modelValue:
    data?.files?.map((i) => ({
      ...i.file,
      path: i?.file?.path,
    })) ?? [],

  bind: {
    label: "Фотографии",
  },
});

const status = ref({
  type: "select",
  name: "status",
  modelValue: statusViewsOptions.find((name) => name === data?.status),

  bind: {
    label: "Статус",
    options: statusViewsOptions,
  },
});

const date_publication = ref({
  type: "date",
  name: "date_publication",
  modelValue: data?.date_publication,

  bind: {
    label: "Дата публикации",
  },
});

const onSubmit = handleSubmit(async ({ parent, ...values }) => {
  const res = await dataMutation({
    ...values,
    parent_id: parent?.id,
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

async function getRubricsOptions(params) {
  try {
    const { data } = await api.rubrics.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item.name, item }));
  } catch (e) {
    console.log(error);
  }
}
</script>

<style></style>
