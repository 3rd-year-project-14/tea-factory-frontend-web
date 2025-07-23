import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { auth } from "../../../firebase"; // adjust path if needed
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";

// Design Tokens
const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const HEADER_BG = "#e1f4ef";
const INPUT_BG = "#ffffff";

export default function AddManagersInterface() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    nic: "",
    mobile: "",
    role: "",
    factory: "",
  });

  const [dropdowns, setDropdowns] = useState({
    role: false,
    factory: false,
  });

  const roles = [
    "Factory Manager",
    "Inventory Manager",
    "Fertilizer Manager",
    "Transport Manager",
  ];
  const factories = ["Factory A", "Factory B", "Factory C", "Factory D"];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns({
      ...dropdowns,
      [dropdown]: !dropdowns[dropdown],
    });
  };

  const selectOption = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setDropdowns({
      ...dropdowns,
      [field]: false,
    });
  };

  const handleSave = async () => {
    try {
      // Create manager auth in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Get Firebase ID token
      const token = await getIdToken(user);

      // Post to backend
      const response = await axios.post(
        "http://localhost:8080/api/users",
        {
          firebaseUid: user.uid,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          nic: formData.nic,
          contactNo: formData.mobile,
          role: formData.role,
          factory: formData.factory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Saved:", response.data);
      navigate("/owner/managerview/giveaccess", {
        state: { manager: formData },
      });
    } catch (error) {
      console.error("Error creating manager:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div
        className="max-w-6xl mx-auto rounded-2xl border shadow-2xl overflow-hidden bg-white"
        style={{ borderColor: BORDER_COLOR }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 border-b"
          style={{ backgroundColor: HEADER_BG, borderColor: BORDER_COLOR }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>
              Add Manager
            </h2>
            <button
              onClick={handleSave}
              className="px-8 py-2 rounded-lg text-white font-medium shadow-md transition-colors"
              style={{ backgroundColor: BTN_COLOR }}
              type="button"
            >
              Save &amp; Give Access
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Personal Information */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: ACCENT_COLOR }}
                >
                  Personal Information
                </h3>
              </div>

              {/* Name */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter manager name"
                />
              </div>

              {/* NIC */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  NIC :
                </label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter NIC number"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  Mobile Number :
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter mobile number"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  E-mail :
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter email address"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  Password :
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Right Column - Role & Assignment */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: ACCENT_COLOR }}
                >
                  Role & Assignment
                </h3>
              </div>

              {/* Role Dropdown */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  Role :
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("role")}
                    className="w-full rounded-lg px-4 py-3 border bg-white text-left flex items-center justify-between"
                    style={{
                      borderColor: BORDER_COLOR,
                      color: formData.role ? ACCENT_COLOR : "#A0AEC0",
                    }}
                  >
                    <span>{formData.role || "Select Role"}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        dropdowns.role ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdowns.role && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                      style={{ borderColor: BORDER_COLOR }}
                    >
                      {roles.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => selectOption("role", role)}
                          className="w-full px-4 py-3 text-left hover:bg-[#e1f4ef] first:rounded-t-lg last:rounded-b-lg transition-colors"
                          style={{ color: ACCENT_COLOR }}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Factory Dropdown */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: ACCENT_COLOR }}
                >
                  Factory :
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("factory")}
                    className="w-full rounded-lg px-4 py-3 border bg-white text-left flex items-center justify-between"
                    style={{
                      borderColor: BORDER_COLOR,
                      color: formData.factory ? ACCENT_COLOR : "#A0AEC0",
                    }}
                  >
                    <span>{formData.factory || "Select Factory"}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        dropdowns.factory ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdowns.factory && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                      style={{ borderColor: BORDER_COLOR }}
                    >
                      {factories.map((factory) => (
                        <button
                          key={factory}
                          type="button"
                          onClick={() => selectOption("factory", factory)}
                          className="w-full px-4 py-3 text-left hover:bg-[#e1f4ef] first:rounded-t-lg last:rounded-b-lg transition-colors"
                          style={{ color: ACCENT_COLOR }}
                        >
                          {factory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
