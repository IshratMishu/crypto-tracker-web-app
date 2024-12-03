'use client'
import useCryptoContext from '@/Hooks/useCryptoContext';
import React, { useEffect, useRef, useState } from 'react';
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { MdNextPlan } from 'react-icons/md';

const PerPage = () => {
    const { setPerPage } = useCryptoContext();
    const inputRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        let val = inputRef.current.value;
        if (val !== 0) {
            setPerPage(val);
            inputRef.current.value = val;
        }
    }

    return (
        <form className='flex items-center text-sm mr-6' onSubmit={handleSubmit}>
            <label className='font-semibold'>Per Page:</label>
            <input type="number" name="page" min={1} max={200} placeholder='10' className='bg-[--gray-200] text-[gray-100] rounded pl-1 py-0.5 outline-0 w-10 border border-transparent focus:border-[--blue] ml-2' ref={inputRef} />
            <button type="submit"><MdNextPlan className='text-xl text-[--blue]' /></button>
        </form>
    )
}


const Pagination = () => {
    const { page, setPage, totalPages, perPage } = useCryptoContext();
    const TotalNumber = Math.ceil(totalPages / perPage);


    const next = () => {
        if (page === TotalNumber) {
            return null;
        } else {
            setPage(page + 1);
        }
    }

    const prev = () => {
        if (page === 1) {
            return null;
        } else {
            setPage(page - 1);
        }
    }

    const multiStepNext = () => {
        if (page + 3 >= TotalNumber) {
            setPage(TotalNumber - 1)
        } else {
            setPage(page + 3)
        }
    }

    const multiStepPrev = () => {
        if (page - 3 <= 1) {
            setPage(TotalNumber + 1)
        } else {
            setPage(page - 2)
        }
    }


    return (
        <div className='flex gap-1 items-center list-none text-xs font-semibold text-white'>
            <PerPage></PerPage>
            <button onClick={prev}><FaCircleArrowLeft className='text-2xl text-[--blue]' /></button>
            {page + 1 === TotalNumber || page === TotalNumber ?
                <li><button onClick={multiStepPrev} className='text-lg hover:text-[--blue]'>...</button></li> : null
            }

            {page - 1 !== 0 ?
                <li><button onClick={prev} className='bg-[--gray-200] w-7 h-7 rounded-full hover:text-[--blue]'>{page - 1}</button></li> : null
            }

            <li><button disabled className='w-7 h-7 rounded-full text-black bg-[--blue]'>{page}</button></li>

            {page + 1 !== TotalNumber && page !== TotalNumber ?
                <li><button onClick={next} className='bg-[--gray-200] w-7 h-7 rounded-full hover:text-[--blue]'>{page + 1}</button></li> : null
            }

            {
                page + 1 !== TotalNumber && page !== TotalNumber ?
                    <li><button onClick={multiStepNext} className='text-lg hover:text-[--blue]'>...</button></li> : null
            }

            {
                page !== TotalNumber ? <li><button onClick={() => setPage(TotalNumber)} className='bg-[--gray-200] w-7 h-7 rounded-full hover:text-[--blue]'>{TotalNumber}</button></li> : null
            }

            <button onClick={next}><FaCircleArrowRight className='text-2xl text-[--blue]' /></button>
        </div>
    );
};

export default Pagination;