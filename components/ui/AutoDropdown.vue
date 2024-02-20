<template>
    <div
        class="dropdown"
        tabindex="-1"
        @focusout="isShow = false"
    >
        <div class='dropdown-menu-button' @click="isShow = !isShow">
            <slot name="body" />
        </div>
        <div
            class='dropdown-menu'
            v-if="isShow"
        >
            <slot name="drop"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">

const isShow = ref(false)

</script>

<style>

</style>