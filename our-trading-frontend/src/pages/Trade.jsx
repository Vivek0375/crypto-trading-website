// src/pages/Trade.jsx
import React, { useState, useEffect } from "react";

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
];

// Simulating User's balance in USD
const USER_BALANCE = 4400.53;

// Simulating User's holdings in coins
const USER_PORTFOLIO = {
  bitcoin: 10,
  ethereum: 50,
  cardano: 500,
};

function Trade() {
  const [coins, setCoins] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("buy"); // buy or sell

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${portfolioIds.join(",")}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch coins.");
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

  const handleTrade = () => {
    if (!selected) {
      alert("Please select a coin.");
      return;
    }
    if (!amount) {
      alert("Please enter amount.");
      return;
    }
    const coin = coins.find((c) => c.id === selected);
    if (!coin) return;

    if (action === "buy") {
      if (parseFloat(amount) > USER_BALANCE) {
        alert("Your current balance is low.");
        return;
      }
      const qty = parseFloat(amount) / coin.current_price;
      alert(
        `You successfully bought ${qty.toFixed(6)} ${coin.symbol.toUpperCase()} for $${amount}`
      );
    } else {
      // Sell
      const holdings = USER_PORTFOLIO[selected] || 0;
      if (parseFloat(amount) > holdings) {
        alert(
          `Your holdings of ${coin.symbol.toUpperCase()} are too low. You have only ${holdings}`
        );
        return;
      }
      const total = parseFloat(amount) * coin.current_price;
      alert(
        `You successfully sold ${amount} ${coin.symbol.toUpperCase()} for $${total}`
      );
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-100">Loading...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-500">
        Trade
      </h1>

      <div className="bg-gray-900 p-4 rounded-md shadow-md max-w-md">
        {/* Action Select (Buy or Sell) */}
        <label htmlFor="action" className="block text-gray-400 mb-2">
          Action:
        </label>
        <select
          id="action"
          className="p-2 mb-4 w-full rounded-md border border-gray-500 bg-gray-900 text-gray-100"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>

        {/* Select Coin */}
        <label htmlFor="coin" className="block text-gray-400 mb-2">
          Select Coin:
        </label>
        <select
          id="coin"
          className="p-2 mb-4 w-full rounded-md border border-gray-500 bg-gray-900 text-gray-100"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">--Choose a Coin--</option>
          {coins?.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} ({coin.symbol.toUpperCase()}) - ${coin.current_price}
            </option>
          ))}
        </select>

        {/* Enter Amount */}
        <label htmlFor="amount" className="block text-gray-400 mb-2">
          {action === "buy" ? "Amount in USD:" : "How much to Sell?"}
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          className="p-2 mb-4 w-full rounded-md border border-gray-500 bg-gray-900 text-gray-100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={action === "buy" ? "Enter amount in USD" : "Enter amount of Coin"}
        />

        {/* Trade Button */}
        <button
          onClick={handleTrade}
          className="p-2 w-full bg-blue-500 text-gray-100 font-semibold rounded-md"
        >
          {action === "buy" ? "Buy" : "Sell"}
        </button>

        {/* User's balance or holdings info */}
        <div className="mt-4 text-gray-400">
          {action === "buy"
            ? `Your balance: $${USER_BALANCE.toLocaleString()}`
            : `Your holdings: ${
                USER_PORTFOLIO[selected] !== undefined
                   ? `${USER_PORTFOLIO[selected]} ${selected.toUpperCase()}`
                   : "0"
              }`}
        </div>
      </div>
    </div>
  )
}

export default Trade;
