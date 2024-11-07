<template>
  <ckedit
    :editor="ClassicEditor"
    :config="editorConfig"
    v-model="value"
    @ready="onInit"
  />
</template>

<script lang="ts" setup>
const ckedit = await import("@ckeditor/ckeditor5-vue").then(
  (res) => res.Ckeditor
);
const ClassicEditor = await import("@ckeditor/ckeditor5-build-classic").then(
  (res) => res.default
);
import api from "~/api";

const props = defineProps<{
  modelValue?: any;
}>();
const emit = defineEmits(["update:modelValue"]);

class UploadAdapter {
  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    return this.loader.file.then((file: any) => {
      const data = new FormData();
      data.append("image", file);
      const genericError = `Couldn't upload file: ${file.name}.`;

      return api.image
        .create({
          data,
        })
        .then((res) => {
          return { default: res?.data.path_webp };
        })
        .catch(({ error }) => Promise.reject(error?.message ?? genericError));
    });
  }

  abort() {
    return Promise.reject();
  }
}

const onInit = (editor: any) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) =>
    new UploadAdapter(loader);
};

const editorConfig = {};

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
