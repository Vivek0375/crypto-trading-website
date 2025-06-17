// src/pages/Login.jsx
import React, { useState } from "react";

function Login() {
  const [mode, setMode] = useState("login"); // "login", "signup", "forgot"

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup fields
  const [confirmPass, setConfirmPass] = useState("");

  // Forgot password fields
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [inputOtp, setInputOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSignup = () => {
    if (email && password && password === confirmPass) {
      // Handle actual Signup here
      console.log("Signup with :", email, password);
      alert("Signup successful!");
      setMode("login"); // back to login afterwards
    } else {
      alert("Passwords do not match or fields are missing.");
    }
  };

  const handleLogin = () => {
    if (email && password) {
      // Handle actual login here
      console.log("Login with :", email, password);
    }
  };

  const handleSendOtp = () => {
    if (email) {
      // Simulating sending OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOtp(otp);
      alert(`Your OTP is ${otp} (for demonstration).`);
    }
  };

  const handleReset = () => {
    if (inputOtp == generatedOtp && newPass) {
      // Handle password reset here
      console.log("Reset password for :", email, newPass);
      setMode("login"); // back to login afterwards
      setGeneratedOtp(null);
      setInputOtp("");
      setNewPass("");
      alert("Your password has been reset!");
    } else {
      alert("Invalid OTP or password.");
    }
  };

  return (
    <div className="p-6 max-w-md m-auto">
      <h1 className="text-3xl font-semibold mb-6">
        {mode === "login"
          ? "Login"
          : mode === "signup"
          ? "Signup"
          : "Reset Password"}
      </h1>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mb-4 w-full rounded-md border border-gray-500"
      />

      {/* Signup password fields */}
      {mode === "signup" && (
        <>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-4 w-full rounded-md border border-gray-500"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="p-2 mb-4 w-full rounded-md border border-gray-500"
          />
          <button
            onClick={handleSignup}
            className="p-2 w-full bg-green-500 text-gray-100 font-semibold rounded-md mb-4"
          >
            Signup
          </button>
          <p
            onClick={() => setMode("login")}
            className="text-blue-500 cursor-pointer"
          >
            Already have an account? Log in
          </p>
        </>
      )}

      {/* Forgot password fields */}
      {mode === "forgot" && (
        <>
          {!generatedOtp && (
            <button
              onClick={handleSendOtp}
              className="p-2 w-full bg-blue-500 text-gray-100 font-semibold rounded-md mb-4"
            >
              Send OTP
            </button>
          )}

          {generatedOtp && (
            <>
              <input
                type="number"
                placeholder="Enter OTP"
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value)}
                className="p-2 mb-4 w-full rounded-md border border-gray-500"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="p-2 mb-4 w-full rounded-md border border-gray-500"
              />
              <button
                onClick={handleReset}
                className="p-2 w-full bg-green-500 text-gray-100 font-semibold rounded-md mb-4"
              >
                Reset Password
              </button>
            </>
          )}

          <p
            onClick={() => setMode("login")} 
            className="text-blue-500 cursor-pointer"
          >
            Back to login
          </p>
        </>
      )}

      {/* Default login fields */}
      {mode === "login" && (
        <>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-4 w-full rounded-md border border-gray-500"
          />
          <button
            onClick={handleLogin}
            className="p-2 w-full bg-blue-500 text-gray-100 font-semibold rounded-md mb-4"
          >
            Log in
          </button>

          <p
            onClick={() => setMode("forgot")} 
            className="text-blue-500 cursor-pointer mb-2"
          >
            Forgot password?
          </p>

          <p
            onClick={() => setMode("signup")} 
            className="text-blue-500 cursor-pointer"
          >
            Don't have an account? Signup
          </p>
        </>
      )}

    </div>
  )
}

export default Login;
