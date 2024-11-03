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
              <VFormComponent :field="description" />
              <VFormComponent :field="content" />
              <VFormComponent :field="rubric" />
              <VFormComponent :field="source" />
              <VFormComponent :field="images" />
              <VFormComponent :field="files" />
              <VFormComponent :field="status" />
              <VFormComponent
                v-if="status.modelValue?.name === 'future'"
                :field="date_publication"
              />
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

const description = ref({
  type: "textarea",
  name: "description",
  rules: "max:255",
  modelValue: data?.description,

  bind: {
    label: "Краткое описание*",
    placeholder: "Введите описание",
  },
});

const content = ref({
  type: "ckeditor",
  name: "content",
  rules: "required|max:65536",
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
    data?.images?.map?.((i) => ({
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
    data?.files?.map?.((i) => ({
      ...i,
      path: i?.file?.path,
    })) ?? [],

  bind: {
    label: "Файлы",
  },
});

const status = ref({
  type: "select",
  name: "status",

  modelValue: statusViewsOptions.find((item) => item.id === data?.status),

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

const { getImageIdsFrom } = useImage();
const { getFileIdsFrom } = useFile();

const onSubmit = handleSubmit(
  async ({ rubric, images, files, status, ...values }) => {
    const images_load = await getImageIdsFrom(images);
    const files_load = await getFileIdsFrom(files);

    const res = await dataMutation({
      ...values,
      images: images_load,
      files: files_load,
      rubric: rubric?.id,
      status: status?.id,
    });

    if (res?.error) {
      warningPopup(res?.errorResponse?.data?.message);
      if (res?.errorResponse?.data?.errors)
        setErrors(res?.errorResponse?.data?.errors);

      return;
    }

    nextTick(() => {
      navigateTo({
        name: "admin-posts",
      });
    });
  },
  invalidValuesForm
);

async function getRubricsOptions(params) {
  try {
    const { data } = await api.rubrics.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item.name, item }));
  } catch (e) {
    console.error(error);
  }
}
</script>
