import { useState, useEffect } from "react";
import { X, User, Truck, Phone, MapPin, Calendar, Package } from "lucide-react";
import { validateDriver } from "./driverUtils";
import { driverTypes, vehicles } from "./driverData";

export default function DriverModal({
  isOpen,
  onClose,
  onSubmit,
  driver = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    contact: "",
    address: "",
    type: "Factory Driver",
    assignedVehicle: "",
    licenseExpiry: "",
    bagQuota: 40,
    experience: "",
    emergencyContact: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name || "",
        nic: driver.nic || "",
        contact: driver.contact || "",
        address: driver.address || "",
        type: driver.type || "Factory Driver",
        assignedVehicle: driver.assignedVehicle || "",
        licenseExpiry: driver.licenseExpiry || "",
        bagQuota: driver.bagQuota || 40,
        experience: driver.experience || "",
        emergencyContact: driver.emergencyContact || "",
        status: driver.status || "active",
      });
    } else {
      setFormData({
        name: "",
        nic: "",
        contact: "",
        address: "",
        type: "Factory Driver",
        assignedVehicle: "",
        licenseExpiry: "",
        bagQuota: 40,
        experience: "",
        emergencyContact: "",
        status: "active",
      });
    }
    setErrors({});
  }, [driver, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateDriver(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting driver:", error);
      setErrors({ submit: "Failed to save driver. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-800">
                {driver ? "Edit Driver" : "Add New Driver"}
              </h2>
              <p className="text-emerald-600 text-sm">
                {driver ? "Update driver information" : "Enter driver details"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <X size={20} className="text-emerald-600" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <User size={20} />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.name ? "border-red-300" : "border-emerald-300"
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    NIC Number *
                  </label>
                  <input
                    type="text"
                    value={formData.nic}
                    onChange={(e) => handleInputChange("nic", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.nic ? "border-red-300" : "border-emerald-300"
                    }`}
                    placeholder="Enter NIC number"
                  />
                  {errors.nic && (
                    <p className="text-red-500 text-xs mt-1">{errors.nic}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"
                      size={16}
                    />
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) =>
                        handleInputChange("contact", e.target.value)
                      }
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.contact ? "border-red-300" : "border-emerald-300"
                      }`}
                      placeholder="+94 XX XXX XXXX"
                    />
                  </div>
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Emergency Contact
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"
                      size={16}
                    />
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        handleInputChange("emergencyContact", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="+94 XX XXX XXXX"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-3 text-emerald-400"
                      size={16}
                    />
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      rows="2"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                <Truck size={20} />
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Driver Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {driverTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Assigned Vehicle *
                  </label>
                  <select
                    value={formData.assignedVehicle}
                    onChange={(e) =>
                      handleInputChange("assignedVehicle", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.assignedVehicle
                        ? "border-red-300"
                        : "border-emerald-300"
                    }`}
                  >
                    <option value="">Select vehicle</option>
                    {vehicles
                      .filter((v) => v.status === "active")
                      .map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.id} - {vehicle.type} ({vehicle.capacity})
                        </option>
                      ))}
                  </select>
                  {errors.assignedVehicle && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.assignedVehicle}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    License Expiry Date *
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"
                      size={16}
                    />
                    <input
                      type="date"
                      value={formData.licenseExpiry}
                      onChange={(e) =>
                        handleInputChange("licenseExpiry", e.target.value)
                      }
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.licenseExpiry
                          ? "border-red-300"
                          : "border-emerald-300"
                      }`}
                    />
                  </div>
                  {errors.licenseExpiry && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.licenseExpiry}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Bag Quota *
                  </label>
                  <div className="relative">
                    <Package
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"
                      size={16}
                    />
                    <input
                      type="number"
                      value={formData.bagQuota}
                      onChange={(e) =>
                        handleInputChange("bagQuota", parseInt(e.target.value))
                      }
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.bagQuota
                          ? "border-red-300"
                          : "border-emerald-300"
                      }`}
                      min="1"
                      max="100"
                    />
                  </div>
                  {errors.bagQuota && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bagQuota}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g., 5 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-emerald-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Saving..."
                  : driver
                  ? "Update Driver"
                  : "Add Driver"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
