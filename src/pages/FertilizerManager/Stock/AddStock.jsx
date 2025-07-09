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
    // Clear error when user starts typing
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
    if (!formData.currentStock)
      newErrors.currentStock = "Current stock is required";
    if (!formData.minStock) newErrors.minStock = "Minimum stock is required";
    if (!formData.maxStock) newErrors.maxStock = "Maximum stock is required";
    if (!formData.pricePerUnit)
      newErrors.pricePerUnit = "Price per unit is required";
    if (!formData.supplier.trim()) newErrors.supplier = "Supplier is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    // Validate stock numbers
    if (
      formData.currentStock &&
      formData.minStock &&
      parseInt(formData.currentStock) < parseInt(formData.minStock)
    ) {
      newErrors.currentStock =
        "Current stock cannot be less than minimum stock";
    }
    if (
      formData.minStock &&
      formData.maxStock &&
      parseInt(formData.minStock) >= parseInt(formData.maxStock)
    ) {
      newErrors.maxStock = "Maximum stock must be greater than minimum stock";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission here
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
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Add New Stock
                  </h1>
                  <p className="text-green-600 font-medium">
                    Add fertilizer to your inventory
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 text-green-600 mr-2" />
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fertilizer Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter fertilizer name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supplier *
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.supplier ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter supplier name"
                    />
                    {errors.supplier && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.supplier}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.location ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g., Warehouse A-1"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Stock Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Stock Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Stock *
                    </label>
                    <input
                      type="number"
                      name="currentStock"
                      value={formData.currentStock}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.currentStock
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0"
                      min="0"
                    />
                    {errors.currentStock && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.currentStock}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Stock *
                    </label>
                    <input
                      type="number"
                      name="minStock"
                      value={formData.minStock}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.minStock ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0"
                      min="0"
                    />
                    {errors.minStock && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.minStock}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum Stock *
                    </label>
                    <input
                      type="number"
                      name="maxStock"
                      value={formData.maxStock}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.maxStock ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0"
                      min="0"
                    />
                    {errors.maxStock && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.maxStock}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
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
              {/* Price & Date Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Price & Date Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Unit ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="pricePerUnit"
                      value={formData.pricePerUnit}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.pricePerUnit
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                      min="0"
                    />
                    {errors.pricePerUnit && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pricePerUnit}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                        errors.expiryDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter any additional notes or description..."
                  />
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Add Stock</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockPage;
