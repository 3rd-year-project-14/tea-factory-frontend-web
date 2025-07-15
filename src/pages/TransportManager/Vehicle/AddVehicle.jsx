import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddVehicle({ onAdd }) {
  const [form, setForm] = useState({
    vehicleNumber: "",
    vehicleType: "",
    capacity: "",
    status: "Available",
    assignedDriver: "",
    lastServiceDate: "",
    vehicleImage: "",
  });
  const navigate = useNavigate();

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
    onAdd(form);
    navigate("/transportManager/vehicle");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={form.vehicleNumber}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="vehicleType"
          placeholder="Vehicle Type"
          value={form.vehicleType}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Available</option>
          <option>In Use</option>
          <option>Maintenance</option>
        </select>
        <input
          name="assignedDriver"
          placeholder="Assigned Driver"
          value={form.assignedDriver}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="lastServiceDate"
          type="date"
          value={form.lastServiceDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="vehicleImage"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Register the Vehicle
        </button>
      </form>
    </div>
  );
}
