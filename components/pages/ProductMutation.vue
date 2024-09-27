<template>
  <AdminLayout>
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
              <VFormComponent :field="description" />
              <VFormComponent :field="price" />
              <VFormComponent :field="old_price" />
              <VFormComponent :field="count" />
              <VFormComponent :field="is_infinitely" />
              <VFormComponent :field="vendor" />
              <VFormComponent :field="category" />
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
  </AdminLayout>
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
  rules: "max:255",
  modelValue: data?.description,

  bind: {
    label: "Описание*",
    placeholder: "Введите описание",
  },
});

const price = ref({
  type: "textarea",
  name: "price",
  rules: "required",
  modelValue: data?.price,

  bind: {
    label: "Цена*",
    placeholder: "Введите цену",
    dataMaska: maskaOnlyNumber.mask,
    maskaTokens: maskaOnlyNumber.tokens,
  },
});

const old_price = ref({
  type: "textarea",
  name: "old_price",
  rules: "required",
  modelValue: data?.old_price,

  bind: {
    label: "Старая цена*",
    dataMaska: maskaOnlyNumber.mask,
    maskaTokens: maskaOnlyNumber.tokens,
  },
});

const count = ref({
  type: "text",
  name: "count",
  // rules: "max:255",
  modelValue: data?.count,

  bind: {
    label: "Количество",
    placeholder: "Введите количество",
  },
});

const is_infinitely = ref({
  type: "switch",
  name: "is_infinitely",
  modelValue: data?.is_infinitely,

  bind: {
    label: "Бесконечное количество",
  },
});

const vendor = ref({
  type: "select",
  name: "vendor",
  rules: "required",
  modelValue: data?.vendor,

  bind: {
    label: "Производитель*",
    placeholder: "Введите производителя",
    searchFn: async (_ctx, search, limit, page) =>
      await getVendorsOptions({
        limit,
        page,
        "filterLIKE[name]": search,
      }),
  },
});

const category = ref({
  type: "select",
  name: "category",
  rules: "required",
  modelValue: data?.category,

  bind: {
    label: "Категория*",
    placeholder: "Введите категорию",
    searchFn: async (_ctx, search, limit, page) =>
      await getCategoriesOptions({
        limit,
        page,
        "filterLIKE[name]": search,
      }),
  },
});

const images = ref({
  type: "multiple-photo-loader",
  name: "images",
  modelValue:
    data?.images?.map((item, i) => ({
      ...item.image,
      path: item?.image?.path + "?w=350&h=350",
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

const onSubmit = handleSubmit(
  async ({ rubric, images, files, status, ...values }) => {
    const images_load = await getImageIdsFrom(images);

    const res = await dataMutation({
      ...values,
      images: images_load,
      vendor: vendor?.id,
      category: rubric?.id,
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

async function getVendorsOptions(params) {
  try {
    const { data } = await api.vendors.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item?.name, item }));
  } catch (e) {
    console.log(error);
  }
}

async function getCategoriesOptions(params) {
  try {
    const { data } = await api.categories.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item?.name, item }));
  } catch (e) {
    console.log(error);
  }
}
</script>
