<template>
    <div class="pagination">
        <button class="pagination__button">
            <img src="src/assets/icons/arrow-left.svg" alt="" />
        </button>
        <button v-for="index in pages" :key="index" class="pagination__button">{{ index }}</button>
        <button class="pagination__button">
            <img src="src/assets/icons/arrow-right.svg" alt="" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { toRefs, ref, computed } from "vue"

interface List {
    icon: string
    name: string
    ticker: string
    quantity: string
    average: string
    current: string
    valuation: string
    profit: number
    rate: number
}

interface Props {
    data: List[]
}

const props = defineProps<Props>()
const { data } = toRefs(props)

// 한 페이지당 리스트 갯수 10개로 쪼개기
const step = ref<number>(0)
const pages = computed(() => {
    const newArr: number[] = new Array()

    const length = data.value.length
    const divide = Math.ceil(length / 10)

    for (let i = 1; i <= divide; i++) {
        // 배열 0부터 n개씩 잘라 새 배열에 넣기
        newArr.push(i)
    }

    return newArr
})
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    gap: 8px;

    &__button {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 24px;
        height: 24px;

        padding: 3px 7px;

        color: $color-gray-500;
        font-family: "Public Sans", sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 16px; /* 100% */

        background: transparent;
        border: none;
        outline: none;

        cursor: pointer;

        &:hover {
            background-color: $color-gray-100;
            border-radius: 4px;

            color: $color-black-900;
        }
    }
}
</style>
