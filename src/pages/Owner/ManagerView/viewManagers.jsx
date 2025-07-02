import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export default function ManagerDashboard() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedFactory, setSelectedFactory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [managers, setManagers] = useState([
    {
      id: 1,
      name: 'Gayan sadamal',
      email: 'gayan@gmail.com',
      role: 'Manager',
      status: 'Active',
      factory: 'A'
    },
    {
      id: 2,
      name: 'Gayan sadamal',
      email: 'gayan@gmail.com',
      role: 'Manager',
      status: 'Suspended',
      factory: 'A'
    },
    {
      id: 3,
      name: 'Gayan sadamal',
      email: 'gayan@gmail.com',
      role: 'Manager',
      status: 'Active',
      factory: 'A'
    },
    {
      id: 4,
      name: 'John Smith',
      email: 'john@gmail.com',
      role: 'Supervisor',
      status: 'Active',
      factory: 'B'
    },
    {
      id: 5,
      name: 'Sarah Wilson',
      email: 'sarah@gmail.com',
      role: 'Admin',
      status: 'Active',
      factory: 'C'
    },
    {
      id: 6,
      name: 'Mike Johnson',
      email: 'mike@gmail.com',
      role: 'Manager',
      status: 'Suspended',
      factory: 'B'
    }
  ]);

  // Filter managers based on selected criteria
  const filteredManagers = managers.filter(manager => {
    const matchesRole = !selectedRole || manager.role.toLowerCase() === selectedRole.toLowerCase();
    const matchesFactory = !selectedFactory || manager.factory === selectedFactory;
    const matchesSearch = !searchTerm || 
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesFactory && matchesSearch;
  });

  const handleStatusToggle = (id) => {
    setManagers(prevManagers => 
      prevManagers.map(manager => 
        manager.id === id 
          ? { ...manager, status: manager.status === 'Active' ? 'Suspended' : 'Active' }
          : manager
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Managers</h1>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-green-100 rounded-lg transition-colors">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Filter</span>
            </button>
            
            {/* Role Select */}
            <div className="flex-1">
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
              >
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Factory Select */}
            <div className="flex-1">
              <select 
                value={selectedFactory}
                onChange={(e) => setSelectedFactory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
              >
                <option value="">Select Factory</option>
                <option value="A">Factory A</option>
                <option value="B">Factory B</option>
                <option value="C">Factory C</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Factory</th>
                <th className="px-6 py-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredManagers.map((manager) => (
                <tr key={manager.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{manager.name}</td>
                  <td className="px-6 py-4 text-gray-900">{manager.email}</td>
                  <td className="px-6 py-4 text-gray-900">{manager.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      manager.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {manager.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{manager.factory}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusToggle(manager.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        manager.status === 'Active'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {manager.status === 'Active' ? 'Suspend' : 'Active'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}