<template>
  <div class="chats" ref="chatsTag">
    <ChatItem v-for="chat in chats" :key="chat?.id" :chat="chat" />
  </div>
</template>

<script setup>
import throttle from "lodash/throttle";

const props = defineProps({
  chats: Array,
  scrollAddChats: Function,
  isTotalChatsPages: Boolean,
});

const chatsTag = ref();
const scrollChange = throttle(() => {
  if (
    chatsTag.value.scrollTop >
    chatsTag.value.scrollHeight -
      chatsTag.value.clientHeight -
      chatsTag.value.lastElementChild.getBoundingClientRect().height * 1
  ) {
    props?.scrollAddChats?.();
  }
}, 400);

onMounted(() => {
  chatsTag.value?.addEventListener("scroll", scrollChange);
});

onUnmounted(() => {
  chatsTag.value?.removeEventListener("scroll", scrollChange);
});

const totalPageStopWatch = watch(
  () => props.isTotalChatsPages,
  () => {
    chatsTag.value?.removeEventListener("scroll", scrollChange);
    totalPageStopWatch();
  }
);
</script>

<style lang="scss" scoped>
.chats {
  display: grid;
  row-gap: 4px;
  // overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100% - 60.4px);
}
</style>
