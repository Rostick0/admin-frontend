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
        <component class="aside__link_svg" :is="item.icon"></component>
        <span class="aside__link_text">{{ item.name }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
const menu = computed(() => [
  {
    link: {
      name: "admin",
    },
    name: "Дашборд",
    icon: defineAsyncComponent(() => import("@/components/icon/Dashboard.vue")),
  },
  {
    link: {
      name: "admin-slides",
    },
    name: "Слайды",
    icon: defineAsyncComponent(() => import("@/components/icon/Cart.vue")),
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
      name: "admin-uploader",
    },
    name: "Загрузка",
    icon: defineAsyncComponent(() => import("@/components/icon/Product.vue")),
  },
  {
    link: {
      name: "admin-properties",
    },
    name: "Свойства",
    icon: defineAsyncComponent(() => import("@/components/icon/Product.vue")),
  },
  {
    link: {
      name: "admin-property-types",
    },
    name: "Типы свойств",
    icon: defineAsyncComponent(() => import("@/components/icon/Product.vue")),
  },
  {
    link: {
      name: "admin-property-categories",
    },
    name: "Свойства - категория",
    icon: defineAsyncComponent(() => import("@/components/icon/Product.vue")),
  },
  // {
  //   link: {
  //     name: "admin-property-items",
  //   },
  //   name: "Свойств для товаров",
  //   icon: defineAsyncComponent(() => import("@/components/icon/Product.vue")),
  // },
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
    link: {
      name: "admin-orderings",
    },
    name: "Заказы",
    icon: defineAsyncComponent(() => import("@/components/icon/Cart.vue")),
  },
]);
</script>

<style lang="scss">
.aside {
  background-color: rgb(var(--color-white));
  position: relative;
  z-index: 1;

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
    column-gap: 0.5rem;
    padding: 0.75rem 2.5rem;
    text-wrap: nowrap;

    &_svg {
      flex-shrink: 0;
    }
  }
}
</style>
