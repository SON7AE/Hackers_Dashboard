import axios from "axios"
import dayjs from "dayjs"

// R7SL6mxl6699GWChvW3fpsehxTJKnwG9
// yCV497pxxjpRVqSPPUn5K7A2pDtD8MVs
const API_KEY = "yCV497pxxjpRVqSPPUn5K7A2pDtD8MVs"
const today = dayjs().format("YYYY-MM-DD")

export default {
    async getStock(ticker: string, timeSpan: string) {
        // ticker: string, timeSpan: string, startDate: string, endDate: string
        const res = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${timeSpan}/2023-01-01/${today}?adjusted=true&sort=asc&limit=365&apiKey=${API_KEY}`)

        return res
    },
}
