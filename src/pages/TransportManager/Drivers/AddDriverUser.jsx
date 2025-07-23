import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Design Tokens
const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";
const INPUT_BG = "#ffffff";

export default function AddDriverUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    nic: "",
    contactNo: "",
    password: "",
    role: "DRIVER",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can add client-side validation here if needed,
    // or before sending data to backend

    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const data = await response.json();
      navigate(`/transportManager/driver/add-details`, {
        state: { userId: data.id },
      });
    } else {
      alert("Failed to create user!");
    }
  };

  return (
    <div
      className="max-w-md mx-auto rounded-2xl border shadow-2xl overflow-hidden bg-white"
      style={{ borderColor: BORDER_COLOR }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 border-b"
        style={{ backgroundColor: HEADER_BG, borderColor: BORDER_COLOR }}
      >
        <h2
          className="text-2xl font-semibold text-center"
          style={{ color: ACCENT_COLOR }}
        >
          Add Driver - Step 1 (User Account)
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Kasun Perera"
            className="w-full rounded-lg px-4 py-2 text-sm border"
            style={{
              borderColor: BORDER_COLOR,
              backgroundColor: INPUT_BG,
              color: ACCENT_COLOR,
            }}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. example@email.com"
            className="w-full rounded-lg px-4 py-2 text-sm border"
            style={{
              borderColor: BORDER_COLOR,
              backgroundColor: INPUT_BG,
              color: ACCENT_COLOR,
            }}
          />
        </div>

        {/* NIC */}
        <div>
          <label
            htmlFor="nic"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            NIC <span className="text-red-500">*</span>
          </label>
          <input
            id="nic"
            name="nic"
            type="text"
            required
            maxLength={12}
            value={form.nic}
            onChange={handleChange}
            placeholder="e.g. 881234567V"
            className="w-full rounded-lg px-4 py-2 text-sm border"
            style={{
              borderColor: BORDER_COLOR,
              backgroundColor: INPUT_BG,
              color: ACCENT_COLOR,
            }}
          />
        </div>

        {/* Contact Number */}
        <div>
          <label
            htmlFor="contactNo"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            id="contactNo"
            name="contactNo"
            type="tel"
            required
            pattern="^[0-9]{10}$"
            title="Enter a valid 10 digit phone number"
            value={form.contactNo}
            onChange={handleChange}
            placeholder="e.g. 0771234567"
            className="w-full rounded-lg px-4 py-2 text-sm border"
            style={{
              borderColor: BORDER_COLOR,
              backgroundColor: INPUT_BG,
              color: ACCENT_COLOR,
            }}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium"
            style={{ color: ACCENT_COLOR }}
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            className="w-full rounded-lg px-4 py-2 text-sm border"
            style={{
              borderColor: BORDER_COLOR,
              backgroundColor: INPUT_BG,
              color: ACCENT_COLOR,
            }}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full rounded-lg py-3 text-white font-semibold text-lg shadow-md transition-colors"
          style={{ backgroundColor: BTN_COLOR }}
        >
          Create Driver Account
        </button>
      </form>
    </div>
  );
}
