import useCryptoContext from '@/Hooks/useCryptoContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

function CustomTooltip({ payload, label, active, currency = "usd" }) {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label text-sm text-[--blue]">{`${label} : ${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 5 }).format(payload[0].value)}`}</p>
            </div>
        );
    }

    return null;
}

const ChartComponent = ({ data, currency }) => {
    return (
                <LineChart width={400} height={250} data={data}>
                <Line type="monotone" dataKey="prices" stroke="#00b4d8" strokeWidth={'2px'} />
                <CartesianGrid stroke="#323232" />
                <XAxis dataKey="date" hide />
                <YAxis dataKey="prices" hide domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} />
                <Legend />
            </LineChart>
    )
}


const Chart = ({ id }) => {
    const [chartData, setChartData] = useState();
    const { currency } = useCryptoContext();

    useEffect(() => {
        const getChartData = async (id) => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&precision=2`, {
                    headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_CG_API_KEY }
                })

                const convertedData = response.data.prices.map(item => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        prices: item[1]
                    }
                })
                setChartData(convertedData);
            } catch (error) {
                console.log(error);
            }
        }
        getChartData(id)
    }, [id])

    return (
        <div className='w-full'>
            <ChartComponent data={chartData} currency={currency} />
        </div>
    );
};

export default Chart;
