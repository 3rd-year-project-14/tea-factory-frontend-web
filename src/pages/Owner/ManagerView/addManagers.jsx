import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../../../firebase";
import Button from "../../../components/ui/Button";

const inputClass =
  "w-full rounded-lg px-4 py-3 border border-tea-100 dark:border-card-border-dark h-12 bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40";

const roles = [
  { label: 'Factory Manager', value: 'FACTORY_MANAGER' },
  { label: 'Inventory Manager', value: 'INVENTORY_MANAGER' },
  { label: 'Fertilizer Manager', value: 'FERTILIZER_MANAGER' },
  { label: 'Transport Manager', value: 'TRANSPORT_MANAGER' }
];

const factoryOptions = [
  { id: "1", name: "Wawlugala Tea Factory" },
  { id: "2", name: "Miyanawathura Tea Factory" },
  { id: "3", name: "Andaradeniya Tea Factory" },
  { id: "4", name: "Batuwangala Tea Factory" },
  { id: "5", name: "Duli Ella Tea Factory" },
  { id: "6", name: "Devonia Tea Factory" },
  { id: "7", name: "Fortune Tea Factory" },
  { id: "8", name: "Galaxi Tea Factory" },
  { id: "9", name: "Ruhunu Tea Factory" },
];

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

      const dataToSend = {
        firebaseUid: user.uid,
        name: formData.name,
        email: formData.email,
        nic: formData.nic,
        contactNo: formData.mobile,
        role: formData.role,
        factoryId: formData.factory,
        address: formData.address
      };
      console.log("Data sent to backend:", dataToSend);

      await axios.post(
        "http://localhost:8080/api/users",
        dataToSend,
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

  return (
    <div className="min-h-full">
      <div className="max-w-6xl mx-auto rounded-2xl border border-tea-100 dark:border-card-border-dark shadow-card overflow-hidden bg-card dark:bg-card-dark">
        {/* Header */}
        <div className="px-8 py-6 border-b border-tea-100 dark:border-card-border-dark bg-tea-50 dark:bg-tea-900/20">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
              Add Manager
            </h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate(-1)} type="button">
                <span className="mr-2">&#8592;</span> Back
              </Button>
              <Button variant="primary" onClick={handleSave} type="button">
                Save & Give Access
              </Button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="border-b border-tea-100 dark:border-card-border-dark pb-4 mb-6">
                <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300">
                  Personal Information
                </h3>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter manager name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                  Address :
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter manager address"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                  NIC :
                </label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter NIC number"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                  Mobile Number :
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                  E-mail :
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                  Password :
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="border-b border-tea-100 dark:border-card-border-dark pb-4 mb-6">
                <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300">
                  Role & Assignment
                </h3>
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block mb-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                  Role :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={roles.find(r => r.value === formData.role)?.label || ""}
                    onClick={() => toggleDropdown('role')}
                    placeholder="Select Role"
                    className={`${inputClass} cursor-pointer`}
                  />
                  <ChevronDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink/40 dark:text-muted-dark ${dropdowns.role ? 'rotate-180' : ''}`} />
                  {dropdowns.role && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card dark:bg-card-dark border border-tea-500 rounded-lg shadow-card z-50">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => selectOption('role', role.value)}
                          className="w-full px-4 py-3 text-left text-ink dark:text-ink-dark hover:bg-tea-50 dark:hover:bg-white/10 focus:bg-tea-100 dark:focus:bg-white/20 transition-colors"
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
                <label className="block mb-2 text-sm font-medium text-tea-700 dark:text-tea-300">
                  Factory :
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={factoryOptions.find(f => f.id === formData.factory)?.name || ""}
                    onClick={() => toggleDropdown('factory')}
                    placeholder="Select Factory"
                    className={`${inputClass} cursor-pointer`}
                  />
                  <ChevronDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink/40 dark:text-muted-dark ${dropdowns.factory ? 'rotate-180' : ''}`} />
                  {dropdowns.factory && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card dark:bg-card-dark border border-tea-500 rounded-lg shadow-card z-50">
                      {factoryOptions.map((factory) => (
                        <button
                          key={factory.id}
                          type="button"
                          onClick={() => selectOption('factory', factory.id)}
                          className="w-full px-4 py-3 text-left text-ink dark:text-ink-dark hover:bg-tea-50 dark:hover:bg-white/10 focus:bg-tea-100 dark:focus:bg-white/20 transition-colors"
                        >
                          {factory.name}
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
