<template>
  <div class="chat-content">
    <div class="chat-content__top">
      <NuxtLink
        class="chat-content__interlocutor"
        :to="`/users/${convertNameToUrl(chat?.chat_interlocutor?.user?.name)}`"
      >
        <UserAvatar :user="chat?.chat_interlocutor?.user" />
        <strong>
          {{ chat?.chat_interlocutor?.user?.name }}
        </strong>
      </NuxtLink>
    </div>
    <MessageList
      :messages="messages"
      :scrollAddMessages="scrollAddMessages"
      :isTotalMessagesPages="isTotalMessagesPages"
    />
    <div class="chat-content__bottom">
      <ChatForm @messageAdd="messageAdd" />
    </div>
  </div>
</template>

<script setup>
import last from "lodash/last";
import api from "~/api";

const props = defineProps({
  // interlocutor: Object,
  chat: Object,
  messages: Array,
});

const messages = ref(props.messages);

const scrollToBottom = () =>
  nextTick(() => {
    const messageArea = document.querySelector(
      "#messageArea-" + messages.value[0]?.id
    );

    messageArea.scrollIntoView?.();
  });
onMounted(() => {
  scrollToBottom();
});

const messagesParams = {
  extends: "images.image",
  "filterEQ[chat_id]": props.chat?.id,
  sort: "id",
  limit: 20,
};
const isTotalMessagesPages = ref(false);
const messagesPage = ref(1);
const scrollAddMessages = async () => {
  messagesPage.value += 1;

  const oldMessages = await api.messages.getAll({
    params: {
      ...messagesParams,
      page: messagesPage.value,
    },
  });

  if (oldMessages.last_page <= messagesPage.value)
    isTotalMessagesPages.value = true;

  messages.value = [...messages.value, ...oldMessages.data];
};

const messageAdd = (message) => (messages.value = [message, ...messages.value]);
const tempMessages = useState("tempMessages");

watch(
  () => tempMessages.value?.length,
  (cur, prev) => {
    if (prev < 1 || cur > prev) {
      messageAdd(last(tempMessages.value));
    }
  }
);
</script>

<style lang="scss" scoped>
.chat-content {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 100%;

  &__interlocutor {
    display: inline-flex;
    column-gap: 10px;
  }

  &__center {
    // flex-grow: 1;
    // overflow-y: auto;
    // overflow-x: hidden;
    // height: 100%;
  }
}
</style>
