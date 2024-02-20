<template>
  <UiControl
      :label="label"
      :invalid="!!errorMessage || invalid"
      :message="errorMessage || message"
      :rightIcon="rightIcon"
  >
    <textarea
      class="control__textarea"
      v-maska
      :data-maska="maska"
      :data-maska-tokens="maskaTokens"
      :data-maska-reversed="dataMaskReserved"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value || undefined)
        "
      :value="modelValue"
    /> 
  </UiControl>
</template>

<script setup lang="ts">
import  {type TextareaHTMLAttributes } from "vue";

export interface FieldProps extends /* @vue-ignore */ TextareaHTMLAttributes {
  modelValue?: string;
  invalid?: boolean;
  rightIcon?: any;
  message?: string;
  label?: string;
  placeholder?: string;
  maska?: any;
  dataMaskReserved?: boolean
  maskaTokens?: any;
  errorMessage?: string
}

interface Emits {
  (event: "update:modelValue", value?: string): void;
}

defineEmits<Emits>();
defineProps<FieldProps>();
</script>

<style lang="scss"></style>
