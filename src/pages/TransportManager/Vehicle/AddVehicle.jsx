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
import Button from "../../../components/ui/Button";

const vehicleTypes = [
  { value: "truck", label: "Truck" },
  { value: "van", label: "Van" },
  { value: "lorry", label: "Lorry" },
];
const statusOptions = [
  { value: "Available", label: "Available" },
  { value: "Unavailable", label: "Unavailable" },
];
const drivers = [
  { value: "", label: "Select Driver" },
  { value: "1", label: "Nimal Perera" },
  { value: "2", label: "Kamal Silva" },
];

const fieldWrapClass =
  "flex items-center gap-3 rounded-lg p-3 border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5";
const labelClass = "block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300";
const iconClass = "text-tea-700/80 dark:text-tea-300/80";
const controlClass = "w-full bg-transparent focus:outline-none text-sm text-tea-700 dark:text-tea-200";

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
    <div className="max-w-4xl mx-auto my-10 rounded-2xl border border-tea-100 dark:border-card-border-dark shadow-card overflow-hidden bg-card dark:bg-card-dark">
      {/* Header */}
      <div className="px-8 py-6 border-b border-tea-100 dark:border-card-border-dark bg-tea-50 dark:bg-tea-900/20">
        <h2 className="text-xl font-heading font-semibold text-tea-700 dark:text-tea-300">
          Register New Vehicle
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        {/* Vehicle Number */}
        <div>
          <label htmlFor="vehicleNumber" className={labelClass}>
            Vehicle Number
          </label>
          <div className={fieldWrapClass}>
            <FileText className={iconClass} size={24} />
            <input
              id="vehicleNumber"
              type="text"
              name="vehicleNumber"
              value={form.vehicleNumber}
              onChange={handleChange}
              placeholder="Vehicle Number (e.g., TRK-001)"
              required
              className={controlClass}
            />
          </div>
        </div>

        {/* Vehicle Type */}
        <div>
          <label htmlFor="vehicleType" className={labelClass}>
            Vehicle Type
          </label>
          <div className={fieldWrapClass}>
            <Truck className={iconClass} size={24} />
            <select
              id="vehicleType"
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              required
              className={controlClass}
            >
              <option value="" disabled>
                Choose vehicle type
              </option>
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
          <label htmlFor="capacity" className={labelClass}>
            Capacity
          </label>
          <div className={fieldWrapClass}>
            <Package className={iconClass} size={24} />
            <input
              id="capacity"
              type="text"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="Capacity (e.g., 1000kg)"
              required
              className={controlClass}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <div className={fieldWrapClass}>
            <Settings className={iconClass} size={24} />
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={controlClass}
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
          <label htmlFor="assignedDriver" className={labelClass}>
            Assigned Driver
          </label>
          <div className={fieldWrapClass}>
            <UserCircle className={iconClass} size={24} />
            <select
              id="assignedDriver"
              name="assignedDriver"
              value={form.assignedDriver}
              onChange={handleChange}
              className={controlClass}
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
          <label htmlFor="lastServiceDate" className={labelClass}>
            Last Service Date
          </label>
          <div className={fieldWrapClass}>
            <Calendar className={iconClass} size={24} />
            <input
              id="lastServiceDate"
              type="date"
              name="lastServiceDate"
              value={form.lastServiceDate}
              onChange={handleChange}
              required
              className={controlClass}
            />
          </div>
        </div>

        {/* Vehicle Image */}
        <div>
          <label htmlFor="vehicleImage" className={labelClass}>
            Vehicle Image
          </label>
          <div className={`rounded-lg p-3 border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5`}>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer text-tea-700 dark:text-tea-300">
              <Camera className={iconClass} size={20} />
              Upload Vehicle Image
              <input
                id="vehicleImage"
                type="file"
                name="vehicleImage"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {form.vehicleImage && (
              <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                <CheckCircle size={14} />
                {form.vehicleImage.name}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button full width */}
        <div className="md:col-span-2">
          <Button type="submit" variant="primary" icon={Truck} className="w-full justify-center text-lg py-3">
            Register Vehicle
          </Button>
        </div>
      </form>
    </div>
  );
}
