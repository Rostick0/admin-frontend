/*
  Плагин toast
  Пример использования: const { $toast } = useNuxtApp();
*/

import Toast, { useToast } from "vue-toastification";
// import "viewerjs/dist/viewer.css";
// import VueViewer from "v-viewer";
import "vue-toastification/dist/index.css";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast);
  // nuxtApp.vueApp.use(VueViewer);

  return {
    provide: {
      toast: useToast(),
    },
  };
});
