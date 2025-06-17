import React, { useState, useEffect } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Persistent watchlist IDs
  const [watchlistIDs, setWatchlistIDs] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : ["bitcoin", "ethereum", "tether", "dogecoin"];
  });

  useEffect(() => {
    async function fetchWatchlist() {
      setLoading(true);
      setError(null);
      try {
        if (watchlistIDs.length === 0) {
          setCoins([]);
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${watchlistIDs.join(",")}`
        );
        if (!res.ok) throw new Error("Failed to fetch from CoinGecko.");
        const data = await res.json();

        setCoins(data);
      } catch (err) {
        setError(err?.message || "Unknown error.");
      } finally {
        setLoading(false);
      }
    }
    fetchWatchlist();
  }, [watchlistIDs]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlistIDs));
  }, [watchlistIDs]);

  function handleRemove(id) {
    const updated = watchlistIDs.filter((coinId) => coinId !== id);
    setWatchlistIDs(updated);
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoins.length / pageSize);
  const pageCoins = filteredCoins.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Watchlist</h1>

      <input
        type="text"
        placeholder="Search coin..."
        className="mb-4 p-2 rounded bg-gray-800 text-gray-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="text-gray-100">Loading watchlist...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-gray-400">
                <th className="p-3 text-left">Coin</th>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Volume</th>
                <th className="p-3 text-left">Market Cap</th>
                <th className="p-3 text-left">24h Change</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Remove</th>
              </tr>
            </thead>
            <tbody>
              {pageCoins.map((coin) => (
                <tr key={coin.id} className="border-t border-gray-700">
                  <td className="p-3 flex items-center space-x-2">
                    <img src={coin.image} alt="" className="w-5 h-5" />
                    <span className="text-gray-100">{coin.name}</span>
                  </td>
                  <td className="p-3 text-gray-400">{coin.symbol.toUpperCase()}</td>
                  <td className="p-3 text-gray-400">
                    {new Intl.NumberFormat("en-US").format(coin.total_volume)}
                  </td>
                  <td className="p-3 text-gray-400">
                    {new Intl.NumberFormat("en-US").format(coin.market_cap)}
                  </td>
                  <td
                    className={`p-3 ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="p-3 text-gray-100">
                    {formatter.format(coin.current_price)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemove(coin.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCoins.length > pageSize && (
            <div className="mt-4 flex space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="bg-gray-700 text-gray-100 px-3 py-1 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-100">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="bg-gray-700 text-gray-100 px-3 py-1 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Watchlist;



