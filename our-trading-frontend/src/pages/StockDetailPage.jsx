import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function StockDetails() {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("1"); // days
  const [chartData, setChartData] = useState([]);

  // Fetch Coin details first
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((res) => res.json()) 
      .then((data) => {
        setCoin(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [coinId]);

  // Then fetch Market Chart when timeframe or coinId changes
  useEffect(() => {
    if (!coinId) return;

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeframe}`
    )
      .then((res) => res.json()) 
      .then((data) => {
        // Transform prices to {time, price} format
        const parsed = data.prices?.map((item) => ({
          time: new Date(item[0]).toLocaleString(), 
          price: item[1],
        }))
        setChartData(parsed);
      })
      .catch((err) => console.error(err));  
  }, [coinId, timeframe]);

  if (loading) return <div>Loading...</div>;
  if (!coin) return <div>Not found</div>;

  return (
    <div className="p-6">
      {/* Coin Summary */}
      <h1 className="text-2xl font-semibold mb-4">
        {coin?.name} ({coin?.symbol?.toUpperCase()})
      </h1>
      <p>Current price: ${coin?.market_data?.current_price?.usd?.toLocaleString()}</p>
      <p>Market Cap: ${coin?.market_data?.market_cap?.usd?.toLocaleString()}</p>
      <p>24h High: ${coin?.market_data?.high_24h?.usd?.toLocaleString()}</p>
      <p>24h Low: ${coin?.market_data?.low_24h?.usd?.toLocaleString()}</p>

      {/* Timeframe Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setTimeframe("1")} 
          className={`px-3 py-1 ${timeframe === "1" ? "bg-gray-800 text-gray-100" : "bg-gray-500"}`}
        >
          1 Day
        </button>
        <button
          onClick={() => setTimeframe("7")} 
          className={`px-3 py-1 ${timeframe === "7" ? "bg-gray-800 text-gray-100" : "bg-gray-500"}`}
        >
          1 Week
        </button>
        <button
          onClick={() => setTimeframe("30")} 
          className={`px-3 py-1 ${timeframe === "30" ? "bg-gray-800 text-gray-100" : "bg-gray-500"}`}
        >
          1 Month
        </button>
      </div>

      {/* Market Chart */}
      <div className="bg-gray-900 p-4 mt-6">
        <LineChart width={720} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="time" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }}/>
          <Tooltip wrapperClassName="bg-gray-800 text-gray-100 p-2" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </div>
    </div>
  )
}

export default StockDetails;
