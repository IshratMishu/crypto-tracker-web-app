'use client'
import useCryptoContext from '@/Hooks/useCryptoContext';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StorageContext = createContext(null);

const StorageProvider = ({ children }) => {
    const [allCoin, setAllCoin] = useState([]);
    const [showCoin, setShowCoin] = useState([]);
    const { currency, sortBy } = useCryptoContext();

    const saveCoin = (coinId) => {
        const oldCoin = JSON.parse(localStorage.getItem("coins")) || [];
        if (oldCoin.includes(coinId)) {
            return null;
        } else {
            const newCoin = [...oldCoin, coinId];
            setAllCoin(newCoin);
            localStorage.setItem('coins', JSON.stringify(newCoin));
        }
    };

    const removeCoin = (coinId) => {
        const oldCoin = JSON.parse(localStorage.getItem("coins")) || [];
        const newCoin = oldCoin.filter(coin => coin !== coinId);
        setAllCoin(newCoin);
        localStorage.setItem('coins', JSON.stringify(newCoin));
    };

    const getSavedData = async (totalCoin = allCoin) => {
        if (!totalCoin.length) {
            setShowCoin([]); 
            return;
        }
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&&ids=${totalCoin.join(',')}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
            });
            setShowCoin(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (allCoin.length >0) {
            getSavedData(allCoin);
        }else{
            getSavedData()
        }
    }, [allCoin]);

    useEffect(() => {
        const isThere = JSON.parse(localStorage.getItem('coins')) || [];

        if (!isThere.length) {
            localStorage.setItem('coins', JSON.stringify([]));
        } else {
            setAllCoin(isThere);
            getSavedData(isThere);
        }
    }, []);

   

    return (
        <StorageContext.Provider value={{ saveCoin, allCoin, removeCoin, showCoin }}>
            {children}
        </StorageContext.Provider>
    );
};

export default StorageProvider;



// 'use client'
// import useCryptoContext from '@/Hooks/useCryptoContext';
// import React, { createContext, useEffect, useState } from 'react';

// export const StorageContext = createContext(null);

// const StorageProvider = ({ children }) => {
//     const [allCoin, setAllCoin] = useState([]);
//     const [showCoin, setShowCoin] = useState([]);
//     const { currency, sortBy } = useCryptoContext();

//     const saveCoin = (coinId) => {
//         const oldCoin = JSON.parse(localStorage.getItem("coins")) || [];
//         if (oldCoin.includes(coinId)) {
//             return null;
//         } else {
//             const newCoin = [...oldCoin, coinId];
//             setAllCoin(newCoin);
//             localStorage.setItem('coins', JSON.stringify(newCoin));
//         }
//     }

//     const removeCoin = (coinId) => {
//         const oldCoin = JSON.parse(localStorage.getItem("coins")) || [];
//         const newCoin = oldCoin.filter(coin => coin !== coinId);
//         setAllCoin(newCoin);
//         localStorage.setItem('coins', JSON.stringify(newCoin));
//     }
 
//     const getSavedData = async (totalCoin = allCoin) => {
//         try {
//             const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&&ids=${totalCoin.join(',')}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`, {
//                 headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
//             })

//             setShowCoin(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     useEffect(() => {
//         const isThere = JSON.parse(localStorage.getItem('coins')) || [];

//         if (!isThere.length) {
//             localStorage.setItem('coins', JSON.stringify([]))
//         } else {
//             setAllCoin(isThere);
//             getSavedData(isThere);
//         }

//         // if (isThere.length > 0) {
           
//         // }
//     }, [])



//     return (
//         <StorageContext.Provider value={{ saveCoin, allCoin, removeCoin, showCoin }}>
//             {children}
//         </StorageContext.Provider>
//     );
// };

// export default StorageProvider;


