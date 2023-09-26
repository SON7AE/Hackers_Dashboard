<template>
    <div class="chart">
        <div class="chart__header">
            <span class="chart__header__title">요약</span>
            <div class="chart__header__button-box">
                <button class="button">3일</button>
                <button class="button">1주일</button>
                <button class="button">1개월</button>
                <button class="button">3개월</button>
                <button class="button">6개월</button>
                <button class="button">12개월</button>
            </div>
        </div>
        <div class="chart__body">
            <Line :data="chartConfig.data" :options="chartConfig.options" :style="chartStyles" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import { Line } from "vue-chartjs"
import * as chartConfig from "@components/mocules/main/chartConfig.ts"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const chartStyles = computed(() => {
    return {
        height: `auto`,
        position: "relative",
    }
})
</script>

<style lang="scss" scoped>
.chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    flex: 1;
    height: calc(350px - 36px);

    padding: 18px;
    // gap: 36px;

    border-radius: 8px;
    border: 1px solid $color-gray-200;
    background-color: $color-white-000;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;

        &__title {
            color: $color-gray-800;
            font-size: 18px;
            font-weight: 700;
        }
        &__button-box {
            display: flex;
            align-items: center;

            border-radius: 8px;
            border: 1px solid $color-gray-300;
            background-color: $color-white-000;

            .button {
                display: flex;
                align-items: center;
                justify-content: center;

                min-width: 60px;
                padding: 4px 16px;

                color: $color-gray-500;
                font-size: 13px;
                font-weight: 500;

                outline: none;
                border: none;
                background: transparent;

                border-right: 1px solid $color-gray-300;

                cursor: pointer;

                &:hover {
                    background-color: $color-gray-100;

                    &:first-child {
                        border-radius: 8px 0 0 8px;
                    }
                    &:last-child {
                        border-radius: 0 8px 8px 0;
                    }
                }

                &:last-child {
                    border: none;
                }
            }
        }
    }
    &__body {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;

        flex: 1;
    }
    @media screen and (max-width: 1440px) {
        max-width: 602px;
    }
}
</style>
