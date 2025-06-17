import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-4 w-60">
      <h2 className="text-2xl font-semibold mb-6">Trading Platform</h2>

      <ul className="flex flex-col gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/watchlist">Watchlist</Link>
        </li>
        <li>
          <Link to="/wallet">Wallet</Link>
        </li>
        <li>
          <Link to="/payment-details">Payment</Link>
        </li>
        <li>
          <Link to="/withdraw">Withdraw</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/Activity">Activity</Link>
        </li>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 p-2 rounded mt-4"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 p-2 rounded mt-4"
          >
            Login
          </Link>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;


