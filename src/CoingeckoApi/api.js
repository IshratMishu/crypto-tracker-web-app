// import axios from "axios";

// export const getApiAssets = async () => {
//     try {
//         const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`, {
//             headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY}
//         })
//         const apiAssets= response.data;
//         return apiAssets;
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const getSearchAsset = async (query) => {
//     try {
//         const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`, {
//             headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY}
//         })
//         const searchAsset= response.data;
//         return searchAsset;
//     } catch (error) {
//         console.log(error);
//     }
// }



// export const getApiSearchAssets = async (coinSearch) => {
//     try {
//         const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinSearch}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`, {
//             headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY}
//         })
//         const apiSearch= response.data;
//         return apiSearch;
//     } catch (error) {
//         console.log(error);
//     }
// }
