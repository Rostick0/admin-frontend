<template>
  <UiField
    v-if="field.type == 'text'"
    v-model="model"
    v-bind="field.bind"
    :errorMessage="errorMessage"
  />
  <ClientOnly v-else-if="field.type == 'select'">
    <UiMultiSelect
      v-model="model"
      v-bind="field.bind"
      :error-message="errorMessage"
    />
  </ClientOnly>
  <UiTextarea
    v-else-if="field.type == 'textarea'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />
  <UiCheckbox
    v-else-if="field.type == 'checkbox'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />
  <UiMultiMSelect
    v-else-if="field.type == 'multiple-select'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
    :name="field.name"
  />

  <VFormSwitch
    v-else-if="field.type == 'switch'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />

  <UiDatePicker
    v-else-if="field.type == 'date'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />
  
  <UiFileLoader
    v-else-if="field.type == 'file-loader'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />
  <VFormMFileLoader
    v-else-if="field.type == 'multiple-file-loader'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />

  <UiPhotoLoader
    v-else-if="field.type == 'photo-loader'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />

  <UiMPhotoLoader
    v-else-if="field.type == 'multiple-photo-loader'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />

  <VFormCkeditor
    v-else-if="field.type == 'ckeditor'"
    v-model="model"
    v-bind="field.bind"
    :error-message="errorMessage"
  />
</template>

<script setup>
import { useField } from "vee-validate";

defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  field: Object,
  modelValue: [String, Array, Object, Number, Boolean],
});

const model = computed({
  get() {
    return props.field.modelValue;
  },
  set(value) {
    props.field.modelValue = value;
    emits("update:modelValue", value);
  },
});

const { errorMessage, value } = useField(props.field.name, props.field.rules, {
  initialValue:
    props.field.convertTo?.(props.field.modelValue) ?? props.field.modelValue,
});

watch(
  model,
  () => {
    value.value = props.field.convertTo?.(model.value) ?? model.value;
  },
  {
    deep: true,
  }
);
</script>
