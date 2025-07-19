import React, { useState } from "react";
import { MapPin, Clock, FileText, Route } from "lucide-react";

export default function CreateRoute() {
  const [form, setForm] = useState({
    routeName: "",
    routeCode: "",
    startLocation: "",
    endLocation: "",
    estimatedDuration: "",
    distance: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Route created successfully!\n" + JSON.stringify(form, null, 2));
    // onAdd(form);
    // navigate("/transportManager/routes");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100 w-full">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Route className="text-green-700" size={28} />
          Create New Route
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Route Name */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="routeName"
            >
              Route Name
            </label>
            <div className="relative">
              <FileText
                className="absolute left-3 top-3 text-blue-500"
                size={18}
              />
              <input
                type="text"
                id="routeName"
                name="routeName"
                placeholder="e.g., Galle to Neluwa Express"
                value={form.routeName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Route Code */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="routeCode"
            >
              Route Code
            </label>
            <div className="relative">
              <Route
                className="absolute left-3 top-3 text-purple-500"
                size={18}
              />
              <input
                type="text"
                id="routeCode"
                name="routeCode"
                placeholder="e.g., RT-001"
                value={form.routeCode}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Start Location */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="startLocation"
            >
              Start Location
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-green-500"
                size={18}
              />
              <input
                type="text"
                id="startLocation"
                name="startLocation"
                placeholder="e.g., Galle"
                value={form.startLocation}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* End Location */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="endLocation"
            >
              End Location
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-red-500"
                size={18}
              />
              <input
                type="text"
                id="endLocation"
                name="endLocation"
                placeholder="e.g., Neluwa"
                value={form.endLocation}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Distance */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="distance"
            >
              Distance (km)
            </label>
            <div className="relative">
              <Route
                className="absolute left-3 top-3 text-indigo-500"
                size={18}
              />
              <input
                type="number"
                id="distance"
                name="distance"
                placeholder="e.g., 45"
                value={form.distance}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Estimated Duration */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="estimatedDuration"
            >
              Estimated Duration (hours)
            </label>
            <div className="relative">
              <Clock
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                type="number"
                step="0.5"
                id="estimatedDuration"
                name="estimatedDuration"
                placeholder="e.g., 2.5"
                value={form.estimatedDuration}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="description"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Additional route details..."
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold text-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Route size={20} />
            Create Route
          </button>
        </form>
      </div>
    </div>
  );
}
