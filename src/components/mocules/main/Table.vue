<template>
    <div class="table">
        <div class="table__header">
            <div v-for="item in menuList" :key="item" class="table__header__menu" :style="{ width: `${width}%` }">
                <span class="label">{{ item }}</span>
                <button class="button" @click="sortList(item)">
                    <img src="src/assets/icons/Sort.svg" alt="" />
                </button>
            </div>
        </div>
        <div class="table__body">
            <div v-for="item in newTableData[currentPage - 1]" :key="item.name" class="table__body__list">
                <div class="company" :style="{ width: `${width}%` }">
                    <div class="company__logo">
                        <img :src="`src/assets/icons/company/${item.icon}`" alt="" class="" />
                    </div>
                    <span class="company__name">{{ item.name }}</span>
                </div>
                <div class="ticker" :style="{ width: `${width}%` }">
                    <span class="ticker__value">
                        {{ item.ticker }}
                    </span>
                </div>
                <div class="quantity" :style="{ width: `${width}%` }">
                    <span class="quantity__value"> {{ item.quantity }}주 </span>
                </div>
                <div class="average" :style="{ width: `${width}%` }">
                    <span class="average__value"> ${{ item.average }} </span>
                </div>
                <div class="current" :style="{ width: `${width}%` }">
                    <span class="current__value">${{ item.current }}</span>
                </div>
                <div class="valuation" :style="{ width: `${width}%` }">
                    <span class="valuation__value">${{ item.valuation }}</span>
                </div>
                <div class="profit" :style="{ width: `${width}%` }">
                    <span v-if="item.profit > 0" class="profit__value" style="color: #f04438"> +${{ item.profit }} </span>
                    <span v-else class="profit__value" style="color: #1570ef"> -${{ Math.abs(item.profit) }} </span>
                </div>
                <div class="rate" :style="{ width: `${width}%` }">
                    <span v-if="item.rate > 0" class="rate__value" style="color: #f04438"> +{{ item.rate }}% </span>
                    <span v-else class="rate__value" style="color: #1570ef"> -{{ Math.abs(item.rate) }}% </span>
                </div>
            </div>
        </div>
        <div class="table__footer">
            <Pagination :data="tableData" @send-event="reset" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Pagination from "@components/mocules/common/Pagination.vue"
import { ref, computed, onMounted } from "vue"

interface List {
    icon: string
    name: string
    ticker: string
    quantity: string
    average: string
    current: string
    valuation: string
    profit: number
    rate: number
}

const menuList = ref<string[]>(["이름", "티커", "수량", "1주당 평균", "현재가", "평가액", "평가손익", "손익률"])

// MenuList 길이에 따른 Dynamic Width
const width = computed((): string => {
    const res = String(100 / menuList.value.length + 1)
    return res
})

// 테이블 헤더 버튼 - sort 기능
const sortList = (menu: string) => {
    if (menu === "이름") {
        newTableData.value[currentPage.value - 1].sort((a: List, b: List) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1

            return 0
        })
    }
    if (menu === "티커") {
        newTableData.value[currentPage.value - 1].sort((a: List, b: List) => {
            if (a.ticker > b.ticker) return 1
            if (a.ticker < b.ticker) return -1

            return 0
        })
    }
    if (menu === "수량") newTableData.value[currentPage.value - 1].sort((a: List, b: List) => +b.quantity - +a.quantity)
    if (menu === "1주당 평균") newTableData.value[currentPage.value - 1].sort((a: List, b: List) => +b.average - +a.average)
    if (menu === "현재가") newTableData.value[currentPage.value - 1].sort((a: List, b: List) => +b.current - +a.current)
    if (menu === "평가액") newTableData.value[currentPage.value - 1].sort((a: List, b: List) => +b.valuation - +a.valuation)
    if (menu === "평가손익") newTableData.value[currentPage.value - 1].sort((a: List, b: List) => b.profit - a.profit)
    if (menu === "손익률") newTableData.value[currentPage.value - 1].sort((a: List, b: List) => b.rate - a.rate)
}

// 테이블 더미데이터
const tableData = ref<List[]>([
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
    {
        icon: "Apple.svg",
        name: "애플",
        ticker: "AAPL",
        quantity: "237",
        average: "163.17",
        current: "173.93",
        valuation: "41221.41",
        profit: 2550.12,
        rate: 6.59,
    },
    {
        icon: "Microsoft.svg",
        name: "마이크로소프트",
        ticker: "MSFT",
        quantity: "159",
        average: "287.187",
        current: "319.53",
        valuation: "50805.27",
        profit: 5033.94,
        rate: 10.99,
    },
    {
        icon: "Meta.svg",
        name: "메타",
        ticker: "META",
        quantity: "148",
        average: "120.20",
        current: "295.73",
        valuation: "43768.04",
        profit: 25978.44,
        rate: 146.03,
    },
    {
        icon: "Google.svg",
        name: "알파벳 C",
        ticker: "GOOG",
        quantity: "120",
        average: "136.56",
        current: "130.08",
        valuation: "15609.6",
        profit: -777.6,
        rate: -4.75,
    },
    {
        icon: "IBM.svg",
        name: "IBM",
        ticker: "IBM",
        quantity: "101",
        average: "87.90",
        current: "147.38",
        valuation: "14885.38",
        profit: 60007.48,
        rate: 67.66,
    },
    {
        icon: "Pepsi.svg",
        name: "펩시콜라",
        ticker: "PEP",
        quantity: "92",
        average: "172.85",
        current: "175.38",
        valuation: "16134.96",
        profit: 232.76,
        rate: 1.46,
    },
    {
        icon: "Nvidia.svg",
        name: "엔비디아",
        ticker: "NVDA",
        quantity: "138",
        average: "196.20",
        current: "420.75",
        valuation: "13874.72",
        profit: 30397.9,
        rate: 247.6,
    },
    {
        icon: "Tesla.svg",
        name: "테슬라",
        ticker: "TSLA",
        quantity: "900",
        average: "396.19",
        current: "245.07",
        valuation: "39433.88",
        profit: -45039.42,
        rate: -59.31,
    },
    {
        icon: "Netflix.svg",
        name: "넷플릭스",
        ticker: "NFLX",
        quantity: "312",
        average: "785.32",
        current: "381.14",
        valuation: "13564.91",
        profit: -22110.32,
        rate: -48.57,
    },
    {
        icon: "Volkswagen.svg",
        name: "폭스바겐",
        ticker: "VOWG",
        quantity: "83",
        average: "75.32",
        current: "105.14",
        valuation: "22991.10",
        profit: 2423.21,
        rate: 34.82,
    },
    {
        icon: "Disney.svg",
        name: "디즈니",
        ticker: "DIS",
        quantity: "100",
        average: "165.32",
        current: "85.14",
        valuation: "7856.12",
        profit: -5057.92,
        rate: -50.57,
    },
    // 여기까지
])

const newTableData = ref<any>([])
const currentPage = ref<number>(1)
const listCount = ref<number>(10)

const getData = () => {
    for (let i = 0; i < tableData.value.length; i++) {
        newTableData.value.push(tableData.value.splice(0, listCount.value))
    }

    return newTableData.value
}

const reset = (pageIdx: number) => {
    currentPage.value = pageIdx
}

onMounted(() => {
    getData()
})
</script>

<style lang="scss" scoped>
.table {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    flex: 1;
    height: 100%;

    border-radius: 8px;
    border: 1px solid $color-gray-200;
    background-color: $color-white-000;

    &__header {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        width: 100%;
        height: 80px;

        background-color: $color-gray-050;
        border-radius: 8px 8px 0 0;
        border-bottom: 1px solid $color-gray-300;

        @media screen and (max-width: 1440px) {
            height: 50px;
        }

        &__menu {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            height: calc(100% - 20px);
            padding: 10px;

            border-right: 1px solid $color-gray-300;

            &:last-child {
                border-right: none;
            }

            .button {
                outline: none;
                border: none;
                background: transparent;

                cursor: pointer;
            }
        }
    }
    &__body {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: calc(100% - 80px - 60px);

        overflow-y: scroll;

        // /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */

        // /* Hide scrollbar for Chrome, Safari and Opera */
        &::-webkit-scrollbar {
            display: none;
        }

        @media screen and (max-width: 1440px) {
            height: calc(100% - 50px - 40px);
        }

        &__list {
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            width: 100%;
            height: 48px;
            min-height: 48px;

            padding: 6px 0;

            border-bottom: 1px solid $color-gray-300;

            &:last-child {
                border-bottom: none;
            }

            .company {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                gap: 8px;

                &__logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    width: 20px;
                    height: 20px;

                    padding: 8px;
                    margin-left: 16px;

                    border-radius: 36px;
                    border: 1px solid $color-gray-200;
                    background-color: $color-white-000;
                }
                &__name {
                    color: $color-gray-800;

                    font-size: 18px;
                    font-weight: 500;
                    line-height: 24px;

                    @media screen and (max-width: 1440px) {
                        font-size: 16px;
                    }
                }
            }
            .ticker {
                display: flex;
                justify-content: center;
                align-items: center;

                &__value {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    padding: 4px 8px;
                    gap: 10px;

                    border-radius: 16px;
                    background: $color-success-050;

                    font-family: "Public Sans", sans-serif;
                    color: $color-success-600;
                }
            }
            .quantity {
                display: flex;
                align-items: center;
                justify-content: center;

                &__value {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 100%;

                    font-family: "Public Sans", sans-serif;

                    margin-right: 8px;
                }
            }
            .average {
                display: flex;
                align-items: center;
                justify-content: center;

                &__value {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 100%;

                    font-family: "Public Sans", sans-serif;

                    margin-right: 8px;
                }
            }
            .current {
                display: flex;
                align-items: center;
                justify-content: center;

                &__value {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 100%;

                    font-family: "Public Sans", sans-serif;

                    margin-right: 8px;
                }
            }
            .valuation {
                display: flex;
                align-items: center;
                justify-content: center;

                &__value {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 100%;

                    font-family: "Public Sans", sans-serif;

                    margin-right: 8px;
                }
            }
            .profit {
                display: flex;
                align-items: center;
                justify-content: center;

                &__value {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 100%;

                    font-family: "Public Sans", sans-serif;

                    margin-right: 8px;
                }
            }
            .rate {
                display: flex;
                align-items: center;
                justify-content: center;

                &__value {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    width: 100%;

                    font-family: "Public Sans", sans-serif;

                    margin-right: 16px;
                }
            }
        }
    }
    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 60px;
        min-height: 60px;

        background-color: $color-white-000;
        border-radius: 0px 0px 8px 8px;
        border-top: 1px solid $color-gray-300;

        @media screen and (max-width: 1440px) {
            height: 40px;
        }
    }
}
</style>
