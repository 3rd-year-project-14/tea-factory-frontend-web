
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddManagersInterface() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    nic: '',
    mobile: '',
    managerId: '',
    role: '',
    factory: ''
  });

  const [dropdowns, setDropdowns] = useState({
    role: false,
    factory: false
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns({
      ...dropdowns,
      [dropdown]: !dropdowns[dropdown]
    });
  };

  const selectOption = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    setDropdowns({
      ...dropdowns,
      [field]: false
    });
  };

  const navigate = useNavigate();
  const handleSave = () => {
    navigate('/owner/managerview/giveaccess', { state: { manager: formData } });
  };



  const roles = ['Admin', 'Manager', 'Supervisor', 'Operator'];
  const factories = ['Factory A', 'Factory B', 'Factory C', 'Factory D'];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add Manager</h1>
              <p className="text-gray-600 mt-1">Owner Dashboard - Add a New Manager</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow"
              >
                Save &amp; Give Access
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Form Section */}
          <div className="p-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Personal Information */}
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                </div>
                
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter manager name"
                  />
                </div>

                {/* NIC Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    NIC :
                  </label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter NIC number"
                  />
                </div>

                {/* Mobile Number Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Mobile Number :
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter mobile number"
                  />
                </div>

                {/* Manager ID Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Manager ID :
                  </label>
                  <input
                    type="text"
                    name="managerId"
                    value={formData.managerId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter manager ID"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    E-mail :
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Password :
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {/* Right Column - Role & Assignment */}
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Role & Assignment</h3>
                </div>

                {/* Role Dropdown */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Role :
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={formData.role}
                      onClick={() => toggleDropdown('role')}
                      placeholder="Select Role"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all cursor-pointer"
                    />
                    <ChevronDown
                      size={20}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 ${dropdowns.role ? 'rotate-180' : ''}`}
                    />
                    {dropdowns.role && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-400 rounded-lg shadow-2xl z-50">
                        {roles.map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => selectOption('role', role)}
                            className="w-full px-4 py-3 text-left hover:bg-green-50 focus:bg-green-100 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 font-medium"
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
                  <label className="block text-gray-700 font-medium mb-2">
                    Factory :
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={formData.factory}
                      onClick={() => toggleDropdown('factory')}
                      placeholder="Select Factory"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all cursor-pointer"
                    />
                    <ChevronDown
                      size={20}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 ${dropdowns.factory ? 'rotate-180' : ''}`}
                    />
                    {dropdowns.factory && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-400 rounded-lg shadow-2xl z-50">
                        {factories.map((factory) => (
                          <button
                            key={factory}
                            type="button"
                            onClick={() => selectOption('factory', factory)}
                            className="w-full px-4 py-3 text-left hover:bg-green-50 focus:bg-green-100 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 font-medium"
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
    </div>
  );
}