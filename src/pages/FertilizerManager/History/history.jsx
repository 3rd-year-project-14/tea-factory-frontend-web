import React, { useState } from "react";
import { ClockHistory, Search, Calendar, Package } from "lucide-react";

const sampleHistory = [
  {
    id: 1,
    action: "Added Stock",
    fertilizer: "NPK 20-20-20",
    quantity: 200,
    unit: "kg",
    date: "2025-06-28",
    user: "Manager A",
    note: "Restocked after delivery.",
  },
  {
    id: 2,
    action: "Requested Fertilizer",
    fertilizer: "Urea 46%",
    quantity: 100,
    unit: "kg",
    date: "2025-06-25",
    user: "Manager B",
    note: "Requested for field trial.",
  },
  {
    id: 3,
    action: "Edited Stock",
    fertilizer: "NPK 15-15-15",
    quantity: 50,
    unit: "kg",
    date: "2025-06-20",
    user: "Manager A",
    note: "Corrected quantity after audit.",
  },
  {
    id: 4,
    action: "Deleted Stock",
    fertilizer: "Organic Compost",
    quantity: 30,
    unit: "bags (50kg)",
    date: "2025-06-15",
    user: "Manager C",
    note: "Expired stock removed.",
  },
];

const FertilizerHistoryPage = () => {
  const [search, setSearch] = useState("");

  const filtered = sampleHistory.filter(
    (h) =>
      h.fertilizer.toLowerCase().includes(search.toLowerCase()) ||
      h.action.toLowerCase().includes(search.toLowerCase()) ||
      h.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <ClockHistory className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Fertilizer History
            </h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search history..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all text-gray-900 shadow-sm"
            />
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 overflow-x-auto">
          <table className="min-w-full divide-y divide-green-100">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Fertilizer
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-8">
                    No history found.
                  </td>
                </tr>
              ) : (
                filtered.map((h) => (
                  <tr
                    key={h.id}
                    className="hover:bg-green-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {new Date(h.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-green-700 font-semibold">
                      {h.action}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-500" />
                      {h.fertilizer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {h.quantity} {h.unit}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{h.user}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                      {h.note}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FertilizerHistoryPage;
