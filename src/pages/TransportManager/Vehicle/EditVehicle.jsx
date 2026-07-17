import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const inputClass =
  "w-full rounded-lg p-2 border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40";

export default function EditVehicle({ vehicles, onEdit }) {
  const { vehicleNumber } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const vehicle = vehicles.find((v) => v.vehicleNumber === vehicleNumber);
    if (vehicle) setForm(vehicle);
  }, [vehicleNumber, vehicles]);

  if (!form) return <div className="text-ink/60 dark:text-muted-dark">Loading...</div>;

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
    onEdit(form);
    navigate("/transportManager/vehicle");
  };

  return (
    <Card className="max-w-lg mx-auto">
      <h2 className="text-xl font-heading font-bold mb-6 text-tea-700 dark:text-tea-300">Edit Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="vehicleNumber"
          value={form.vehicleNumber}
          disabled
          className={`${inputClass} bg-tea-50 dark:bg-white/10 cursor-not-allowed`}
        />
        <input
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="capacity"
          value={form.capacity}
          onChange={handleChange}
          className={inputClass}
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className={inputClass}
        >
          <option>Available</option>
          <option>In Use</option>
          <option>Maintenance</option>
        </select>
        <input
          name="assignedDriver"
          value={form.assignedDriver || ""}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="lastServiceDate"
          type="date"
          value={form.lastServiceDate}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="vehicleImage"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className={inputClass}
        />
        <Button type="submit" variant="secondary" className="!bg-amber-600 hover:!bg-amber-700">
          Save Changes
        </Button>
      </form>
    </Card>
  );
}
