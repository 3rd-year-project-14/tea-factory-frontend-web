import axios from 'axios';
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';
import { auth } from "../../../firebase";
import Button from "../../../components/ui/Button";

const inputClass =
  "w-full rounded-lg px-4 py-2 text-sm border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40";

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
    address: "",
    factoryId: "",
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        factoryId: user && user.factoryId ? Number(user.factoryId) : null,
      };
      console.log("[driver:create] token:", token);
      console.log("[driver:create] payload:", payload);

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
    <div className="max-w-md mx-auto rounded-2xl border border-tea-100 dark:border-card-border-dark shadow-card overflow-hidden bg-card dark:bg-card-dark">
      {/* Header */}
      <div className="px-6 py-5 border-b border-tea-100 dark:border-card-border-dark bg-tea-50 dark:bg-tea-900/20">
        <h2 className="text-xl font-heading font-semibold text-center text-tea-700 dark:text-tea-300">
          Add Driver - Step 1 (User Account)
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            Full Name <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="e.g. Kasun Perera" className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            Email Address <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="e.g. example@email.com" className={inputClass} />
        </div>

        <div>
          <label htmlFor="nic" className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            NIC <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input id="nic" name="nic" type="text" required maxLength={12} value={form.nic} onChange={handleChange} placeholder="e.g. 881234567V" className={inputClass} />
        </div>

        <div>
          <label htmlFor="contactNo" className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            Contact Number <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input id="contactNo" name="contactNo" type="tel" required pattern="^[0-9]{10}$" title="Enter a valid 10 digit phone number" value={form.contactNo} onChange={handleChange} placeholder="e.g. 0771234567" className={inputClass} />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            Password <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input id="password" name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} placeholder="At least 8 characters" className={inputClass} />
        </div>

        <div>
          <label htmlFor="licenseNo" className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            License Number
          </label>
          <input id="licenseNo" name="licenseNo" type="text" value={form.licenseNo} onChange={handleChange} placeholder="e.g. B1234567" className={inputClass} />
        </div>

        <div>
          <label htmlFor="vehicleNo" className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            Vehicle Number
          </label>
          <input id="vehicleNo" name="vehicleNo" type="text" value={form.vehicleNo} onChange={handleChange} placeholder="e.g. WP CD-1234" className={inputClass} />
        </div>

        <div>
          <label htmlFor="address" className="block mb-1 text-sm font-medium text-tea-700 dark:text-tea-300">
            Address
          </label>
          <input id="address" name="address" type="text" value={form.address} onChange={handleChange} placeholder="Driver address" className={inputClass} />
        </div>

        <Button type="submit" variant="primary" className="w-full justify-center text-lg py-3">
          Create Driver Account
        </Button>
      </form>
    </div>
  );
}
