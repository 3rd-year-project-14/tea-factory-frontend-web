import React, { useState, useMemo } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  Plus,
  Edit3,
  Eye,
} from "lucide-react";

const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";

const FertilizerManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

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
        return "text-[#165E52] bg-[#e1f4ef] border border-[#cfece6]";
      default:
        return "text-[#165E52] bg-[#e1f4ef] border border-[#cfece6]";
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
    let filtered = fertilizers.filter((fert) => {
      const matchSearch =
        fert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fert.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fert.supplier.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterStatus === "all") return matchSearch;

      const status = getStockStatus(fert.currentStock, fert.minStock, fert.maxStock);
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

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0" style={{ color: ACCENT_COLOR }}>
            Fertilizer Stock List
          </h1>
          <button
            onClick={() => (window.location.href = "/inventoryManager/add_stock")}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg shadow text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: BTN_COLOR }}
          >
            <Plus className="w-4 h-4" />
            Add Stock
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md border" style={{ borderColor: BORDER_COLOR }}>
            <p className="text-sm font-medium text-gray-600">Total Fertilizers</p>
            <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>{fertilizers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border" style={{ borderColor: BORDER_COLOR }}>
            <p className="text-sm font-medium text-gray-600">Total Quantity</p>
            <p className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>
              {fertilizers.reduce((total, f) => total + f.currentStock, 0)} Kg
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border" style={{ borderColor: BORDER_COLOR }}>
            <p className="text-sm font-medium text-gray-600">Low Stock</p>
            <p className="text-2xl font-bold text-red-600">{lowStockItems}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md border mb-8" style={{ borderColor: BORDER_COLOR }}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, category, supplier"
                className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-[#165E52]"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52]"
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52]"
              >
                <option value="name">Sort by Name</option>
                <option value="stock">Sort by Stock</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fertilizer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedFertilizers.map((fertilizer) => {
            const status = getStockStatus(
              fertilizer.currentStock,
              fertilizer.minStock,
              fertilizer.maxStock
            );
            const stockPct = (fertilizer.currentStock / fertilizer.maxStock) * 100;

            return (
              <div key={fertilizer.id} className="bg-white rounded-lg shadow-md border p-6" style={{ borderColor: BORDER_COLOR }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{fertilizer.name}</h3>
                    <p className="text-sm" style={{ color: ACCENT_COLOR }}>{fertilizer.category}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                    <span>{status}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Stock level</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className={`h-2 rounded-full ${status === "low" ? "bg-red-500" : "bg-[#165E52]"}`}
                      style={{ width: `${Math.min(stockPct, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-400">
                    <span>Min: {fertilizer.minStock}</span>
                    <span>Max: {fertilizer.maxStock}</span>
                  </div>
                </div>
                <div className="text-sm space-y-2 border-t pt-4 border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price/Unit</span>
                    <span className="font-semibold">${fertilizer.pricePerUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Value</span>
                    <span className="font-semibold">
                      ${(fertilizer.currentStock * fertilizer.pricePerUnit).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-gray-500">Location: <span className="text-gray-700">{fertilizer.location}</span></div>
                  <div className="text-gray-500">Supplier: <span className="text-gray-700">{fertilizer.supplier}</span></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => (window.location.href = `/inventoryManager/view_stock?id=${fertilizer.id}`)}
                    className="flex-1 border border-[#165E52] text-[#165E52] py-2 px-3 rounded-lg hover:bg-[#ecf7f4]"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => (window.location.href = `/inventoryManager/edit_stock?id=${fertilizer.id}`)}
                    className="flex-1 border border-[#165E52] text-[#165E52] py-2 px-3 rounded-lg hover:bg-[#ecf7f4]"
                  >
                    <Edit3 className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
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
            <p className="text-sm text-gray-400">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerManager;
