<template>
  <div class="modal-block">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.modal-block {
  background-color: rgb(var(--color-white));
  border-radius: 0.33rem;
  padding: 1rem;
}
</style>
