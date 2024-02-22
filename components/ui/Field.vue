<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <input
      v-bind="$attrs"
      :placeholder="placeholder"
      class="control__field"
      :class="size"
      v-maska
      :data-maska="maska"
      :data-maska-tokens="maskaTokens"
      :data-maska-reversed="dataMaskaReversed"
      @change="handleChange"
      @input="handleInput"
      :value="modelValue"
    />
  </UiControl>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  invalid: Boolean,
  rightIcon: String,
  message: String,
  label: String,
  placeholder: String,
  maska: String,
  dataMaskaReversed: Boolean,
  maskaTokens: String,
  errorMessage: String,
  onChange: Function,
  deps: [Array, Object, String, Number],
  // small | standard | big
  size: String,
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
});
function handleInput(event) {
  emits("update:modelValue", event.target.value || undefined);
}

function handleChange(event) {
  props?.onChange?.(event);
}

const ctx = computed(() => ({
  modelValue: props.modelValue,
  handleChange,
  handleInput,
  updateModelValue: (value) => emits("update:modelValue", value),
}));

watch(
  () => props.deps,
  (cur, prev) => {
    if (
      Array.isArray(prev)
        ? prev.find((item) => item !== undefined)
        : prev !== undefined
    ) {
      props?.onDepsChange?.(ctx.value);
    }
  },
  {
    deep: true,
    immediate: props.forceDeps,
  }
);
</script>

<style lang="scss" scoped>
.control__field {
  border-radius: 0.33rem;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  width: 100%;
}
</style>
