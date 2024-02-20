<template>
    <FormComponent v-model="model" v-bind="$attrs" :name="name" :errorMessage="errorMessage" />
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
    name: String,
    rules: String,
    veeConvertTo: Function,
    modelValue: String
})

const emits = defineEmits(["update:modelValue"])

const model = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    }
})

const { errorMessage, value } = useField(props.name,
    props.rules,
    {
        initialValue: props.veeConvertTo?.(props.modelValue) ?? props.modelValue
    }
);

watch(model, () => {
    value.value = props.veeConvertTo?.(model.value) ?? model.value;
}, {
    deep: true
});

</script>