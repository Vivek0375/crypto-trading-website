import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// List of IDs we want from CoinGecko
const portfolioIds = [
  "bitcoin",
  "dogecoin",
  "ethereum",
  "tether",
  "usd-coin",
  "ripple",
  "cardano",
  "solana",
  "polkadot",
  "litecoin",
  "chainlink",
  "avalanche",
  "matic-network",
  "tron",
  "uniswap",
  // you can add more if you wish
];

// Number of coins per page
const COINS_PER_PAGE = 5;

function Portfolio() {
  const [coins, setCoins] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${portfolioIds.join(",")}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch portfolio.");
        }
        const data = await res.json();

        setCoins(data);
      } catch (err) {
        setError(err?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-100">Loading portfolio...</div>;
  }
  
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }
  
  // Filter by search
  const filtered = coins?.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase()) 
  );

  // Pagination
  const startIdx = (currentPage - 1) * COINS_PER_PAGE;
  const paginated = filtered?.slice(startIdx, startIdx + COINS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / COINS_PER_PAGE);

  return (
    <div className="p-6">
      {/* Header with Title and Trade button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-500">
          My Portfolio
        </h1>
        <Link to="/trade" className="p-2 bg-blue-500 text-gray-100 rounded-md">
          Trade
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or symbol"
        className="p-2 mb-4 rounded-md border border-gray-500 bg-gray-900 text-gray-100"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-gray-900 p-4 rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-gray-400 text-left">Assets</th>
              <th className="p-3 text-gray-400 text-right">PRICE</th>
              <th className="p-3 text-gray-400 text-right">CHANGE</th>
              <th className="p-3 text-gray-400 text-right">CHANGE(%)</th>
            </tr>
          </thead>
          <tbody>
            {paginated?.map((coin) => (
              <tr key={coin.id} className="border-b border-gray-800">
                <td className="p-3 flex items-center gap-2 text-gray-100">
                   <img src={coin.image} alt="" className="w-6 h-6" />
                   <span className="font-semibold">{coin.name}</span>
                </td>
                <td className="p-3 text-gray-100 text-right">
                   {new Intl.NumberFormat("en-US", {
                     style: "currency",
                     currency: "USD",
                   }).format(coin.current_price)}
                </td>
                <td
                   className={`p-3 text-right ${
                     coin.price_change_24h >= 0 ? "text-green-500" : "text-red-500"
                   }`}
                 >
                   {new Intl.NumberFormat("en-US", {
                     style: "currency",
                     currency: "USD",
                   }).format(coin.price_change_24h)}
                </td>
                <td
                   className={`p-3 text-right ${
                     coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                   }`}
                 >
                   {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>)
            )}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="p-3 text-gray-500 text-center">
                   No matching results.
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="p-2 bg-gray-700 text-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-100">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="p-2 bg-gray-700 text-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Portfolio;
