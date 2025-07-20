import React, { useState } from "react";

export default function Dashboard() {
  const [bags] = useState([
    { id: "TN-B5", pastWeight: 24, condition: "Good", newWeight: 24 },
    { id: "TN-B6", pastWeight: 25, condition: "Good", newWeight: 25 },
    { id: "TN-B7", pastWeight: 14, condition: "Wet", newWeight: 12 },
  ]);

  const totalWeight = bags.reduce((sum, bag) => sum + bag.newWeight, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Top Statistics Cards - styled like AdvanceManagement.jsx */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            className="bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ring-2 ring-green-500"
            type="button"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  No of Suppliers
                </p>
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
              <div className="h-8 w-8 text-green-600 text-2xl">👤</div>
            </div>
          </button>
          <button
            className="bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ring-2 ring-blue-500"
            type="button"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No of Bags</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-xs text-gray-500">Tracked</p>
              </div>
              <div className="h-8 w-8 text-blue-600 text-2xl">👜</div>
            </div>
          </button>
          <button
            className="bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ring-2 ring-yellow-500"
            type="button"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Weight
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {totalWeight} Kg
                </p>
                <p className="text-xs text-gray-500">Current</p>
              </div>
              <div className="h-8 w-8 text-yellow-600 text-2xl">⚖️</div>
            </div>
          </button>
        </div>

        {/* Supplier Input Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Supplier No
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Supplier Name
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Weight
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Condition
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                New Weight
              </label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 text-sm rounded-md transition-colors duration-200">
                Enter
              </button>
            </div>
          </div>
        </div>

        {/* Bags Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-green-600 text-white">
            <div className="grid grid-cols-4 gap-4 p-3 font-medium text-sm">
              <div>Bag No</div>
              <div>Past Weight</div>
              <div>Condition</div>
              <div>New Weight</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {bags.map((bag) => (
              <div
                key={bag.id}
                className="grid grid-cols-4 gap-4 p-3 items-center hover:bg-gray-50"
              >
                <div className="font-medium text-gray-900 text-sm">
                  {bag.id}
                </div>
                <div className="text-gray-600 text-sm">{bag.pastWeight} Kg</div>
                <div>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      bag.condition === "Good"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {bag.condition}
                  </span>
                </div>
                <div className="text-gray-900 font-medium text-sm">
                  {bag.newWeight} Kg
                </div>
              </div>
            ))}
          </div>

          {/* Total Weight Footer */}
          <div className="bg-gray-50 border-t">
            <div className="grid grid-cols-4 gap-4 p-3">
              <div className="col-span-3"></div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 text-sm">
                  Total Weight
                </span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full font-medium text-sm">
                  {totalWeight} Kg
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
