<template>
  <div class="notice-item" :class="[notice?.type]" ref="noticeItem">
    <div class="notice-item__top">
      <div class="notice-item__title" :class="{ is_not_read: !isRead }">
        Уведомление #{{ notice?.id }}
      </div>
      <div class="notice-item__date">
        {{
          dateTimeUsabilityFormat(
            notice?.date_publication ?? notice?.created_at
          )
        }}
      </div>
    </div>

    <div class="notice-item__text" v-html="setLinkInText(notice?.text)"></div>
  </div>
</template>

<script setup>
import api from "~/api";

const props = defineProps({
  notice: Object,
});

const isRead = ref(props.notice?.is_read);

const noticeItem = ref();
const read = async () => {
  noticeItem.value?.removeEventListener?.("mouseenter", read);

  await api.notices.read({ id: props.notice?.id });
  isRead.value = true;
};

if (!isRead.value) {
  onMounted(() => {
    noticeItem.value.addEventListener("mouseenter", read);
  });

  onBeforeUnmount(() => {
    noticeItem.value.removeEventListener("mouseenter", read);
  });
}

const stopWatchRead = watch(
  () => props.notice?.is_read,
  (cur) => {
    isRead.value = cur;
    if (cur) {
      stopWatchRead();
    }
  }
);
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
    // font-weight: 600;
    margin-bottom: 4px;
  }

  &__title {
    display: inline-flex;
    align-items: center;
    column-gap: 6px;
    font-size: 18px;

    &.is_not_read {
      font-weight: 700;

      &::after {
        background-color: rgb(var(--color-dark));
        border-radius: 50%;
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
      }
    }
  }

  &__date {
    font-size: 14px;
    opacity: 0.75;
  }

  &__text {
    // font-weight: 700;
    // font-weight: 600;
    // font-size: 14px;
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
