<template>
  <div class="pages" v-if="total > limit">
    <div class="pages__num" @click="prevPage">
      <svg
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.3583 11L6.5 9.7075L2.7915 5.5L6.5 1.2925L5.3583 -8.46956e-07L0.500001 5.5L5.3583 11Z"
          fill="#152242"
        />
      </svg>
      <svg
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.3583 11L6.5 9.7075L2.7915 5.5L6.5 1.2925L5.3583 -8.46956e-07L0.500001 5.5L5.3583 11Z"
          fill="#152242"
        />
      </svg>
    </div>

    <div
      class="pages__num"
      :class="{ active: 1 == currentPage }"
      @click="setPage(1)"
    >
      1
    </div>
    <div
      class="pages__num"
      @click="setPage(currentPage - multiplicity)"
      v-if="currentPageList - multiplicity >= 0"
    >
      ...
    </div>
    <template v-for="page of multiplicity" :key="page">
      <div
        v-if="page + currentPageList < pageCount && page > 1"
        class="pages__num"
        :class="{ active: page + currentPageList == currentPage }"
        @click="$emit('update:currentPage', page + currentPageList)"
      >
        {{ page + currentPageList }}
      </div>
    </template>
    <div
      class="pages__num"
      @click="setPage(currentPage + multiplicity)"
      v-if="currentPageList + multiplicity < pageCount"
    >
      ...
    </div>
    <div
      class="pages__num"
      :class="{ active: pageCount == currentPage }"
      @click="setPage(pageCount)"
    >
      {{ pageCount }}
    </div>

    <div class="pages__num" @click="nextPage">
      <svg
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.6417 -1.06719e-07L0.5 1.2925L4.2085 5.5L0.500001 9.7075L1.6417 11L6.5 5.5L1.6417 -1.06719e-07Z"
          fill="#152242"
        />
      </svg>
      <svg
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.6417 -1.06719e-07L0.5 1.2925L4.2085 5.5L0.500001 9.7075L1.6417 11L6.5 5.5L1.6417 -1.06719e-07Z"
          fill="#152242"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const multiplicity = 4;
const currentPageList = ref(0);

const props = defineProps<{
  total: number;
  limit: number;
  currentPage: number;
}>();

const pageCount = computed(() => {
  let _pageCount = Math.floor(props.total / props.limit);
  const hasOneMorePage = !!(props.total % props.limit);

  if (hasOneMorePage) {
    _pageCount++;
  }

  return _pageCount;
});

const emits = defineEmits<{
  (event: "update:currentPage", value: number): void;
}>();

const prevPage = () => {
  if (props.currentPage - 1 >= 1) {
    if (props.currentPage - 1 <= currentPageList.value) {
      currentPageList.value -= multiplicity;
    }
    emits("update:currentPage", props.currentPage - 1);
  }
};
const nextPage = () => {
  if (currentPageList.value + multiplicity < pageCount.value) {
    if (props.currentPage + 1 > currentPageList.value + multiplicity) {
      currentPageList.value += multiplicity;
    }
  }
  if (props.currentPage < pageCount.value) {
    emits("update:currentPage", props.currentPage + 1);
  }
};

const setPage = (page: number) => {
  currentPageList.value = Math.round(page / multiplicity) * multiplicity;
  emits("update:currentPage", page || 1);
};

watch(
  pageCount,
  () => {
    if (props.currentPage > pageCount.value) {
      emits("update:currentPage", pageCount.value);
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.pages {
  color: rgb(var(--color-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 12px;
  font-weight: 600;

  &__num {
    background: rgb(var(--color-white));
    border-radius: 0.33rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    padding: 0.25rem;
    min-width: 2rem;
    height: 2rem;

    &:hover {
      background-color: rgb(var(--color-grey-light));
    }

    &.active {
      background-color: rgb(var(--color-blue-light));
      color: rgb(var(--color-white));
    }

    &:first-child {
      color: #8c98b5;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    &:last-child {
      color: #007bfb;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
}
</style>
