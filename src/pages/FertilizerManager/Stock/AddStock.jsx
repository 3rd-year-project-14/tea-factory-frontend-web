import React, { useState } from "react";
import { Plus, Package, ArrowLeft, Save, X } from "lucide-react";

const AddStockPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unit: "kg",
    pricePerUnit: "",
    supplier: "",
    location: "",
    expiryDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Complete Fertilizer",
    "Nitrogen Fertilizer",
    "Phosphorus Fertilizer",
    "Potassium Fertilizer",
    "Organic Fertilizer",
    "Calcium Fertilizer",
    "Micronutrient Fertilizer",
  ];

  const units = ["kg", "lbs", "tons", "bags"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.currentStock) newErrors.currentStock = "Required";
    if (!formData.minStock) newErrors.minStock = "Required";
    if (!formData.maxStock) newErrors.maxStock = "Required";
    if (!formData.pricePerUnit) newErrors.pricePerUnit = "Required";
    if (!formData.supplier.trim()) newErrors.supplier = "Required";
    if (!formData.location.trim()) newErrors.location = "Required";
    if (!formData.expiryDate) newErrors.expiryDate = "Required";

    if (
      formData.currentStock &&
      formData.minStock &&
      parseInt(formData.currentStock) < parseInt(formData.minStock)
    ) {
      newErrors.currentStock = "Cannot be less than minimum";
    }

    if (
      formData.minStock &&
      formData.maxStock &&
      parseInt(formData.minStock) >= parseInt(formData.maxStock)
    ) {
      newErrors.maxStock = "Must be greater than minimum";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Stock added successfully!");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      category: "",
      currentStock: "",
      minStock: "",
      maxStock: "",
      unit: "kg",
      pricePerUnit: "",
      supplier: "",
      location: "",
      expiryDate: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-200 transition">
                <ArrowLeft className="w-5 h-5 text-black" />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-[#172526] p-2 rounded-xl">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Add New Stock
                  </h1>
                  <p className="text-sm text-gray-500">
                    Add a new fertilizer to your inventory
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-4 h-4 text-black" />
              Reset
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow border p-6 space-y-8">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-black" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "Fertilizer Name *", name: "name", placeholder: "e.g. NPK 20-20-20", type: "text" },
                { label: "Category *", name: "category", type: "dropdown", options: categories },
                { label: "Supplier *", name: "supplier", placeholder: "e.g. GreenGrow Inc", type: "text" },
                { label: "Location *", name: "location", placeholder: "e.g. Warehouse A-2", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {field.type === "dropdown" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#172526] outline-none ${
                        errors[field.name] ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select {field.name}</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#172526] outline-none ${
                        errors[field.name] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stock Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Stock Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {[
                { name: "currentStock", label: "Current Stock *" },
                { name: "minStock", label: "Minimum Stock *" },
                { name: "maxStock", label: "Maximum Stock *" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="number"
                    min={0}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#172526] outline-none ${
                      errors[name] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#172526] outline-none"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price & Expiry */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Expiry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#172526] outline-none ${
                    errors.pricePerUnit ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pricePerUnit && (
                  <p className="text-red-500 text-xs mt-1">{errors.pricePerUnit}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#172526] outline-none ${
                    errors.expiryDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Notes</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#172526] outline-none"
              placeholder="Optional description..."
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#172526] text-white rounded-md hover:bg-[#101a1b] transition font-medium flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockPage;
