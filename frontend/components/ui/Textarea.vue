<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <textarea
      :="$attrs"
      class="control__textarea"
      v-maska
      :data-maska="maska"
      :data-maska-tokens="maskaTokens"
      :data-maska-reversed="dataMaskReserved"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value || undefined
        )
      "
      ref="textarea"
      :value="modelValue"
      :rows="rows"
    ></textarea>
  </UiControl>
</template>

<script setup lang="ts">
import { type TextareaHTMLAttributes } from "vue";

export interface FieldProps extends /* @vue-ignore */ TextareaHTMLAttributes {
  modelValue?: string;
  invalid?: boolean;
  rightIcon?: any;
  message?: string;
  label?: string;
  maska?: any;
  dataMaskReserved?: boolean;
  maskaTokens?: any;
  errorMessage?: string;
  rows?: string | number;
}

interface Emits {
  (event: "update:modelValue", value?: string): void;
}

defineEmits<Emits>();
withDefaults(defineProps<FieldProps>(), { rows: 1 });

const textarea = ref();

const textareaResize = () => {
  textarea.value.style.height = "auto";
  textarea.value.style.height = textarea.value.scrollHeight + "px";
};

onMounted(() => {
  textarea.value;

  textarea.value.style.height = textarea.value.scrollHeight + "px";
  textarea.value.style.overflowY = "hidden";

  textarea.value.addEventListener("input", textareaResize);
});

onUnmounted(() => {
  textarea.value?.removeEventListener("input", textareaResize);
});
</script>

<style lang="scss" scoped>
.control__textarea {
  border-radius: 0.33rem;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  width: 100%;
  min-height: 42.4px;
}
</style>
