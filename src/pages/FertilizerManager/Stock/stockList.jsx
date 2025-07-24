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
  Clock,
  Check,
  Edit3,
} from "lucide-react";

// Theme Constants
const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";

export default function FertilizerManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const [showStockAddModal, setShowStockAddModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // States for the stock add form
  const [stockAddData, setStockAddData] = useState({
    fertilizerName: "",
    category: "",
    quantity: "",
    minStock: "",
    maxStock: "",
    pricePerUnit: "",
    supplier: "",
    expiryDate: "",
    location: "",
    batchNumber: "",
    notes: ""
  });

  // States for approval flow (keeping existing functionality)
  const [pendingRequests, setPendingRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [addStockData, setAddStockData] = useState({
    supplier: "",
    pricePerUnit: "",
    expiryDate: "",
    location: "",
    batchNumber: "",
    notes: ""
  });

  const [fertilizers, setFertilizers] = useState([
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
  const showRequestToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle stock add form submission
  const handleAddNewStock = () => {
    const requiredFields = ['fertilizerName', 'category', 'quantity', 'minStock', 'maxStock', 'pricePerUnit', 'supplier', 'expiryDate', 'location'];
    const isValid = requiredFields.every(field => stockAddData[field].trim() !== '');

    if (isValid) {
      const newFertilizer = {
        id: Date.now(),
        name: stockAddData.fertilizerName,
        category: stockAddData.category,
        currentStock: parseInt(stockAddData.quantity),
        minStock: parseInt(stockAddData.minStock),
        maxStock: parseInt(stockAddData.maxStock),
        unit: "kg",
        pricePerUnit: parseFloat(stockAddData.pricePerUnit),
        supplier: stockAddData.supplier,
        lastRestocked: new Date().toISOString().split('T')[0],
        expiryDate: stockAddData.expiryDate,
        location: stockAddData.location,
        batchNumber: stockAddData.batchNumber,
        notes: stockAddData.notes
      };

      setFertilizers(prev => [...prev, newFertilizer]);
      setShowStockAddModal(false);
      
      // Reset form
      setStockAddData({
        fertilizerName: "",
        category: "",
        quantity: "",
        minStock: "",
        maxStock: "",
        pricePerUnit: "",
        supplier: "",
        expiryDate: "",
        location: "",
        batchNumber: "",
        notes: ""
      });

      showRequestToast(`Successfully added ${stockAddData.fertilizerName} to stock!`);
    }
  };

  // Existing approval functions (keeping for backward compatibility)
  const approveRequest = (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      setCurrentRequest(request);
      const fertilizer = fertilizers.find(f => f.name === request.fertilizer);
      setAddStockData({
        supplier: fertilizer?.supplier || "",
        pricePerUnit: fertilizer?.pricePerUnit || "",
        expiryDate: "",
        location: fertilizer?.location || "",
        batchNumber: "",
        notes: ""
      });
    }
  };

  const rejectRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    showRequestToast("Request rejected successfully.");
  };

  const categories = [
    "Complete Fertilizer",
    "Nitrogen Fertilizer", 
    "Phosphorus Fertilizer",
    "Potassium Fertilizer",
    "Organic Fertilizer",
    "Calcium Fertilizer",
    "Micronutrient Fertilizer",
    "Liquid Fertilizer"
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header + Filters */}
        <div className="bg-white p-6 shadow-md mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#165E52]">Fertilizer Stock List</h1>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={() => setShowStockAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 font-medium text-sm rounded-lg shadow text-white hover:opacity-90"
                style={{ backgroundColor: BTN_COLOR }}
              >
                <Plus className="h-4 w-4" />
                Add New Stock
              </button>
            </div>
          </div>
        </div>

        {/* Toast */}
        {showToast && (
          <div className="mb-4 p-4 rounded-lg bg-[#e1f4ef] border border-[#cfece6] text-[#165E52] flex items-center gap-2 text-sm shadow-md">
            <CheckCircle className="w-5 h-5" />
            {toastMessage}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

        {/* Pending Requests Section */}
        {pendingRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#165E52] mb-4">Pending Stock Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="bg-white p-4 rounded-lg shadow-md border border-[#cfece6]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{request.fertilizer}</h4>
                      <p className="text-sm text-gray-600">Quantity: {request.quantity} kg</p>
                      <p className="text-xs text-gray-500">Requested: {request.requestDate}</p>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Pending
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveRequest(request.id)}
                      className="flex-1 px-3 py-2 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center justify-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Approve
                    </button>
                    <button
                      onClick={() => rejectRequest(request.id)}
                      className="flex-1 px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700 flex items-center justify-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                  <div className="flex justify-between"><span>Current Stock</span><span className="font-semibold">{f.currentStock} {f.unit}</span></div>
                  <div className="flex justify-between"><span>Price/Unit</span><span className="font-semibold">${f.pricePerUnit}</span></div>
                  <div className="flex justify-between"><span>Total Value</span><span className="font-semibold">${(f.currentStock * f.pricePerUnit).toFixed(2)}</span></div>
                  <p className="text-gray-500">Location: <span className="text-gray-700">{f.location}</span></p>
                  <p className="text-gray-500">Supplier: <span className="text-gray-700">{f.supplier}</span></p>
                  <p className="text-gray-500">Last Restocked: <span className="text-gray-700">{f.lastRestocked}</span></p>
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

      {/* Stock Add Modal */}
      {showStockAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 border border-[#cfece6] relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowStockAddModal(false)} className="absolute top-4 right-4 rounded p-1 hover:bg-gray-100 transition">
              <X className="w-5 h-5 text-black" />
            </button>
            <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Fertilizer Stock
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fertilizer Name */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Fertilizer Name *</label>
                <input
                  type="text"
                  value={stockAddData.fertilizerName}
                  onChange={(e) => setStockAddData(prev => ({...prev, fertilizerName: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="Enter fertilizer name (e.g., NPK 20-20-20)"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
                <select
                  value={stockAddData.category}
                  onChange={(e) => setStockAddData(prev => ({...prev, category: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Initial Quantity */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Initial Quantity (kg) *</label>
                <input
                  type="number"
                  min="0"
                  value={stockAddData.quantity}
                  onChange={(e) => setStockAddData(prev => ({...prev, quantity: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="Enter initial stock quantity"
                />
              </div>

              {/* Min Stock */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Minimum Stock Level (kg) *</label>
                <input
                  type="number"
                  min="0"
                  value={stockAddData.minStock}
                  onChange={(e) => setStockAddData(prev => ({...prev, minStock: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="Minimum stock threshold"
                />
              </div>

              {/* Max Stock */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Maximum Stock Level (kg) *</label>
                <input
                  type="number"
                  min="0"
                  value={stockAddData.maxStock}
                  onChange={(e) => setStockAddData(prev => ({...prev, maxStock: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="Maximum stock capacity"
                />
              </div>

              {/* Price per Unit */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Price per Unit ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={stockAddData.pricePerUnit}
                  onChange={(e) => setStockAddData(prev => ({...prev, pricePerUnit: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="Cost per kg"
                />
              </div>

              {/* Supplier */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Supplier *</label>
                <input
                  type="text"
                  value={stockAddData.supplier}
                  onChange={(e) => setStockAddData(prev => ({...prev, supplier: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="Supplier company name"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Expiry Date *</label>
                <input
                  type="date"
                  value={stockAddData.expiryDate}
                  onChange={(e) => setStockAddData(prev => ({...prev, expiryDate: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                />
              </div>

              {/* Storage Location */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Storage Location *</label>
                <input
                  type="text"
                  value={stockAddData.location}
                  onChange={(e) => setStockAddData(prev => ({...prev, location: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="e.g., Warehouse A-1"
                />
              </div>

              {/* Batch Number */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Batch Number</label>
                <input
                  type="text"
                  value={stockAddData.batchNumber}
                  onChange={(e) => setStockAddData(prev => ({...prev, batchNumber: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  placeholder="Batch/Lot number (optional)"
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Additional Notes</label>
                <textarea
                  value={stockAddData.notes}
                  onChange={(e) => setStockAddData(prev => ({...prev, notes: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  rows="3"
                  placeholder="Any additional information about this fertilizer (optional)"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-6 mt-6 border-t border-gray-200">
              <button 
                className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 transition" 
                onClick={() => setShowStockAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#172526] text-white px-6 py-2 rounded hover:bg-[#0e1a1a] transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddNewStock}
                disabled={!stockAddData.fertilizerName || !stockAddData.category || !stockAddData.quantity || !stockAddData.minStock || !stockAddData.maxStock || !stockAddData.pricePerUnit || !stockAddData.supplier || !stockAddData.expiryDate || !stockAddData.location}
              >
                Add to Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}