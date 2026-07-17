import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const inputClass =
  "w-full p-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40";

export default function AddDriverDetails({ vehicles }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [form, setForm] = useState({
    driver_id: userId || "",
    type: "INHOUSE",
    assigned_vehicle_id: "",
    phone: "",
    license_no: "",
    nic: "",
  });

  useEffect(() => {
    if (!userId) {
      alert("User ID missing! Please complete Step 1.");
      navigate("/transportManager/driver");
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/driver/addDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      navigate("/transportManager/driver/all");
    } else {
      alert("Failed to add driver details!");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-xl font-heading font-bold mb-6 text-center text-tea-700 dark:text-tea-300">
        Add Driver - Step 2 (Details)
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-ink/70 dark:text-ink-dark/70" htmlFor="type">
            Driver Type
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="INHOUSE">INHOUSE</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-ink/70 dark:text-ink-dark/70" htmlFor="assigned_vehicle_id">
            Assigned Vehicle
          </label>
          <select
            id="assigned_vehicle_id"
            name="assigned_vehicle_id"
            value={form.assigned_vehicle_id}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a Vehicle</option>
            {vehicles?.map((v) => (
              <option key={v.vehicleNumber || v.id} value={v.vehicleNumber || v.id}>
                {v.vehicleNumber || "ID: " + v.id} - {v.vehicleType || v.type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-ink/70 dark:text-ink-dark/70" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="0771234567"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-ink/70 dark:text-ink-dark/70" htmlFor="license_no">
            License Number
          </label>
          <input
            type="text"
            id="license_no"
            name="license_no"
            value={form.license_no}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-ink/70 dark:text-ink-dark/70" htmlFor="nic">
            NIC
          </label>
          <input
            type="text"
            id="nic"
            name="nic"
            value={form.nic}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <Button type="submit" variant="primary" className="w-full justify-center">
          Submit Driver Details
        </Button>
      </form>
    </Card>
  );
}
