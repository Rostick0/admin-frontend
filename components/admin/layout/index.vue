<template>
    <div class="admin">
        <Aside />
        <div class="admin__content">
            <Header />
            <main class="admin__main"><slot></slot></main>
        </div>
    </div>
</template>

<script setup>
import Aside from "../components/Aside.vue";
import Header from "./Header.vue";

onMounted(() => {
    document.body.style.overflow = 'hidden';
})
</script>

<style lang="scss" scoped>
.admin {
    display: flex;
    min-height: 100vh;

    &__content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
        max-height: 100vh;
    }

    &__main {
        background-color: rgb(var(--color-grey-light));
        flex-grow: 1;
        padding: 1.25rem;
        overflow: auto;
    }
}
</style>
