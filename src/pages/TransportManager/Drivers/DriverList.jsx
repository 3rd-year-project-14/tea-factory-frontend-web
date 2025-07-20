import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Eye } from "lucide-react";

const initialDrivers = [
  {
    id: "DRV-001",
    name: "Kasun Perera",
    email: "kasun.perera@example.com",
    type: "PRIVATE",
    assignedVehicle: "WP-AB-1234",
    phone: "0771234567",
    licenseNo: "B123456",
    nic: "881234567V",
  },
  {
    id: "DRV-002",
    name: "Nadeesha Silva",
    email: "nadeesha.silva@example.com",
    type: "PRIVATE",
    assignedVehicle: "TRK-002",
    phone: "0777654321",
    licenseNo: "C987654",
    nic: "992345678V",
  },
  {
    id: "DRV-003",
    name: "Saman Jayawardena",
    email: "saman.jayawardena@example.com",
    type: "INHOUSE",
    assignedVehicle: null,
    phone: "0761239874",
    licenseNo: "D123789",
    nic: "973462351V",
  },
];

const typeColor = {
  INHOUSE: "text-green-700",
  PRIVATE: "text-yellow-700",
};

export default function DriversList() {
  const [drivers] = useState(initialDrivers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filteredDrivers, setFilteredDrivers] = useState(initialDrivers);

  const navigate = useNavigate();

  useEffect(() => {
    let filtered = drivers;

    if (filterType !== "All Types") {
      filtered = filtered.filter((d) => d.type === filterType);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(term) ||
          d.email.toLowerCase().includes(term) ||
          (d.assignedVehicle && d.assignedVehicle.toLowerCase().includes(term))
      );
    }

    setFilteredDrivers(filtered);
  }, [searchTerm, filterType, drivers]);

  return (
    <div className="md:p-4 p-2 bg-[#f9fafb] overflow-hidden max-w-7xl mx-auto">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6 items-center">
        <input
          type="text"
          placeholder="🔍 Search Drivers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option>All Types</option>
          <option>INHOUSE</option>
          <option>PRIVATE</option>
        </select>
      </div>
      <div className="flex justify-end mb-4 gap-3">
        <button
          onClick={() => navigate("/transportManager/drivers/user")}
          className="bg-emerald-800 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition shadow"
        >
          + Add Driver
        </button>

        <button
          onClick={() => navigate("/transportManager/drivers/details")}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition shadow"
        >
          View Pending Approvals
        </button>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto pt-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-emerald-800 text-white">
              <th className="py-3 px-4 text-left">Driver</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Assigned Vehicle</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">License No</th>
              <th className="py-3 px-4 text-left">NIC</th>
              <th className="py-3 px-4 text-left">View</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No drivers found.
                </td>
              </tr>
            ) : (
              filteredDrivers.map((d, idx) => (
                <tr
                  key={d.id}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <UserCircle
                      className="text-green-600 bg-indigo-100 rounded-full p-1"
                      size={28}
                    />
                    <div>
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-xs text-gray-400">ID: {d.id}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{d.email}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      typeColor[d.type] || ""
                    }`}
                  >
                    {d.type}
                  </td>
                  <td className="py-3 px-4">{d.assignedVehicle || "-"}</td>
                  <td className="py-3 px-4">{d.phone || "-"}</td>
                  <td className="py-3 px-4">{d.licenseNo || "-"}</td>
                  <td className="py-3 px-4">{d.nic || "-"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        navigate(`/transportManager/driver/view/${d.id}`)
                      }
                      className="p-1 rounded hover:bg-indigo-100 hover:text-indigo-600"
                      title="View Driver"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
