<template>
  <div class="col" :class="[`col-${col}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    col?:
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9"
      | "10"
      | "11"
      | "12"
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12;
  }>(),
  {
    col: "12",
  }
);
</script>

<style lang="scss" scoped>
.col {
  &.col-1 {
    flex: 0 0 auto;
    width: calc(100% * (1 / 12));
  }
  &.col-2 {
    flex: 0 0 auto;
    width: calc(100% * (2 / 12));
  }
  &.col-3 {
    flex: 0 0 auto;
    width: calc(100% * (3 / 12));
  }
  &.col-4 {
    flex: 0 0 auto;
    width: calc(100% * (4 / 12));
  }
  &.col-5 {
    flex: 0 0 auto;
    width: calc(100% * (5 / 12));
  }
  &.col-6 {
    flex: 0 0 auto;
    width: calc(100% * (6 / 12));
  }
  &.col-7 {
    flex: 0 0 auto;
    width: calc(100% * (7 / 12));
  }
  &.col-8 {
    flex: 0 0 auto;
    width: calc(100% * (8 / 12));
  }
  &.col-9 {
    flex: 0 0 auto;
    width: calc(100% * (9 / 12));
  }
  &.col-10 {
    flex: 0 0 auto;
    width: calc(100% * (10 / 12));
  }
  &.col-11 {
    flex: 0 0 auto;
    width: calc(100% * (11 / 12));
  }
  &.col-12 {
    flex: 0 0 auto;
    width: calc(100% * (12 / 12));
  }
}
</style>
