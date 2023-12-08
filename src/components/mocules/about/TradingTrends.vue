<template>
    <BasicLayout>
        <div class="trading-trends">
            <div class="trading-trends__header">
                <span class="trading-trends__header__label">매매 동향</span>
                <span class="trading-trends__header__update">5분 전 업데이트됨</span>
            </div>
            <div class="trading-trends__body">
                <div class="trading-trends__body__menu-box">
                    <div class="menu">이름</div>
                    <div class="menu">현재</div>
                    <div class="menu">등락률</div>
                    <div class="menu">거래량</div>
                </div>
                <div class="trading-trends__body__list-box">
                    <div v-for="item in tradingList" :key="item.ticker_ko" class="column">
                        <div class="column__ticker">
                            <div class="column__ticker__name">
                                <img :src="`src/assets/icons/company/${item.icon}.svg`" alt="" class="icon" />
                                <span class="en">{{ item.ticker_en }}</span>
                            </div>
                            <span class="column__ticker__ko">{{ item.ticker_ko }}</span>
                        </div>
                        <div class="column__current-value">${{ item.value }}</div>
                        <div class="column__rate" :style="{ color: item.color }">{{ item.rate }}%</div>
                        <div class="column__trading-volume">{{ item.trading_volume }}</div>
                    </div>
                </div>
            </div>
        </div>
    </BasicLayout>
</template>

<script setup lang="ts">
import BasicLayout from "@components/atoms/layouts/BasicLayout.vue"
import { ref, onMounted } from "vue"

interface Item {
    icon: string
    ticker_ko: string
    ticker_en: string
    value: number
    rate: number
    trading_volume: string
    color: string
}

const tradingList = ref<Item[]>([
    {
        icon: "Tesla",
        ticker_ko: "테슬라",
        ticker_en: "TSLA",
        value: 244.88,
        rate: -4.23,
        trading_volume: "126.31M",
        color: "",
    },
    {
        icon: "Apple",
        ticker_ko: "애플",
        ticker_en: "AAPL",
        value: 174.95,
        rate: 0.49,
        trading_volume: "56.34M",
        color: "",
    },
    {
        icon: "Amazon",
        ticker_ko: "아마존",
        ticker_en: "AMZN",
        value: 129.12,
        rate: 0.06,
        trading_volume: "56.32M",
        color: "",
    },
    {
        icon: "Nvidia",
        ticker_ko: "엔비디아",
        ticker_en: "NVDA",
        value: 416.17,
        rate: 1.15,
        trading_volume: "46.43M",
        color: "",
    },
    {
        icon: "Microsoft",
        ticker_ko: "마이크로소프트",
        ticker_en: "MSFT",
        value: 295.73,
        rate: 1.48,
        trading_volume: "76.43M",
        color: "",
    },
    {
        icon: "Google",
        ticker_ko: "알파벳 A",
        ticker_en: "GOOG",
        value: 130.08,
        rate: -4.56,
        trading_volume: "66.06M",
        color: "",
    },
])

onMounted(() => {
    tradingList.value.forEach((item: Item) => {
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
.trading-trends {
    width: 375px;
    height: 328px; // 추후삭제

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__label {
            color: $color-gray-800;
            font-size: 18px;
            font-weight: 600;
            line-height: 18px;
        }
        &__update {
            color: $color-gray-400;
            font-size: 14px;
            font-weight: 600;
        }
    }
    &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;

        &__menu-box {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            width: 100%;
            margin-top: 20px;

            background-color: $color-gray-100;

            .menu {
                display: flex;
                align-items: center;
                justify-content: center;

                padding: 6px 10px;

                color: $color-gray-600;
                font-size: 14px;
                font-weight: 700;

                &:first-child {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    width: 107px;
                }
                &:nth-child(2) {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 59px;
                }
                &:nth-child(3) {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 64px;
                }
                &:last-child {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 65px;
                }
            }
        }
        &__list-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            width: 100%;
            height: 258px;

            overflow-y: scroll;

            // /* Hide scrollbar for IE, Edge and Firefox */
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */

            // /* Hide scrollbar for Chrome, Safari and Opera */
            &::-webkit-scrollbar {
                display: none;
            }

            .column {
                display: flex;
                align-items: center;
                justify-content: center;

                border-top: 1px solid $color-gray-300;

                width: 100%;

                &__ticker {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-end;

                    width: 107px;

                    padding: 8px 10px;
                    gap: 2px;

                    &__name {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        gap: 4px;

                        .icon {
                            width: 20px;
                            height: 20px;
                        }
                        .en {
                            color: $color-gray-800;
                            font-family: "Public Sans", sans-serif;
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                    &__ko {
                        color: $color-gray-500;
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
                &__current-value {
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;

                    width: 59px;
                    height: 35px;

                    padding: 8px 10px;

                    color: $color-gray-800;
                    font-family: "Public Sans", sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                }
                &__rate {
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-end;

                    width: 59px;
                    height: 35px;

                    padding: 8px 10px;

                    font-family: "Public Sans", sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                }
                &__trading-volume {
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-end;

                    width: 65px;
                    height: 35px;

                    padding: 8px 10px;

                    color: $color-gray-800;
                    font-family: "Public Sans", sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                }
            }
        }
    }
    @include laptop() {
        height: 288px; // 추후삭제

        &__body {
            &__list-box {
                height: 220px;
            }
        }
    }
}
</style>
