'use client'
import Trendy from '@/Components/Trendy';
import useCryptoContext from '@/Hooks/useCryptoContext';
import React from 'react';


const Trending = () => {
    const { trending } = useCryptoContext();

    return (
        <div>
            <div className='border border-[--gray-100] rounded py-8 flex lg:flex-row flex-wrap flex-col justify-evenly items-center'>
                {trending && trending.map(trend => <Trendy key={trend.item.id} trend={trend}></Trendy>)}
            </div>

            <h1 className='text-white mt-4'>Data provided by <a className='text-[--blue]' target="_blank" rel="noopener noreferrer" href="https://www.coingecko.com/">CoinGecko</a></h1>
        </div>
    );
};

export default Trending;