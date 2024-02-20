<template>
    <UiControl :label="label" :invalid="!!errorMessage || invalid" :message="errorMessage || message"
        :rightIcon="rightIcon">
        <UiStack flex="same-all" gap="3">
            <label class="control__photoloader photoloader__block" :class="{ error: errorMessage }">
                <input @change="handleOnFileChange" @click="($event.target).value = null" v-bind="$attrs"
                    class='photoloader__input' type="file" />
                <!-- <img class='photoloader__image' src="/img/icons/upload.svg" alt="" /> -->
                <div class='photoloader__title'>Upload a file or drag and drop</div>
                <div class='photoloader__subtitle'>PNG, JPG, GIF up to 3MB</div>
            </label>
            <div style="display: grid;grid-template-columns: 1fr 1fr 1fr 1fr; gap: 15px;">
                <template v-for="(item) in files" :key="item.id">
                    <img :src="item?.path || item" alt="" @click="handleRemove(item)">
                </template>
            </div>
        </UiStack>
    </UiControl>
</template>
<script setup>
defineComponent({
    inheritAttrs: false
})

const emits = defineEmits(["update:modelValue", "remove"])

const props = defineProps({
    modelValue: [String,Object,Array],
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

const files = ref(props.modelValue)

onMounted(async () => {
    files.value = props?.modelValue || []
})

const handleOnFileChange = (e) => {
    const _files = e.target.files

    if (!_files?.length) {
        _files.value = [];
        return emits('update:modelValue', [])
    }

    const file = _files[0]

    emits('update:modelValue', [...(props?.modelValue || []), file])
}

watch(() => props.modelValue, () => {
    files.value = props.modelValue.map(i => {
        if (typeof i !== 'string') {
            return URL.createObjectURL(i)
        }
        return i
    })

})

const handleRemove = (item) => {
    emits('update:modelValue', props.modelValue.filter(i => i !== item))
}


</script>

<style lang="scss"></style>