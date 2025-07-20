import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Truck,
  CheckCircle2,
  Wrench,
  Eye,
  Edit,
  Trash2,
  UserCircle,
} from "lucide-react";

const initialVehicles = [
  {
    id: "TRK-001",
    type: "Lorry",
    model: "Tata Ace",
    status: "Available",
    driver: null,
    lastService: "2024-03-15",
    capacity: "200kg",
  },
  {
    id: "TRK-002",
    type: "Lorry",
    model: "Tata Ace",
    status: "In Use",
    driver: "Mr.Perera",
    lastService: "2024-06-15",
    capacity: "500kg",
  },
  {
    id: "TRK-003",
    type: "Pickup Truck",
    model: "Tata Ace",
    status: "Maintenance",
    driver: null,
    lastService: "2023-06-15",
    capacity: "500kg",
  },
  {
    id: "TRK-004",
    type: "Lorry",
    model: "Tata Ace",
    status: "In Use",
    driver: "Mr.Perera",
    lastService: "2024-06-15",
    capacity: "500kg",
  },
];

const statusConfig = {
  Available: { color: "text-green-700" },
  "In Use": { color: "text-yellow-700" },
  Maintenance: { color: "text-red-700" },
};

export default function Vehicle() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filteredVehicles, setFilteredVehicles] = useState(initialVehicles);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = vehicles;

    if (filterStatus !== "All Status") {
      filtered = filtered.filter((v) => v.status === filterStatus);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.id.toLowerCase().includes(term) ||
          v.model.toLowerCase().includes(term) ||
          v.type.toLowerCase().includes(term)
      );
    }

    setFilteredVehicles(filtered);
  }, [searchTerm, filterStatus, vehicles]);

  const confirmDelete = () => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleToDelete));
    setConfirmModalOpen(false);
    setVehicleToDelete(null);
  };

  const cancelDelete = () => {
    setConfirmModalOpen(false);
    setVehicleToDelete(null);
  };

  return (
    <div className="md:p-4 p-2 bg-[#f9fafb] overflow-hidden">
      {/* Stats Cards - DO NOT TOUCH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="flex items-center bg-white rounded-xl shadow-md p-4 gap-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <Truck className="text-orange-600" size={28} />
          </div>
          <div>
            <div className="text-gray-500 text-sm">Total Vehicle</div>
            <div className="text-2xl font-bold text-gray-900">24</div>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-xl shadow-md p-4 gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="text-green-700" size={28} />
          </div>
          <div>
            <div className="text-gray-500 text-sm">Available</div>
            <div className="text-2xl font-bold text-green-700">8</div>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-xl shadow-md p-4 gap-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Truck className="text-yellow-700" size={28} />
          </div>
          <div>
            <div className="text-gray-500 text-sm">In Use</div>
            <div className="text-2xl font-bold text-yellow-700">15</div>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-xl shadow-md p-4 gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Wrench className="text-red-700" size={28} />
          </div>
          <div>
            <div className="text-gray-500 text-sm">Maintenance</div>
            <div className="text-2xl font-bold text-red-700">1</div>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/transportManager/Vehicle/add")}
          className="bg-green-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-800 transition"
        >
          + New Vehicle
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center p-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search Vehicles...."
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All Status</option>
          <option>Available</option>
          <option>In Use</option>
          <option>Maintenance</option>
        </select>
      </div>

      {/* Vehicle Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-green-900 text-white">
              <th className="py-3 px-4 text-left">Vehicle</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Driver</th>
              <th className="py-3 px-4 text-left">Capacity</th>
              <th className="py-3 px-4 text-left">Last Service</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No vehicles found.
                </td>
              </tr>
            ) : (
              filteredVehicles.map((v, idx) => (
                <tr
                  key={v.id}
                  className={`border-b ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-green-50 transition`}
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <Truck
                      className="text-orange-600 bg-orange-100 rounded-full p-1"
                      size={32}
                    />
                    <div>
                      <div className="font-semibold">{v.id}</div>
                      <div className="text-xs text-gray-400">{v.model}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{v.type}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        statusConfig[v.status]?.color
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {v.driver ? (
                      <span className="flex items-center gap-2">
                        <UserCircle className="text-gray-400" size={22} />
                        {v.driver}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-4">{v.capacity}</td>
                  <td className="py-3 px-4">{v.lastService}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/transportManager/Vehicle/view/${v.id}`)
                        }
                        className="p-1 rounded hover:bg-blue-100 hover:text-blue-700"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/transportManager/vehicle/edit/${v.id}`)
                        }
                        className="p-1 rounded hover:bg-yellow-100 hover:text-yellow-700"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setVehicleToDelete(v.id);
                          setConfirmModalOpen(true);
                        }}
                        className="p-1 rounded hover:bg-red-100 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmModalOpen && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-green-200 p-6 rounded-lg shadow-xl border border-gray-300 z-50 max-w-sm w-full text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Confirm Deletion
          </h3>
          <p className="text-gray-700 mb-6">
            Are you sure you want to remove this vehicle?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={cancelDelete}
              className="px-4 py-2 bg-white text-white border-gray-300 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
