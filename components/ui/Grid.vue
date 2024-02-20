<template>
    <div
        class="grid"
        :class="[
            `grid-gap-${gap}`,
            `grid-marginX-${marginX}`,
            `grid-marginY-${marginY}`,
            `grid-marginTop-${marginTop}`,
            `grid-marginBottom-${marginBottom}`,
            `grid-padding-${padding}`,
            `grid-paddingY-${paddingY}`,
            `grid-paddingX-${paddingX}`,
            `grid-bg-${backgroundColor}`,
            `grid-columns-${columns}`
        ]"
    >
        <slot />
    </div>
</template>
<script setup lang="ts">

interface Props {
    gap?: "1" | "2" | "3" | "4" | "5"
    marginY?: "1" | "2" | "3" | "4" | "5"
    marginX?: "1" | "2" | "3" | "4" | "5"
    marginTop?: "1" | "2" | "3" | "4" | "5"
    marginBottom?: "1" | "2" | "3" | "4" | "5"
    padding?: "1" | "2" | "3" | "4" | "5"
    paddingY?: "1" | "2" | "3" | "4" | "5"
    paddingX?: "1" | "2" | "3" | "4" | "5"
    backgroundColor?: "standard" | "danger" | "green" | "primary"
    columns?: "1-1" | "1-3" | "2-3" | "1-4" | "3-4" | "1-5" | "2-5" |
    "3-5" | "4-5" | "1-6" | "1-7" | "2-7" | "3-7" | "4-7" | "5-7" |
    "2-9" | "3" | "4"
}

defineProps<Props>()

</script>

<style lang="scss">

</style>