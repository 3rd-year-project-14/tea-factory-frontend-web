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
    address: ""
  });

  const [dropdowns, setDropdowns] = useState({
    role: false,
    factory: false,
  });

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const token = await getIdToken(user);

      await axios.post(
        "http://localhost:8080/api/users",
        {
          firebaseUid: user.uid,
          name: formData.name,
          email: formData.email,
          // password: formData.password,
          nic: formData.nic,
          contactNo: formData.mobile,
          role: formData.role,
          // factory: formData.factory,
          // factoryId: selectedFactoryId,
          address: formData.address
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/owner/managerview/giveaccess", {
        state: { manager: formData },
      });
    } catch (error) {
      console.error("Error creating manager:", error);
    }
  };

  const roles = [
    { label: 'Factory Manager', value: 'FACTORY_MANAGER' },
    { label: 'Inventory Manager', value: 'INVENTORY_MANAGER' },
    { label: 'Fertilizer Manager', value: 'FERTILIZER_MANAGER' },
    { label: 'Transport Manager', value: 'TRANSPORT_MANAGER' }
  ];

  const factories = [
    'Andaradeniya Tea Factory', 'Batuwangala Tea Factory', 'Ruhuna Tea Factory',
    'Duli Ella Tea Factory', 'Fortune Tea Factory', 'Waulugala Tea Factory',
    'Williegroup Tea Factory', 'Devonia Tea Factory', 'Galaxy Tea Factory',
    'Nivithigala Tea Factory'
  ];

  return (
    <div className="min-h-screen p-4">
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
            <h2 className="text-3xl font-bold text-gray-900" 
            // style={{ color: ACCENT_COLOR }}
            >
              Add Manager
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="flex items-center text-gray-500 hover:text-gray-700 text-lg font-medium px-4 py-2 rounded-lg border bg-white transition-colors"
                style={{ borderColor: BORDER_COLOR }}
              >
                <span className="mr-2">&#8592;</span> Back
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-2 rounded-lg text-white font-medium shadow-md transition-colors"
                style={{ backgroundColor: BTN_COLOR }}
                type="button"
              >
                Save & Give Access
              </button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Column */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-lg font-semibold" style={{ color: ACCENT_COLOR }}>
                  Personal Information
                </h3>
              </div>

              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border h-12"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter manager name"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                  Address :
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border h-12"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter manager address"
                />
              </div>

              {/* NIC */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                  NIC :
                </label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border h-12"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter NIC number"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                  Mobile Number :
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border h-12"
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
                <label className="block mb-2 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                  E-mail :
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border h-12"
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
                <label className="block mb-2 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                  Password :
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-4 py-3 border h-12"
                  style={{
                    borderColor: BORDER_COLOR,
                    backgroundColor: INPUT_BG,
                    color: ACCENT_COLOR,
                  }}
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-lg font-semibold" style={{ color: ACCENT_COLOR }}>
                  Role & Assignment
                </h3>
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                  Role :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={roles.find(r => r.value === formData.role)?.label || ""}
                    onClick={() => toggleDropdown('role')}
                    placeholder="Select Role"
                    className="w-full rounded-lg px-4 py-3 border h-12 cursor-pointer"
                    style={{
                      borderColor: BORDER_COLOR,
                      backgroundColor: INPUT_BG,
                      color: ACCENT_COLOR,
                    }}
                  />
                  <ChevronDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${dropdowns.role ? 'rotate-180' : ''}`} />
                  {dropdowns.role && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-400 rounded-lg shadow-2xl z-50">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => selectOption('role', role.value)}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 focus:bg-green-100 transition-colors"
                        >
                          {role.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Factory Dropdown */}
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: ACCENT_COLOR }}>
                  Factory :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={formData.factory}
                    onClick={() => toggleDropdown('factory')}
                    placeholder="Select Factory"
                    className="w-full rounded-lg px-4 py-3 border h-12 cursor-pointer"
                    style={{
                      borderColor: BORDER_COLOR,
                      backgroundColor: INPUT_BG,
                      color: ACCENT_COLOR,
                    }}
                  />
                  <ChevronDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${dropdowns.factory ? 'rotate-180' : ''}`} />
                  {dropdowns.factory && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-400 rounded-lg shadow-2xl z-50">
                      {factories.map((factory) => (
                        <button
                          key={factory}
                          type="button"
                          onClick={() => selectOption('factory', factory)}
                          className="w-full px-4 py-3 text-left hover:bg-green-50 focus:bg-green-100 transition-colors"
                        >
                          {factory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div> {/* ✅ CLOSED Right Column */}
          </div> {/* ✅ CLOSE Grid */}
        </div> {/* ✅ CLOSE Form Section */}
      </div> {/* ✅ CLOSE Form Container */}
    </div>
  );
}
