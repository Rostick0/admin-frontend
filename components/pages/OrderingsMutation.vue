<template>
  <UiStack flex-direction="column" gap="2">
    <UiCard padding="4">
      <UiStack flex-direction="column" gap="2">
        <form @submit="onSubmit">
          <UiStack flex-direction="column" gap="3">
            <VFormComponent :field="status" />
            <VFormComponent
              v-if="status.modelValue?.name === 'rejected'"
              :field="reason"
            />

            <UiStack>
              <UiButton>Сохранить</UiButton>
            </UiStack>
          </UiStack>
        </form>
      </UiStack>
    </UiCard>
  </UiStack>
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

const status = ref({
  type: "select",
  name: "status",

  modelValue: statusOrderingsOptions.find((item) => item.id === data?.status),

  bind: {
    label: "Статус",
    options: statusOrderingsOptions,
  },
});

const reason = ref({
  type: "text",
  name: "reason",
  rules: "required|max:255",
  modelValue: data?.reason,

  bind: {
    label: "Причина отказа*",
    placeholder: "Введите причину",
  },
});

const onSubmit = handleSubmit(async ({ status, ...values }) => {
  const res = await dataMutation({
    ...values,
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
      name: "admin-orderings",
    });
  });
}, invalidValuesForm);
</script>
