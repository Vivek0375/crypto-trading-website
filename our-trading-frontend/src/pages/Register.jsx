// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill all fields.");
      return;
    }
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify({ username, email, password }));

    alert("Registration successful!");
    navigate("/login"); // Redirect to login page afterwards
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleRegister}>
        <input
          className="w-full px-4 py-2 border rounded mb-4"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
