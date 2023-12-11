<template>
    <div class="chart">
        <div class="chart__header">
            <span class="chart__header__title">요약</span>
            <div class="chart__header__button-box">
                <button
                    v-for="(item, index) in buttons"
                    class="button"
                    :class="{ active: index === 0 && item.active === true ? true : false, other: index !== 0 && item.active === true ? true : false }"
                    @click="drawChart(item, index)"
                >
                    {{ item.label }}
                </button>
            </div>
        </div>
        <div v-show="store.isLoading" class="chart__body">
            <div class="chart__body__skeleton"></div>
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <canvas v-show="!store.isLoading" id="myChart" style="width: 100%; max-height: 300px"></canvas>
    </div>
</template>

<script setup lang="ts">
import Chart, { ChartConfiguration, ChartItem } from "chart.js/auto"
import { onMounted, ref } from "vue"
import { useStore } from "@store/index"
import dayjs from "dayjs"

const store = useStore()
const graphData = ref<Number[]>([])
graphData.value = store.graphData

const buttons = ref<any>([
    {
        label: "1개월",
        active: false,
    },
    {
        label: "12개월",
        active: true,
    },
])

const labels = ref<string[]>(["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"])
const chartData = ref<any>({
    labels: labels,
    datasets: [
        {
            label: store.searchValue,
            data: graphData.value,
            borderColor: "#32D583",
            backgroundColor: "rgba(50, 213, 131, 0.16)",
            tension: 0.1,
            fill: true,
        },
    ],
})

const config: ChartConfiguration = {
    type: "line",
    data: chartData.value,
    options: {
        plugins: {
            // Label 지우는 속성
            legend: {
                display: false,
            },
            subtitle: {
                display: true,
                text: store.searchValue,
                padding: 12,
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    tickBorderDash: [0, 10],
                },
            },
            y: {
                type: "linear",
                grace: "100%",
                grid: {
                    display: true,
                    tickBorderDash: [0, 10],
                },
            },
        },
    },
}

// 필터 클릭시, 동작 함수
async function drawChart(data: any, index: number) {
    buttons.value.forEach((item: any) => {
        item.active = false
    })
    buttons.value[index].active = true

    if (data.label === "1개월") {
        store.isLoading = true

        // 라벨 30일 출력
        let newLabel: string[] = []
        for (let i = 0; i < 30; i++) {
            // dayjs에서 subtract 메서드는 두 번째 인자를 기준으로 첫 번째 인자만큼 날짜를 빼준다.
            newLabel.push(dayjs().subtract(i, "day").format("YY-MM-DD"))
        }
        labels.value = [...newLabel].reverse()

        store.getStock(store.searchValue, "day").then((res: any) => {
            // 임의로 30개 자름
            console.log(store.searchValue)
            chartData.value.datasets[0].data = res.slice(graphData.value.length - 31, graphData.value.length - 1)
        })
        getChart()
    } else if (data.label === "12개월") {
        store.isLoading = true
        labels.value = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

        store.getStock(store.searchValue, "month")
        getChart()
    }
}

// 차트생성 함수
function createChart() {
    const chartWithKey = Chart.getChart("myChart")
    if (chartWithKey !== undefined) {
        chartWithKey.destroy()
    }
    const ctx = <ChartItem>document.getElementById("myChart")
    if (ctx !== null) {
        new Chart(ctx, config)
    }
}

// 차트호출 함수
function getChart() {
    setTimeout(() => {
        createChart()
        store.isLoading = false
    }, 2000)
}

onMounted(() => {
    store.isLoading = true
    store.getStock(store.searchValue, "month")
    getChart()
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

                &.active {
                    background-color: $color-gray-100;
                    border-radius: 8px 0 0 8px;
                }
                &.other {
                    background-color: $color-gray-100;
                    border-radius: 0 8px 8px 0;
                }

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
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        flex: 1;

        width: 100%;

        &__skeleton {
            width: 100%;
            height: 95%;

            margin-top: 20px;

            background-color: $color-gray-100;
            border-radius: 8px;
        }
    }

    @media screen and (max-width: 1440px) {
        max-width: 602px;
    }
}

.lds-spinner {
    position: absolute;
    z-index: 2;

    top: 50%;
    right: 50%;
    transform: translate(50%, -35%);

    color: official;
    display: inline-block;

    width: 80px;
    height: 80px;
}
.lds-spinner {
    div {
        transform-origin: 40px 40px;
        animation: lds-spinner 1.2s linear infinite;
    }
}
.lds-spinner {
    div:after {
        content: " ";
        display: block;
        position: absolute;
        top: 3px;
        left: 37px;
        width: 6px;
        height: 18px;
        border-radius: 20%;
        background: $color-white-000;
    }
}
.lds-spinner {
    div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
    }
}
.lds-spinner {
    div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
    }
}
.lds-spinner {
    div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
    }
}
.lds-spinner {
    div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
    }
}
.lds-spinner {
    div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
    }
}
.lds-spinner {
    div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
    }
}
.lds-spinner {
    div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
    }
}
.lds-spinner {
    div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
    }
}
.lds-spinner {
    div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
    }
}
.lds-spinner {
    div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
    }
}
.lds-spinner {
    div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
    }
}
.lds-spinner {
    div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
    }
}
@keyframes lds-spinner {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
