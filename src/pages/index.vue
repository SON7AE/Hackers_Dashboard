<template>
    <div class="page">
        <Navigation />
        <div class="page__container">
            <Header />
            <div class="page__container__contents">
                <div class="summary">
                    <PortFolio />
                    <Chart />
                </div>
                <div class="table"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navigation from "@components/organisms/common/Navigation.vue"
import Header from "@components/organisms/common/Header.vue"
import PortFolio from "@components/mocules/main/PortFolio.vue"
import Chart from "@components/mocules/main/Chart.vue"
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
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            width: 100%;
            flex: 1;

            margin-top: 50px;
            gap: 24px;

            .summary {
                display: flex;
                align-items: center;
                justify-content: space-between;

                width: 100%;

                gap: 24px;
            }
            .table {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 100%;

                background-color: $color-gray-300; // TEST CODE
            }
        }
    }
}
</style>
