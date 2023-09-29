import axios from 'axios'

const API_KEY = '39phmMeWkkrIfmlDfa_KpM7SaFWgMLa1'

export default {
    async getStock(ticker: string, timeSpan: string) {
        // ticker: string, timeSpan: string, startDate: string, endDate: string
        // await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${timeSpan}/${startDate}/${endDate}?adjusted=true&sort=asc&limit=365&apiKey=${API_KEY}`).then((data: any) => {
        //     console.log(data)
        // })
        await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${timeSpan}/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`).then((data) => {
            console.log(data)
        })
    },
}
