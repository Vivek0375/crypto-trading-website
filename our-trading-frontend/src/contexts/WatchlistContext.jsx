import React, { createContext, useState, useEffect } from "react";

// 1. Create context
export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlistIDs, setWatchlistIDs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || []; 
    setWatchlistIDs(saved);
  }, []);

  const addToWatchlist = (id) => {
    if (!watchlistIDs.includes(id)) {
      const updated = [...watchlistIDs, id];
      setWatchlistIDs(updated);
      localStorage.setItem("watchlist", JSON.stringify(updated)); 
    }
  };

  const removeFromWatchlist = (id) => {
    const updated = watchlistIDs.filter((item) => item !== id);
    setWatchlistIDs(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated)); 
  };

  return (
    <WatchlistContext.Provider value={{ watchlistIDs, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}
