// src/pages/Activity.jsx
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// Format price nicely
function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

const Activity = () => {
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Mock API
        const data = [
          {
            id: 1,
            datetime: "2024-05-31T12:39:32Z",
            pair: { name: "Bitcoin", symbol: "BTC", logo: "/images/bitcoin.png" },
            buyPrice: 68234,
            sellPrice: 0,
            orderType: "BUY",
            profitOrLoss: 0,
            amount: 100.3,
          },
          {
            id: 2,
            datetime: "2024-06-01T09:04:05Z",
            pair: { name: "Dogecoin", symbol: "DOGE", logo: "/images/dogecoin.png" },
            buyPrice: 0.159409,
            sellPrice: 0.159173,
            orderType: "SELL",
            profitOrLoss: -0.0002359,
            amount: 50,
          },
        ];

        setActivities(data);
      } catch (err) {
        setError(err?.message || "Failed to fetch.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }
  
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Trading History</h1>

      <table className="w-full text-gray-400">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2">Date & Time</th>
            <th className="text-left py-2">Trading Pair</th>
            <th className="text-left py-2">Buy Price</th>
            <th className="text-left py-2">Selling Price</th>
            <th className="text-left py-2">Order Type</th>
            <th className="text-left py-2">Profit/Loss</th>
            <th className="text-left py-2">VALUE</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item) => (
            <tr key={item.id} className="border-b border-gray-800">
              <td className="py-2">
                {format(new Date(item.datetime), "yyyy-MM-dd HH:mm:ss")} 
              </td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                   <img src={item.pair.logo} alt="" className="w-6 h-6" />
                   {item.pair.name}
                </div>
              </td>
              <td className="py-2">{formatPrice(item.buyPrice)}</td>
              <td className="py-2">{formatPrice(item.sellPrice)}</td>
              <td className="py-2">
                <span
                   className={`px-2 py-1 rounded ${
                     item.orderType === "BUY" ? "bg-green-900 text-green-500" : "bg-red-900 text-red-500"
                   }`}
                 >
                   {item.orderType}
                 </span>
               </td>
              <td className="py-2">
                <span
                   className={
                     item.profitOrLoss >= 0 ? "text-green-500" : "text-red-500"
                   }
                 >
                   {item.profitOrLoss < 0 ? "-" : "+"}
                   {formatPrice(Math.abs(item.profitOrLoss))}
                 </span>
               </td>
              <td className="py-2">{formatPrice(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Activity;

