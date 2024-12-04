'use client'
import { StorageContext } from '@/Context API/StorageContext';
import useCryptoContext from '@/Hooks/useCryptoContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { CiStar } from 'react-icons/ci';

const SavedBTN = ({ asset }) => {
    const { saveCoin, allCoin, removeCoin } = useContext(StorageContext);

    const handleSaved = (e) => {
        e.preventDefault();
        saveCoin(asset.id);

        if (allCoin.includes(asset.id)) {
            removeCoin(asset.id);
        } else {
            saveCoin(asset.id);
        }
    }

    return (
        <CiStar onClick={(e) => handleSaved(e)} className={`${allCoin.includes(asset.id) ? 'text-[--blue]' : 'text-[--gray-100]'} text-2xl cursor-pointer hover:text-[--blue]`} />
    )
}

const Saved = () => {
    const { showCoin } = useContext(StorageContext);
    const { currency } = useCryptoContext();

    return (
        <div>
            <div className='border border-[--gray-100] rounded min-h-[60vh]'>
                {
                    showCoin.length ===0 ?
                    ( <div className='border border-[--gray-100] rounded min-h-[60vh] flex flex-col items-center justify-center text-[--blue] text-xl font-medium text-center'>
                        <h1>mmm..You haven’t saved any coins yet!🧐</h1>
                        <p className='flex gap-2'>Go <Link href={'/'} className='text-[--gray-100] border-b hover:border-[--blue] hover:text-[--blue]'>Crypto</Link> Page & 
                        <span className='flex items-center'>Save<CiStar className="text-[--blue] text-2xl" /></span>
                        </p>
                    </div>)
                    :
                       ( <table className='w-full'>
                            <thead className='border-[--gray-100] border-b text-[--gray-100] font-medium'>
                                <tr>
                                    <th className='py-1'>Asset</th>
                                    <th className='py-1 md:table-cell hidden'>Name</th>
                                    <th className='py-1'>Price</th>
                                    <th className='py-1 md:table-cell hidden'>Total Volume</th>
                                    <th className='py-1 md:table-cell hidden'>Market Cap Change</th>
                                    <th className='py-1 lg:table-cell hidden'>1H</th>
                                    <th className='py-1 lg:table-cell hidden'>24H</th>
                                    <th className='py-1 lg:table-cell hidden'>7D</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                        showCoin.map((asset) => (
                                            <tr
                                                key={asset.id}
                                                className="text-center border-b border-[--gray-100] hover:bg-[--gray-200] last:border-b-0"
                                            >
                                                <td className="py-4 flex items-center gap-2 uppercase text-white">
                                                    <SavedBTN asset={asset} />
                                                    <Image height={50} width={50} src={asset.image} alt={asset.name} className='w-5 h-5'></Image>
                                                    <span className='cursor-pointer'>{asset.symbol}</span>
                                                </td>
                                                <td className="py-4 text-white md:table-cell hidden">{asset.name}</td>
                                                <td className="py-4 text-white">
                                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(
                                                        asset.current_price
                                                    )}
                                                </td>
                                                <td className="py-4 text-white md:table-cell hidden">{asset.total_volume}</td>

                                                <td className={`${asset.market_cap_change_percentage_24h > 0 ? 'text-[--green]' : 'text-[--red]'} py-4 md:table-cell hidden`}>{Number(asset.market_cap_change_percentage_24h).toFixed(2)}%</td>

                                                <td className={`${asset.price_change_percentage_1h_in_currency > 0 ? 'text-[--green]' : 'text-[--red]'} py-4 lg:table-cell hidden`}>{Number(asset.price_change_percentage_1h_in_currency).toFixed(2)}%</td>

                                                <td className={`${asset.price_change_percentage_24h_in_currency > 0 ? 'text-[--green]' : 'text-[--red]'} py-4 lg:table-cell hidden`}>{Number(asset.price_change_percentage_24h_in_currency).toFixed(2)}%</td>

                                                <td className={`${asset.price_change_percentage_7d_in_currency > 0 ? 'text-[--green]' : 'text-[--red]'} py-4 lg:table-cell hidden`}>{Number(asset.price_change_percentage_7d_in_currency).toFixed(2)}%</td>
                                            </tr>
                                        ))
                                }

                            </tbody>
                        </table>)
                        
                      
                }
            </div>
        </div>
    );
};

export default Saved;