<template>
  <div class="messages" ref="messagesTag">
    <div class="messages__inner">
      <template v-for="(message, index) in messages">
        <MessageItem :message="message" />
        <time
          class="messages__time"
          :datetime="moment(message?.created_at).format('YYYY-MM-DD')"
          v-if="
            moment(message?.created_at).format('YYYY-MM-DD') !==
            moment(messages?.[index + 1]?.created_at).format('YYYY-MM-DD')
          "
          >{{ dateTimeUsabilityFormat(message?.created_at) }}</time
        >
      </template>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import throttle from "lodash/throttle";

const props = defineProps({
  messages: Array,
  scrollAddMessages: Function,
  isTotalMessagesPages: Boolean,
});

const messagesTag = ref();
const scrollChange = throttle(() => {
  if (messagesTag.value.scrollTop < 50) {
    props?.scrollAddMessages?.();
  }
}, 400);

onMounted(() => {
  messagesTag.value?.addEventListener("scroll", scrollChange);
});

onUnmounted(() => {
  messagesTag.value?.removeEventListener("scroll", scrollChange);
});

const totalPageStopWatch = watch(
  () => props.isTotalMessagesPages,
  () => {
    messagesTag.value?.removeEventListener("scroll", scrollChange);
    totalPageStopWatch();
  }
);
</script>

<style lang="scss" scoped>
.messages {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  // height: 100%;

  &__inner {
    display: flex;
    flex-direction: column-reverse;
    row-gap: 10px;
  }

  &__time {
    background-color: rgb(var(--color-pre-white));
    border-radius: 4px;
    font-size: 13px;
    padding: 4px 8px;
    line-height: 1;
    position: sticky;
    top: 0;
    margin: 0 auto;
    width: fit-content;
  }
}
</style>
