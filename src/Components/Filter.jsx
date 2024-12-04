import React from 'react';
import Search from './Search';
import Currency from './Currency';
import Sort from './Sort';
import { BiReset } from "react-icons/bi";
import useCryptoContext from '@/Hooks/useCryptoContext';

const Filter = () => {
    const { resetFunction } = useCryptoContext();

    return (
        <div className='text-white'>
            <div className='border-2 border-[--gray-100] h-10 rounded lg:flex items-center justify-between px-4 hidden'>
                <Search></Search>
                <Currency></Currency>
                <Sort></Sort>
                <BiReset onClick={resetFunction} className='text-2xl text-[--blue]' />
            </div>


            <div className='border-2 border-[--gray-100] py-2 rounded md:flex flex-col space-y-4 px-4 lg:hidden hidden'>
                <Search></Search>
                <div className='flex items-center justify-between'>
                    <Currency></Currency>
                    <Sort></Sort>
                    <BiReset onClick={resetFunction} className='text-2xl text-[--blue]' />
                </div>
            </div>

            <div className='border-2 border-[--gray-100] py-2 rounded flex flex-col space-y-4 px-4 md:hidden'>
                <Search></Search>
                <div className='flex items-center justify-between'>
                    <Currency></Currency>
                    <BiReset onClick={resetFunction} className='text-2xl text-[--blue]' />
                </div>
                <Sort></Sort>
            </div>
        </div>
    );
};

export default Filter;