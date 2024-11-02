<template>
  <button class="btn" v-bind="$attrs" :class="[color, variant]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type ButtonHTMLAttributes } from "vue";

defineComponent({
  inheritAttrs: false,
});

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: "standard" | "outlined";
  color?: "standard" | "primary" | "danger" | "green";
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.btn {
  background-color: rgb(var(--color-blue-light));
  color: rgb(var(--color-white));
  border-radius: 0.33rem;
  font-size: 0.875rem;
  padding: 0.75rem 1.25rem;

  &.outlined {
    background-color: rgb(var(--color-white));
    color: rgb(var(--color-blue-light));
    border: 1px solid rgb(var(--color-blue-light));
  }
}
</style>
