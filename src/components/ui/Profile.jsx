import React, { useState } from "react";
import { User, Mail, Building, Shield, Lock, Eye, EyeOff } from "lucide-react";

const ACCENT_COLOR = "#165E52";
const BUTTON_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const BLACK = "#b31616ff";

function ProfileHeader() {
  return (
    <div
      className="bg-white shadow-md border-b"
      style={{ borderColor: BORDER_COLOR }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold mb-1" style={{ color: ACCENT_COLOR }}>
          User Profile
        </h1>
        <p className="text-base" style={{ color: BLACK }}>
          Manage your account information and security settings
        </p>
      </div>
    </div>
  );
}

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    factoryName: "",
    role: "",
    address: "",
    nic: "",
    contactNo: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch logged-in user data on mount
  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      import("axios").then(({ default: axios }) => {
        axios
          .get(`http://localhost:8080/api/users/${userId}`)
          .then((response) => {
            console.log("Fetched user data:", response.data);
            // Map backend fields to formData fields as needed
            setFormData((prev) => ({
              ...prev,
              name: response.data.name || response.data.fullName || "",
              email: response.data.email || "",
              factoryName:
                response.data.factory.name || response.data.factory || "",
              role: response.data.role || "",
              address: response.data.address || "",
              nic: response.data.nic || "",
              contactNo:
                response.data.contactNo || response.data.contact_no || "",
              // keep password fields empty
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }));
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
          });
      });
    }
  }, []);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally reset changes
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="w-full px-6 mt-8">
        {/* Single heading for both columns */}
        <h2
          className="text-2xl font-semibold pb-2 border-b-2 mb-8"
          style={{ color: ACCENT_COLOR, borderColor: BORDER_COLOR }}
        >
          Personal Information
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Information Section (Left) */}
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                <User className="w-4 h-4 mr-2" color={ACCENT_COLOR} />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-lg transition-colors"
                style={{
                  border: `2px solid ${BORDER_COLOR}`,
                  ...(isEditing
                    ? {
                        outline: `2px solid ${ACCENT_COLOR}`,
                        background: "#fff",
                        color: ACCENT_COLOR,
                      }
                    : {
                        background: "#e1f4ef",
                        color: ACCENT_COLOR,
                        borderColor: BORDER_COLOR,
                      }),
                }}
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                <Mail className="w-4 h-4 mr-2" color={ACCENT_COLOR} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-lg transition-colors"
                style={{
                  border: `2px solid ${BORDER_COLOR}`,
                  ...(isEditing
                    ? {
                        outline: `2px solid ${ACCENT_COLOR}`,
                        background: "#fff",
                        color: ACCENT_COLOR,
                      }
                    : {
                        background: "#e1f4ef",
                        color: ACCENT_COLOR,
                        borderColor: BORDER_COLOR,
                      }),
                }}
              />
            </div>
            {/* Factory Name */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                <Building className="w-4 h-4 mr-2" color={ACCENT_COLOR} />
                Factory Name
              </label>
              <input
                type="text"
                name="factoryName"
                value={formData.factoryName}
                readOnly
                className="w-full px-4 py-3 rounded-lg transition-colors bg-[#e1f4ef]"
                style={{
                  border: `2px solid ${BORDER_COLOR}`,
                  color: ACCENT_COLOR,
                  borderColor: BORDER_COLOR,
                }}
              />
            </div>
            {/* Role */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                <Shield className="w-4 h-4 mr-2" color={ACCENT_COLOR} />
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                readOnly
                className="w-full px-4 py-3 rounded-lg transition-colors bg-[#e1f4ef]"
                style={{
                  border: `2px solid ${BORDER_COLOR}`,
                  color: ACCENT_COLOR,
                  borderColor: BORDER_COLOR,
                }}
              />
            </div>
          </div>
          {/* Address, NIC, Contact No (Right) */}
          <div className="space-y-6">
            {/* Removed 'Additional Information' heading, use 'Personal Information' for both sections */}
            {/* Address */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-lg transition-colors"
                style={{
                  border: `2px solid ${BORDER_COLOR}`,
                  ...(isEditing
                    ? {
                        outline: `2px solid ${ACCENT_COLOR}`,
                        background: "#fff",
                        color: ACCENT_COLOR,
                      }
                    : {
                        background: "#e1f4ef",
                        color: ACCENT_COLOR,
                        borderColor: BORDER_COLOR,
                      }),
                }}
              />
            </div>
            {/* NIC */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                NIC
              </label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-lg transition-colors"
                style={{
                  border: `2px solid ${BORDER_COLOR}`,
                  ...(isEditing
                    ? {
                        outline: `2px solid ${ACCENT_COLOR}`,
                        background: "#fff",
                        color: ACCENT_COLOR,
                      }
                    : {
                        background: "#e1f4ef",
                        color: ACCENT_COLOR,
                        borderColor: BORDER_COLOR,
                      }),
                }}
              />
            </div>
            {/* Contact Number */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                Contact Number
              </label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-lg transition-colors"
                style={{
                  border: `2px solid ${BORDER_COLOR}`,
                  ...(isEditing
                    ? {
                        outline: `2px solid ${ACCENT_COLOR}`,
                        background: "#fff",
                        color: ACCENT_COLOR,
                      }
                    : {
                        background: "#e1f4ef",
                        color: ACCENT_COLOR,
                        borderColor: BORDER_COLOR,
                      }),
                }}
              />
            </div>
          </div>
        </div>
        {/* Password Section - only show when editing, below both columns */}
        {isEditing && (
          <div className="space-y-6 mt-8">
            <h2
              className="text-2xl font-semibold pb-2 border-b-2"
              style={{ color: ACCENT_COLOR, borderColor: BORDER_COLOR }}
            >
              Change Password
            </h2>
            {/* Current Password */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                <Lock className="w-4 h-4 mr-2" color={ACCENT_COLOR} />
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 pr-12 rounded-lg transition-colors"
                  placeholder="Enter current password"
                  style={{
                    border: `2px solid ${BORDER_COLOR}`,
                    outline: `2px solid ${ACCENT_COLOR}`,
                    background: "#fff",
                    color: ACCENT_COLOR,
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: ACCENT_COLOR }}
                  disabled={!isEditing}
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* New Password */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                <Lock className="w-4 h-4 mr-2" color={ACCENT_COLOR} />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 pr-12 rounded-lg transition-colors"
                  placeholder="Enter new password"
                  style={{
                    border: `2px solid ${BORDER_COLOR}`,
                    outline: `2px solid ${ACCENT_COLOR}`,
                    background: "#fff",
                    color: ACCENT_COLOR,
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: ACCENT_COLOR }}
                  disabled={!isEditing}
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                className="flex items-center font-medium"
                style={{ color: ACCENT_COLOR }}
              >
                <Lock className="w-4 h-4 mr-2" color={ACCENT_COLOR} />
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 pr-12 rounded-lg transition-colors"
                  placeholder="Confirm new password"
                  style={{
                    border: `2px solid ${BORDER_COLOR}`,
                    outline: `2px solid ${ACCENT_COLOR}`,
                    background: "#fff",
                    color: ACCENT_COLOR,
                  }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: ACCENT_COLOR }}
                  disabled={!isEditing}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Password Requirements */}
            <div
              className="p-4 rounded-lg"
              style={{
                background: "#e1f4ef",
                border: `1px solid ${BORDER_COLOR}`,
              }}
            >
              <h4 className="font-medium mb-2" style={{ color: ACCENT_COLOR }}>
                Password Requirements:
              </h4>
              <ul className="text-sm" style={{ color: ACCENT_COLOR }}>
                <li>• At least 8 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character</li>
              </ul>
            </div>
          </div>
        )}
        {/* Action Buttons */}
        <div
          className="flex justify-end space-x-4 mt-8 pt-6"
          style={{ borderTop: `1px solid ${BORDER_COLOR}` }}
        >
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: BUTTON_COLOR,
                color: "#fff",
                fontWeight: 500,
              }}
              className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                style={{
                  background: "#ccc",
                  color: "#333",
                  fontWeight: 500,
                }}
                className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  background: BUTTON_COLOR,
                  color: "#fff",
                  fontWeight: 500,
                }}
                className="px-6 py-3 rounded-lg transition-colors hover:opacity-90"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
