import { useState, useMemo } from "react";
import { Search, Eye, Edit } from "lucide-react";

export default function ManagerDashboard() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedFactory, setSelectedFactory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [managers, setManagers] = useState([
    {
      id: "MG_A_001",
      name: "Gayan Sadamal",
      email: "gayan@gmail.com",
      role: "Manager",
      status: "Active",
      factory: "A",
    },
    {
      id: "MG_A_011",
      name: "Gayan Sadamal",
      email: "gayan@gmail.com",
      role: "Manager",
      status: "Suspended",
      factory: "A",
    },
    {
      id: "MG_A_023",
      name: "Gayan Sadamal",
      email: "gayan@gmail.com",
      role: "Manager",
      status: "Active",
      factory: "A",
    },
    {
      id: "MG_B_001",
      name: "John Smith",
      email: "john@gmail.com",
      role: "Supervisor",
      status: "Active",
      factory: "B",
    },
    {
      id: "MG_C_111",
      name: "Sarah Wilson",
      email: "sarah@gmail.com",
      role: "Admin",
      status: "Active",
      factory: "C",
    },
    {
      id: "MG_B_002",
      name: "Mike Johnson",
      email: "mike@gmail.com",
      role: "Manager",
      status: "Suspended",
      factory: "B",
    },
  ]);

  const filteredManagers = useMemo(() => {
    return managers.filter((manager) => {
      const matchesRole =
        !selectedRole ||
        manager.role.toLowerCase() === selectedRole.toLowerCase();
      const matchesFactory =
        !selectedFactory || manager.factory === selectedFactory;
      const matchesSearch =
        !searchTerm ||
        manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRole && matchesFactory && matchesSearch;
    });
  }, [managers, selectedRole, selectedFactory, searchTerm]);

  const handleStatusToggle = (id) => {
    setManagers((prev) =>
      prev.map((manager) =>
        manager.id === id
          ? {
              ...manager,
              status: manager.status === "Active" ? "Suspended" : "Active",
            }
          : manager
      )
    );
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: "bg-[#e1f4ef] text-[#165E52]",
      Suspended: "bg-red-100 text-red-800",
    };
    const label = status === "Active" ? "Active" : "Suspended";
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fdfc]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#165E52]">Managers</h1>
            <p className="text-[#165E52] opacity-80 mt-1 text-sm">
              Owner Dashboard - Manager Overview & Control
            </p>
          </div>
          <button
            onClick={() =>
              (window.location.href = "/Owner/ManagerView/addManagers")
            }
            className="bg-[#01251F] hover:bg-[#014c3b] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            + Add Manager
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg border border-[#cfece6] p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-[#165E52] focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm appearance-none"
              aria-label="Filter by Role"
            >
              <option value="">All Roles</option>
              <option value="Manager">Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Admin">Admin</option>
            </select>

            {/* Factory Filter */}
            <select
              value={selectedFactory}
              onChange={(e) => setSelectedFactory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-[#165E52] focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm appearance-none"
              aria-label="Filter by Factory"
            >
              <option value="">All Factories</option>
              <option value="A">Factory A</option>
              <option value="B">Factory B</option>
              <option value="C">Factory C</option>
            </select>

            {/* Search Input */}
            <div className="relative w-full col-span-2 md:col-span-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search managers ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-[#165E52] focus:ring-2 focus:ring-green-500 focus:border-green-500"
                aria-label="Search managers"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-[#cfece6] overflow-hidden">
          <div className="bg-[#01251F] text-white">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm">
              <div className="text-left">Manager ID</div>
              <div className="text-left">Name</div>
              <div className="text-left">Role</div>
              <div className="text-center">Status</div>
              <div className="text-center">Factory</div>
              <div className="text-center">Action</div>
            </div>
          </div>

          <div className="divide-y divide-[#cfece6]">
            {filteredManagers.length > 0 ? (
              filteredManagers.map((manager) => (
                <div
                  key={`${manager.id}-${manager.status}`} // id + status to avoid key duplicates
                  className="grid grid-cols-6 gap-4 p-3 items-center hover:bg-gray-100 transition-colors text-[#165E52]"
                >
                  <div className="font-mono text-sm">{manager.id}</div>
                  <div>
                    <p className="font-semibold">{manager.name}</p>
                    <p className="text-xs text-gray-500">{manager.email}</p>
                  </div>
                  <div>{manager.role}</div>
                  <div className="flex justify-center">
                    {getStatusBadge(manager.status)}
                  </div>
                  <div className="text-center">{manager.factory}</div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleStatusToggle(manager.id)}
                      className={`px-3 py-1 rounded-lg font-medium text-xs transition-colors ${
                        manager.status === "Active"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                      aria-label={
                        manager.status === "Active"
                          ? "Suspend manager"
                          : "Activate manager"
                      }
                    >
                      {manager.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#165E52]">
                <div className="h-12 w-12 text-[#cfece6] mx-auto mb-4 text-4xl">
                  👤
                </div>
                <h3 className="text-lg font-medium mb-2">No managers found</h3>
                <p className="opacity-80">
                  Try adjusting your filters or add a new manager.
                </p>
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600 p-4 border-t border-[#cfece6] bg-white">
            <div>
              Showing {filteredManagers.length} of {managers.length} managers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
