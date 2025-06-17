// src/pages/Home.jsx
import React from "react";
import useCryptoStats from "../hooks/useCryptoStats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Home() {
  const { data, loading, error } = useCryptoStats();

  const cryptoNames = {
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    solana: "Solana",
    cardano: "Cardano",
    ripple: "Ripple",
  };

  // Prepare chart data
  const chartData = Object.keys(data).map((coin) => ({
    name: cryptoNames[coin],
    price: data[coin]?.usd,
    change: data[coin]?.usd_24h_change,
  }));

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center mb-10">📊 Live Crypto Stats</h1>

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : (
        <div className="space-y-6">
          {/* Coin Prices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(data).map((coin) => (
              <div
                key={coin}
                className="bg-gray-700 rounded-xl shadow-lg p-5 transition-transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold mb-2">{cryptoNames[coin]}</h2>
                <p>💰 Price: ${data[coin]?.usd}</p>
                <p>
                  📈 24h Change: {data[coin]?.usd_24h_change.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>

          

          {/* Chart */}
          <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Price Comparison Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#00bcd4" strokeWidth={2} name="Price (USD)" />
                <Line type="monotone" dataKey="change" stroke="#4caf50" strokeWidth={2} name="24h Change (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default Home;
