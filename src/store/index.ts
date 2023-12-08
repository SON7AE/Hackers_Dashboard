import { defineStore } from "pinia"
import api from "@apis/chart"

export const useStore = defineStore("store", {
    state: () => ({
        searchValue: "",
        ticker_ko: "",
        ticker_en: "",
        graphData: [],
    }),
    actions: {
        async getStock(inputValue: string) {
            if (inputValue === "") {
                this.ticker_ko = "애플"
                this.ticker_en = "Apple"

                await api.getStock("AAPL", "month").then((res: any) => {
                    this.graphData = res.data.results.map((item: any) => {
                        return item.o
                    })
                })
            } else {
                await api.getStock(inputValue, "month").then((res: any) => {
                    this.graphData = res.data.results.map((item: any) => {
                        return item.o
                    })
                })
            }
        },
    },
})
