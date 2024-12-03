'use client'
import useCryptoContext from '@/Hooks/useCryptoContext';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Search = () => {
    const { getSearchAsset, searchResults, setSearchResults, setCoinSearch } = useCryptoContext();
    const [searchText, setSearchText] = useState("");

    const handleSearch = e => {
        e.preventDefault();
        const search = e.target.value.trim();
        setSearchText(search);
        getSearchAsset(search);
    };


    const handleSelectedCoin = (coin) => {
        setCoinSearch(coin);
        setSearchText("");
        setSearchResults("");
    }

    return (
        <div>
            <form className='relative w-80'>
                <input type="text" name="search" placeholder='search...' className='bg-[--gray-200] text-[gray-100] rounded px-3 text-sm py-0.5 outline-0 border border-transparent focus:border-[--blue] w-full' onChange={handleSearch} value={searchText} />
                <button type="submit" className='absolute right-2 top-1 text-[--blue]'>
                    <FaSearch />
                </button>
            </form>

            {
                searchResults?.length > 0 ?
                    <ul className='absolute top-2/5 w-80 h-80 rounded overflow-x-hidden mt-4 px-4 py-2 bg-[--gray-200] shadow-lg scrollbar-custom '> 
                        {searchResults?.map((coin) => (
                            <li key={coin.id} className="py-1 text-[--gray-100] flex items-center gap-1 cursor-pointer" onClick={() => handleSelectedCoin(coin.id)}>
                                <Image height={50} width={50} src={coin.thumb}  alt={coin.name}  className='h-4 w-4'></Image>
                                <span>{coin.name} ({coin.symbol})</span>
                            </li>
                        ))}
                    </ul>
                    :
                    null
            }
        </div>
    );
};

export default Search;