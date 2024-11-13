<template>
  <div
    class="dropdown"
    @click="$emit('click')"
    tabindex="-1"
    @focusout="onFocusout"
    ref="wrapper"
  >
    <div class="dropdown-menu-button" @click="isOpened = !isOpened">
      <slot name="body" />
    </div>
    <div
      class="dropdown-menu"
      :style="position ? `${position}:0;` : ''"
      v-if="isOpened"
    >
      <slot name="drop" :close="() => (isOpened = !isOpened)"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  isOpened?: boolean;
  position?: "left" | "right" | "top" | "bottom";
}

defineEmits(["click"]);
defineProps<Props>();

const wrapper = ref();

const isOpened = ref(false);

const onFocusout = (e: any) => {
  if (!wrapper?.value?.contains(e?.relatedTarget)) isOpened.value = false;
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &.active {
    .dropdown-menu {
      display: flex;
    }
  }

  &-menu {
    position: fixed;
    left: auto;
    right: auto;
    z-index: 10000;

    &-button {
      cursor: pointer;
      position: relative;
      z-index: 3;
    }
  }
}
</style>
