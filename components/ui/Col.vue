<template>
    <div class="col" :class="[`col-${col}`]">
        <slot />
    </div>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    col?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' |
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}>(), {
    col: '12'
})

</script>