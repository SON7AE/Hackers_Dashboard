<template>
    <BasicLayout>
        <div class="stock-info">
            <div class="stock-info__header">
                <div class="stock-info__header__logo">
                    <img :src="`src/assets/icons/company/${store.ticker_en}.svg`" alt="" />
                </div>
                <div class="stock-info__header__title">
                    <span class="ticker-en">{{ store.ticker_en }}</span>
                    <div class="ticker-ko">
                        <span class="ticker-ko__name">{{ store.ticker_ko }}</span>
                        <div class="ticker-ko__market">
                            <span>🇺🇸</span>
                            <span class="ticker-ko__market__name">NASDAQ</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="stock-info__body">
                <div class="stock-info__body__price-box">
                    <div class="price">
                        <span class="price__current">$384.15</span>
                        <div class="price__rate">
                            <img src="src/assets/icons/decrease.svg" alt="" />
                            <span class="price__rate__percent">$2.15(0.56%)</span>
                        </div>
                    </div>
                    <span class="update">5분 전 업데이트됨</span>
                </div>
                <div class="stock-info__body__chart-box">
                    <Chart :propData="graphData" />
                </div>
            </div>
        </div>
    </BasicLayout>
</template>

<script setup lang="ts">
import BasicLayout from "@components/atoms/layouts/BasicLayout.vue"
import Chart from "@components/mocules/about/Chart.vue"
import { useStore } from "@store/index"
import { ref } from "vue"

const store = useStore()
store.getStock("")

const graphData = ref<any>([])
graphData.value = store.graphData
</script>

<style lang="scss" scoped>
.stock-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 30px;

    &__header {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        gap: 12px;

        &__logo {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 60px;
            height: 60px;

            border-radius: 10px;
            // background-color: $color-black-900;

            img {
                width: 75%;
                height: 75%;
            }
        }
        &__title {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            gap: 4px;

            .ticker-en {
                color: $color-gray-900;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: -0.48px;
            }

            .ticker-ko {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                gap: 12px;

                &__name {
                    color: $color-gray-500;
                    font-family: SUIT;
                    font-size: 18px;
                    font-weight: 700;
                }
                &__market {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    gap: 4px;

                    &__name {
                        color: $color-gray-500;
                        font-family: SUIT;
                        font-size: 12px;
                        font-weight: 700;
                    }
                }
            }
        }
    }
    &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 30px;

        &__price-box {
            display: flex;
            align-items: center;
            justify-content: space-between;

            width: 600px;

            .price {
                display: flex;
                align-items: center;
                justify-content: center;

                gap: 12px;

                &__current {
                    color: $color-gray-900;
                    font-family: "Public Sans", sans-serif;
                    font-size: 32px;
                    font-weight: 700;
                }
                &__rate {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &__percent {
                        color: $color-blue-600;
                        font-family: "Public Sans", sans-serif;
                        font-size: 22px;
                        font-weight: 700;
                    }
                }
            }
            .update {
                color: $color-gray-400;
                font-size: 14px;
                font-weight: 500;
            }
        }
        &__chart-box {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
        }
    }
}
</style>
