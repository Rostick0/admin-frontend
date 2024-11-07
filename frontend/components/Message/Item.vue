<template>
  <div
    class="message"
    :class="{
      is_my: user?.id == message?.user_id,
    }"
    :id="`messageArea-${message?.id}`"
  >
    <div class="message__content">{{ message?.content }}</div>
    <div class="message__images" v-if="message?.images?.length">
      <img
        class="message__img"
        v-for="image in message?.images"
        :src="image?.image?.path_webp"
        alt=""
        decoding="async"
        loading="lazy"
        width="144"
        height="96"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: Object,
});

const user = useState("user");
</script>

<style lang="scss" scoped>
.message {
  background-color: rgb(var(--color-dark), 0.5);
  color: rgb(var(--color-white));
  border-radius: 5px;
  border-top-left-radius: 0;
  padding: 8px;
  width: fit-content;

  &.is_my {
    background-color: rgb(var(--color-blue-light), 0.5);
    border-top-left-radius: 5px;
    border-top-right-radius: 0;
    margin-left: auto;
  }

  &__img {
    object-fit: cover;
  }

  &__images {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 4px;
    margin-top: 6px;
  }
}
</style>
