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
                    <MarketIndex />
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
import MarketIndex from "@components/mocules/about/MarketIndex.vue"
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
