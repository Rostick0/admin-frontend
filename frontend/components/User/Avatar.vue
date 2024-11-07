<template>
  <div class="user-avatar">
    <img
      class="user-avatar__img"
      v-if="isShowImage"
      :src="imagePath ?? user?.image?.image?.path"
      :alt="user?.name"
      v-lazy-load
      decoding="async"
      loading="lazy"
      @error="error"
      width="40"
      height="40"
    />
    <div class="user-avatar__letter" v-else>
      {{ user?.name?.[0] }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
  imagePath: String,
});

// console.log(''?.charCodeAt(0) - 97)
const isShowImage = ref(props.imagePath ?? props.user?.image?.image?.path);

const error = () => (isShowImage.value = false);
</script>

<style lang="scss" scoped>
.user-avatar {
  background-color: rgb(var(--color-blue-light), 0.9);
  color: rgb(var(--color-white));
  // border-radius: 50%;
  border-radius: 4px;
  position: relative;
  width: 40px;
  min-width: 40px;
  height: 40px;
  overflow: hidden;

  &__img {
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
  }
}
</style>
