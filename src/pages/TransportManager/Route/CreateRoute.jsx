import { useState } from "react";
import { X, AlertCircle, MapPin, Navigation, Route } from "lucide-react";

export default function CreateRoute({ onAdd }) {
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

  // Mock drivers data - you can replace this with actual data
  const drivers = [
    { id: "1", name: "Mr. Perera", phone: "077-123-4567" },
    { id: "2", name: "Mr. Kamal", phone: "077-234-5678" },
    { id: "3", name: "Mr. Silva", phone: "077-345-6789" },
    { id: "4", name: "Mr. Fernando", phone: "077-456-7890" },
  ];

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

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmCreate = async () => {
    setShowConfirmDialog(false);
    await submitRoute();
  };

  const handleCancelCreate = () => {
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

      alert(
        "Route created successfully!\n" + JSON.stringify(submitData, null, 2)
      );

      // Reset form after successful submission
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

      if (onAdd) {
        onAdd(submitData);
      }
    } catch (error) {
      console.error("Error submitting route:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-2 overflow-hidden">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-4  w-full">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Route className="text-green-700" size={28} />
          Create New Route
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Route Name */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold text-gray-700">
                Route Name *
              </label>
              <input
                type="text"
                name="routeName"
                value={formData.routeName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none ${
                  errors.routeName ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="e.g., Galle-Akuressa Route"
              />
              {errors.routeName && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {errors.routeName}
                </div>
              )}
            </div>

            {/* Region */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold text-gray-700">
                Region *
              </label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none ${
                  errors.region ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="e.g., Southern Province"
              />
              {errors.region && (
                <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                  <AlertCircle size={14} />
                  {errors.region}
                </div>
              )}
            </div>

            {/* Start Location */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Start Location *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="startLocation"
                  value={formData.startLocation.name}
                  readOnly
                  className={`flex-1 px-4 py-3 border rounded-lg bg-gray-50 ${
                    errors.startLocation ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Select start location"
                />
                <button
                  type="button"
                  onClick={() => handleSelectLocation("start")}
                  className={`px-4 py-3 ${
                    formData.startLocation.name
                      ? "bg-green-700"
                      : "bg-green-600"
                  } hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2`}
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
              <label className="block mb-1 font-semibold text-gray-700">
                End Location *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="endLocation"
                  value={formData.endLocation.name}
                  readOnly
                  className={`flex-1 px-4 py-3 border rounded-lg bg-gray-50 ${
                    errors.endLocation ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Select end location"
                />
                <button
                  type="button"
                  onClick={() => handleSelectLocation("end")}
                  className={`px-4 py-3 ${
                    formData.endLocation.name ? "bg-green-700" : "bg-green-600"
                  } hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2`}
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
              <label className="block mb-1 font-semibold text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* Estimated Load */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Estimated Load (kg)
              </label>
              <input
                type="number"
                name="estimatedLoad"
                value={formData.estimatedLoad}
                onChange={handleChange}
                min="0"
                step="0.1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none ${
                  errors.estimatedLoad ? "border-red-300" : "border-gray-300"
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
              <label className="block mb-1 font-semibold text-gray-700">
                Estimated Bag Count
              </label>
              <input
                type="number"
                name="bagCounts"
                value={formData.bagCounts}
                onChange={handleChange}
                min="0"
                step="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none ${
                  errors.bagCounts ? "border-red-300" : "border-gray-300"
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
              <label className="block mb-1 font-semibold text-gray-700">
                Distance (km) - Auto Calculated
              </label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Will be calculated automatically"
              />
            </div>

            {/* Estimated Time */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Estimated Time
              </label>
              <input
                type="text"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none"
                placeholder="e.g., 3.5 hours"
              />
            </div>

            {/* Assigned Driver */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Assigned Driver
              </label>
              <select
                name="assignedDriver"
                value={formData.assignedDriver}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-3 rounded-lg font-bold text-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Route size={20} />
            {isSubmitting ? "Creating..." : "Create Route"}
          </button>
        </form>

        {/* Map Modal */}
        {showMap && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[600px] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
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
                    <p className="text-sm text-gray-600">
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
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-4">
                <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <MapPin className="mx-auto text-gray-500 mb-4" size={48} />
                    <p className="text-gray-800 font-medium mb-2">
                      Interactive Map Coming Soon
                    </p>
                    <p className="text-gray-700 text-sm mb-4">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400"
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
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-1 text-sm"
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
                      <p className="text-xs text-gray-600">
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
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-green-600" />
                </div>

                <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                  Confirm Route Creation
                </h3>

                <p className="text-center text-gray-600 mb-6">
                  Are you sure you want to create this route? This will add a
                  new route to the system.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleCancelCreate}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmCreate}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? "Creating..." : "Confirm Create"}
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
