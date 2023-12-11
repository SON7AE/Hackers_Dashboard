<template>
    <div class="page">
        <Navigation />
        <div class="page__container">
            <Header />
            <div class="page__container__contents">
                <StockInfo />
                <div class="section">
                    <MarketIndex />
                    <TradingTrends />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navigation from "@components/organisms/common/Navigation.vue"
import Header from "@components/organisms/common/Header.vue"
import StockInfo from "@components/mocules/about/StockInfo.vue"
import MarketIndex from "@components/mocules/about/MarketIndex.vue"
import TradingTrends from "@components/mocules/about/TradingTrends.vue"
import { onUnmounted } from "vue"
import { useStore } from "@store/index"

const store = useStore()

onUnmounted(() => {
    store.graphData = []
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

.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 16px;
}
</style>
