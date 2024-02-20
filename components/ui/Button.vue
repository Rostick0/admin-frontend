

<template>
  <button
      class="ui-button"
      v-bind="$attrs"
      :class="(color ? ' button-' + color : ' button-primary')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts" >
import { type ButtonHTMLAttributes } from "vue"

defineComponent({
  inheritAttrs: false
})

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {

  color?: "standard" | "primary" | "danger" | "green";
}

defineProps<Props>();
</script>

<style  lang="scss">

</style>