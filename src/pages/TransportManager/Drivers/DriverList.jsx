import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Eye, Search } from "lucide-react";

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
  {
    id: "DRV-004",
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
  INHOUSE: "text-emerald-700",
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
    <div className="bg-gray-50  py-4 px-2">
      <div className="max-w-8xl mx-auto space-y-4">
        <div className="bg-gray-50 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-emerald-900 text-center">
            Driver Management
          </h2>
          <div className="flex justify-end gap-4  pb-4">
            <button
              onClick={() => navigate("/transportManager/drivers/user")}
              className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition w-full md:w-auto"
            >
              + Add Driver
            </button>
            <button
              onClick={() => navigate("/transportManager/drivers/details")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition w-full md:w-auto"
            >
              View Pending Approvals
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between mb-6">
            <div className="flex flex-col gap-2 w-full md:w-2/5">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search drivers"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full md:w-auto px-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
            >
              <option>All Types</option>
              <option>INHOUSE</option>
              <option>PRIVATE</option>
            </select>
          </div>
          {/* Drivers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-x-auto mt-10">
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
                      } hover:bg-emerald-50 transition`}
                    >
                      <td className="py-3 px-4 flex items-center gap-3">
                        <UserCircle
                          className="text-emerald-600 bg-emerald-100 rounded-full p-1"
                          size={28}
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            {d.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {d.id}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{d.email}</td>
                      <td
                        className={`py-3 px-4 font-bold ${
                          typeColor[d.type] || ""
                        }`}
                      >
                        <span
                          className={`px-3 py-1 rounded-full bg-emerald-100/50 text-xs`}
                        >
                          {d.type}
                        </span>
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
                          className="p-1 rounded hover:bg-emerald-100 hover:text-emerald-900 transition"
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
      </div>
    </div>
  );
}
