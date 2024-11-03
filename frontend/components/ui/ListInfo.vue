<template>
  <figure class="list-info">
    <figcaption class="list-info__title" v-if="title">{{ title }}</figcaption>
    <ul class="list-info__ul">
      <li class="list-info__item" v-for="item in data" :key="item?.name">
        <div class="list-info__item_name">{{ item?.name }}</div>
        <div class="list-info__item_value">{{ item?.value }}</div>
      </li>
    </ul>
  </figure>
</template>

<script setup>
const props = defineProps({
  data: Array,
  title: String,
});
</script>

<style lang="scss" scoped>
.list-info {
  background-color: rgb(var(--color-white));
  border-radius: 0.33rem;

  &__title {
    border-bottom: 2px solid rgb(var(--color-pre-white));
    font-weight: 700;
    padding: 0.75rem 1.25rem;
  }

  &__ul {
    display: grid;
    row-gap: 0.33rem;
    font-size: 14px;
    padding: 0.75rem 1.25rem;
  }

  &__item {
    display: flex;
    justify-content: space-between;

    &_name {
      // text-shadow: -0.1px 0, 0 0.1px, 0.1px 0, 0 -0.1px, -0.1px -0.1px, 0.1px 0.1px, -0.1px 0.1px,
      //     0.1px -0.1px;
      //   font-weight: 600;
    }
  }
}
</style>
