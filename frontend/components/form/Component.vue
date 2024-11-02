<template>
    <component :is="getComponent(type)" v-bind="$attrs" v-model="model" />
</template>

<script setup>

defineComponent({
    inheritAttrs: false
})

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
    type: String,
    modelValue: [String, Array, Object, Number, Boolean],
    convertTo: Function
})

const model = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    }
})

function getComponent(type) {

    const components = {
        text: () => resolveComponent("UiField"),
        select: () => resolveComponent("UiMultiSelect"),
        selectMultiple: () => resolveComponent("UiMultiMSelect"),
        textarea: () => resolveComponent("UiTextarea"),
        checkbox: () => resolveComponent("UiCheckbox"),
        date: () => resolveComponent("UiDatePicker"),
        fileLoader: () => resolveComponent("UiFileLoader"),
        photoLoader: () => resolveComponent("UiPhotoLoader"),
        photoLoaderMultiple: () => resolveComponent("UiMPhotoLoader"),
    }
    
    const returnComponent = components[type]

    return returnComponent()
}

</script>