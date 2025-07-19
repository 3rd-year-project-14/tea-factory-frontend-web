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

const vehicleTypes = [{ value: "lorry", label: "Lorry" }];

const statusOptions = [
  { value: "Available", label: "Available" },
  { value: "In Use", label: "In Use" },
  { value: "Maintenance", label: "Maintenance" },
];

const drivers = [
  { value: "", label: "No Driver Assigned" },
  { value: "Mr.Perera", label: "Mr. Perera" },
  { value: "Mr.Kamal", label: "Mr. Kamal" },
  { value: "Mr.Silva", label: "Mr. Silva" },
  { value: "Mr.Fernando", label: "Mr. Fernando" },
];

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
    // onAdd(form);
    // navigate("/transportManager/vehicle");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100 w-full">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <Truck className="text-green-700" size={28} />
          Add New Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Vehicle Number */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="vehicleNumber"
            >
              Vehicle Number
            </label>
            <div className="relative">
              <FileText
                className="absolute left-3 top-3 text-blue-500"
                size={18}
              />
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                placeholder="e.g., TRK-001"
                value={form.vehicleNumber}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="vehicleType"
            >
              Vehicle Type
            </label>
            <div className="relative">
              <Truck
                className="absolute left-3 top-3 text-orange-500"
                size={18}
              />
              <select
                id="vehicleType"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
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
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="capacity"
            >
              Capacity
            </label>
            <div className="relative">
              <Package
                className="absolute left-3 top-3 text-purple-500"
                size={18}
              />
              <input
                type="text"
                id="capacity"
                name="capacity"
                placeholder="e.g., 1000kg"
                value={form.capacity}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="status"
            >
              Status
            </label>
            <div className="relative">
              <Settings
                className="absolute left-3 top-3 text-red-500"
                size={18}
              />
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assigned Driver */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="assignedDriver"
            >
              Assigned Driver
            </label>
            <div className="relative">
              <UserCircle
                className="absolute left-3 top-3 text-indigo-500"
                size={18}
              />
              <select
                id="assignedDriver"
                name="assignedDriver"
                value={form.assignedDriver}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
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
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="lastServiceDate"
            >
              Last Service Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                type="date"
                id="lastServiceDate"
                name="lastServiceDate"
                value={form.lastServiceDate}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Vehicle Image */}
          <div>
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="vehicleImage"
            >
              Vehicle Image
            </label>
            <div className="relative">
              <Camera
                className="absolute left-3 top-3 text-pink-500"
                size={18}
              />
              <input
                type="file"
                id="vehicleImage"
                name="vehicleImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>
            {form.vehicleImage && (
              <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                <CheckCircle size={14} />
                File selected: {form.vehicleImage.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold text-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Truck size={20} />
            Register Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}
