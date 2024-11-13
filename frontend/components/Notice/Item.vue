<template>
  <div class="notice-item" :class="[notice?.type]">
    <div class="notice-item__top">
      <div class="">Уводемление #{{ notice?.id }}</div>
      <div class="notice-item__date">
        {{
          dateTimeUsabilityFormat(
            notice?.date_publication ?? notice?.created_at
          )
        }}
      </div>
    </div>

    <div class="" v-html="setLinkInText(notice?.text)"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  notice: Object,
});

const regex = /(https?:\/\/[^\s]+)/g;
</script>

<style lang="scss" scoped>
.notice-item {
  overflow-wrap: break-word;
  overflow-wrap: anywhere;
  padding: 10px;

  &.success {
    background-color: rgb(var(--color-green), 0.2);
  }

  &.error {
    background-color: rgb(var(--color-red), 0.2);
  }

  &__top {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__date {
    font-size: 14px;
    opacity: 0.75;
  }
}
</style>

<style lang="scss">
.notice-item {
  a {
    text-decoration: underline;
  }
}
</style>
