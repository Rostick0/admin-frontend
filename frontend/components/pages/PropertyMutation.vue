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
              <VFormComponent :field="is_top" />
              <VFormComponent :field="is_filter" />
              <VFormComponent :field="type" />
              <VFormComponent :field="unit" />
              <VFormComponent :field="property_type" />

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
  rules: "required|max:255",
  modelValue: data?.name,

  bind: {
    label: "Название*",
    placeholder: "Введите название",
  },
});

const is_top = ref({
  type: "switch",
  name: "is_top",
  modelValue: data?.is_top,

  bind: {
    title: "Показывать сверху",
  },
});

const is_filter = ref({
  type: "switch",
  name: "is_filter",
  modelValue: data?.is_filter,

  bind: {
    title: "Показывать при фильтрации",
  },
});

const type = ref({
  type: "select",
  name: "type",
  rules: "required|max:255",
  modelValue: data?.type,

  bind: {
    label: "Тип*",
    placeholder: "Введите тип",
    options: propertyTypesOptions,
  },
});

const unit = ref({
  type: "text",
  name: "unit",
  rules: "required|max:255",
  modelValue: data?.unit,

  bind: {
    label: "Единица измерения*",
    placeholder: "Введите единицу",
  },
});

const property_type = ref({
  type: "select",
  name: "property_type",
  rules: "required",
  modelValue: data?.property,

  bind: {
    label: "Свойство*",
    placeholder: "Введите название",
    searchFn: async (_ctx, search, limit, page) =>
      await getPropertyTypesOptions({
        limit,
        page,
        "filterLIKE[name]": search,
      }),
  },
});

const onSubmit = handleSubmit(async ({ property_type, type, ...values }) => {
  const res = await dataMutation({
    ...values,
    property_type_id: property_type?.id,
    type: type?.id,
  });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);
    if (res?.errorResponse?.data?.errors)
      setErrors(res?.errorResponse?.data?.errors);

    return;
  }

  nextTick(() => {
    navigateTo({
      name: "admin-properties",
    });
  });
}, invalidValuesForm);

async function getPropertyTypesOptions(params) {
  try {
    const { data } = await api.propertyTypes.getAll({
      params: params,
    });

    return data?.map((item) => ({ id: item.id, value: item.name, item }));
  } catch (e) {
    console.error(error);
  }
}
</script>
