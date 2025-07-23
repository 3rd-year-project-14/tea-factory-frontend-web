import React, { useState, useMemo } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  Plus,
  Box,
  X,
  CheckCircle,
} from "lucide-react";

// Theme Constants
const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";

export default function FertilizerManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const [showModal, setShowModal] = useState(false);
  const [selectedFertilizer, setSelectedFertilizer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [fertilizers] = useState([
    {
      id: 1,
      name: "NPK 20-20-20",
      category: "Complete Fertilizer",
      currentStock: 450,
      minStock: 200,
      maxStock: 1000,
      unit: "kg",
      pricePerUnit: 2.5,
      supplier: "GreenGrow Supplies",
      lastRestocked: "2024-06-15",
      expiryDate: "2025-12-31",
      location: "Warehouse A-1",
    },
    {
      id: 2,
      name: "Urea 46-0-0",
      category: "Nitrogen Fertilizer",
      currentStock: 120,
      minStock: 150,
      maxStock: 800,
      unit: "kg",
      pricePerUnit: 1.8,
      supplier: "FarmTech Ltd",
      lastRestocked: "2024-06-20",
      expiryDate: "2025-08-15",
      location: "Warehouse B-2",
    },
    {
      id: 3,
      name: "Phosphate Rock",
      category: "Phosphorus Fertilizer",
      currentStock: 680,
      minStock: 300,
      maxStock: 1200,
      unit: "kg",
      pricePerUnit: 3.2,
      supplier: "Natural Nutrients",
      lastRestocked: "2024-06-10",
      expiryDate: "2026-03-20",
      location: "Warehouse A-3",
    },
    {
      id: 4,
      name: "Potassium Sulfate",
      category: "Potassium Fertilizer",
      currentStock: 75,
      minStock: 100,
      maxStock: 600,
      unit: "kg",
      pricePerUnit: 4.1,
      supplier: "AgriChem Solutions",
      lastRestocked: "2024-05-28",
      expiryDate: "2025-11-10",
      location: "Warehouse C-1",
    },
    {
      id: 5,
      name: "Organic Compost",
      category: "Organic Fertilizer",
      currentStock: 320,
      minStock: 200,
      maxStock: 500,
      unit: "kg",
      pricePerUnit: 1.2,
      supplier: "EcoFarm Organics",
      lastRestocked: "2024-06-25",
      expiryDate: "2024-12-01",
      location: "Warehouse D-1",
    },
    {
      id: 6,
      name: "Calcium Nitrate",
      category: "Calcium Fertilizer",
      currentStock: 290,
      minStock: 150,
      maxStock: 700,
      unit: "kg",
      pricePerUnit: 2.9,
      supplier: "MinChem Industries",
      lastRestocked: "2024-06-18",
      expiryDate: "2025-09-30",
      location: "Warehouse B-1",
    },
  ]);

  // Logic Functions
  const getStockStatus = (current, min, max) => {
    if (current <= min) return "low";
    if (current >= max * 0.8) return "high";
    return "normal";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "low":
        return "text-red-600 bg-red-50 border border-red-200";
      case "high":
      case "normal":
        return "text-[#165E52] bg-[#e1f4ef] border border-[#cfece6]";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "low":
        return <AlertTriangle className="w-4 h-4" />;
      case "high":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const filteredAndSortedFertilizers = useMemo(() => {
    let filtered = fertilizers.filter((f) => {
      const matchSearch =
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.supplier.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterStatus === "all") return matchSearch;

      const status = getStockStatus(f.currentStock, f.minStock, f.maxStock);
      return matchSearch && status === filterStatus;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "stock") return b.currentStock - a.currentStock;
      if (sortBy === "status") {
        const aStatus = getStockStatus(a.currentStock, a.minStock, a.maxStock);
        const bStatus = getStockStatus(b.currentStock, b.minStock, b.maxStock);
        return aStatus.localeCompare(bStatus);
      }
      return a.name.localeCompare(b.name);
    });
  }, [fertilizers, searchTerm, filterStatus, sortBy]);

  const lowStockItems = fertilizers.filter(
    (f) => getStockStatus(f.currentStock, f.minStock, f.maxStock) === "low"
  ).length;

  const summaryCards = [
    {
      type: "approved",
      label: "Total Fertilizers",
      value: fertilizers.length,
      icon: <Box size={30} color="black" />,
      border: "#000000",
    },
    {
      type: "pending",
      label: "Low Stock Warnings",
      value: lowStockItems,
      icon: <AlertTriangle size={30} color="black" />,
      border: "#f59e0b",
    },
  ];

  // Toast Helper
  const showRequestToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRequest = () => {
    if (selectedFertilizer && quantity) {
      setShowModal(false);
      setSelectedFertilizer("");
      setQuantity("");
      showRequestToast();
    }
  };

  return (
    <div className="min-h-screen py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header + Filters */}
       <div className="bg-white p-6 shadow-md  mb-8">
  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#165E52]">Fertilizer Stock List</h1>
              </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row sm:items-center gap-4">
              

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 font-medium text-sm rounded-lg shadow text-white hover:opacity-90"
                style={{ backgroundColor: BTN_COLOR }}
              >
                <Plus className="h-4 w-4" />
                Request Stock
              </button>
            </div>
          </div>
        </div>

        {/* Toast */}
        {showToast && (
          <div className="mb-4 p-4 rounded-lg bg-[#e1f4ef] border border-[#cfece6] text-[#165E52] flex items-center gap-2 text-sm shadow-md">
            <CheckCircle className="w-5 h-5" />
            Request placed successfully.
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {summaryCards.map((card) => (
            <div
              key={card.type}
              className="bg-white p-6 rounded-lg shadow-md border cursor-pointer hover:shadow-lg transition"
              style={{ borderColor: card.border }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">{card.label}</p>
                  <p className="text-2xl font-bold text-black">{card.value}</p>
                </div>
                <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded-full">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fertilizer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedFertilizers.map((f) => {
            const status = getStockStatus(f.currentStock, f.minStock, f.maxStock);
            const stockPct = (f.currentStock / f.maxStock) * 100;

            return (
              <div key={f.id} className="bg-white rounded-lg shadow-md border p-6" style={{ borderColor: BORDER_COLOR }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{f.name}</h3>
                    <p className="text-sm text-[#165E52]">{f.category}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                    <span>{status}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Stock level</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div className={`h-2 rounded-full ${status === "low" ? "bg-red-500" : "bg-[#165E52]"}`} style={{ width: `${Math.min(stockPct, 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-400">
                    <span>Min: {f.minStock}</span>
                    <span>Max: {f.maxStock}</span>
                  </div>
                </div>
                <div className="text-sm space-y-2 border-t pt-4 border-gray-100">
                  <div className="flex justify-between"><span>Price/Unit</span><span className="font-semibold">${f.pricePerUnit}</span></div>
                  <div className="flex justify-between"><span>Total Value</span><span className="font-semibold">${(f.currentStock * f.pricePerUnit).toFixed(2)}</span></div>
                  <p className="text-gray-500">Location: <span className="text-gray-700">{f.location}</span></p>
                  <p className="text-gray-500">Supplier: <span className="text-gray-700">{f.supplier}</span></p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredAndSortedFertilizers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-2" />
            <p className="font-medium">No fertilizers found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Request Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 border border-[#cfece6] relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 rounded p-1 hover:bg-gray-100 transition">
              <X className="w-5 h-5 text-black" />
            </button>
            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Request Fertilizer Stock
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Fertilizer Type</label>
                <select
                  value={selectedFertilizer}
                  onChange={(e) => setSelectedFertilizer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                >
                  <option value="">-- Select Fertilizer --</option>
                  {fertilizers.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Quantity (kg)</label>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="Enter quantity"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300" onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  className="bg-[#172526] text-white px-4 py-2 rounded hover:bg-[#0e1a1a]"
                  onClick={handleRequest}
                  disabled={!selectedFertilizer || !quantity}
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
