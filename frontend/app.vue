<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
await import("moment/dist/locale/ru");

await import("font-awesome/scss/font-awesome.scss");
// await import("font-awesome/fonts/");
// await import("font-awesome/css/font-awesome.min.css");
// await import("font-awesome/package.json");

const { configure, defineRule } = await import("vee-validate");
const { email, min, max, required, size, image, min_value, max_value } =
  await import("@vee-validate/rules");
const { localize } = await import("@vee-validate/i18n");
await import("vue-toastification/dist/index.css");

const { accessToken, user, getUser } = await useAuth();
if (true || (accessToken.value && !user.value)) {
  await getUser();
}

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

configure({
  // create and set a localization handler
  generateMessage: localize("ru", {
    messages: {
      // interpolates the field name
      required: "Поле обязательное к заполнению",
      email: "Введён некорректный email",
      // interpolates the min, max params
      between: "The {field} value must be between 0:{min}, 1:{max}",
      // interpolates the min, max params
      min: "Поле должно содержать минимум 0:{min} символов",
      max: "Поле должно содержать максимум 0:{max} символов",
      // Interpolates another field value in the form
      confirmed: "The {field} value must match {age}",
    },
  }),
});

const { tempDataAdd: addMessage } = useTemp({
  name: "tempMessages",
});
const { tempDataAdd: addNotice } = useTemp({
  name: "tempNotices",
});

onMounted(() => {
  initSocket(window, accessToken.value);
  socketListenAll(window, user.value, { addMessage, addNotice });
});
</script>

<style lang="scss">
// .fa {
//   display: inline-block;
//   font: normal normal normal 14px/1 FontAwesome;
//   font-size: inherit;
//   text-rendering: auto;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }
// importing core styling file
// @import "font-awesome/scss/font-awesome.scss";

// // our project needs Classic Solid, Brands, and Sharp Solid
// @import './fontawesome/scss/solid.scss';
// @import './fontawesome/scss/brands.scss';
// @import './fontawesome/scss/sharp-solid.scss';
</style>
