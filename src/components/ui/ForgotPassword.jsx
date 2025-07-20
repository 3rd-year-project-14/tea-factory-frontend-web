// src/pages/ForgotPassword.jsx

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📧 Password reset link has been sent to your email.");
      setEmail(""); // Clear the input after successful send
    } catch (err) {
      console.error(err);
      // Handle specific Firebase auth errors
      if (err.code === "auth/user-not-found") {
        setError("❌ No account found with this email address.");
      } else if (err.code === "auth/invalid-email") {
        setError("❌ Please enter a valid email address.");
      } else if (err.code === "auth/too-many-requests") {
        setError("❌ Too many attempts. Please try again later.");
      } else {
        setError("❌ Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-emerald-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-emerald-700 mb-2 tracking-tight drop-shadow">
            Forgot Password?
          </h2>
          <p className="text-md text-gray-500">
            Enter your email to reset password
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute top-3 left-3 text-emerald-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none transition ${
                  error
                    ? "border-red-300 focus:ring-2 focus:ring-red-200"
                    : "border-emerald-100 focus:ring-2 focus:ring-emerald-300"
                }`}
                placeholder="Enter your registered email"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Status Messages */}
          {message && (
            <div className="text-green-600 text-center text-sm">{message}</div>
          )}
          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg transition ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-emerald-600 hover:to-green-500"
            }`}
          >
            {isLoading ? "Sending Reset Link..." : "Send Reset Email"}
          </button>
        </form>

        {/* Back to login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-sm text-emerald-500 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
