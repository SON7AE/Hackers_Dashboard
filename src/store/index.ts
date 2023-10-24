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
        async getStock() {
            if (this.searchValue === "") {
                this.ticker_ko = "애플"
                this.ticker_en = "Apple"

                await api.getStock("AAPL", "day").then((res: any) => {
                    this.graphData = res.data.results.map((item: any) => {
                        return item.o
                    })
                })
            } else {
                await api.getStock(this.searchValue, "day").then((res: any) => {
                    this.graphData = res.data.results.map((item: any) => {
                        return item.o
                    })
                })
            }
        },
    },
})
