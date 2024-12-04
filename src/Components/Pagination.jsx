'use client'
import useCryptoContext from '@/Hooks/useCryptoContext';
import React, { useRef } from 'react';
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
        <form className='flex items-center text-sm mr-6 mx-auto' onSubmit={handleSubmit}>
            <label className='font-semibold'>Per Page:</label>
            <input type="text" name="page" placeholder='10' className='bg-[--gray-200] text-[gray-100] rounded pl-1 py-0.5 outline-0 w-10 border border-transparent focus:border-[--blue] ml-2' ref={inputRef} />
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
        <div className='flex md:flex-row flex-col md:space-y-0 space-y-4 text-xs font-semibold text-white md:mt-0 mt-4'>
            <PerPage></PerPage>
          <div className='flex gap-2 items-center'>
          <button onClick={prev}><FaCircleArrowLeft className='text-2xl text-[--blue]' /></button>
            {page + 1 === TotalNumber || page === TotalNumber ?
                <button onClick={multiStepPrev} className='text-lg hover:text-[--blue]'>...</button> : null
            }

            {page - 1 !== 0 ?
                <button onClick={prev} className='bg-[--gray-200] w-7 h-7 rounded-full hover:text-[--blue]'>{page - 1}</button> : null
            }

            <button disabled className='w-7 h-7 rounded-full text-black bg-[--blue]'>{page}</button>

            {page + 1 !== TotalNumber && page !== TotalNumber ?
               <button onClick={next} className='bg-[--gray-200] w-7 h-7 rounded-full hover:text-[--blue]'>{page + 1}</button> : null
            }

            {
                page + 1 !== TotalNumber && page !== TotalNumber ?
                    <button onClick={multiStepNext} className='text-lg hover:text-[--blue]'>...</button> : null
            }

            {
                page !== TotalNumber ? <button onClick={() => setPage(TotalNumber)} className='bg-[--gray-200] w-7 h-7 rounded-full hover:text-[--blue]'>{TotalNumber}</button> : null
            }

            <button onClick={next}><FaCircleArrowRight className='text-2xl text-[--blue]' /></button>
          </div>
        </div>
    );
};



export default Pagination;