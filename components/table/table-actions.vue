<template>
    <UiDropdownMenu>
        <template #body>
            <div style="cursor: pointer; width: 4px; height: 25px">
                <UiTableMenuIcon />
            </div>
        </template>
        <template #drop>
            <div>
                <div @click="$emit('update', id)">Редактировать</div>
            </div>
            <div v-if="!hideDelete" >
                <div @click="$emit('delete', id)">Удалить</div>
            </div>
        </template>
    </UiDropdownMenu>
</template>

<script  setup>

const emits = defineEmits(['update', 'delete'])
const props = defineProps({
    id: Number,
    hideDelete: {
        type: Boolean,
        initialValue: false
    }
})

</script>
