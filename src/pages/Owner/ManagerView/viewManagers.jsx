import { Search } from 'lucide-react';
import { useState } from 'react';

export default function ManagerDashboard() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedFactory, setSelectedFactory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [managers, setManagers] = useState([
    {
      id: 'MG_A_001',
      name: 'Gayan sadamal',
      email: 'gayan@gmail.com',
      role: 'Manager',
      status: 'Active',
      factory: 'A'
    },
    {
      id: 'MG_A_011',
      name: 'Gayan sadamal',
      email: 'gayan@gmail.com',
      role: 'Manager',
      status: 'Suspended',
      factory: 'A'
    },
    {
      id: 'MG_A_023',
      name: 'Gayan sadamal',
      email: 'gayan@gmail.com',
      role: 'Manager',
      status: 'Active',
      factory: 'A'
    },
    {
      id: 'MG_B_001',
      name: 'John Smith',
      email: 'john@gmail.com',
      role: 'Supervisor',
      status: 'Active',
      factory: 'B'
    },
    {
      id: 'MG_C_111',
      name: 'Sarah Wilson',
      email: 'sarah@gmail.com',
      role: 'Admin',
      status: 'Active',
      factory: 'C'
    },
    {
      id: 'MG_B_001',
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
      manager.id.toLowerCase().includes(searchTerm.toLowerCase());
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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Managers</h1>
              <p className="text-gray-600 mt-1">Owner Dashboard - Manager Overview & Control</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
                onClick={() => window.location.href = '/Owner/ManagerView/addManagers'}
              >
                <span className="font-semibold text-base">+ Add Manager</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white/80 backdrop-blur p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="min-w-48">
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none shadow-sm"
              >
                <option value="">All Roles</option>
                <option value="Manager">Manager</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="min-w-48">
              <select 
                value={selectedFactory}
                onChange={(e) => setSelectedFactory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none shadow-sm"
              >
                <option value="">All Factories</option>
                <option value="A">Factory A</option>
                <option value="B">Factory B</option>
                <option value="C">Factory C</option>
              </select>
            </div>
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search managers ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Manager ID</th>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Factory</th>
                <th className="px-6 py-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredManagers.map((manager) => (
                <tr key={manager.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{manager.id}</td>
                  <td className="px-6 py-4 text-gray-900">{manager.name}</td>
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