<template>
    <UiControl :label="label" :invalid="!!errorMessage" :message="errorMessage || message" :rightIcon="rightIcon">
        <div @focusout="onFocusout" ref="wrapper" tabindex="-1" class="control__select">
            <div class="control__field" :class="{ select__active: isOpened }" @click="toggle">
                <template v-if="isSearchable">
                    <div v-if="!isOpened" class="select__value">
                        {{ selectedItemsText || "Не выбрано" }}
                        <!-- {{ "Выбрано " + modelValue?.length || "Не выбрано" }} -->
                    </div>
                    <input ref="inputRef" @input="$emit('update:searchString', $event.target.value)" :value="searchString"
                        v-if="isOpened" type="text">
                </template>
                <template v-else>
                    <div class="select__value">
                        {{ selectedItemsText || "Не выбрано" }}
                        <!-- {{ "Выбрано " + modelValue?.length || "Не выбрано" }} -->
                    </div>
                </template>
            </div>
            <div v-if="isOpened" @scroll="handleScroll" class="select__options" @mousedown.prevent>
                <div class="options__item" v-for="option in sortedOptions" :key="option.id"
                    @mousedown="handleSelect(option)"
                    :class="{ selected: modelValue?.find((i) => (option?.id == i?.id || option?.id == i)) }">
                    {{ option.value }}
                </div>
            </div>
        </div>
    </UiControl>
</template>

<script setup>
const emits = defineEmits([
    "update:modelValue",
    "update:searchString",
    "scrolledBottom"
])

const props = defineProps({
    rightIcon: String,
    errorMessage: String,
    message: String,
    label: String,
    searchString: String,
    isSearchable: Boolean,
    modelValueIsNumber: {
        default: false,
        type: Boolean
    },
    modelValue: {
        type: Array,
        default: []
    },
    options: Array
})


const isOpened = ref(false)

const inputRef = ref()

const toggle = () => {
    isOpened.value = !isOpened.value
    nextTick(() => {
        inputRef.value?.focus()
    })
}

const wrapper = ref()

const onFocusout = (e) => {
    if (!wrapper.value.contains(e.relatedTarget))
        isOpened.value = false;
};

const handleSelect = (option) => {
    if (!props.modelValueIsNumber) {
        if (props.modelValue?.find((i) => option.id == i.id)) {
            emits('update:modelValue', props.modelValue?.filter((i) => i.id !== option.id))

        } else {
            emits('update:modelValue', [...props.modelValue, option])
        }
    } else {
        if (props.modelValue?.find((i) => option.id == i)) {
            emits('update:modelValue', props.modelValue?.filter((i) => i !== option.id))

        } else {
            emits('update:modelValue', [...props.modelValue, option.id])
        }
    }

}

const sortedOptions = computed(() => {

    if (!props.modelValueIsNumber) {

        const options = [...(props?.options || [])]
        const modelValue = props.modelValue

        options.sort((a, b) => {

            const firstVal = modelValue?.find?.((item) => item.id == a.id) ? 1 : 0
            const secondVal = modelValue?.find?.((item) => item.id == b.id) ? 1 : 0


            return secondVal - firstVal
        })

        return options
    }
    else {
        const options = [...(props?.options || [])]
        const modelValue = props.modelValue

        options.sort((a, b) => {

            const firstVal = modelValue?.find?.((item) => item == a.id) ? 1 : 0
            const secondVal = modelValue?.find?.((item) => item == b.id) ? 1 : 0


            return secondVal - firstVal
        })

        return options
    }
})

const selectedItemsText = computed(() => {

    return props.options.filter(i => props.modelValue.includes(i.id))?.map?.((item) => item.title || item.name || item.value || item.slug).join(", ")
})

const handleScroll = (event) => {

    const div = event.target

    const scrollFromBottom = div.scrollHeight - (div.scrollTop + div.clientHeight)

    if (scrollFromBottom < 400) {
        emits("scrolledBottom")
    }
}

</script>

<style lang="scss"></style>
