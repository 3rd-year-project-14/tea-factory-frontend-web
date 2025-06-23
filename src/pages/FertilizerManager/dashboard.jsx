import React, { useState } from 'react';

export default function Dashboard() {
  const [bags] = useState([
    { id: 'TN-B5', pastWeight: 24, condition: 'Good', newWeight: 24 },
    { id: 'TN-B6', pastWeight: 25, condition: 'Good', newWeight: 25 },
    { id: 'TN-B7', pastWeight: 14, condition: 'Wet', newWeight: 12 }
  ]);

  const totalWeight = bags.reduce((sum, bag) => sum + bag.newWeight, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg shadow-sm border p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">No of Suppliers</span>
              <span className="text-xl font-bold text-gray-900">12</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">No of Bags</span>
              <span className="text-xl font-bold text-gray-900">12</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">Total Weight</span>
              <span className="text-xl font-bold text-gray-900">{totalWeight} Kg</span>
            </div>
          </div>
        </div>

        {/* Supplier Input Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Supplier No</label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Supplier Name</label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Weight</label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Condition</label>
              <input
                type="text"
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">New Weight</label>
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
                <div className="font-medium text-gray-900 text-sm">{bag.id}</div>
                <div className="text-gray-600 text-sm">{bag.pastWeight} Kg</div>
                <div>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      bag.condition === 'Good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {bag.condition}
                  </span>
                </div>
                <div className="text-gray-900 font-medium text-sm">{bag.newWeight} Kg</div>
              </div>
            ))}
          </div>

          {/* Total Weight Footer */}
          <div className="bg-gray-50 border-t">
            <div className="grid grid-cols-4 gap-4 p-3">
              <div className="col-span-3"></div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 text-sm">Total Weight</span>
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
