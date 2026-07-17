import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "../../../components/ui/Button";

const inputClass =
  "w-full rounded-lg px-4 py-2 text-sm border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40";

// Dummy driver list (REPLACE with prop if needed)
const drivers = [
  { id: "1", name: "Nimal Perera", phone: "0711234567", type: "inhouse-driver" },
  { id: "2", name: "Kamal Silva", phone: "0779876543", type: "inhouse-driver" },
];

export default function CreateRoutePage({ onCancel }) {
  const [formData, setFormData] = useState({
    routeName: "",
    startLocation: "",
    endLocation: "",
    distance: "",
    estimatedTime: "",
    driverType: "inhouse",
    assignedDriver: "",
    assignedVehicle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const cleared =
        name === "driverType"
          ? { assignedDriver: "", assignedVehicle: "" }
          : {};
      return { ...prev, [name]: value, ...cleared };
    });
  };

  return (
    <div className="flex flex-col w-[540px] max-w-[95vw] rounded-2xl border border-tea-100 dark:border-card-border-dark shadow-card overflow-hidden mx-auto mt-10 mb-0 bg-card dark:bg-card-dark">
      {/* Header */}
      <div className="p-5 flex justify-between items-center border-b border-tea-100 dark:border-card-border-dark bg-tea-50 dark:bg-tea-900/20">
        <h2 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300">
          Create New Route
        </h2>

        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1 rounded text-tea-700 dark:text-tea-300 hover:bg-tea-100 dark:hover:bg-white/10"
            aria-label="Close"
            type="button"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Form content with tighter vertical spacing */}
      <form className="p-6 space-y-3">
        <div>
          <label className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            Route Name
          </label>
          <input
            type="text"
            name="routeName"
            value={formData.routeName}
            onChange={handleChange}
            placeholder="e.g., Colombo - Kandy"
            className={inputClass}
          />
        </div>

        {/* Row 1: Start Location & End Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
              Start Location
            </label>
            <input
              type="text"
              name="startLocation"
              value={formData.startLocation}
              onChange={handleChange}
              placeholder="e.g., Colombo"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
              End Location
            </label>
            <input
              type="text"
              name="endLocation"
              value={formData.endLocation}
              onChange={handleChange}
              placeholder="e.g., Kandy"
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 2: Distance & Estimated Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
              Distance (km)
            </label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="e.g., 120"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
              Estimated Time
            </label>
            <input
              type="text"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              placeholder="e.g., 3.5 hours"
              className={inputClass}
            />
          </div>
        </div>

        {/* Driver Type */}
        <div>
          <label className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            Driver Type
          </label>
          <select
            name="driverType"
            value={formData.driverType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="inhouse">Inhouse Driver</option>
            <option value="private">Private Driver</option>
          </select>
        </div>

        {/* Only Visible When Driver Type is Inhouse */}
        {formData.driverType === "inhouse" && (
          <>
            <div>
              <label className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
                Assigned Inhouse Driver
              </label>
              <select
                name="assignedDriver"
                value={formData.assignedDriver}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Driver</option>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} - {d.phone}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
                Assigned Inhouse Vehicle
              </label>
              <input
                type="text"
                name="assignedVehicle"
                value={formData.assignedVehicle}
                onChange={handleChange}
                placeholder="e.g., AB-1234"
                className={inputClass}
              />
            </div>
          </>
        )}
      </form>

      {/* Footer */}
      <div className="p-4 flex justify-end gap-3 border-t border-tea-100 dark:border-card-border-dark bg-tea-50 dark:bg-tea-900/20">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            console.log("Form submitted:", formData);
          }}
          type="button"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
