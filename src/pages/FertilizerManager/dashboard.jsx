import React, { useState } from "react";
import { Users2, Package, Scale } from "lucide-react"; // Professional icons

const ACCENT_COLOR = "#165e52";
const BUTTON_COLOR = "#172526";

export default function Dashboard() {
  const [bags] = useState([
    { id: "TN-B5", pastWeight: 24, condition: "Good", newWeight: 24 },
    { id: "TN-B6", pastWeight: 25, condition: "Good", newWeight: 25 },
    { id: "TN-B7", pastWeight: 14, condition: "Wet", newWeight: 12 },
  ]);

  const totalWeight = bags.reduce((sum, bag) => sum + bag.newWeight, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-black">No of Suppliers</p>
              <p className="text-2xl font-bold text-black">12</p>
              <p className="text-xs text-black mt-2">Active</p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Users2 size={28} color="black" />
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-black">No of Bags</p>
              <p className="text-2xl font-bold text-black">12</p>
              <p className="text-xs text-black mt-2">Tracked</p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Package size={28} color="black" />
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-black">Total Weight</p>
              <p className="text-2xl font-bold text-black">{totalWeight} Kg</p>
              <p className="text-xs text-black mt-2">Current</p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Scale size={28} color="black" />
            </div>
          </div>
        </div>

        {/* Supplier Input Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-black">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: ACCENT_COLOR }}>
                Supplier No
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-[#cfece6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#165e52] focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: ACCENT_COLOR }}>
                Supplier Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-[#cfece6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#165e52] focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: ACCENT_COLOR }}>
                Weight
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-[#cfece6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#165e52] focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: ACCENT_COLOR }}>
                Condition
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-[#cfece6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#165e52] focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: ACCENT_COLOR }}>
                New Weight
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm border border-[#cfece6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#165e52] focus:border-transparent transition"
              />
            </div>
            <div>
              <button
                className="w-full p-3 rounded-lg text-white text-sm font-medium flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: BUTTON_COLOR,
                  border: "none",
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </div>

        {/* Bags Table - Updated Styles */}
        <div className="bg-white rounded-lg shadow-md border border-black overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#172526] text-white">
            <div className="grid grid-cols-4 gap-4 p-4 font-semibold text-sm text-center">
              <div>Bag No</div>
              <div>Past Weight</div>
              <div>Condition</div>
              <div>New Weight</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#e5f1ed]">
            {bags.map((bag) => (
              <div
                key={bag.id}
                className="grid grid-cols-4 gap-4 px-4 py-3 items-center hover:bg-[#f4faf8] transition-colors text-center"
              >
                <div className="font-medium text-black text-sm">{bag.id}</div>
                <div className="text-gray-800 text-sm font-semibold">{bag.pastWeight} Kg</div>
                <div>
                  <span
                    className={`inline-block min-w-[75px] px-3 py-1 rounded-full text-xs font-semibold text-center shadow-sm ${
                      bag.condition.toLowerCase() === "good"
                        ? "bg-[#d9f1ea] text-[#165e52]"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {bag.condition}
                  </span>
                </div>
                <div className="text-black font-bold text-sm">{bag.newWeight} Kg</div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
  <div className="bg-gray-50 border-t border-[#cfece6]">
  <div className="grid grid-cols-4 p-4 items-center">
    <div className="col-span-3 text-right">
      <span className="text-base font-normal text-black">Total Net Weight :</span>
    </div>
    <div className="text-center">
      <span className="text-base font-bold text-black">{totalWeight} Kg</span>
    </div>
  </div>
</div>



        </div>
      </div>
    </div>
  );
}
