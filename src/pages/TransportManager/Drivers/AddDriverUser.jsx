import axios from 'axios';
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';
import { auth } from "../../../firebase";

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
    licenseNo: "",
    vehicleNo: "",
  // route removed — assigned/managed elsewhere
    address: "",
    factoryId: "", // ID of existing factory to assign
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create Firebase user and then create driver in backend
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      const token = await getIdToken(user);

      const payload = {
        firebaseUid: user.uid,
        name: form.name,
        email: form.email,
        nic: form.nic,
        contactNo: form.contactNo,
        role: form.role,
        licenseNo: form.licenseNo,
        vehicleNo: form.vehicleNo,
        address: form.address,
        // send current logged-in manager's factoryId (hidden)
        factoryId: user && user.factoryId ? Number(user.factoryId) : null,
      };
      // Debug logging
      console.log("[driver:create] token:", token);
      console.log("[driver:create] payload:", payload);

      // Use the same /api/users endpoint as addManagers.jsx
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users",
          {
            firebaseUid: payload.firebaseUid,
            name: payload.name,
            email: payload.email,
            nic: payload.nic,
            contactNo: payload.contactNo,
            role: payload.role,
            // include driver-specific fields so backend can handle them
            // licenseNo: payload.licenseNo,
            // vehicleNo: payload.vehicleNo,
            address: payload.address,
            factoryId: payload.factoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("[driver:create] axios response status:", response.status);
        console.log("[driver:create] axios response data:", response.data);

        if (response.status === 200 || response.status === 201) {
          navigate(-1);
        } else {
          alert("Failed to create driver. See console for details.");
        }
      } catch (err) {
        console.error("[driver:create] axios error:", err.response || err.message || err);
        alert("Failed to create driver. See console for details.");
      }
    } catch (error) {
      console.error("Error creating driver:", error);
      alert("Error creating driver. See console for details.");
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
          <label htmlFor="name" className="block mb-1 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="e.g. Kasun Perera" className="w-full rounded-lg px-4 py-2 text-sm border" style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG, color: ACCENT_COLOR }} />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
            Email Address <span className="text-red-500">*</span>
          </label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="e.g. example@email.com" className="w-full rounded-lg px-4 py-2 text-sm border" style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG, color: ACCENT_COLOR }} />
        </div>

        {/* NIC */}
        <div>
          <label htmlFor="nic" className="block mb-1 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
            NIC <span className="text-red-500">*</span>
          </label>
          <input id="nic" name="nic" type="text" required maxLength={12} value={form.nic} onChange={handleChange} placeholder="e.g. 881234567V" className="w-full rounded-lg px-4 py-2 text-sm border" style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG, color: ACCENT_COLOR }} />
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contactNo" className="block mb-1 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input id="contactNo" name="contactNo" type="tel" required pattern="^[0-9]{10}$" title="Enter a valid 10 digit phone number" value={form.contactNo} onChange={handleChange} placeholder="e.g. 0771234567" className="w-full rounded-lg px-4 py-2 text-sm border" style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG, color: ACCENT_COLOR }} />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
            Password <span className="text-red-500">*</span>
          </label>
          <input id="password" name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} placeholder="At least 8 characters" className="w-full rounded-lg px-4 py-2 text-sm border" style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG, color: ACCENT_COLOR }} />
        </div>

        {/* Driver-specific fields */}
        <div>
          <label htmlFor="licenseNo" className="block mb-1 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
            License Number
          </label>
          <input id="licenseNo" name="licenseNo" type="text" value={form.licenseNo} onChange={handleChange} placeholder="e.g. B1234567" className="w-full rounded-lg px-4 py-2 text-sm border" style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG, color: ACCENT_COLOR }} />
        </div>

        <div>
          <label htmlFor="vehicleNo" className="block mb-1 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
            Vehicle Number
          </label>
          <input id="vehicleNo" name="vehicleNo" type="text" value={form.vehicleNo} onChange={handleChange} placeholder="e.g. WP CD-1234" className="w-full rounded-lg px-4 py-2 text-sm border" style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG, color: ACCENT_COLOR }} />
        </div>

        {/* Route removed from this form — assigned by transport planning */}

        <div>
          <label htmlFor="address" className="block mb-1 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
            Address
          </label>
          <input id="address" name="address" type="text" value={form.address} onChange={handleChange} placeholder="Driver address" className="w-full rounded-lg px-4 py-2 text-sm border" style={{ borderColor: BORDER_COLOR, backgroundColor: INPUT_BG, color: ACCENT_COLOR }} />
        </div>

        {/* factoryId is taken from the logged-in manager (hidden) */}

        {/* Submit button */}
        <button type="submit" className="w-full rounded-lg py-3 text-white font-semibold text-lg shadow-md transition-colors" style={{ backgroundColor: BTN_COLOR }}>
          Create Driver Account
        </button>
      </form>
    </div>
  );
}
