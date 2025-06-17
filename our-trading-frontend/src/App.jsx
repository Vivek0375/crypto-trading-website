// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import Wallet from "./pages/wallet";
import PaymentDetails from "./pages/PaymentDetails";
import Withdraw from "./pages/withdraw";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Trade from "./pages/Trade";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-grow min-h-screen">
          <Navbar />
          <main className="flex-grow p-4">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route
                path="/portfolio"
                element={
                   <PrivateRoute>
                     <Portfolio />
                   </PrivateRoute>
                 }
              />
              <Route
                path="/watchlist"
                element={
                   <PrivateRoute>
                     <Watchlist />
                   </PrivateRoute>
                 }
              />
              <Route
                path="/wallet"
                element={
                   <PrivateRoute>
                     <Wallet />
                   </PrivateRoute>
                 }
              />
              <Route
                path="/payment-details"
                element={
                   <PrivateRoute>
                     <PaymentDetails />
                   </PrivateRoute>
                 }
              />
              <Route
                path="/withdraw"
                element={
                   <PrivateRoute>
                     <Withdraw />
                   </PrivateRoute>
                 }
              />
              <Route
                path="/profile"
                element={
                   <PrivateRoute>
                     <Profile />
                   </PrivateRoute>
                 }
              />
              <Route
                path="/Activity"
                element={
                   <PrivateRoute>
                     <Activity />
                   </PrivateRoute>
                 }
              />
              <Route
                path="/trade"
                element={
                   <PrivateRoute>
                     <Trade />
                   </PrivateRoute>
                 }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
