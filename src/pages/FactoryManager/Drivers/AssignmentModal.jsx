import { useState, useEffect } from "react";
import {
  X,
  UserCheck,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { availableRoutes } from "./driverData";

export default function AssignmentModal({
  isOpen,
  onClose,
  onSubmit,
  availableDrivers = [],
  preSelectedDriver = null,
}) {
  const [formData, setFormData] = useState({
    driverId: "",
    route: "",
    startTime: "08:00",
    endTime: "17:00",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (preSelectedDriver) {
      setFormData((prev) => ({
        ...prev,
        driverId: preSelectedDriver.id,
      }));
    } else {
      setFormData({
        driverId: "",
        route: "",
        startTime: "08:00",
        endTime: "17:00",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      });
    }
    setErrors({});
  }, [preSelectedDriver, isOpen]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.driverId) {
      newErrors.driverId = "Please select a driver";
    }

    if (!formData.route) {
      newErrors.route = "Please select a route";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      newErrors.endTime = "End time must be after start time";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirmation(false);

    try {
      const selectedDriver = availableDrivers.find(
        (d) => d.id === formData.driverId
      );
      const assignmentData = {
        ...formData,
        driverName: selectedDriver?.name,
        vehicle: selectedDriver?.assignedVehicle,
      };

      await onSubmit(assignmentData);
      onClose();
    } catch (error) {
      console.error("Error creating assignment:", error);
      setErrors({ submit: "Failed to create assignment. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Assignment Modal */}
      <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-20 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
          {/* Header - Green Background */}
          <div className="bg-emerald-600 text-white p-6 relative">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Route Assignment</h2>
              
            </div>
          </div>

          {/* Form Content - White Background */}
          <div className="bg-white p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Driver Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Driver *
                </label>
                <select
                  value={formData.driverId}
                  onChange={(e) =>
                    handleInputChange("driverId", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 bg-white ${
                    errors.driverId ? "border-red-300" : "border-gray-300"
                  }`}
                  disabled={preSelectedDriver}
                >
                  <option value="" className="text-gray-500">
                    Choose driver...
                  </option>
                  {availableDrivers.map((driver) => (
                    <option
                      key={driver.id}
                      value={driver.id}
                      className="text-gray-900"
                    >
                      {driver.name} - {driver.assignedVehicle} (Quota:{" "}
                      {driver.bagQuota} bags)
                    </option>
                  ))}
                </select>
                {errors.driverId && (
                  <p className="text-red-500 text-sm mt-1">{errors.driverId}</p>
                )}
              </div>

              

              {/* Route Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Route *
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <select
                    value={formData.route}
                    onChange={(e) => handleInputChange("route", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 bg-white ${
                      errors.route ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <option value="" className="text-gray-500">
                      Choose route...
                    </option>
                    {availableRoutes.map((route) => (
                      <option
                        key={route}
                        value={route}
                        className="text-gray-900"
                      >
                        {route}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.route && (
                  <p className="text-red-500 text-sm mt-1">{errors.route}</p>
                )}
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 bg-white"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 bg-white placeholder-gray-500"
                  rows="4"
                  placeholder="Any special instructions or notes for this assignment..."
                />
              </div>

              {/* Error Display */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? "Assigning..." : "Assign Route"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Are you sure?
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-500 mb-6">
                This will assign{" "}
                {availableDrivers.find((d) => d.id === formData.driverId)?.name}{" "}
                to {formData.route} route for {formData.date}. This action
                cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Assigning..." : "Yes, Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
