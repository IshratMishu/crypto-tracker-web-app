import useCryptoContext from '@/Hooks/useCryptoContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

function CustomTooltip({ payload, label, active, currency = "usd" }) {
    if (active && payload && payload.length > 0) {
        return (
            <div className="custom-tooltip">
                <p className="label text-sm text-[--blue]">{`${label} : ${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 5 }).format(payload[0].value)}`}</p>
            </div>
        );
    }

    return null;
}

const ChartComponent = ({ data, currency, type }) => {
    return (
        <LineChart width={400} height={250} data={data}>
            <Line type="monotone" dataKey={type} stroke="#00b4d8" strokeWidth={'2px'} />
            <CartesianGrid stroke="#323232" />
            <XAxis dataKey="date" hide />
            <YAxis dataKey={type} hide domain={["auto", "auto"]} />
            <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} />
            <Legend />
        </LineChart>
    )
}


const Chart = ({ id }) => {
    const [chartData, setChartData] = useState();
    const { currency } = useCryptoContext();
    const [type, setType] = useState("prices");
    const [days, setDays] = useState(7);

    useEffect(() => {
        const getChartData = async (id) => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=2`, {
                    headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
                })

                const convertedData = response.data[type].map(item => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        [type]: item[1]
                    }
                })
                setChartData(convertedData);
            } catch (error) {
                console.log(error);
            }
        }
        getChartData(id)
    }, [id, type, days])

    return (
        <div className='w-full'>
            <ChartComponent data={chartData} currency={currency} type={type} />
            <div className='flex items-center gap-2 text-sm'>
                <button className={`px-1.5 bg-opacity-25 rounded ${type === 'prices' ? 'bg-blue-500 text-[--blue]' : 'bg-[#323232] text-[--gray-100]'}`} onClick={() => setType("prices")}>Price</button>
                <button className={`px-1.5 bg-opacity-25 rounded ${type === 'market_caps' ? 'bg-blue-500 text-[--blue]' : 'bg-[#323232] text-[--gray-100]'}`} onClick={() => setType("market_caps")}>Market Cap</button>
                <button className={`px-1.5 bg-opacity-25 rounded ${type === 'total_volumes' ? 'bg-blue-500 text-[--blue]' : 'bg-[#323232] text-[--gray-100]'}`} onClick={() => setType("total_volumes")}>Total Volume</button>
                <button className={`px-1.5 bg-opacity-25 rounded ${days === 7 ? 'bg-blue-500 text-[--blue]' : 'bg-[#323232] text-[--gray-100]'}`} onClick={() => setDays(7)}>7d</button>
                <button className={`px-1.5 bg-opacity-25 rounded ${days === 14 ? 'bg-blue-500 text-[--blue]' : 'bg-[#323232] text-[--gray-100]'}`} onClick={() => setDays(14)}>14d</button>
                <button className={`px-1.5 bg-opacity-25 rounded ${days === 30 ? 'bg-blue-500 text-[--blue]' : 'bg-[#323232] text-[--gray-100]'}`} onClick={() => setDays(30)}>30d</button>
            </div>
        </div>
    );
};

export default Chart;
