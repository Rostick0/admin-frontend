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
      <div class="photoloader__images" @mouseup="dragElem = null">
        <template v-for="item in modelValue" :key="item.id">
          <div @mousedown="dragElem = item">
            <UiDraggable>
              <template #willselect>
                <div
                  class="photoloader__image"
                  @mouseup="
                    dragElem &&
                      item.id != dragElem.id &&
                      changeOrder(dragElem, item)
                  "
                >
                  <div
                    class="photoloader__image_delete"
                    @click="handleRemove(item)"
                  >
                    ✖
                  </div>
                  <img
                    class="photoloader__img"
                    :src="item?.path"
                    alt="Ошибка загрузки"
                  />
                </div>
              </template>
              <template #selected>
                <img :src="item?.path" alt="Ошибка загрузки" />
              </template>
            </UiDraggable>
          </div>
        </template>
      </div>
    </UiStack>
  </UiControl>
</template>

<script setup>
import debounce from "lodash/debounce";
import { size } from "@vee-validate/rules";
import { v4 } from "uuid";

defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue", "remove", "setError"]);

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

const dragElem = ref();

const changeOrder = debounce((dragElemArg, el) => {
  const files = [...props.modelValue];

  const first = files.findIndex((i) => i.id == dragElemArg.id);
  const second = files.findIndex((i) => i.id == el.id);

  [files[first], files[second]] = [files[second], files[first]];

  emits("update:modelValue", files);
  dragElem.value = null;
});

const handleOnFileChange = (e) => {
  const _files = e.target.files;

  if (!_files?.length) {
    // _files.value = [];
    return emits("update:modelValue", []);
  }

  const sizeFile = 16384;

  if (
    !size(_files[0], {
      size: sizeFile,
    })
  )
    return emits("setError", `The image size must be less than ${sizeFile} KB`);

  if (!["image/png", "image/jpeg", "image/jpg"].includes(_files[0].type))
    return emits("setError", "The file must be an image");

  const file = {
    id: v4(),
    path: URL.createObjectURL(_files[0]),
    file: _files[0],
  };

  emits("update:modelValue", [...(props?.modelValue || []), file]);
};

const handleRemove = (item) => {
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
    grid-template-columns: repeat(auto-fill, 200px);
    grid-gap: 1rem;
    width: 100%;
  }

  &__image {
    border-radius: 12px;
    padding-top: 66%;
    position: relative;

    &_delete {
      background-color: rgb(var(--color-white));
      color: rgb(var(--color-red));
      border-radius: 4px;
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
    user-select: none;
    pointer-events: none;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
