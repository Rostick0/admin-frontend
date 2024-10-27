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
              <VFormComponent :field="name" />
              <VFormComponent :field="description" />
              <VFormComponent :field="parent" />

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
  rules: "required",
  modelValue: data?.name,

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const description = ref({
  type: "textarea",
  name: "description",
  rules: "max:65536",
  modelValue: data?.description,

  bind: {
    label: "Описание*",
    placeholder: "Введите описание",
  },
});

const parent = ref({
  type: "select",
  name: "parent",
  modelValue: data?.parent,

  bind: {
    label: "Родитель",
    placeholder: "Введите название",
    searchFn: async (_ctx, search, limit, page) =>
      await getCategoriesOptions({
        limit,
        page,
        "filterLIKE[name]": search,
        "filterNEQ[id]": data?.id,
        // "filterNEQ[children.parent_id]": data?.id,
      }),
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
      name: "admin-categories",
    });
  });
}, invalidValuesForm);

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
