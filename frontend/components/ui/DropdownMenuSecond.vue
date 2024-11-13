<template>
  <div class="dropdown" @click="$emit('click')">
    <div class="dropdown-menu-button" @click="isShow = !isShow">
      <slot name="body" />
    </div>
    <div
      class="dropdown-menu"
      :style="position ? `${position}:0;` : ''"
      v-if="isShow"
    >
      <slot name="drop" :close="() => (isShow = !isShow)"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const isShow = ref(false);

interface Props {
  isShow?: boolean;
  position?: "left" | "right" | "top" | "bottom";
}

defineEmits(["click"]);
defineProps<Props>();
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
