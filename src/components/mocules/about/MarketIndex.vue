<template>
    <BasicLayout>
        <div class="market-index">
            <div class="market-index__header">
                <span class="market-index__header__label">시장 지수</span>
                <span class="market-index__header__update">5분 전 업데이트됨</span>
            </div>
            <div class="market-index__body">
                <div v-for="item in marketIndexList" :key="item.label" class="market-index__body__column">
                    <div class="item">{{ item.label }}</div>
                    <div class="item-price">{{ item.price }}</div>
                    <div class="item-rate" :style="{ color: item.color }">{{ item.rate > 0 ? "+" + item.rate : item.rate }}</div>
                    <div class="item-percent" :style="{ color: item.color }">{{ item.percent }}</div>
                </div>
            </div>
        </div>
    </BasicLayout>
</template>

<script setup lang="ts">
import BasicLayout from "@components/atoms/layouts/BasicLayout.vue"
import { onMounted, ref } from "vue"

interface Item {
    label: string
    price: string
    rate: number
    percent: string
    color: string
}

const marketIndexList = ref<Item[]>([
    {
        label: "US 30",
        price: "33,976.0",
        rate: -94.4,
        percent: "-0.28%",
        color: "",
    },
    {
        label: "US 50",
        price: "4,230.9",
        rate: -9.1,
        percent: "-0.21%",
        color: "",
    },
    {
        label: "NASDAQ",
        price: "13,221.81",
        rate: -12.18,
        percent: "-0.09%",
        color: "",
    },
    {
        label: "Dow Jones",
        price: "33,963.84",
        rate: -106.58,
        percent: "-0.31%",
        color: "",
    },
    {
        label: "S&P 500",
        price: "4,320.06",
        rate: -9.94,
        percent: "-0.23%",
        color: "",
    },
    {
        label: "S&P 500 VIX",
        price: "17.20",
        rate: 0.0,
        percent: "0.00%",
        color: "",
    },
    {
        label: "Dollar Index",
        price: "105.282",
        rate: 0.238,
        percent: "+0.23%",
        color: "",
    },
])
onMounted(() => {
    marketIndexList.value.forEach((item: Item) => {
        if (item.rate === 0 || item.rate === 0.0) {
            item.color = "#98A2B3"
        } else if (item.rate < 0) {
            item.color = "#1570EF"
        } else {
            item.color = "#F04438"
        }
    })
})
</script>

<style lang="scss" scoped>
.market-index {
    width: 375px;
    height: 233px; // 추후삭제

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__label {
            color: $color-gray-800;
            font-size: 18px;
            font-weight: 700;
            line-height: 18px;
        }
        &__update {
            color: $color-gray-400;
            font-size: 14px;
            font-weight: 700;
        }
    }
    &__body {
        display: flex;
        flex-direction: column;

        margin-top: 18px;

        border-top: 1px solid $color-gray-300;
        border-bottom: 1px solid $color-gray-300;

        &__column {
            display: flex;
            align-items: center;
            justify-content: center;

            border-bottom: 1px solid $color-gray-300;

            &:last-child {
                border-bottom: none;
            }

            .item {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                width: 132px;

                padding: 6px 10px;
                border-right: 1px solid $color-gray-300;

                color: $color-gray-800;
                font-family: "Public Sans", sans-serif;
                font-size: 13px;
                font-weight: 500;
            }
            .item-price {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                width: 64px;

                padding: 6px 10px;
                border-right: 1px solid $color-gray-300;

                color: $color-gray-800;
                font-family: "Public Sans", sans-serif;
                font-size: 13px;
                font-weight: 500;
            }
            .item-rate {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                width: 45px;

                padding: 6px 10px;
                border-right: 1px solid $color-gray-300;

                color: $color-gray-800;
                font-family: "Public Sans", sans-serif;
                font-size: 13px;
                font-weight: 500;
            }
            .item-percent {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                width: 47px;

                padding: 6px 10px;

                color: $color-gray-800;
                font-family: "Public Sans", sans-serif;
                font-size: 13px;
                font-weight: 500;
            }
        }
    }
}
</style>
