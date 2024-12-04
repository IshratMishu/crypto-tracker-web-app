'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";

export const CryptoContext = createContext(null);

const Context = ({ children }) => {
    const [assets, setAssets] = useState([]);
    const [searchAsset, setSearchAsset] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [coinSearch, setCoinSearch] = useState("");
    const [currency, setCurrency] = useState("usd");
    const [sortBy, setSortBy] = useState("market_cap_desc");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(250);
    const [perPage, setPerPage] = useState(10);
    const [coin, setCoin] = useState([]);
    const [trending, setTrending] = useState([]);

    const getApiAssets = async () => {
       
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list`, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
            })

            setTotalPages(response.data.length);
        } catch (error) {
            console.log(error);
        }


        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`, {
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


    const getCoinById = async (coinId) => {
        setCoin();
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=true&sparkline=false`, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
            })
            setCoin(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTrending = async () => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/search/trending`, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
            })
            setTrending(response.data.coins);
        } catch (error) {
            console.log(error);
        }
    }


    const resetFunction = () => {
        setPage(1);
        setCoinSearch("")
    }

    useEffect(() => {
        getApiAssets();
        getTrending();
    }, [coinSearch, currency, sortBy, page, perPage])

    useEffect(() => {
        getTrending();
    }, [])

    const values = {
        assets,
        searchResults,
        searchAsset,
        setSearchResults,
        getSearchAsset,
        setCoinSearch,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        perPage,
        setPerPage,
        getCoinById,
        coin,
        trending
    }

    return (
        <CryptoContext.Provider value={values}>
            {children}
        </CryptoContext.Provider>
    );
};

export default Context;

