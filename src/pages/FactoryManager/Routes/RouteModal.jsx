import { useState, useEffect } from "react";
import { X, AlertCircle, MapPin, Navigation } from "lucide-react";

export default function RouteModal({
  isOpen,
  onClose,
  onSubmit,
  route = null,
  drivers = [],
}) {
  const [formData, setFormData] = useState({
    routeName: "",
    region: "",
    startLocation: { name: "", lat: null, lng: null },
    endLocation: { name: "", lat: null, lng: null },
    estimatedLoad: "",
    bagCounts: "",
    distance: "",
    estimatedTime: "",
    assignedDriver: "",
    status: "Active",
  });

  const [mapStep, setMapStep] = useState(null); // 'start' or 'end'
  const [showMap, setShowMap] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when route prop changes (for editing)
  useEffect(() => {
    if (route) {
      setFormData({
        routeName: route.routeName || "",
        region: route.region || "",
        startLocation: route.startLocation || {
          name: "",
          lat: null,
          lng: null,
        },
        endLocation: route.endLocation || { name: "", lat: null, lng: null },
        estimatedLoad: route.estimatedLoad || "",
        bagCounts: route.bagCounts || "",
        distance: route.distance || "",
        estimatedTime: route.estimatedTime || "",
        assignedDriver: route.driverId || "",
        status: route.status || "Active",
      });
    } else {
      // Reset form for new route creation
      setFormData({
        routeName: "",
        region: "",
        startLocation: { name: "", lat: null, lng: null },
        endLocation: { name: "", lat: null, lng: null },
        estimatedLoad: "",
        bagCounts: "",
        distance: "",
        estimatedTime: "",
        assignedDriver: "",
        status: "Active",
      });
    }
  }, [route]);

  const handleChange = (e) => {
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

    if (!formData.routeName.trim()) {
      newErrors.routeName = "Route name is required";
    }

    if (!formData.region.trim()) {
      newErrors.region = "Region is required";
    }

    if (!formData.startLocation.name) {
      newErrors.startLocation = "Start location is required";
    }

    if (!formData.endLocation.name) {
      newErrors.endLocation = "End location is required";
    }

    if (formData.estimatedLoad && parseFloat(formData.estimatedLoad) <= 0) {
      newErrors.estimatedLoad = "Estimated load must be greater than 0";
    }

    if (formData.bagCounts && parseInt(formData.bagCounts) <= 0) {
      newErrors.bagCounts = "Bag count must be greater than 0";
    }

    if (formData.distance && parseFloat(formData.distance) <= 0) {
      newErrors.distance = "Distance must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectLocation = (locationType) => {
    setMapStep(locationType);
    setShowMap(true);
  };

  const handleLocationSelected = (location) => {
    setFormData((prev) => ({
      ...prev,
      [mapStep + "Location"]: location,
    }));
    setShowMap(false);
    setMapStep(null);

    // Auto-calculate distance if both locations are set
    if (mapStep === "start" && formData.endLocation.lat) {
      calculateDistance(location, formData.endLocation);
    } else if (mapStep === "end" && formData.startLocation.lat) {
      calculateDistance(formData.startLocation, location);
    }
  };

  const calculateDistance = (start, end) => {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((end.lat - start.lat) * Math.PI) / 180;
    const dLon = ((end.lng - start.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((start.lat * Math.PI) / 180) *
        Math.cos((end.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    setFormData((prev) => ({
      ...prev,
      distance: distance.toFixed(1),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Show confirmation dialog for both creating and editing routes
    setShowConfirmDialog(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmDialog(false);
    await submitRoute();
  };

  const handleCancelUpdate = () => {
    setShowConfirmDialog(false);
  };

  const submitRoute = async () => {
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        estimatedLoad: parseFloat(formData.estimatedLoad) || 0,
        bagCounts: parseInt(formData.bagCounts) || 0,
        distance: parseFloat(formData.distance) || 0,
        driverId: formData.assignedDriver || null,
        assignedDriver: formData.assignedDriver
          ? drivers.find((d) => d.id === formData.assignedDriver)?.name
          : null,
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error("Error submitting route:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-emerald-200">
          <h2 className="text-2xl font-bold text-emerald-800">
            {route ? "Edit Route" : "Create New Route"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Route Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Route Name *
              </label>
              <input
                type="text"
                name="routeName"
                value={formData.routeName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 text-gray-900 ${
                  errors.routeName ? "border-red-300" : "border-emerald-300"
                }`}
                placeholder="e.g., Galle-Akuressa Route"
              />
              {errors.routeName && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {errors.routeName}
                </div>
              )}{" "}
            </div>

            {/* Start Location */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Start Location *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="startLocation"
                  value={formData.startLocation.name}
                  readOnly
                  className={`flex-1 px-4 py-3 border rounded-lg  text-emerald-800 ${
                    errors.startLocation
                      ? "border-red-300"
                      : "border-emerald-300"
                  }`}
                  placeholder="Select start location"
                />
                <button
                  type="button"
                  onClick={() => handleSelectLocation("start")}
                  className={`px-4 py-3 ${
                    formData.startLocation.name
                      ? "bg-emerald-700"
                      : "bg-emerald-600"
                  } hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2`}
                  title={
                    formData.startLocation.name
                      ? "Update existing location"
                      : "Select location"
                  }
                >
                  <MapPin size={16} />
                  {formData.startLocation.name ? "Update" : "Select"}
                </button>
              </div>
              {errors.startLocation && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {errors.startLocation}
                </div>
              )}
            </div>

            {/* End Location */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                End Location *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="endLocation"
                  value={formData.endLocation.name}
                  readOnly
                  className={`flex-1 px-4 py-3 border rounded-lg  text-emerald-800 ${
                    errors.endLocation ? "border-red-300" : "border-emerald-300"
                  }`}
                  placeholder="Select end location"
                />
                <button
                  type="button"
                  onClick={() => handleSelectLocation("end")}
                  className={`px-4 py-3 ${
                    formData.endLocation.name
                      ? "bg-emerald-700"
                      : "bg-emerald-600"
                  } hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2`}
                  title={
                    formData.endLocation.name
                      ? "Update existing location"
                      : "Select location"
                  }
                >
                  <Navigation size={16} />
                  {formData.endLocation.name ? "Update" : "Select"}
                </button>
              </div>
              {errors.endLocation && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {errors.endLocation}
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 appearance-none bg-white text-gray-900"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* Estimated Load */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Estimated Load (kg)
              </label>
              <input
                type="number"
                name="estimatedLoad"
                value={formData.estimatedLoad}
                onChange={handleChange}
                min="0"
                step="0.1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 text-gray-900 ${
                  errors.estimatedLoad ? "border-red-300" : "border-emerald-300"
                }`}
                placeholder="e.g., 350"
              />
              {errors.estimatedLoad && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {errors.estimatedLoad}
                </div>
              )}
            </div>

            {/* Bag Counts */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Estimated Bag Count
              </label>
              <input
                type="number"
                name="bagCounts"
                value={formData.bagCounts}
                onChange={handleChange}
                min="0"
                step="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 text-gray-900 ${
                  errors.bagCounts ? "border-red-300" : "border-emerald-300"
                }`}
                placeholder="e.g., 25"
              />
              {errors.bagCounts && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {errors.bagCounts}
                </div>
              )}
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Distance (km) - Auto Calculated
              </label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                readOnly
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg  text-emerald-800"
              />
            </div>

            {/* Estimated Time */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Estimated Time
              </label>
              <input
                type="text"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 text-gray-900"
                placeholder="e.g., 3.5 hours"
              />
            </div>

            {/* Assigned Driver */}
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2">
                Assigned Driver
              </label>
              <select
                name="assignedDriver"
                value={formData.assignedDriver}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 transition-colors duration-200 appearance-none bg-white text-gray-900"
              >
                <option value="">No driver assigned</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} - {driver.phone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-emerald-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 font-medium rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              {isSubmitting
                ? "Saving..."
                : route
                ? "Update Route"
                : "Create Route"}
            </button>
          </div>
        </form>

        {/* Map Modal */}
        {showMap && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[600px] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-emerald-200">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-800">
                    {mapStep === "start"
                      ? formData.startLocation.name
                        ? "Update Start Location"
                        : "Select Start Location"
                      : formData.endLocation.name
                      ? "Update End Location"
                      : "Select End Location"}
                  </h3>
                  {((mapStep === "start" && formData.startLocation.name) ||
                    (mapStep === "end" && formData.endLocation.name)) && (
                    <p className="text-sm text-emerald-600">
                      Current location:{" "}
                      {mapStep === "start"
                        ? formData.startLocation.name
                        : formData.endLocation.name}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowMap(false);
                    setMapStep(null);
                  }}
                  className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-4">
                <div className="w-full h-full bg-emerald-50 rounded-lg flex items-center justify-center border-2 border-dashed border-emerald-300">
                  <div className="text-center">
                    <MapPin
                      className="mx-auto text-emerald-500 mb-4"
                      size={48}
                    />
                    <p className="text-emerald-800 font-medium mb-2">
                      Interactive Map Coming Soon
                    </p>
                    <p className="text-emerald-700 text-sm mb-4">
                      For now, please enter location details manually:
                    </p>

                    <div className="max-w-md mx-auto space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={`Enter ${
                            mapStep === "start" ? "start" : "end"
                          } location name`}
                          defaultValue={
                            mapStep === "start"
                              ? formData.startLocation.name
                              : formData.endLocation.name
                          }
                          className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-900 placeholder-emerald-400"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              const location = {
                                name: e.target.value.trim(),
                                lat: 6.9271 + (Math.random() - 0.5) * 2, // Random coordinates around Sri Lanka
                                lng: 79.8612 + (Math.random() - 0.5) * 2,
                              };
                              handleLocationSelected(location);
                            }
                          }}
                        />
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-1 text-sm"
                          onClick={(e) => {
                            const input = e.target
                              .closest(".relative")
                              .querySelector("input");
                            if (input.value.trim()) {
                              const location = {
                                name: input.value.trim(),
                                lat: 6.9271 + (Math.random() - 0.5) * 2,
                                lng: 79.8612 + (Math.random() - 0.5) * 2,
                              };
                              handleLocationSelected(location);
                            }
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                      <p className="text-xs text-emerald-600">
                        Enter location name and press Enter or click Confirm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-emerald-600" />
                </div>

                <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                  {route ? "Confirm Route Update" : "Confirm Route Creation"}
                </h3>

                <p className="text-center text-gray-600 mb-6">
                  {route
                    ? "Are you sure you want to update this route? This action will modify the existing route details."
                    : "Are you sure you want to create this route? This will add a new route to the system."}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleCancelUpdate}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmUpdate}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting
                      ? route
                        ? "Updating..."
                        : "Creating..."
                      : route
                      ? "Confirm Update"
                      : "Confirm Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
