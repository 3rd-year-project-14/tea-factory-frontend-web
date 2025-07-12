import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // 1. Login with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      // 2. Send token to backend for verification + get role
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        token,
      });

      setSuccess("Login Success! Redirecting...");
      // 3. Redirect user based on role
      const role = res.data.role;
      setTimeout(() => {
        switch (role) {
          case "SUPPLIER":
            navigate("/supplier/dashboard");
            break;
          case "DRIVER":
            navigate("/driver/dashboard");
            break;
          case "FACTORY_MANAGER":
            navigate("/factoryManager/dashboard");
            break;
          case "INVENTORY_MANAGER":
            navigate("/inventoryManager/dashboard");
            break;
          case "FERTILIZER_MANAGER":
            navigate("/fertilizerManager/dashboard");
            break;
          case "ESTATE_MANAGER":
            navigate("/estateManager/dashboard");
            break;
          case "TRANSPORT_MANAGER":
            navigate("/transportManager/dashboard");
            break;
          case "OWNER":
            navigate("/owner/dashboard");
            break;
          default:
            navigate("/");
        }
      }, 1200);
    } catch (error) {
      console.error(error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-emerald-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-2 tracking-tight drop-shadow">
            Welcome Back
          </h2>
          <p className="text-md text-gray-500">Sign in to your dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Email
            </label>
            <div className="relative">
              <User
                className="absolute top-3 left-3 text-emerald-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute top-3 left-3 text-emerald-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:outline-none transition"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-emerald-500 hover:text-emerald-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-center text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-center text-sm font-medium">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg hover:from-emerald-600 hover:to-green-500 transition"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/signup"
          className="text-black font-semibold hover:underline"
          style={{ color: "green" }}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
