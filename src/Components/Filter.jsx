import React from 'react';
import Search from './Search';
import Currency from './Currency';
import Sort from './Sort';
import { BiReset } from "react-icons/bi";
import useCryptoContext from '@/Hooks/useCryptoContext';

const Filter = () => {
    const {resetFunction} = useCryptoContext();

    return (
        <div className='text-white border-2 border-[--gray-100] h-10 rounded flex items-center justify-between px-4'>
            <Search></Search>
            <Currency></Currency>
            <Sort></Sort>
            <BiReset onClick={resetFunction} className='text-2xl text-[--blue]'/>
        </div>
    );
};

export default Filter;