import React, { useState } from "react";
import { createVehicle } from "../../../api/transportManager";
import { useAuth } from "../../../contexts/AuthContext";
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

// Design Tokens from previous form
const ACCENT_COLOR = "#165E52"; // used for labels/text
const BORDER_COLOR = "#cfece6"; // border color
const BTN_COLOR = "#01251F"; // button bg color
const HEADER_BG = "#e1f4ef"; // header/footer bg
const INPUT_BG = "#ffffff";

export default function AddVehicle() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    vehicleNumber: "",
    model: "",
    capacity: "",
    registeredDate: "",
    incomeCertificate: null,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const factoryId = user?.factoryId;
    if (!factoryId) {
      alert(
        "Cannot determine your factory. Please ensure you're logged in and have a factory assigned."
      );
      return;
    }

    console.log("incomeCertificate file:", form.incomeCertificate);
    console.log("image file:", form.image);

    // Build vehicle JSON object and append as a JSON part named 'vehicle'
    const vehicleObj = {
      vehicleNo: form.vehicleNumber,
      model: form.model,
      capacity: form.capacity ? parseInt(form.capacity, 10) : null,
      factoryId: factoryId,
      registeredDate: form.registeredDate || null,
    };

    const data = new FormData();
    data.append(
      "vehicle",
      new Blob([JSON.stringify(vehicleObj)], { type: "application/json" })
    );
    if (form.image) data.append("image", form.image);
    if (form.incomeCertificate)
      data.append("incomeCertificate", form.incomeCertificate);

    // Debug: log FormData contents (for files this will show File objects)
    for (let pair of data.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    createVehicle(data)
      .then(() => {
        alert("Vehicle registered successfully.");
        // reset form
        setForm({
          vehicleNumber: "",
          model: "",
          capacity: "",
          registeredDate: "",
          incomeCertificate: null,
          image: null,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to register vehicle. See console for details.");
      });
  };

  return (
    <div
      className="max-w-5xl mx-auto my-5 rounded-2xl border shadow-2xl overflow-hidden bg-white"
      style={{ borderColor: BORDER_COLOR }}
    >
      {/* Header */}
      <div
        className="px-8 py-6 border-b"
        style={{ backgroundColor: HEADER_BG, borderColor: BORDER_COLOR }}
      >
        <h2 className="text-2xl font-semibold" style={{ color: ACCENT_COLOR }}>
          Register New Vehicle
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8"
      >
        {/* Vehicle Number */}
        <div>
          <label
            htmlFor="vehicleNumber"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Vehicle Number
          </label>
          <div
            className="flex items-center gap-3 rounded-lg p-3 border"
            style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG }}
          >
            <FileText className="text-[rgba(22,94,82,0.8)]" size={24} />
            <input
              id="vehicleNumber"
              type="text"
              name="vehicleNumber"
              value={form.vehicleNumber}
              onChange={handleChange}
              placeholder="Vehicle Number (e.g., TRK-001)"
              required
              className="w-full bg-transparent focus:outline-none text-sm"
              style={{ color: ACCENT_COLOR }}
            />
          </div>
        </div>

        {/* Model */}
        <div>
          <label
            htmlFor="model"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Model
          </label>
          <div
            className="flex items-center gap-3 rounded-lg p-3 border"
            style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG }}
          >
            <Truck className="text-[rgba(22,94,82,0.8)]" size={24} />
            <input
              id="model"
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="Vehicle model (e.g., Hino 500)"
              required
              className="w-full bg-transparent focus:outline-none text-sm"
              style={{ color: ACCENT_COLOR }}
            />
          </div>
        </div>

        {/* Capacity */}
        <div>
          <label
            htmlFor="capacity"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Capacity (kg)
          </label>
          <div
            className="flex items-center gap-3 rounded-lg p-3 border"
            style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG }}
          >
            <Package className="text-[rgba(22,94,82,0.8)]" size={24} />
            <input
              id="capacity"
              type="number"
              min="0"
              step="1"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="Capacity in kg"
              required
              className="w-full bg-transparent focus:outline-none text-sm"
              style={{ color: ACCENT_COLOR }}
            />
          </div>
        </div>

        {/* Registered Date (datetime) */}
        {/* <div
          className="flex items-center gap-3 rounded-lg p-3 border"
          style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG }}
        >Re
          <Calendar className="text-[rgba(22,94,82,0.8)]" size={24} />
          <input
            id="registeredDate"
            type="datetime-local"
            name="registeredDate"
            value={form.registeredDate}
            onChange={handleChange}
            required
            className="w-full bg-transparent focus:outline-none text-sm"
            style={{ color: ACCENT_COLOR }}
          />
        </div> */}

        {/* Image */}

        {/* Image */}
        <div>
          <label
            htmlFor="image"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Vehicle Image
          </label>
          <div
            className="rounded-lg p-3 border"
            style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG }}
          >
            <label
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              style={{ color: ACCENT_COLOR }}
            >
              <Camera className="text-[rgba(22,94,82,0.8)]" size={20} />
              Upload Image
              <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {form.image && (
              <p
                className="mt-1 text-sm text-green-600 flex items-center gap-1"
                style={{ color: "#165E52" }}
              >
                <CheckCircle size={14} />
                {form.image.name}
              </p>
            )}
          </div>
        </div>

        {/* Require Income Certificate (checkbox + conditional upload) */}
        <div className="md:col-span-2">
          <label
            htmlFor="image"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Vehicle Income Certificate
          </label>
          <div
            className="mt-3 rounded-lg p-3 border"
            style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG }}
          >
            <label
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              style={{ color: ACCENT_COLOR }}
            >
              <FileText className="text-[rgba(22,94,82,0.8)]" size={18} />
              Upload Certificate
              <input
                id="incomeCertificate"
                type="file"
                name="incomeCertificate"
                accept="image/*,.pdf"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {form.incomeCertificate && (
              <p
                className="mt-1 text-sm text-green-600 flex items-center gap-1"
                style={{ color: "#165E52" }}
              >
                <CheckCircle size={14} />
                {form.incomeCertificate.name}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button full width */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-[#01251F] hover:bg-[#164d44] text-white font-semibold text-lg py-3 flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <Truck size={20} />
            Register Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}
