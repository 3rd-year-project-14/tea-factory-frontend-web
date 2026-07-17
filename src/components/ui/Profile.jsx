import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { User, Mail, Building, Shield, Lock, Eye, EyeOff } from "lucide-react";
import Card from "./Card";
import Button from "./Button";

const inputClass =
  "w-full px-4 py-3 rounded-lg transition-colors bg-tea-50 dark:bg-tea-900/20 text-ink dark:text-ink-dark border border-transparent focus:outline-none focus:ring-2 focus:ring-tea-500 disabled:opacity-70 disabled:cursor-not-allowed";

function ProfileHeader() {
  return (
    <Card className="mb-6">
      <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 mb-1">
        User Profile
      </h1>
      <p className="text-sm text-ink/60 dark:text-muted-dark">
        Manage your account information and security settings
      </p>
    </Card>
  );
}

function FieldLabel({ icon: Icon, children }) {
  return (
    <label className="flex items-center gap-2 font-medium text-tea-700 dark:text-tea-300">
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </label>
  );
}

export default function Profile() {
  const [showNoAccess, setShowNoAccess] = useState({
    factoryName: false,
    role: false,
  });
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

  // Use user data from AuthContext
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        factoryName: user.factoryName || "",
        role: user.role || "",
        address: user.address || "",
        nic: user.nic || "",
        contactNo: user.contactNo || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }
  }, [user]);

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
    <div className="min-h-full">
      <ProfileHeader />

      <Card>
        <h2 className="text-xl font-heading font-semibold pb-3 border-b border-tea-100 dark:border-card-border-dark mb-6 text-tea-700 dark:text-tea-300">
          {isEditing ? "Edit Personal Information" : "Personal Information"}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Information Section (Left) */}
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <FieldLabel icon={User}>Name</FieldLabel>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <FieldLabel icon={Mail}>Email Address</FieldLabel>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
            {/* Factory Name */}
            <div className="space-y-2">
              <FieldLabel icon={Building}>Factory Name</FieldLabel>
              <input
                type="text"
                name="factoryName"
                value={formData.factoryName}
                readOnly
                className={inputClass}
                onFocus={() =>
                  setShowNoAccess((prev) => ({ ...prev, factoryName: true }))
                }
                onBlur={() =>
                  setShowNoAccess((prev) => ({ ...prev, factoryName: false }))
                }
              />
              {showNoAccess.factoryName && (
                <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                  You do not have access to edit.
                </div>
              )}
            </div>
            {/* Role */}
            <div className="space-y-2">
              <FieldLabel icon={Shield}>Role</FieldLabel>
              <input
                type="text"
                name="role"
                value={formData.role}
                readOnly
                className={inputClass}
                onFocus={() =>
                  setShowNoAccess((prev) => ({ ...prev, role: true }))
                }
                onBlur={() =>
                  setShowNoAccess((prev) => ({ ...prev, role: false }))
                }
              />
              {showNoAccess.role && (
                <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                  You do not have access to edit.
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <FieldLabel>Address</FieldLabel>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
            {/* NIC */}
            <div className="space-y-2">
              <FieldLabel>NIC</FieldLabel>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
            {/* Contact Number */}
            <div className="space-y-2">
              <FieldLabel>Contact Number</FieldLabel>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Password Section - only show when editing, below both columns */}
        {isEditing && (
          <div className="space-y-6 mt-8">
            <h2 className="text-xl font-heading font-semibold pb-3 border-b border-tea-100 dark:border-card-border-dark text-tea-700 dark:text-tea-300">
              Change Password
            </h2>
            {/* Current Password */}
            <div className="space-y-2">
              <FieldLabel icon={Lock}>Current Password</FieldLabel>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`${inputClass} pr-12`}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tea-700 dark:text-tea-300"
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
              <FieldLabel icon={Lock}>New Password</FieldLabel>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`${inputClass} pr-12`}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tea-700 dark:text-tea-300"
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
              <FieldLabel icon={Lock}>Confirm New Password</FieldLabel>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`${inputClass} pr-12`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tea-700 dark:text-tea-300"
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
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-tea-100 dark:border-card-border-dark">
          {!isEditing ? (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <>
              <Button variant="ghost" className="!bg-gray-200 dark:!bg-white/10" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
