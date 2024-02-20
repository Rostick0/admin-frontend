<template>
    <div
        class="row"
        :class="[`gap-y-${gapY}`, `gap-${gap}`, `row-align-items-center`]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    gap?: '0' | '1' | '2' | '3' | '4'
    alignItems?: "center" | "flex-end"
    gapY?: '0' | '1' | '2' | '3' | '4'
}>(), {
    gap: '0',
    alignItems: 'center',
    gapY: '0'
})
</script>