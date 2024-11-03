<template>
    <UiRow gap="3">
        <UiCol v-for="item in formModel" class="mb-3" :col="item.col ?? 12">
            <FormVeeComponent v-bind="item" v-model="formData[item.name]" />
        </UiCol>
    </UiRow>
</template>

<script setup>

const emits = defineEmits(['update:formData'])
const props = defineProps({
    formModel: [Array],
    formData: Object
})

</script>