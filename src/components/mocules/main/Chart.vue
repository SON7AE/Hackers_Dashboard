<template>
    <div class="chart">
        <div class="chart__header">
            <span class="chart__header__title">요약</span>
            <div class="chart__header__button-box">
                <!-- <button class="button">3일</button>
                <button class="button">1주일</button> -->
                <button class="button">1개월</button>
                <button class="button">3개월</button>
                <button class="button">6개월</button>
                <button class="button">12개월</button>
            </div>
        </div>
        <div class="chart__body">
            <canvas id="myChart" style="max-width: 100%; max-height: 300px"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart, { ChartConfiguration, ChartItem } from 'chart.js/auto'
import { onMounted } from 'vue'
import api from '@apis/chart'

api.getStock('AAPL', 'day').then((res: any) => {
    console.log(res)
    graphData.datasets[0].data = res.data.results.map((item: any) => {
        return item.o
    })
})

const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
const graphData = {
    labels: labels,
    datasets: [
        {
            label: 'NASDAQ',
            data: [],
            borderColor: '#32D583',
            backgroundColor: 'rgba(50, 213, 131, 0.16)',
            tension: 0.1,
            fill: true,
        },
    ],
}

const config: ChartConfiguration = {
    type: 'line',
    data: graphData,
    options: {
        plugins: {
            // Label 지우는 속성
            legend: {
                display: false,
            },
            subtitle: {
                display: true,
                text: 'NASDAQ',
                padding: 12,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                type: 'linear',
                grace: '100%',
            },
        },
    },
}

onMounted(() => {
    const ctx = <ChartItem>document.getElementById('myChart')
    new Chart(ctx, config)
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

        flex: 1;

        width: 100%;
    }
    @media screen and (max-width: 1440px) {
        max-width: 602px;
    }
}
</style>
