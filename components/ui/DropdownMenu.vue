<template>
  <div class="dropdown" tabindex="-1" @focusout="onFocusout" ref="wrapper">
    <div @click="toggle" class="dropdown-menu-button">
      <slot name="body" />
    </div>
    <div
      class="dropdown-menu"
      v-if="wrapper && isOpened"
      :style="`top:${
        wrapper?.getBoundingClientRect()?.top + wrapper.clientHeight
      }px;
            left:${wrapper?.getBoundingClientRect()?.left}px;`"
      tabindex="-1"
    >
      <slot name="drop" />
    </div>
  </div>
</template>
<script setup>
const isOpened = ref(false);

const wrapper = ref();

const onFocusout = (e) => {
  if (!wrapper?.value?.contains(e?.relatedTarget)) isOpened.value = false;
};

const toggle = () => {
  isOpened.value = !isOpened.value;
};
</script>

<style lang="scss">
.dropdown {
  &-menu {
    position: absolute;
    z-index: 102;
    width: 200px;

    &-button {
    }
  }
}
</style>
