<template>
  <div class="table">
    <div class="table__header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="table__body" v-if="$slots.table">
      <slot name="table" />
    </div>
    <div class="table__footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>

</style>
