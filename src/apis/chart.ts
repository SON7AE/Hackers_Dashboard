import axios from 'axios'

const API_KEY = 'XD0augYTunhn7DFXijzUPhHPXTWSxrt4'

export default {
    async getStock(ticker: string, timeSpan: string) {
        // ticker: string, timeSpan: string, startDate: string, endDate: string
        const res = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${timeSpan}/2023-01-01/2023-09-30?adjusted=true&sort=asc&limit=12&apiKey=${API_KEY}`)

        return res
    },
}
