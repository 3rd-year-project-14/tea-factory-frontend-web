import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

export default function AddManagersInterface() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
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

  const handleSave = () => {
    console.log('Saving manager data:', formData);
    // Handle save logic here

    try{

      async function sendData() {
        const response = await axios.post('https://tea-factory-project-902e0-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json', { ...formData})
        console.log(response);
      }

      sendData();

    } catch (err) {
      console.log(err);
    }

  };



  const roles = ['Admin', 'Manager', 'Supervisor', 'Operator'];
  const factories = ['Factory A', 'Factory B', 'Factory C', 'Factory D'];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Add Managers</h2>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>

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
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                    placeholder="Enter manager name"
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
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
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
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
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
                    <button
                      type="button"
                      onClick={() => toggleDropdown('role')}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg text-left flex items-center justify-between hover:bg-gray-200 transition-colors"
                    >
                      <span className={formData.role ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.role || 'Select Role'}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform ${dropdowns.role ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {dropdowns.role && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {roles.map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => selectOption('role', role)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
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
                    <button
                      type="button"
                      onClick={() => toggleDropdown('factory')}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg text-left flex items-center justify-between hover:bg-gray-200 transition-colors"
                    >
                      <span className={formData.factory ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.factory || 'Select Factory'}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform ${dropdowns.factory ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {dropdowns.factory && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {factories.map((factory) => (
                          <button
                            key={factory}
                            type="button"
                            onClick={() => selectOption('factory', factory)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
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