'use client'
import useCryptoContext from '@/Hooks/useCryptoContext';
import React from 'react';
import { TbArrowBadgeDownFilled } from "react-icons/tb";


const Sort = () => {
    const {setSortBy} = useCryptoContext();

    const handleSort = e =>{
        e.preventDefault();
        const val = e.target.value;
        setSortBy(val);
    }

    return (
        <div className='relative flex items-center gap-2 text-sm'>
            <label className='font-semibold'>Sort by:</label>
            <select name="sortby" className='bg-[--gray-200] text-[gray-100] outline-0 rounded px-3 py-0.5' onClick={handleSort} >
            <option value="market_cap_desc">Market Cap Desc</option>
            <option value="market_cap_asc">Market Cap Asc</option>
            <option value="volume_asc">Volume Asc</option>
            <option value="volume_desc">Volume Desc</option>
            <option value="id_asc">Id Asc</option>
            <option value="id_desc">Id Desc</option>
            </select>
            <TbArrowBadgeDownFilled className='absolute right-0 text-xl text-[--blue] pointer-events-none'/>
        </div>
    );
};

export default Sort;