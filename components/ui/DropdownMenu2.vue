<template>
    <div class="dropdown" @click="$emit('click')">
        <div class='dropdown-menu-button' @click="isShow = !isShow">
            <slot name="dropdown" />
        </div>
        <div class='dropdown-menu' :style="position ? `${position}:0;` : ''" v-if="isShow">
            <slot name="body" :close="() => isShow = !isShow"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">

const isShow = ref(false)

interface Props {
    isShow?: boolean
    position?: string
}

defineEmits(["click"])
defineProps<Props>()

</script>

<style lang="scss" scoped>
.dropdown {
    position: relative;

    &.active {
        .dropdown-menu {
            display: flex;
        }
    }
}

.dropdown-menu-button {
    position: relative;
    z-index: 3;
    cursor: pointer;
}

.dropdown-menu {
    
    position: absolute;
    top: 150%;
    display: flex;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    flex-direction: column;
    min-width: 0px;
    font-size: 0.875rem;
    //    width: 200px;
    color: rgb(22, 25, 44);
    background-color: white;
    border: 1px solid #f0f2f6;
    border-radius: 0.85rem;
    padding: 17px 15px;
    box-shadow: 0px 16px 16px -1px rgba(10, 22, 70, .1), 0px 0px 1px 0px rgba(10, 22, 70, .06);
    font-weight: 400;

    &>* {
        padding-bottom: 20px;
        transition: color 0.2s linear;
        cursor: pointer;

        &:last-child {
            padding-bottom: 0;
        }

        &:hover {
            color: #4e52d0;
        }
    }

    z-index: 10000;
    left: auto;
    right: auto;
}
</style>