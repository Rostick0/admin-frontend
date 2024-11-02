<template>
    <div
        class="typography"
        :class="[
            `typography-size-${fontSize}`,
            `typography-weight-${fontWeight}`,
            `typography-color-${color}`,
            `typography-text-wrap-${textWrap}`,
            `typography-text-align-${textAlign}`
        ]"
    >
        <slot />
    </div>
</template>
<script setup lang="ts">
interface Props {
    fontSize?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
    fontWeight?: "bold" | "regular" | "light" | "medium"
    color?: "blue" | "black" | "white" | "gray" | "primary"
    textWrap?: "no-wrap"
    textAlign?: "right" | "left"
}
defineProps<Props>()
</script>

<style lang="scss">

</style>