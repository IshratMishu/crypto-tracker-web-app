import React from 'react';
import Search from './Search';
import Currency from './Currency';
import Sort from './Sort';

const Filter = () => {
    return (
        <div className='text-white border-2 border-[--gray-100] h-10 rounded flex items-center justify-between px-4'>
            <Search></Search>
            <Currency></Currency>
            <Sort></Sort>
        </div>
    );
};

export default Filter;