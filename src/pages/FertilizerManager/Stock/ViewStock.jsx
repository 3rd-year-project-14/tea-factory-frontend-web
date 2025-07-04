import React, { useState } from "react";
import {
  ArrowLeft,
  Package,
  Edit3,
  Trash2,
  AlertTriangle,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  TrendingUp,
  Eye,
} from "lucide-react";

const ViewStockPage = () => {
  // Sample fertilizer data
  const [fertilizer] = useState({
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
    description:
      "High-quality balanced fertilizer suitable for all crops. Contains equal parts nitrogen, phosphorus, and potassium for optimal plant growth.",
    batchNumber: "NPK-2024-001",
    dateAdded: "2024-01-15",
    lastUpdated: "2024-06-20",
  });

  const getStockStatus = (current, min, max) => {
    if (current <= min) return "low";
    if (current >= max * 0.8) return "high";
    return "normal";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "low":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "low":
        return <AlertTriangle className="w-5 h-5" />;
      case "high":
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const status = getStockStatus(
    fertilizer.currentStock,
    fertilizer.minStock,
    fertilizer.maxStock
  );
  const stockPercentage = (fertilizer.currentStock / fertilizer.maxStock) * 100;
  const totalValue = fertilizer.currentStock * fertilizer.pricePerUnit;

  const handleEdit = () => {
    console.log("Edit fertilizer:", fertilizer.id);
  };

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this fertilizer stock?")
    ) {
      console.log("Delete fertilizer:", fertilizer.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="bg-green-100 p-2 rounded-lg hover:bg-green-200 transition-colors">
                <ArrowLeft className="w-5 h-5 text-green-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {fertilizer.name}
                  </h1>
                  <p className="text-green-600 font-medium">
                    {fertilizer.category}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEdit}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
              <button
                onClick={() =>
                  (window.location.href = "/fertilizerManager/stockRequest")
                }
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 font-semibold shadow"
              >
                <Package className="w-4 h-4" />
                <span>Request Fertilizer</span>
              </button>
            </div>
          </div>
        </div>
        {/* Status Card */}
        <div
          className={`rounded-xl shadow-sm border p-6 mb-6 ${getStatusColor(
            status
          )}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(status)}
              <div>
                <h3 className="font-semibold text-lg capitalize">
                  {status} Stock Level
                </h3>
                <p className="text-sm opacity-80">
                  {status === "low" && "Stock is below minimum threshold"}
                  {status === "high" && "Stock level is optimal"}
                  {status === "normal" && "Stock level is adequate"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {fertilizer.currentStock} {fertilizer.unit}
              </div>
              <div className="text-sm opacity-80">Current Stock</div>
            </div>
          </div>
        </div>
        {/* Stock Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stock Level Progress
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                Current: {fertilizer.currentStock} {fertilizer.unit}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {stockPercentage.toFixed(1)}% of maximum
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  status === "low"
                    ? "bg-red-500"
                    : status === "high"
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
                style={{ width: `${Math.min(stockPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Min: {fertilizer.minStock} {fertilizer.unit}
              </span>
              <span>
                Max: {fertilizer.maxStock} {fertilizer.unit}
              </span>
            </div>
          </div>
        </div>
        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 text-green-600 mr-2" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Fertilizer Name
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {fertilizer.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Category
                </label>
                <p className="text-gray-900">{fertilizer.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Batch Number
                </label>
                <p className="text-gray-900">{fertilizer.batchNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Unit
                </label>
                <p className="text-gray-900">{fertilizer.unit}</p>
              </div>
            </div>
          </div>
          {/* Financial Information */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 text-green-600 mr-2" />
              Financial Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Price per Unit
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  ${fertilizer.pricePerUnit}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Total Value
                </label>
                <p className="text-lg font-semibold text-green-600">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Supplier
                </label>
                <p className="text-gray-900">{fertilizer.supplier}</p>
              </div>
            </div>
          </div>
          {/* Location Information */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              Location Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Storage Location
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {fertilizer.location}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">Warehouse Storage</span>
              </div>
            </div>
          </div>
          {/* Date Information */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              Date Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Date Added
                </label>
                <p className="text-gray-900">
                  {new Date(fertilizer.dateAdded).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Last Restocked
                </label>
                <p className="text-gray-900">
                  {new Date(fertilizer.lastRestocked).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Expiry Date
                </label>
                <p className="text-gray-900">
                  {new Date(fertilizer.expiryDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Last Updated
                </label>
                <p className="text-gray-900">
                  {new Date(fertilizer.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {fertilizer.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewStockPage;
