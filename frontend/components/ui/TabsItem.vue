<template>
    <li
        class="tabs__item"
        :class="{ active }"
        @click="$emit('click')"
    >
        <slot />
    </li>
</template>
<script setup lang="ts">

defineEmits(["click"])

interface Props {
    active?: boolean
}

defineProps<Props>()

</script>

