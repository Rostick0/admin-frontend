<template>
  <NuxtLink
    class="chat"
    :class="{ active: chat?.id == route.query?.id }"
    :to="`/admin/chats?id=${chat?.id}`"
  >
    <div class="chat__left">
      <UserAvatar :user="chat?.chat_interlocutor?.user" />
    </div>
    <div class="chat__right">
      <div class="chat__right_top">
        <div
          class="chat__user_name"
          :to="`/vendors/${chat?.chat_interlocutor?.user?.name?.toLowerCase()}`"
        >
          {{ chat?.chat_interlocutor?.user?.name }}
        </div>
        <time
          class="chat__message_time"
          :datetime="chat?.message_last?.created_at ?? chat?.created_at"
        >
          {{
            dateTimeUsabilityFormat(
              chat?.message_last?.created_at ?? chat?.created_at
            )
          }}
        </time>
      </div>
      <div class="chat__message">
        <template v-if="chat?.message_last">
          <strong v-if="user?.id == chat?.message_last?.user_id"
            >Вы:&nbsp;</strong
          >{{
            truncate(chat?.message_last?.content, {
              lenght: 50,
            })
          }}
        </template>
        <span class="chat__message_empty" v-else>Пустой чат</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import truncate from "lodash/truncate";

const props = defineProps({
  chat: Object,
});

const route = useRoute();

const user = useState("user");
</script>

<style lang="scss" scoped>
.chat {
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  column-gap: 10px;
  padding: 16px;
  transition-property: background-color;
  transition-duration: 0.3s;
  height: fit-content;
  max-width: 320px;

  &:hover {
    background: rgb(var(--color-pre-white));
  }

  &.active {
    background: rgb(var(--color-blue-light), 0.1);
  }

  &__right {
    flex-grow: 1;

    &_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }
  }

  &__user {
    &_name {
      font-weight: 700;
    }
  }

  &__message {
    font-size: 14px;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 238px;

    &_empty {
      opacity: 0.5;
    }

    &_time {
      opacity: 0.75;
      font-size: 12px;
    }
  }
}
</style>
