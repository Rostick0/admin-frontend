<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <UiStack flex="same-all" gap="2" flexDirection="column">
      <label
        class="control__photoloader photoloader__block"
        :class="{ error: errorMessage }"
      >
        <input
          @change="handleOnFileChange"
          @click="$event.target.value = null"
          v-bind="$attrs"
          class="photoloader__input"
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif"
        />
        <!-- <img class='photoloader__image' src="/img/icons/upload.svg" alt="" /> -->
        <div class="photoloader__title">Нажмите для загрузки фото</div>
        <div class="photoloader__subtitle">PNG, JPG, GIF максимум 3MB</div>
      </label>
      <div class="photoloader__images">
        <div class="photoloader__image" v-for="item in files" :key="item.id">
          <div class="photoloader__image_delete" @click="handleRemove(item)">
            ✖
          </div>
          <img
            class="photoloader__img"
            :src="item?.path"
            alt="Ошибка загрузки"
          />
        </div>
      </div>
    </UiStack>
  </UiControl>
</template>
<script setup>
import { v4 } from "uuid";

defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue", "remove"]);

const props = defineProps({
  modelValue: [String, Object, Array],
  invalid: Boolean,
  rightIcon: String,
  message: String,
  label: String,
  placeholder: String,
  maska: String,
  dataMaskaReversed: Boolean,
  maskaTokens: String,
  errorMessage: String,
  onChange: Function,
  deps: [Array, Object, String, Number],
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
});

const files = ref(props.modelValue);

onMounted(async () => {
  files.value = props?.modelValue || [];
});

const handleOnFileChange = (e) => {
  const _files = e.target.files;

  if (!_files?.length) {
    _files.value = [];
    return emits("update:modelValue", []);
  }

  const file = {
    id: v4(),
    path: URL.createObjectURL(_files[0]),
    file: _files[0]
  };

  emits("update:modelValue", [...(props?.modelValue || []), file]);
};

watch(
  () => props.modelValue,
  () => {
    console.log(props.modelValue);
    files.value = props.modelValue;
  }
);

const handleRemove = (item) => {
  console.log(props.modelValue.filter((i) => i.id !== item.id));
  emits(
    "update:modelValue",
    props.modelValue.filter((i) => i.id !== item.id)
  );
};
</script>

<style lang="scss" scoped>
.photoloader {
  &__block {
    background-color: rgb(var(--color-white));
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.5rem;
    position: relative;
    text-align: center;
    transition: 0.3s;
    width: 100%;
    height: 250px;
  }

  &__block.error {
    transition: 0.3s;
  }

  &__label {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &__input {
    display: none;
  }

  &__title {
    color: rgb(var(--color-dark));
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.75rem;
    z-index: 2;
  }

  &__subtitle {
    color: rgb(var(--color-dark));
    font-size: 0.75rem;
    z-index: 2;
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    width: 100%;
  }

  &__image {
    padding-top: 100%;
    position: relative;

    &_delete {
      background-color: rgb(var(--color-white));
      color: rgb(var(--color-red));
      border-radius: 0.33rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      transition: 0.3s;
      width: 1.25rem;
      height: 1.25rem;
      z-index: 1;

      &:hover {
        background-color: rgb(var(--color-pre-white));
      }
    }
  }

  &__img {
    border-radius: 0.33rem;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
