<template>
    <UiControl :label="label" :invalid="!!errorMessage || invalid" :message="errorMessage || message"
        :rightIcon="rightIcon">
        <UiStack flex="same-all" gap="3">
            <label class="control__photoloader photoloader__block" :class="{ error: errorMessage }">
                <input @change="handleOnFileChange" v-bind="$attrs" class='photoloader__input' type="file" />
                <!-- <img class='photoloader__image' src="/img/icons/upload.svg" alt="" /> -->
                <div class='photoloader__title'>Upload a file or drag and drop</div>
                <div class='photoloader__subtitle'>PNG, JPG, GIF up to 3MB</div>
            </label>
            <img class="photoloader__preview" :src="url" alt="">
        </UiStack>
    </UiControl>
</template>
<script setup >
defineComponent({
    inheritAttrs: false
})


const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: String,
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
        type: Function
    },
    forceDeps: Boolean
});

const url = ref(props.modelValue)

watch(() => props.modelValue, () => {
    if (typeof props.modelValue == 'string') {
        url.value = props.modelValue
    }
})

const handleOnFileChange = (e) => {
    const files = e.target.files
    if (!files?.length) {
        url.value = null;
        return emits('update:modelValue', null)
    }
    const file = files[0]
    url.value = URL.createObjectURL(file)
    emits('update:modelValue', file)

}

</script>

<style lang="scss"></style>