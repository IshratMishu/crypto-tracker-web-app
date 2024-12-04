'use client'
import useCryptoContext from '@/Hooks/useCryptoContext';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiSolidUpArrow } from 'react-icons/bi';
import { RxCross1 } from "react-icons/rx";
import Chart from './Chart';
import { FaFacebook, FaGithub, FaReddit } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

const Indicator = ({ currentPrice, high, low }) => {
    const [green, setGreen] = useState();

    useEffect(() => {
        const total = high - low;
        const greenZone = ((high - currentPrice) * 100) / total;
        setGreen(Math.ceil(greenZone))
    }, [currentPrice, high, low])

    return (
        <>
            <span className='bg-[--red] h-1.5 rounded-l-lg w-1/2' style={{ width: `${100 - green}%` }}>&nbsp;</span>
            <span className='bg-[--green] h-1.5 rounded-r-lg w-1/2' style={{ width: `${green}%` }}>&nbsp;</span>
        </>
    )
}

const CoinDetails = ({ coin, onClose }) => {
    const { currency } = useCryptoContext();
    if (!coin) {
        return (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="flex flex-col items-center justify-center h-64 text-white">
                    <span>Loading...</span>
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="w-5 h-5 animate-[ping_2s_linear_infinite] border rounded-full border-white"></div>
                        <div className="w-5 h-5 animate-[ping_2s_linear_3s_infinite] border rounded-full border-white absolute"></div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 max-w-screen-xl mx-auto'>
            <div className='md:w-[75%] w-[90%] top-5 bg-[#212121] bg-opacity-80 rounded text-white relative max-h-[90vh] overflow-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2 p-2'>
                        <Image width={50} height={50} src={coin.image.large} alt={coin.name} className='h-10 w-10'></Image>
                        <h1 className='text-2xl capitalize font-semibold'>{coin.name}</h1>
                        <span className='text-xs px-2 py-0.5 bg-blue-500 bg-opacity-25 text-[--blue] rounded uppercase'>{coin.symbol}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-1 right-1 hover:text-[--blue]"><RxCross1 /> </button>
                </div>
                <div className='flex flex-col lg:flex-row gap-5 p-4 relative'>

                    <div className='lg:w-[45%] w-full flex flex-col'>
                        <div className='flex items-center justify-between'>
                            <span className='text-sm text-[--gray-100]'>Price</span>
                            <span className={`text-xs font-medium rounded bg-opacity-25 px-1.5 py-0.5 flex items-center gap-1 ${coin.market_data.price_change_percentage_24h > 0 ? 'text-[--green] bg-[#37c77d]' : 'text-[--red] bg-[#e57373]'}`}>
                                {Number(coin.market_data.price_change_percentage_24h).toFixed(2)}% <BiSolidUpArrow className={`${coin.market_data.price_change_percentage_24h > 0 ? 'text-[--green]' : 'text-[--red] rotate-180'}`} />
                            </span>
                        </div>
                        <h2 className='text-xl font-bold pt-0.5'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumSignificantDigits: 5 }).format(
                            coin.market_data.current_price[currency]
                        )}</h2>
                        <div className='flex md:flex-row flex-col md:items-center justify-between mt-4 md:space-y-0 space-y-2'>
                            <div>
                                <span className='text-sm text-[--gray-100]'>Market Cap</span>
                                <h2 className='font-semibold'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(
                                    coin.market_data.market_cap[currency]
                                )}</h2>
                            </div>
                            <div>
                                <span className='text-sm text-[--gray-100]'>Fully Diluted Valuation</span>
                                <h2 className='font-semibold'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, notation: "compact" }).format(
                                    coin.market_data.fully_diluted_valuation[currency]
                                )}</h2>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <span className='text-sm text-[--gray-100]'>Total Volume</span>
                            <h2 className='font-semibold'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(
                                coin.market_data.total_volume[currency]
                            )}</h2>
                        </div>

                        <div className='w-full mt-4 flex'>
                            <Indicator
                                currentPrice={coin.market_data.current_price[currency]}
                                high={coin.market_data.high_24h[currency]}
                                low={coin.market_data.low_24h[currency]}
                            />
                        </div>

                        <div className='flex items-center justify-between mt-4'>
                            <div>
                                <span className='text-sm text-[--gray-100]'>Low 24H</span>
                                <h2 className='font-semibold'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 5 }).format(
                                    coin.market_data.low_24h[currency]
                                )}</h2>
                            </div>
                            <div>
                                <span className='text-sm text-[--gray-100]'>High 24H</span>
                                <h2 className='font-semibold'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 5 }).format(
                                    coin.market_data.high_24h[currency]
                                )}</h2>
                            </div>
                        </div>

                        <div className='flex items-center justify-between mt-4'>
                            <div>
                                <span className='text-sm text-[--gray-100]'>Max Supply</span>
                                <h2 className='font-semibold'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(
                                    coin.market_data.max_supply
                                )}</h2>
                            </div>
                            <div>
                                <span className='text-sm text-[--gray-100]'>Circulating Supply</span>
                                <h2 className='font-semibold'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(
                                    coin.market_data.circulating_supply
                                )}</h2>
                            </div>
                        </div>

                        <div className='mt-4 flex justify-between'>
                            <div className='flex flex-col gap-1 text-sm'>
                                <a className='bg-[--gray-200] text-[--gray-100] px-1 rounded' target={'_blank'} rel="noopener noreferrer" href={coin?.links?.homepage[0]}>{coin?.links?.homepage[0].substring(0, 30)}</a>
                                <a className='bg-[--gray-200] text-[--gray-100] px-1 rounded' target={'_blank'} rel="noopener noreferrer" href={coin?.links?.blockchain_site[0]}>{coin?.links?.blockchain_site[0].substring(0, 30)}</a>
                                {
                                    coin?.links?.official_forum_url[0] &&
                                    <a className='bg-[--gray-200] text-[--gray-100] px-1 rounded' target={'_blank'} rel="noopener noreferrer" href={coin?.links?.official_forum_url[0]}>{coin?.links?.official_forum_url[0].substring(0, 30)}</a>
                                }

                            </div>
                            <div>
                                <p className='text-sm text-[--gray-100]'>Sentiment</p>
                                <div className='flex flex-col gap-1'>
                                    <span className="text-xs font-medium rounded bg-opacity-25 px-1.5 py-0.5 flex items-center gap-1 text-[--green] bg-[#37c77d]">
                                        {Number(coin.sentiment_votes_up_percentage).toFixed(2)}% <BiSolidUpArrow />
                                    </span>
                                    <span className="text-xs font-medium rounded bg-opacity-25 px-1.5 py-0.5 flex items-center gap-1 text-[--red] bg-[#e57373]">
                                        {Number(coin.sentiment_votes_down_percentage).toFixed(2)}% <BiSolidUpArrow className='rotate-180' />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col lg:w-[55%] w-full' >
                        <Chart id={coin.id}></Chart>
                        <div className='md:mt-8 mt-12 text-sm space-y-2'>
                            <h3 className='text-[--gray-100]'>Market Cap Rank: <span className='text-white font-medium'>{coin.market_cap_rank}</span></h3>
                            <h3 className='text-[--gray-100]'>Watchlist Portfolio Users: <span className='text-white font-medium'>{coin.watchlist_portfolio_users}</span></h3>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 md:absolute bottom-6 right-6 text-2xl text-[--blue]'>
                        {
                            coin?.links?.repos_url?.github[0] &&
                            <a href={coin?.links?.repos_url?.github[0]} target='_blank'><FaGithub /></a>
                        }

                        {
                            coin?.links?.twitter_screen_name &&
                            <a href={`https://x.com/${coin?.links?.twitter_screen_name}`} target='_blank'><FaSquareXTwitter /></a>
                        }

                        {
                            coin?.links?.subreddit_url &&
                            <a href={coin?.links?.subreddit_url} target='_blank'><FaReddit /></a>
                        }

                        {
                            coin?.links?.facebook_username &&
                            <a href={`https://www.facebook.com/${coin?.links?.facebook_username}`} target='_blank'><FaFacebook /></a>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};


export default CoinDetails;