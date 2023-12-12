<template>
    <div class="page">
        <Navigation />
        <div class="page__container">
            <Header @send-event="watchValue" />
            <div class="page__container__contents">
                <StockInfo ref="stockInfoRef" />
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
import { useStore } from "@store/index"
import { onMounted, onUnmounted, ref } from "vue"

const store = useStore()
const stockInfoRef = ref<InstanceType<typeof StockInfo> | null>(null)

function watchValue(searchValue: string) {
    store.getStock(searchValue, "month")
    stockInfoRef.value?.getChart()
}

onMounted(() => {
    // store.getStock("AAPL", "month")
    stockInfoRef.value?.getChart()
})

onUnmounted(() => {
    store.$reset()
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
