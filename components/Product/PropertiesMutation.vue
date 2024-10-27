<template>
  <UiStack
    class="properties"
    v-if="propertyValues?.length"
    flex-direction="column"
    gap="2"
  >
    <h3 class="h3">Дополнительные характеристики</h3>
    <div class="properties-grid">
      <VFormComponent
        v-for="property in propertyValues"
        :key="property?.name"
        :field="property"
      />
    </div>
  </UiStack>
</template>

<script setup>
const props = defineProps({
  propertyValues: Array,
});
</script>

<style lang="scss" scoped>
.properties {
  &-grid {
    display: grid;
    align-items: flex-end;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
  }
}
</style>
