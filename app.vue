<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { configure, defineRule } from "vee-validate";
import { email, min, max, required } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";

const { accessToken, user, getUser } = await useAuth();
if (true || accessToken.value && !user.value) {
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

onMounted(() => {
  initSocket({ window, config, accessToken });
  socketListenAll({ window, user });
});
</script>
