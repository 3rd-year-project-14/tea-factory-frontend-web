// import React, { useState } from 'react';
// import { Eye, EyeOff, Leaf, User, Lock } from 'lucide-react';

// export default function TeaFactoryLogin() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login attempt:', { email, password });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Tea leaf pattern background */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-10 left-10 transform rotate-12">
//           <Leaf size={40} className="text-green-600" />
//         </div>
//         <div className="absolute top-32 right-20 transform -rotate-45">
//           <Leaf size={30} className="text-emerald-600" />
//         </div>
//         <div className="absolute bottom-20 left-1/4 transform rotate-45">
//           <Leaf size={35} className="text-green-500" />
//         </div>
//         <div className="absolute bottom-40 right-1/3 transform -rotate-12">
//           <Leaf size={25} className="text-teal-600" />
//         </div>
//         <div className="absolute top-1/2 left-20 transform rotate-90">
//           <Leaf size={28} className="text-green-400" />
//         </div>
//         <div className="absolute top-1/3 right-10 transform -rotate-30">
//           <Leaf size={32} className="text-emerald-500" />
//         </div>
//       </div>

//       {/* Main container */}
//       <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden relative">
//         <div className="grid lg:grid-cols-2 min-h-[480px]">
          
//           {/* Left side - Illustration */}
//           <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-8 flex flex-col justify-center items-center relative overflow-hidden">
//             {/* Decorative elements */}
//             <div className="absolute top-0 left-0 w-full h-full">
//               <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
//               <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
//               <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-300/20 rounded-full blur-md"></div>
//             </div>
            
//             {/* Tea plantation illustration */}
//             <div className="relative z-10 text-center">
//               <div className="mb-6 relative">
//                 {/* Tea plant illustration */}
//                 <div className="relative mx-auto w-48 h-48">
//                   {/* Main stem */}
//                   <div className="absolute left-1/2 top-16 w-2 h-32 bg-green-800/30 rounded-full transform -translate-x-1/2"></div>
                  
//                   {/* Tea leaves */}
//                   <div className="absolute top-8 left-20 transform rotate-12">
//                     <Leaf size={48} className="text-green-100 drop-shadow-lg" />
//                   </div>
//                   <div className="absolute top-16 right-16 transform -rotate-12">
//                     <Leaf size={52} className="text-emerald-100 drop-shadow-lg" />
//                   </div>
//                   <div className="absolute top-24 left-16 transform rotate-45">
//                     <Leaf size={44} className="text-green-200 drop-shadow-lg" />
//                   </div>
//                   <div className="absolute top-32 right-20 transform -rotate-30">
//                     <Leaf size={46} className="text-teal-100 drop-shadow-lg" />
//                   </div>
//                   <div className="absolute top-40 left-24 transform rotate-15">
//                     <Leaf size={40} className="text-green-50 drop-shadow-lg" />
//                   </div>
//                   <div className="absolute top-48 right-24 transform -rotate-45">
//                     <Leaf size={42} className="text-emerald-50 drop-shadow-lg" />
//                   </div>
                  
//                   {/* Central tea bud */}
//                   <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
//                     <div className="w-6 h-8 bg-gradient-to-b from-green-200 to-green-300 rounded-full shadow-lg"></div>
//                   </div>
//                 </div>
//               </div>
              
//               <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
//                 TeaLeaf Factory
//               </h1>
//               <p className="text-green-100 text-base leading-relaxed max-w-xs">
//                 Premium tea processing management system
//               </p>
              
//               {/* Floating tea leaves animation */}
//               <div className="absolute bottom-10 left-10 animate-bounce">
//                 <Leaf size={20} className="text-green-200/60" />
//               </div>
//               <div className="absolute bottom-16 right-16 animate-pulse">
//                 <Leaf size={16} className="text-emerald-200/60" />
//               </div>
//             </div>
//           </div>

//           {/* Right side - Login form */}
//           <div className="p-8 flex flex-col justify-center">
//             <div className="max-w-sm mx-auto w-full">
              
//               {/* Header */}
//               <div className="text-center mb-8">
//                 <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4 shadow-lg">
//                   <Leaf className="text-white" size={24} />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
//                 <p className="text-gray-600 text-sm">Sign in to your dashboard</p>
//               </div>

//               {/* Login form */}
//               <div className="space-y-5">
                
//                 {/* Email field */}
//                 <div className="relative">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
//                       placeholder="Enter your email"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Password field */}
//                 <div className="relative">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
//                       placeholder="Enter your password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
//                     >
//                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Remember me and forgot password */}
//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                   </label>
//                   <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
//                     Forgot password?
//                   </a>
//                 </div>

//                 {/* Login button */}
//                 <button
//                   onClick={handleSubmit}
//                   className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-green-500/25"
//                 >
//                   Sign In
//                 </button>

//                 {/* Additional links */}
//                 <div className="text-center pt-4">
//                   <p className="text-gray-600">
//                     Need access? 
//                     <a href="#" className="text-green-600 hover:text-green-700 font-medium ml-1 transition-colors">
//                       Contact Administrator
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Eye, EyeOff, Leaf, User, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeaFactoryLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login Success ✅");

      // Redirect according to role
      const role = res.data.role;

      switch (role) {
        case "INVENTORY_MANAGER":
          navigate("/inventoryManager/dashboard");
          break;
        case "FACTORY_MANAGER":
          navigate("/factoryManager/dashboard");
          break;
        case "SUPPLIER":
          navigate("/supplier/dashboard");
          break;
        case "FERTILIZER_MANAGER":
          navigate("/fertilizerManager/dashboard");
          break;
        case "DRIVER":
          navigate("/driver/dashboard");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Tea leaf pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 transform rotate-12">
          <Leaf size={40} className="text-green-600" />
        </div>
        <div className="absolute top-32 right-20 transform -rotate-45">
          <Leaf size={30} className="text-emerald-600" />
        </div>
        <div className="absolute bottom-20 left-1/4 transform rotate-45">
          <Leaf size={35} className="text-green-500" />
        </div>
        <div className="absolute bottom-40 right-1/3 transform -rotate-12">
          <Leaf size={25} className="text-teal-600" />
        </div>
        <div className="absolute top-1/2 left-20 transform rotate-90">
          <Leaf size={28} className="text-green-400" />
        </div>
        <div className="absolute top-1/3 right-10 transform -rotate-30">
          <Leaf size={32} className="text-emerald-500" />
        </div>
      </div>

      {/* Main container */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden relative">
        <div className="grid lg:grid-cols-2 min-h-[480px]">
          {/* Left side - Illustration */}
          <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-8 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-300/20 rounded-full blur-md"></div>
            </div>
            <div className="relative z-10 text-center">
              <div className="mb-6 relative">
                <div className="relative mx-auto w-48 h-48">
                  <div className="absolute left-1/2 top-16 w-2 h-32 bg-green-800/30 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute top-8 left-20 transform rotate-12">
                    <Leaf size={48} className="text-green-100 drop-shadow-lg" />
                  </div>
                  <div className="absolute top-16 right-16 transform -rotate-12">
                    <Leaf size={52} className="text-emerald-100 drop-shadow-lg" />
                  </div>
                  <div className="absolute top-24 left-16 transform rotate-45">
                    <Leaf size={44} className="text-green-200 drop-shadow-lg" />
                  </div>
                  <div className="absolute top-32 right-20 transform -rotate-30">
                    <Leaf size={46} className="text-teal-100 drop-shadow-lg" />
                  </div>
                  <div className="absolute top-40 left-24 transform rotate-15">
                    <Leaf size={40} className="text-green-50 drop-shadow-lg" />
                  </div>
                  <div className="absolute top-48 right-24 transform -rotate-45">
                    <Leaf size={42} className="text-emerald-50 drop-shadow-lg" />
                  </div>
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-8 bg-gradient-to-b from-green-200 to-green-300 rounded-full shadow-lg"></div>
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">TeaLeaf Factory</h1>
              <p className="text-green-100 text-base leading-relaxed max-w-xs">
                Premium tea processing management system
              </p>
              <div className="absolute bottom-10 left-10 animate-bounce">
                <Leaf size={20} className="text-green-200/60" />
              </div>
              <div className="absolute bottom-16 right-16 animate-pulse">
                <Leaf size={16} className="text-emerald-200/60" />
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="p-8 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4 shadow-lg">
                  <Leaf className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-600 text-sm">Sign in to your dashboard</p>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-green-500/25"
                >
                  Sign In
                </button>

                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Need access?
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-700 font-medium ml-1 transition-colors"
                    >
                      Contact Administrator
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
