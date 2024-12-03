'use client'
import useCryptoContext from '@/Hooks/useCryptoContext';
import React, { useRef } from 'react';
import { MdNextPlan } from "react-icons/md";

const Currency = () => {
    const {setCurrency} = useCryptoContext();
    const currencyRef = useRef(null);
    
    const handleCurrency = e =>{
        e.preventDefault();
        const val = currencyRef.current.value;
        setCurrency(val);
        currencyRef.current.value = ""
    }
    
    return (
        <div>
            <form className='flex items-center text-sm' onSubmit={handleCurrency}>
                <label className='font-semibold'>Currency:</label>
                <input type="text" name="currency" placeholder='usd' className='bg-[--gray-200] text-[gray-100] rounded px-3 py-0.5 outline-0 w-16 border border-transparent focus:border-[--blue] ml-2' ref={currencyRef}/>
                <button type="submit"><MdNextPlan className='text-xl text-[--blue]'/></button>
            </form>
        </div>
    );
};

export default Currency;