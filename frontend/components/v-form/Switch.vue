<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <UiSwitch
      :title="title"
      :modelValue="modelValue"
      @update:modelValue="(val) => emits('update:modelValue', val)"
      :placeholder="placeholder"
    />
  </UiControl>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  invalid?: boolean;
  rightIcon?: any;
  message?: string;
  label?: string;
  title?: string;
  maska?: any;
  dataMaskReserved?: boolean;
  maskaTokens?: any;
  errorMessage?: string;
  placeholder?: string;
}

const props = defineProps<Props>();

const emits = defineEmits(["update:modelValue"]);
</script>
