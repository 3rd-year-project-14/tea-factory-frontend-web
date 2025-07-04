import React, { useState } from "react";
import {
  Send,
  Building2,
  Package,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const ManagerFertilizerRequestForm = () => {
  const [formData, setFormData] = useState({
    requestId: `REQ-${Date.now().toString().slice(-6)}`,
    managerName: "",
    department: "",
    contactEmail: "",
    contactPhone: "",
    companyName: "",
    companyContact: "",
    companyEmail: "",
    requestDate: new Date().toISOString().split("T")[0],
    requiredBy: "",
    priority: "medium",
    budget: "",
    deliveryLocation: "",
    paymentTerms: "net30",
    specialInstructions: "",
  });

  const [fertilizerItems, setFertilizerItems] = useState([
    {
      id: 1,
      type: "",
      quantity: "",
      unit: "kg",
      specification: "",
      purpose: "",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fertilizerCompanies = [
    "AgroTech Industries",
    "GreenGrow Supplies",
    "FarmCorp Solutions",
    "BioNutrients Ltd",
    "ChemAgri Corp",
    "NutriField Solutions",
    "ProGrow Fertilizers",
    "EcoFert Systems",
    "AgriBoost Inc",
    "FertilizerPro Ltd",
  ];

  const fertilizerTypes = [
    "Nitrogen (Urea 46%)",
    "NPK 20-20-20 (Balanced)",
    "NPK 15-15-15 (Standard)",
    "NPK 10-26-26 (High P&K)",
    "Diammonium Phosphate (DAP)",
    "Monoammonium Phosphate (MAP)",
    "Muriate of Potash (MOP)",
    "Sulfate of Potash (SOP)",
    "Calcium Nitrate",
    "Magnesium Sulfate",
    "Organic Compost",
    "Liquid Fertilizer",
    "Slow Release Fertilizer",
    "Micronutrient Mix",
    "Custom Blend",
  ];

  const units = ["kg", "tons", "bags (50kg)", "liters", "gallons"];
  const departments = [
    "Agriculture",
    "Horticulture",
    "Research",
    "Production",
    "Quality Control",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFertilizerChange = (id, field, value) => {
    setFertilizerItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addFertilizerItem = () => {
    const newId = Math.max(...fertilizerItems.map((item) => item.id)) + 1;
    setFertilizerItems((prev) => [
      ...prev,
      {
        id: newId,
        type: "",
        quantity: "",
        unit: "kg",
        specification: "",
        purpose: "",
      },
    ]);
  };

  const removeFertilizerItem = (id) => {
    if (fertilizerItems.length > 1) {
      setFertilizerItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        requestId: `REQ-${Date.now().toString().slice(-6)}`,
        managerName: "",
        department: "",
        contactEmail: "",
        contactPhone: "",
        companyName: "",
        companyContact: "",
        companyEmail: "",
        requestDate: new Date().toISOString().split("T")[0],
        requiredBy: "",
        priority: "medium",
        budget: "",
        deliveryLocation: "",
        paymentTerms: "net30",
        specialInstructions: "",
      });
      setFertilizerItems([
        {
          id: 1,
          type: "",
          quantity: "",
          unit: "kg",
          specification: "",
          purpose: "",
        },
      ]);
    }, 3000);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "urgent":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "low":
        return <Clock className="w-4 h-4" />;
      case "medium":
        return <Calendar className="w-4 h-4" />;
      case "high":
        return <AlertCircle className="w-4 h-4" />;
      case "urgent":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Request Sent Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your fertilizer request has been sent to {formData.companyName} and
            is awaiting their response.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-blue-900">
              Request ID: {formData.requestId}
            </p>
            <p className="text-sm text-blue-700">
              Track your request using this ID
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-medium text-gray-900">Company</p>
              <p className="text-gray-600">{formData.companyName}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-medium text-gray-900">Priority</p>
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                  formData.priority
                )}`}
              >
                {getPriorityIcon(formData.priority)}
                {formData.priority.charAt(0).toUpperCase() +
                  formData.priority.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Send Fertilizer Request
          </h1>
          <p className="text-gray-600">
            Submit purchase requests to fertilizer companies
          </p>
        </div>

        <div className="space-y-8">
          {/* Request Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Request Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-xl p-4">
                <label className="block text-sm font-medium text-green-900 mb-2">
                  Request ID
                </label>
                <p className="text-lg font-mono text-green-800">
                  {formData.requestId}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Date
                </label>
                <input
                  type="date"
                  name="requestDate"
                  value={formData.requestDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required By *
                </label>
                <input
                  type="date"
                  name="requiredBy"
                  value={formData.requiredBy}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Manager Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Manager Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manager Name *
                </label>
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                  placeholder="manager@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-300 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-green-700" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Fertilizer Company Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <select
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                >
                  <option value="">Select fertilizer company</option>
                  {fertilizerCompanies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Contact Person
                </label>
                <input
                  type="text"
                  name="companyContact"
                  value={formData.companyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                  placeholder="Contact person name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Email
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                  placeholder="company@fertilizer.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                >
                  <option value="low">Low - Standard Processing</option>
                  <option value="medium">Medium - Priority Processing</option>
                  <option value="high">High - Urgent Processing</option>
                  <option value="urgent">Urgent - Immediate Attention</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fertilizer Requirements */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Fertilizer Requirements
                </h2>
              </div>
              <button
                type="button"
                onClick={addFertilizerItem}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-6">
              {fertilizerItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Item {index + 1}
                    </h3>
                    {fertilizerItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFertilizerItem(item.id)}
                        className="text-red-600 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fertilizer Type *
                      </label>
                      <select
                        value={item.type}
                        onChange={(e) =>
                          handleFertilizerChange(
                            item.id,
                            "type",
                            e.target.value
                          )
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                      >
                        <option value="">Select fertilizer type</option>
                        {fertilizerTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity *
                        </label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleFertilizerChange(
                              item.id,
                              "quantity",
                              e.target.value
                            )
                          }
                          required
                          min="1"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Unit
                        </label>
                        <select
                          value={item.unit}
                          onChange={(e) =>
                            handleFertilizerChange(
                              item.id,
                              "unit",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specifications
                      </label>
                      <textarea
                        value={item.specification}
                        onChange={(e) =>
                          handleFertilizerChange(
                            item.id,
                            "specification",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                        placeholder="Quality specs, purity, grade requirements..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose/Application
                      </label>
                      <textarea
                        value={item.purpose}
                        onChange={(e) =>
                          handleFertilizerChange(
                            item.id,
                            "purpose",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                        placeholder="Crop type, application method, expected usage..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commercial Terms */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Commercial Terms & Delivery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Estimate
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                  placeholder="Enter budget amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Terms
                </label>
                <select
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white"
                >
                  <option value="immediate">Immediate Payment</option>
                  <option value="advance">Advance Payment</option>
                  <option value="net15">Net 15 Days</option>
                  <option value="net30">Net 30 Days</option>
                  <option value="net45">Net 45 Days</option>
                  <option value="net60">Net 60 Days</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Location *
              </label>
              <textarea
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white resize-none"
                placeholder="Complete delivery address with contact details..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50 focus:bg-white resize-none"
                placeholder="Special handling requirements, certifications needed, delivery preferences..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Request...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Request to Company
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerFertilizerRequestForm;
