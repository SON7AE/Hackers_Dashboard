<template>
    <div class="basic-layout">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.basic-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 16px;

    border-radius: 16px;
    border: 1px solid $color-gray-200;
    background-color: $color-white-000;
}
</style>
