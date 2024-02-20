<!-- Не использовать, старый код -->
<template>
    <div
        @click="setIsShow && setIsShow(false)"
        class="modal__wrapper"
        :class="{ active: isShow }"
    >
        <slot />
    </div>
</template>
<script lang="ts" setup>

interface Props {
    isShow?: boolean
    setIsShow?: (isShow: boolean) => void
}

const props = defineProps<Props>()

watch(() => props.isShow, () => {
    if (props.isShow) {
        document.body.style.overflow = "hidden"
    }
    else {
        document.body.style.overflow = "auto"
    }
})

</script>
