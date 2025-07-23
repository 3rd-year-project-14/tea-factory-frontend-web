import React, { useState } from 'react';

export default function WeightCondition() {
  const [bags] = useState([
    { id: 'TN-B5', pastWeight: 24, condition: 'Good', newWeight: 24 },
    { id: 'TN-B6', pastWeight: 25, condition: 'Good', newWeight: 25 },
    { id: 'TN-B7', pastWeight: 14, condition: 'Wet', newWeight: 12 }
  ]);

  const totalWeight = bags.reduce((sum, bag) => sum + bag.newWeight, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* 🔢 Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "No of Suppliers", value: 12 },
            { label: "No of Bags", value: 12 },
            { label: "Total Weight", value: `${totalWeight} Kg` },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-4"
              style={{ borderColor: '#cfece6' }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#165e52] font-medium">{stat.label}</span>
                <span className="text-xl font-bold text-[#01251F]">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 👤 Supplier Input Section */}
        <div
          className="bg-white rounded-lg shadow-sm border p-5"
          style={{ borderColor: '#cfece6' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
            {["Supplier No", "Supplier Name", "Weight", "Condition", "New Weight"].map((field, index) => (
              <div key={index}>
                <label className="block text-xs text-[#165e52] font-semibold mb-1">{field}</label>
                <input
                  type="text"
                  className="w-full px-2 py-1.5 text-sm border rounded-md border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-[#165e52] focus:border-transparent"
                />
              </div>
            ))}
            <div>
              <button
                className="w-full bg-[#01251F] hover:bg-[#0f3b33] text-white text-sm font-semibold py-1.5 px-3 rounded-md"
              >
                Enter
              </button>
            </div>
          </div>
        </div>

        {/* 📦 Bags Table */}
        <div
          className="bg-white rounded-lg shadow-md border overflow-hidden"
          style={{ borderColor: '#cfece6' }}
        >
          {/* 🧾 Table Header */}
          <div className="bg-[#165e52] text-white">
            <div className="grid grid-cols-4 gap-4 p-3 text-sm font-medium tracking-wide">
              <div>Bag No</div>
              <div>Past Weight</div>
              <div>Condition</div>
              <div>New Weight</div>
            </div>
          </div>

          {/* 📄 Table Rows */}
          <div className="divide-y divide-gray-100">
            {bags.map((bag) => (
              <div
                key={bag.id}
                className="grid grid-cols-4 gap-4 p-3 items-center hover:bg-gray-50"
              >
                <div className="font-medium text-sm text-[#01251F]">{bag.id}</div>
                <div className="text-sm text-gray-600">{bag.pastWeight} Kg</div>
                <div>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      bag.condition === 'Good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {bag.condition}
                  </span>
                </div>
                <div className="text-sm font-bold text-[#165e52]">{bag.newWeight} Kg</div>
              </div>
            ))}
          </div>

          {/* ➕ Table Footer */}
          <div className="bg-gray-50 border-t border-[#cfece6]">
            <div className="grid grid-cols-4 gap-4 p-3">
              <div className="col-span-3" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Weight</span>
                <span className="bg-[#165e52] text-white px-3 py-1 rounded-full font-semibold text-sm">
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
