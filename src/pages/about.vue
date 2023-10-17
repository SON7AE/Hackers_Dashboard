<template>
    <div class="page">
        <Navigation />
        <div class="page__container">
            <Header />
            <div class="page__container__contents">
                <BasicLayout>
                    <div class="stock-info">
                        <div class="stock-info__header">
                            <div class="stock-info__header__logo">
                                <img src="src/assets/icons/company/Netflix.svg" alt="" />
                            </div>
                            <div class="stock-info__header__title">
                                <span class="ticker-en">Netflix Inc.</span>
                                <div class="ticker-ko">
                                    <span class="ticker-ko__name">넷플릭스</span>
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
                            <div class="stock-info__body__chart-box"></div>
                        </div>
                    </div>
                </BasicLayout>
                <div class="section">
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
                    <BasicLayout>
                        <div class="trading-trends">
                            <div class="trading-trends__header">
                                <span class="trading-trends__header__label">매매 동향</span>
                                <span class="trading-trends__header__update">5분 전 업데이트됨</span>
                            </div>
                        </div>
                    </BasicLayout>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navigation from "@components/organisms/common/Navigation.vue"
import Header from "@components/organisms/common/Header.vue"
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
        height: calc(100% - 48px);

        padding: 24px 48px 24px 32px;

        background-color: $color-gray-100;

        &__contents {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;

            width: 100%;
            flex: 1;

            margin-top: 50px;
            gap: 24px;
        }
    }
}
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
            background-color: $color-black-900;

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
    }
}
.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 16px;

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
    }
}
</style>
