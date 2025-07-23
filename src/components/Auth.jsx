import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// COLORS FROM YOUR LANDING PAGE
const BUTTON_COLOR = "#172526"; // dark green for buttons
const ACCENT_COLOR = "#165e52"; // rest of greens (backgrounds/accents)
const BG_COLOR = "#f5faf8"; // subtle background, optional

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        token,
      });
      setUser(res.data);
      console.log("User data:", res.data);
      // Store user ID in localStorage
      
        localStorage.setItem("userId", res.data.userId);
        console.log("User ID stored:", res.data.userId);
      
      setSuccess("Login Successful redirecting ...");
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
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: BG_COLOR }}
    >
      {/* Centered Box with Image and Form Side by Side */}
      <div className="flex flex-row w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left: Image */}
        <div className="w-1/2 flex items-center justify-center bg-[#f5faf8]">
          <img
            src="/assets/hi1.jpg"
            alt="Welcome"
            className="w-full h-full object-cover"
            style={{
              minHeight: "100%",
              minWidth: "100%",
              background: ACCENT_COLOR,
            }}
          />
        </div>
        {/* Right: Form */}
        <div className="flex flex-col justify-center items-center w-1/2 p-8 bg-white">
          {/* Logo and App Name */}
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-6">
              <img
                src="/assets/logo2.png"
                alt="Pureleaf Logo"
                className="w-14 h-14 object-contain"
              />
            </div>
            <h2
              className="text-3xl font-extrabold mb-1 tracking-tight text-center"
              style={{ color: ACCENT_COLOR }}
            >
              Welcome Back
            </h2>
            <p className="mb-6 text-gray-500 text-center">
              Sign in to your dashboard
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Email
                </label>
                <div className="relative">
                  <User
                    className="absolute top-3 left-3"
                    size={20}
                    style={{ color: ACCENT_COLOR }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-emerald-100 rounded-xl focus:ring-0 bg-[#F5FAF8] focus:outline-none transition"
                    placeholder="Enter your email"
                    required
                    style={{ color: "#222" }}
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
                    className="absolute top-3 left-3"
                    size={20}
                    style={{ color: ACCENT_COLOR }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-emerald-100 rounded-xl focus:ring-0 bg-[#F5FAF8] focus:outline-none transition"
                    placeholder="Enter your password"
                    required
                    style={{ color: "#222" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                    style={{
                      color: ACCENT_COLOR,
                      boxShadow: showPassword ? "0 0 0 4px #165e52" : "none",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.boxShadow = "0 0 0 4px #165e52")
                    }
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
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
                <div
                  className="text-center text-sm font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  {success}
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white py-3 rounded-xl font-bold shadow-lg transition focus:outline-none focus:ring-0"
                style={{
                  background: BUTTON_COLOR,
                  boxShadow: "0 4px 24px 0 rgba(22,94,82, 0.08)",
                }}
              >
                Sign In
              </button>
            </form>
            {/* <div className="text-center mt-6">
              <span className="text-gray-600">Don't have an account? </span>
              <a
                href="/signup"
                className="font-semibold hover:underline"
                style={{ color: ACCENT_COLOR }}
              >
                Sign Up
              </a>
            </div> */}
            <div className="text-center mt-2">
              <a
                href="/forgot-password"
                className="text-sm hover:underline font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
