<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { configure, defineRule } = await import("vee-validate");
const { email, min, max, required, size, image, min_value, max_value } =
  await import("@vee-validate/rules");
const { localize } = await import("@vee-validate/i18n");
await import("vue-toastification/dist/index.css");

const { accessToken, user, getUser } = await useAuth();
if (true || (accessToken.value && !user.value)) {
  await getUser();
}
const config = useRuntimeConfig();

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

const { addMessage } = useTempMessage();

onMounted(() => {
  initSocket(window, accessToken.value);
  socketListenAll(window, user.value, addMessage);
});
</script>
