'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";

export const CryptoContext = createContext(null);

const Context = ({ children }) => {
    const [assets, setAssets] = useState([]);
    const [searchAsset, setSearchAsset] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [coinSearch, setCoinSearch] = useState("");

    const getApiAssets = async () => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&&ids=${coinSearch}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
            })
            
            setAssets(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const getSearchAsset = async (query) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
            })
            setSearchResults(response.data.coins || []);
            setSearchAsset(query);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getApiAssets();
    }, [coinSearch])

    const values = {
        assets,
        searchResults,
        searchAsset,
        setSearchResults,
        getSearchAsset,
        setCoinSearch
    }

    return (
        <CryptoContext.Provider value={values}>
            {children}
        </CryptoContext.Provider>
    );
};

export default Context;