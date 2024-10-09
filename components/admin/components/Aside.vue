<template>
  <div class="aside">
    <NuxtLink
      class="aside-top"
      :to="{
        name: 'admin',
      }"
      >Logo</NuxtLink
    >
    <nav class="aside__nav">
      <NuxtLink
        class="aside__link"
        v-for="item in menu"
        :key="item.name"
        :to="item.link"
      >
        <component :is="item.icon"></component>
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
const menu = computed(() => [
  {
    link: "admin",
    name: "Дашборд",
    icon: defineAsyncComponent(() => import("@/components/icon/Dashboard.vue")),
  },
  {
    link: {
      name: "admin-products",
    },
    name: "Товары",
    icon: defineAsyncComponent(() => import("@/components/icon/Product.vue")),
  },
  {
    link: {
      name: "admin-categories",
    },
    name: "Категории",
    icon: defineAsyncComponent(() => import("@/components/icon/Category.vue")),
  },
  {
    link: {
      name: "admin-posts",
    },
    name: "Посты",
    icon: defineAsyncComponent(() => import("@/components/icon/Post.vue")),
  },
  {
    link: {
      name: "admin-rubrics",
    },
    name: "Рубрики",
    icon: defineAsyncComponent(() => import("@/components/icon/Rubric.vue")),
  },
  {
    link: {
      name: "admin-vendors",
    },
    name: "Производители",
    icon: defineAsyncComponent(() => import("@/components/icon/Vendor.vue")),
  },
  {
    link: "/admin/orderings",
    name: "Заказы",
    icon: defineAsyncComponent(() => import("@/components/icon/Cart.vue")),
  },
]);
</script>

<style lang="scss">
.aside {
  background-color: rgb(var(--color-white));
  position: relative;
  z-index: 2;

  &-top {
    background-color: rgb(var(--color-blue-light));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.05rem;
    margin-bottom: 1.25rem;
    height: 3.5rem;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    margin-top: -0.75rem;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    column-gap: 0.25rem;
    padding: 0.75rem 2.5rem;
  }
}
</style>
