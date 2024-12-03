import Image from 'next/image';
import React from 'react';

const Trendy = ({trend}) => {
    const {name, market_cap_rank, price_btc, score,large,small} = trend.item;
    return (
        <div className='bg-[--gray-200] rounded p-4 hover:bg-[#808080] hover:bg-opacity-40 text-sm relative'>
            <h3 className='flex items-center gap-1'>
                <span className='text-[--gray-100]'>Name:</span> 
                <span className='text-[--blue]'>{name}</span>
            <Image height={10} width={10} src={small} alt={name} className='rounded-full w-5 h-5'></Image>
            </h3>

            <h3 className='text-[--gray-100]'>Market Cap Rank: <span className='text-[--blue]'>{market_cap_rank}</span></h3>

            <h3 className='text-[--gray-100]'>Price (In BTC): <span className='text-[--blue]'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'btc', maximumSignificantDigits:5 }).format(price_btc)}</span></h3>

            <h3 className='text-[--gray-100]'>Score: <span className='text-[--blue]'>{score}</span></h3>

            <Image height={10} width={100} src={large} alt={name} className='rounded-full w-32 h-auto absolute -right-7 -top-2 z-10'></Image>
        </div>
    );
};

export default Trendy;