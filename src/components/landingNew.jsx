import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/90 shadow-md border-b border-emerald-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-emerald-700 tracking-tight">
            Tea Factory
          </span>
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-emerald-100 flex flex-col items-center">
          {/* <img
            src="/public/assets/tea-factory.jpg"
            alt="Tea Factory"
            className="w-40 h-40 object-cover rounded-full shadow-lg mb-6 border-4 border-emerald-200"
          /> */}
          <h1 className="text-4xl font-extrabold text-emerald-700 mb-4 tracking-tight drop-shadow text-center">
            Welcome to Tea Factory Management
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
            Streamline your tea factory operations, manage suppliers, inventory,
            and logistics with ease. Secure, fast, and user-friendly platform
            for all your management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-xl font-bold shadow-lg text-center hover:from-emerald-600 hover:to-green-500 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-xl font-bold shadow-lg text-center hover:from-emerald-600 hover:to-green-500 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <footer className="mt-10 text-gray-400 text-sm text-center pb-4">
        &copy; {new Date().getFullYear()} Tea Factory Management. All rights
        reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
