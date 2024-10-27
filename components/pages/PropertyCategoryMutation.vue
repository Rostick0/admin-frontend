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
              <VFormComponent :field="property" />
              <VFormComponent :field="category" />
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

const property = ref({
  type: "select",
  name: "property",
  rules: "required",
  modelValue: data?.property,

  bind: {
    label: "Свойство для товаров*",
    placeholder: "Введите свойство",
    searchFn: async (_ctx, search, limit, page) =>
      await getPropertiesOptions({
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

const onSubmit = handleSubmit(async ({ property, category }) => {
  const res = await dataMutation({
    property_id: property?.id,
    category_id: category?.id,
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    if (res?.errorResponse?.data?.errors)
      setErrors(res?.errorResponse?.data?.errors);

    return;
  }

  nextTick(() => {
    navigateTo({
      name: "admin-property-categories",
    });
  });
}, invalidValuesForm);

async function getPropertiesOptions(params) {
  try {
    const { data } = await api.properties.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item.name, item }));
  } catch (e) {
    console.log(error);
  }
}

async function getCategoriesOptions(params) {
  try {
    const { data } = await api.categories.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item.name, item }));
  } catch (e) {
    console.log(error);
  }
}
</script>
