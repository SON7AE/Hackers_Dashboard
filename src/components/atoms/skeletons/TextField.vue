<template>
    <div class="skeleton-textField" :style="{ width: width + 'px', height: height + 'px' }"></div>
</template>

<script setup lang="ts">
import { toRefs } from "vue"

interface Props {
    width: number
    height: number
}
const props = defineProps<Props>()
const { width, height } = toRefs(props)
</script>

<style lang="scss" scoped>
.skeleton-textField {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: $color-gray-100;
    border-radius: 10px;
}
</style>
