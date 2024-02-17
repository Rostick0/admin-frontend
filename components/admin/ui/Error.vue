<template>
  <span class="error">
    <slot></slot>
  </span>
</template>

<script setup></script>

<style lang="scss" scoped>
.error {
  color: rgb(var(--color-red));
  font-size: 0.85rem;
}
</style>
