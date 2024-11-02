<template>
    <div class="row">
        <Draggable class="mb-3" :class="item.col ? `col-${item.col}` : 'col-12'" @click="$emit('update:selected', item)"
            v-for="item in formModel.sort((a, b) => a.order - b.order)" @mousedown="dragElem = item"
            @mouseup="dragElem = null">
            <template #willselect="{ mouseInfo }">
                <div>
                    <div :style="item.id == dragElem?.id ? 'opacity:0.3' : ''" @mousemove="() => {
                        if (dragElem && item.id != dragElem.id) {
                            changeOrder(dragElem, item)
                            
                        }
                    }">
                        <div style="pointer-events: none;">
                            <FormVeeComponent v-bind="item" v-model="formData[item.name]" />
                        </div>
                    </div>
                </div>
            </template>
            <template #selected>
                <div>
                    <FormVeeComponent v-bind="dragElem" />
                </div>
            </template>

        </Draggable>
    </div>
</template>

<script setup>

const emits = defineEmits(['update:formData', 'update:selected'])
const props = defineProps({
    formModel: [Array],
    formData: Object,
    selected: Object,
    changeOrder: Function
})

const dragElem = ref()

</script>