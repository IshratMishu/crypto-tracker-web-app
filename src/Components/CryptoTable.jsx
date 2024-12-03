'use client'
import useCryptoContext from '@/Hooks/useCryptoContext';
import Image from 'next/image';
import React, { useState } from 'react';
import { CiStar } from "react-icons/ci";
// import Pagination from './Pagination';
import dynamic from 'next/dynamic';
import CoinDetails from './CoinDetails';


const Pagination = dynamic(() => import('../Components/Pagination'), { ssr: false });

const CryptoTable = () => {
    const { assets, currency, getCoinById, coin } = useCryptoContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = async (asset) => {
        await getCoinById(asset.id); 
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="overflow-x-auto border border-[--gray-100] rounded mt-10">
                <table className='w-full'>
                    <thead className='border-[--gray-100] border-b text-[--gray-100] font-medium'>
                        <tr>
                            <th className='py-1'>Asset</th>
                            <th className='py-1'>Name</th>
                            <th className='py-1'>Price</th>
                            <th className='py-1'>Total Volume</th>
                            <th className='py-1'>Market Cap Change</th>
                            <th className='py-1'>1H</th>
                            <th className='py-1'>24H</th>
                            <th className='py-1'>7D</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assets?.length === 0 ?
                                <tr>
                                    <td colSpan="100%">
                                        <div className="flex flex-col items-center justify-center h-64 text-white">
                                            <span>Loading...</span>
                                            <div className="relative w-10 h-10 flex items-center justify-center">
                                                <div className="w-5 h-5 animate-[ping_2s_linear_infinite] border rounded-full border-white"></div>
                                                <div className="w-5 h-5 animate-[ping_2s_linear_3s_infinite] border rounded-full border-white absolute"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                :
                                assets?.map((asset) => (
                                    <tr
                                        key={asset.id}
                                        className="text-center border-b border-[--gray-100] hover:bg-[--gray-200] last:border-b-0"
                                    >
                                        <td className="py-4 flex items-center gap-2 uppercase text-white">
                                            <CiStar className='text-2xl cursor-pointer text-[--gray-100] hover:text-[--blue]' />
                                            <Image height={50} width={50} src={asset.image} alt={asset.name} className='w-5 h-5'></Image>
                                            <span className='cursor-pointer' onClick={() => handleOpenModal(asset)}>{asset.symbol}</span>
                                        </td>
                                        <td className="py-4 text-white">{asset.name}</td>
                                        <td className="py-4 text-white">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(
                                                asset.current_price
                                            )}
                                        </td>
                                        <td className="py-4 text-white">{asset.total_volume}</td>

                                        <td className={`${asset.market_cap_change_percentage_24h > 0 ? 'text-[--green]' : 'text-[--red]'} py-4`}>{Number(asset.market_cap_change_percentage_24h).toFixed(2)}%</td>

                                        <td className={`${asset.price_change_percentage_1h_in_currency > 0 ? 'text-[--green]' : 'text-[--red]'} py-4`}>{Number(asset.price_change_percentage_1h_in_currency).toFixed(2)}%</td>

                                        <td className={`${asset.price_change_percentage_24h_in_currency > 0 ? 'text-[--green]' : 'text-[--red]'} py-4`}>{Number(asset.price_change_percentage_24h_in_currency).toFixed(2)}%</td>

                                        <td className={`${asset.price_change_percentage_7d_in_currency > 0 ? 'text-[--green]' : 'text-[--red]'} py-4`}>{Number(asset.price_change_percentage_7d_in_currency).toFixed(2)}%</td>
                                    </tr>
                                ))
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-between mt-5'>
                <span className='text-white'>Data provided by <a className='text-[--blue]' target="_blank" rel="noopener noreferrer" href="https://www.coingecko.com/">CoinGecko</a></span>
                <Pagination></Pagination>
            </div>

            {/* Modal */}
      {isModalOpen && (
        <CoinDetails coin={coin} onClose={handleCloseModal} />
      )}
        </div>
    );
};

export default CryptoTable;