import React, { useState } from "react";
import {
  Truck,
  FileText,
  Package,
  Settings,
  UserCircle,
  Calendar,
  Camera,
  CheckCircle,
} from "lucide-react";

export default function AddVehicle() {
  const [form, setForm] = useState({
    vehicleNumber: "",
    vehicleType: "",
    capacity: "",
    status: "Available",
    assignedDriver: "",
    lastServiceDate: "",
    vehicleImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "vehicleImage") {
      setForm({ ...form, vehicleImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Vehicle registered successfully!\n" +
        JSON.stringify(
          {
            ...form,
            vehicleImage: form.vehicleImage
              ? form.vehicleImage.name
              : "No image",
          },
          null,
          2
        )
    );
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          Register New Vehicle
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Side */}
          <div className="space-y-5">
            {/* Vehicle Number */}
            <div>
              <label
                htmlFor="vehicleNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vehicle Number
              </label>
              <div className="flex items-center gap-4 border border-emerald-100 rounded-lg p-3">
                <FileText className="text-blue-500" size={24} />
                <input
                  id="vehicleNumber"
                  type="text"
                  name="vehicleNumber"
                  placeholder="Vehicle Number (e.g., TRK-001)"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                  required
                  className="w-full border-0 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vehicle Type
              </label>
              <div className="flex items-center gap-4 border border-emerald-100 rounded-lg p-3">
                <Truck className="text-orange-500" size={24} />
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  required
                  className="w-full border-0 focus:ring-0 focus:outline-none"
                >
                  <option value="">Choose vehicle type</option>
                  {vehicleTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Capacity
              </label>
              <div className="flex items-center gap-4 border border-emerald-100 rounded-lg p-3">
                <Package className="text-purple-500" size={24} />
                <input
                  id="capacity"
                  type="text"
                  name="capacity"
                  placeholder="Capacity (e.g., 1000kg)"
                  value={form.capacity}
                  onChange={handleChange}
                  required
                  className="w-full border-0 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <div className="flex items-center gap-4 border border-emerald-100 rounded-lg p-3">
                <Settings className="text-red-500" size={24} />
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border-0 focus:ring-0 focus:outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-5">
            {/* Assigned Driver */}
            <div>
              <label
                htmlFor="assignedDriver"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Assigned Driver
              </label>
              <div className="flex items-center gap-4 border border-emerald-100 rounded-lg p-3">
                <UserCircle className="text-emerald-600" size={24} />
                <select
                  id="assignedDriver"
                  name="assignedDriver"
                  value={form.assignedDriver}
                  onChange={handleChange}
                  className="w-full border-0 focus:ring-0 focus:outline-none"
                >
                  {drivers.map((driver) => (
                    <option key={driver.value} value={driver.value}>
                      {driver.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Last Service Date */}
            <div>
              <label
                htmlFor="lastServiceDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Service Date
              </label>
              <div className="flex items-center gap-4 border border-emerald-100 rounded-lg p-3">
                <Calendar className="text-gray-500" size={24} />
                <input
                  id="lastServiceDate"
                  type="date"
                  name="lastServiceDate"
                  value={form.lastServiceDate}
                  onChange={handleChange}
                  required
                  className="w-full border-0 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>

            {/* Vehicle Image */}
            <div>
              <label
                htmlFor="vehicleImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vehicle Image
              </label>
              <div className="border border-emerald-100 rounded-lg p-3">
                <label className="flex items-center gap-3 text-sm font-medium text-gray-700 mb-2">
                  <Camera className="text-pink-500" size={20} />
                  Upload Vehicle Image
                </label>
                <input
                  id="vehicleImage"
                  type="file"
                  name="vehicleImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-sm text-gray-600"
                />
                {form.vehicleImage && (
                  <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle size={14} />
                    {form.vehicleImage.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button (Full Width Below) */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-lg font-bold text-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Truck size={20} />
              Register Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
