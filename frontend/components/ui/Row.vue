<template>
  <div
    :="$attrs"
    class="row"
    :class="[
      `gap-y-${gapY}`,
      `gap-${gap}`,
      `row-align-items-${alignItems}`,
      `justify-content-${justifyContent}`,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    gap?: "0" | "1" | "2" | "3" | "4";
    alignItems?: "center" | "flex-end";
    gapY?: "0" | "1" | "2" | "3" | "4";
    justifyContent?: "start" | "end" | "space-beetwen" | "space-around";
  }>(),
  {
    gap: "0",
    gapY: "0",
  }
);
</script>
