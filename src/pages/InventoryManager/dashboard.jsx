import React, { useState } from "react";

export default function InventoryManagerDashboard() {
  const [bags] = useState([
    { id: "TN-B5", pastWeight: 24, condition: "Good", newWeight: 24 },
    { id: "TN-B6", pastWeight: 25, condition: "Good", newWeight: 25 },
    { id: "TN-B7", pastWeight: 14, condition: "Wet", newWeight: 12 },
  ]);

  const totalWeight = bags.reduce((sum, bag) => sum + bag.newWeight, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Modern Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-200">
            <div>
              <p className="text-white text-sm font-medium mb-1">
                No of Suppliers
              </p>
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-green-100 text-xs mt-1">Active</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3 flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-200">
            <div>
              <p className="text-white text-sm font-medium mb-1">No of Bags</p>
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-blue-100 text-xs mt-1">Tracked</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3 flex items-center justify-center">
              <span className="text-3xl">👜</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:scale-105 transition-transform duration-200">
            <div>
              <p className="text-white text-sm font-medium mb-1">
                Total Weight
              </p>
              <p className="text-3xl font-bold text-white">{totalWeight} Kg</p>
              <p className="text-yellow-100 text-xs mt-1">Current</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-3 flex items-center justify-center">
              <span className="text-3xl">⚖️</span>
            </div>
          </div>
        </div>
        {/* ...existing code for Supplier Input Section and Bags Table... */}
      </div>
    </div>
  );
}
