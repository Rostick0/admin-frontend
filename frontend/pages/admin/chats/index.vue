<template>
  <Layout>
    <div class="chat">
      <div class="container">
        <div class="chat-container box-shadow-default">
          <div class="chat-container__left">
            <div class="chat-container__left_search">
              <VFormComponent :field="name" />
            </div>

            <ChatList
              v-if="chats?.length"
              :chats="chats"
              :scrollAddChats="scrollAddChats"
              :isTotalChatsPages="isTotalChatsPages"
            />
            <div class="chat-container__none" v-else>Чаты отсутсвтвуют</div>
          </div>
          <div class="chat-container__right">
            <ChatContent v-if="chat" :chat="chat" :messages="chat?.messages" />
            <div class="chat-container__none _center" v-else>Выберите чат</div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import last from "lodash/last";
import api from "~/api";

const route = useRoute();
const id = computed(() => route.query.id);

const { filters } = useFilters();

const name = ref({
  type: "text",
  name: "filterLIKE[chat_interlocutor.user.name]",
  rules: "max:255",
  modelValue: "",

  bind: {
    placeholder: "Поиск",
  },
});

watch(
  () => name.value.modelValue,
  (cur) => {
    filters.value[name.value.name] = cur?.trim?.();
  }
);

const { data: chat, get: chatGet } = await useApi({
  name: "chats.get",
  params: {
    extends: "chat_interlocutor.user.image.image,messages.images.image",
  },
  // requestParams: {
  //   id,
  // },
  // filters,
});
if (id.value) {
  await chatGet({ id: id.value });
}

watch(
  () => id.value,
  async () => {
    if (id.value) {
      await chatGet({ id: id.value });
    }
  }
);

const chatsParams = {
  extends: "chat_interlocutor.user.image.image,message_last",
  sort: "message_last.id,id",
  limit: 10,
};

const { data: chats, get: chatsGet } = await useApi({
  name: "chats.getAll",
  params: chatsParams,
  filters,
});
await chatsGet();

const chatsPage = ref(1);
const isTotalChatsPages = ref(false);
const scrollAddChats = async () => {
  chatsPage.value += 1;

  const oldChats = await api.chats.getAll({
    params: {
      ...chatsParams,
      page: chatsPage.value,
    },
  });

  if (oldChats.last_page <= chatsPage.value) isTotalChatsPages.value = true;

  chats.value = [...chats.value, ...oldChats.data];
};

const tempMessages = useState("tempMessages");
watch(
  () => tempMessages.value?.length,
  (cur, prev) => {
    if (!prev || cur > prev) {
      const { chat: chatMessage, ...lastMessage } = last(tempMessages.value);

      const findedChatIndex = chats.value.findIndex(
        (item) => item?.id === chatMessage?.id
      );

      if (findedChatIndex !== -1) {
        chats.value.splice(findedChatIndex, 1);
      }

      chats.value = [
        ...chats.value,
        { ...chatMessage, message_last: lastMessage },
      ];
    }
  }
);
</script>

<style lang="scss" scoped>
.chat {
  display: grid;
  flex-grow: 1;
  height: 100%;

  &-container {
    background-color: rgb(var(--color-white));
    border-radius: 8px;
    display: flex;
    column-gap: 20px;
    padding: 20px;
    height: 100%;
    max-height: calc(100vh - 56px - 40px);
    // max-height: calc(100dvh - 282px);

    &__left {
      min-width: 320px;

      &_search {
        margin-bottom: 16px;
      }
    }

    &__right {
      flex-grow: 1;
    }

    &__none {
      display: flex;
      justify-content: center;
      font-weight: 700;
      height: 100%;

      &._center {
        align-items: center;
      }
    }
  }
}
</style>
