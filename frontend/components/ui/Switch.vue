<template>
  <div class="switch" @click="emits('update:modelValue', !modelValue)">
    <div class="switch__icon" :class="{ active: modelValue }">
      <div class="switch__icon_circle"></div>
    </div>
    <div class="switch__label">
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: String,
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.switch {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  column-gap: 10px;

  &__icon {
    border: 1px solid rgb(var(--color-blue-light));
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    position: relative;
    transition: 0.3s;
    width: 40px;
    height: 20px;

    &.active {
      background-color: rgb(var(--color-blue-light));

      .switch__icon_circle {
        background-color: rgb(var(--color-white));
        left: calc(100% - 3px);
        transform: translateX(-100%);
      }
    }

    &_circle {
      background-color: rgb(var(--color-blue-light));
      border-radius: 50%;
      transition: 0.3s;
      position: absolute;
      left: 3px;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
