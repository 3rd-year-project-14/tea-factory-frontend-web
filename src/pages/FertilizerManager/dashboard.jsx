import React, { useState } from "react";
import {
  AlertTriangle,
  PackageSearch,
  UserPlus,
  Eye,
  ClipboardList,
  PackageCheck,
  X,
  Truck,
  Package,
  Clock,
} from "lucide-react";

const ACCENT_COLOR = "#165e52";
const BUTTON_COLOR = "#172526";
const BORDER_COLOR = "#cfece6";

export default function FertilizerManagerDashboard() {
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentView, setCurrentView] = useState("approved"); // optional if needed

  // Sample Data
  const totalFertilizers = 12;
  const pendingRequestCount = 4;
  const lowStocks = [
    { id: 1, name: "NPK 20-20-20", stock: 20 },
    { id: 2, name: "Urea", stock: 12 },
  ];
  const requests = [
    {
      id: 1,
      supplier: "GreenGrow Ltd",
      route: "R-2",
      driver: "Samuel",
      total: 2,
      items: [
        { type: "MOP", quantity: "5" },
        { type: "Urea", quantity: "3" },
      ],
    },
    {
      id: 2,
      supplier: "Agro Direct",
      route: "R-5",
      driver: "Michael",
      total: 3,
      items: [
        { type: "NPK", quantity: "40kg" },
        { type: "TSP", quantity: "25kg" },
        { type: "Urea", quantity: "18kg" },
      ],
    },
  ];

  const filtered = requests.filter((r) =>
    r.route.toLowerCase().includes(search.toLowerCase())
  );

  const summaryCards = [
    {
      type: "approved",
      label: "Total Fertilizers",
      value: totalFertilizers,
      icon: <Package size={30} color="black" />,
    },
    {
      type: "pending",
      label: "Pending Requests",
      value: pendingRequestCount,
      icon: <Clock size={30} color="black" />,
    },
  ];

  const getBorderColor = (type) => {
    switch (type) {
      case "approved":
        return "#000000";
      case "pending":
        return "#f59e0b";
      default:
        return "#d1d5db";
    }
  };

  const getRingClass = (type) => {
    if (type === "approved") return "";
    if (currentView === type) {
      if (type === "pending") return "ring-2 ring-[#f59e0b]/30";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* ✅ Dashboard Header */}
      <div
        className="bg-white shadow-md border-b mb-6"
        style={{ borderColor: BORDER_COLOR }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold mb-1" style={{ color: ACCENT_COLOR }}>
            Dashboard
          </h1>
        </div>
      </div>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {summaryCards.map((card) => {
          const isApproved = card.type === "approved";
          return (
            <div
              key={card.type}
              onClick={() => setCurrentView(card.type)}
              className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-transform ${
                !isApproved ? "hover:scale-[1.02]" : "hover:shadow-none"
              } ${getRingClass(card.type)}`}
              style={{
                border: `1px solid ${getBorderColor(card.type)}`,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">{card.label}</p>
                  <p className="text-2xl font-bold text-black">{card.value}</p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ⇢ Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Low Stock */}
        <div className="bg-white border rounded-lg shadow-md border-[#cfece6] p-6">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-6 h-6 text-black mr-2" />
            <span className="text-lg font-bold text-black">Low Fertilizer Stock</span>
          </div>
          {lowStocks.length === 0 ? (
            <div className="flex flex-col items-center text-gray-500 py-8">
              <UserPlus className="w-10 h-10 mb-2" />
              <p>No low stock alerts</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lowStocks.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: "#fff7ed", border: `1px solid ${BORDER_COLOR}` }}
                >
                  <div>
                    <span className="font-semibold text-black">{item.name}</span>
                    <span className="ml-2 text-gray-700 text-xs">{item.stock} Kg left</span>
                  </div>
                  <PackageCheck className="w-5 h-5 text-black" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Incoming Requests */}
        <div className="bg-white border rounded-lg shadow-md border-[#cfece6] p-6">
          <div className="flex items-center mb-2">
            <PackageSearch className="w-6 h-6 text-black mr-2" />
            <span className="text-lg font-bold text-black">Incoming Fertilizer Requests</span>
          </div>
          {requests.length === 0 ? (
            <div className="flex flex-col items-center text-gray-500 py-8">
              <ClipboardList className="w-10 h-10 mb-2" />
              <p>No incoming requests</p>
            </div>
          ) : (
            <div className="space-y-2">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="flex justify-between p-3 border rounded-lg border-[#e1f4ef] items-center"
                >
                  <div>
                    <span className="font-semibold text-black">{r.supplier}</span>
                    <span className="ml-2 text-xs text-gray-600">
                      Route {r.route}, Driver {r.driver}
                    </span>
                  </div>
                  <ClipboardList className="w-5 h-5 text-black" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ⇢ Bottom: Table Card */}
      <div className="bg-white border rounded-lg shadow-md border-[#cfece6] p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black flex items-center gap-2">
            <Truck className="w-5 h-5" /> Release Queue
          </h3>
          <input
            placeholder="Search by route"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-[#165e52] border-[#cfece6] transition"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#172526] text-white">
                <th className="p-3 text-left">Route</th>
                <th className="p-3 text-left">Driver</th>
                <th className="p-3 text-left">Total Count</th>
                <th className="p-3 text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-6">
                    <div className="flex flex-col items-center">
                      <UserPlus className="w-10 h-10 mb-2 text-gray-300" />
                      <p>No requests found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((req) => (
                  <tr key={req.id} className="border-b border-[#e1f4ef]">
                    <td className="p-3 font-medium text-black">{req.route}</td>
                    <td className="p-3 text-black">{req.driver}</td>
                    <td className="p-3 text-black">{req.total}</td>
                    <td className="p-3">
                      <button
                        className="px-4 py-1 rounded bg-black text-white text-xs hover:bg-[#165e52]"
                        onClick={() => setSelectedRequest(req)}
                      >
                        <Eye className="inline w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ⇢ POPUP Modal (with blur) */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 border border-[#cfece6] relative">
            <button
              className="absolute top-4 right-4 rounded p-1 hover:bg-gray-100 transition"
              onClick={() => setSelectedRequest(null)}
            >
              <X className="w-5 h-5 text-black" />
            </button>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-black" />
              Release Order Details
            </h3>
            <div className="space-y-2 mb-4">
              <div>
                <span className="font-semibold text-black">Driver: </span>
                <span className="text-gray-700">{selectedRequest.driver}</span>
              </div>
              <div>
                <span className="font-semibold text-black">Route: </span>
                <span className="text-gray-700">{selectedRequest.route}</span>
              </div>
            </div>
            <div className="border border-[#e1f4ef] rounded">
              <div className="grid grid-cols-2 bg-gray-100 p-2 font-semibold text-black">
                <div>Fertilizer Type</div>
                <div>Quantity</div>
              </div>
              {selectedRequest.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 p-2 border-t border-[#e1f4ef] text-sm">
                  <div className="text-black">{item.type}</div>
                  <div className="text-black">{item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-5 py-2 rounded bg-gray-200 text-black hover:bg-gray-300"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
              <button
                className="px-5 py-2 rounded bg-[#172526] text-white hover:bg-[#0e1a1a]"
                onClick={() => {
                  console.log("Released:", selectedRequest);
                  setSelectedRequest(null);
                }}
              >
                Release
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
