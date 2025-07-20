import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Driver - Step 1 (User Account)
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
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
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
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
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="nic" className="block mb-1 font-semibold">
            NIC <span className="text-red-500">*</span>
          </label>
          <input
            id="nic"
            name="nic"
            type="text"
            required
            value={form.nic}
            onChange={handleChange}
            placeholder="e.g. 881234567V"
            maxLength={12}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="contactNo" className="block mb-1 font-semibold">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            id="contactNo"
            name="contactNo"
            type="tel"
            required
            value={form.contactNo}
            onChange={handleChange}
            placeholder="e.g. 0771234567"
            pattern="^[0-9]{10}$"
            title="Enter a valid 10 digit phone number"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">
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
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-green-900 p-3 rounded hover:bg-green-800 transition"
        >
          Create Driver Account
        </button>
      </form>
    </div>
  );
}
