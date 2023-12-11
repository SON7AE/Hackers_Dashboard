import { defineStore } from "pinia"
import api from "@apis/chart"

export const useStore = defineStore("store", {
    state: () => ({
        searchValue: "",
        ticker_ko: "",
        ticker_en: "",
        graphData: [],
        // About Page
        todayValue: 0,
        yesterdayValue: 0,
    }),
    getters: {
        increaseValue: (state) => {
            const res = state.todayValue - state.yesterdayValue
            return res.toFixed(2)
        },
        increaseRate: (state) => {
            const res = ((state.todayValue - state.yesterdayValue) * 100) / state.yesterdayValue
            return res.toFixed(2)
        },
    },
    actions: {
        async getStock(inputValue: string) {
            if (inputValue === "") {
                this.ticker_ko = "애플"
                this.ticker_en = "Apple"

                await api.getStock("AAPL", "month").then((res: any) => {
                    this.graphData = res.data.results.map((item: any) => {
                        return item.o
                    })

                    this.todayValue = this.graphData[this.graphData.length - 1]
                    this.yesterdayValue = this.graphData[this.graphData.length - 2]
                })
            } else {
                await api.getStock(inputValue, "month").then((res: any) => {
                    this.graphData = res.data.results.map((item: any) => {
                        return item.o
                    })
                    this.todayValue = this.graphData[this.graphData.length - 1]
                    this.yesterdayValue = this.graphData[this.graphData.length - 2]
                })
            }
        },
    },
})
