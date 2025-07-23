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

const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";

const ViewStockPage = () => {
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
        return "text-[#165E52] bg-[#e1f4ef] border-[#bde3d6]";
      default:
        return "text-[#165E52] bg-[#e1f4ef] border-[#cfece6]";
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
    if (window.confirm("Are you sure you want to delete this fertilizer stock?")) {
      console.log("Delete fertilizer:", fertilizer.id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md border" style={{ borderColor: BORDER_COLOR }}>
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#e1f4ef] rounded-full flex items-center justify-center">
                  <Eye className="text-[#165E52]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: ACCENT_COLOR }}>
                    {fertilizer.name}
                  </h1>
                  <p className="text-sm text-gray-500">{fertilizer.category}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={() =>
                  (window.location.href = "/fertilizerManager/stockRequest")
                }
                className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: BTN_COLOR }}
              >
                Request Fertilizer
              </button>
            </div>
          </div>
        </div>

        {/* Stock Status */}
        <div className={`rounded-lg shadow border p-6 mb-6 ${getStatusColor(status)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(status)}
              <div>
                <h3 className="font-semibold text-lg capitalize">
                  {status} Stock Level
                </h3>
                <p className="text-sm text-gray-600">
                  {status === "low" && "Stock is below minimum threshold"}
                  {status === "high" && "Stock level is optimal"}
                  {status === "normal" && "Stock level is adequate"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">
                {fertilizer.currentStock} {fertilizer.unit}
              </div>
              <div className="text-sm text-gray-500">Current Stock</div>
            </div>
          </div>
        </div>

        {/* Stock Progress */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: ACCENT_COLOR }}>
            Stock Level Progress
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Current: {fertilizer.currentStock} {fertilizer.unit}
              </span>
              <span>{stockPercentage.toFixed(1)}% of maximum</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className={`h-3 rounded-full ${
                  status === "low"
                    ? "bg-red-500"
                    : "bg-[#165E52]"
                }`}
                style={{ width: `${Math.min(stockPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Min: {fertilizer.minStock} {fertilizer.unit}</span>
              <span>Max: {fertilizer.maxStock} {fertilizer.unit}</span>
            </div>
          </div>
        </div>

        {/* Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[
            {
              title: "Basic Information",
              icon: <Package className="w-5 h-5 text-[#165E52]" />,
              content: [
                ["Fertilizer Name", fertilizer.name],
                ["Category", fertilizer.category],
                ["Batch Number", fertilizer.batchNumber],
                ["Unit", fertilizer.unit],
              ],
            },
            {
              title: "Financial Information",
              icon: <DollarSign className="w-5 h-5 text-[#165E52]" />,
              content: [
                ["Price per Unit", `$${fertilizer.pricePerUnit}`],
                ["Total Value", `$${totalValue.toLocaleString()}`],
                ["Supplier", fertilizer.supplier],
              ],
            },
            {
              title: "Location Information",
              icon: <MapPin className="w-5 h-5 text-[#165E52]" />,
              content: [["Storage Location", fertilizer.location]],
            },
            {
              title: "Date Information",
              icon: <Calendar className="w-5 h-5 text-[#165E52]" />,
              content: [
                ["Date Added", new Date(fertilizer.dateAdded).toLocaleDateString()],
                ["Last Restocked", new Date(fertilizer.lastRestocked).toLocaleDateString()],
                ["Expiry Date", new Date(fertilizer.expiryDate).toLocaleDateString()],
                ["Last Updated", new Date(fertilizer.lastUpdated).toLocaleDateString()],
              ],
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
            >
              <h3
                className="text-lg font-semibold mb-4 flex items-center gap-2"
                style={{ color: ACCENT_COLOR }}
              >
                {section.icon}
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.content.map(([label, value], i) => (
                  <div key={i}>
                    <label className="block text-sm text-gray-500">{label}</label>
                    <p className="text-sm font-medium text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: ACCENT_COLOR }}>
            Description
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {fertilizer.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewStockPage;
