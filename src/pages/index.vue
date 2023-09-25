<template>
    <div class="page">
        <Navigation />
        <div class="page__container"></div>
    </div>
</template>

<script setup lang="ts">
import Navigation from "@components/organisms/common/Navigation.vue"
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 1440px;
        height: 100%;

        background-color: $color-gray-100;
    }
}
</style>
