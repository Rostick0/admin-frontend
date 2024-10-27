<template>
  <div class="admin-filter">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.admin-filter {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  margin-bottom: 2rem;
}
</style>
