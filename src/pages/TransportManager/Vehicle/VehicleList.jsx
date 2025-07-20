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
  Plus,
} from "lucide-react";

const initialVehicles = [
  {
    id: "TRK-001",
    model: "Tata Ace",
    status: "Available",
    driver: null,
    lastService: "2024-03-15",
    capacity: "200kg",
  },
  {
    id: "TRK-002",
    model: "Tata Ace",
    status: "In Use",
    driver: "Mr.Perera",
    lastService: "2024-06-15",
    capacity: "500kg",
  },
  {
    id: "TRK-003",
    model: "Tata Ace",
    status: "Maintenance",
    driver: null,
    lastService: "2023-06-15",
    capacity: "500kg",
  },
  {
    id: "TRK-004",
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

// const statusBg = {
//   Available: "bg-green-100",
//   "In Use": "bg-yellow-100",
//   Maintenance: "bg-red-100",
// };

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

  // Stats Calculation
  const vehicleStats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === "Available").length,
    inUse: vehicles.filter((v) => v.status === "In Use").length,
    maintenance: vehicles.filter((v) => v.status === "Maintenance").length,
  };

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-8xl mx-auto space-y-4">
        {/* Top Section: Title */}
        <div className="bg-gray-50 rounded-2xl shadow-2xl p-4 pb-6">
          {/* Stats Cards */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Total Vehicle */}
            <div className="bg-white px-4 py-3 rounded-lg shadow-md border-emerald-200 border transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    Total Vehicle
                  </p>
                  <p className="text-2xl font-bold text-emerald-800">
                    {vehicleStats.total}
                  </p>
                  <p className="text-xs text-emerald-600">Tracked</p>
                </div>
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <div className="text-orange-600 text-xl">🚚</div>
                </div>
              </div>
            </div>

            {/* Available */}
            <div className="bg-white px-4 py-3 rounded-lg shadow-md border-emerald-200 border transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    Available
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {vehicleStats.available}
                  </p>
                  <p className="text-xs text-emerald-600">Ready to use</p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="text-green-700 text-xl">✅</div>
                </div>
              </div>
            </div>

            {/* In Use */}
            <div className="bg-white px-4 py-3 rounded-lg shadow-md border-emerald-200 border transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">In Use</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {vehicleStats.inUse}
                  </p>
                  <p className="text-xs text-emerald-600">On duty</p>
                </div>
                <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="text-yellow-700 text-xl">🛣️</div>
                </div>
              </div>
            </div>

            {/* Maintenance */}
            <div className="bg-white px-4 py-3 rounded-lg shadow-md border-emerald-200 border transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    Maintenance
                  </p>
                  <p className="text-2xl font-bold text-red-700">
                    {vehicleStats.maintenance}
                  </p>
                  <p className="text-xs text-emerald-600">Under repair</p>
                </div>
                <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="text-red-700 text-xl">🛠️</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-end mb-4 gap-3">
            <button
              onClick={() => navigate("/transportManager/Vehicle/add")}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200"
            >
              <Plus size={18} />
              New Vehicle
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-emerald-200 border">
            <div className="flex w-full md:w-auto gap-4">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-56 pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
              <select
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Available</option>
                <option>In Use</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>

          {/* Vehicle Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-x-auto border-emerald-200">
            <div className="bg-emerald-800 text-white">
              <div className="grid grid-cols-7 gap-4 p-3 font-medium text-center">
                <div>Vehicle</div>
                <div>Status</div>
                <div>Driver</div>
                <div>Capacity</div>
                <div>Last Service</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredVehicles.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No vehicles found.
                </div>
              ) : (
                filteredVehicles.map((v, idx) => (
                  <div
                    key={v.id}
                    className={`grid grid-cols-7 gap-4 p-4 items-center hover:bg-gray-50 transition ${
                      idx % 2 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <Truck
                        className="text-orange-600 bg-orange-100 rounded-full p-1"
                        size={28}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {v.id}
                        </div>
                        <div className="text-xs text-gray-400">{v.model}</div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold text-center ${
                        statusConfig[v.status]?.color
                      }`}
                    >
                      {v.status}
                    </div>
                    <div className="text-gray-900 text-center">
                      {v.driver ? (
                        <span className="flex items-center justify-center gap-2">
                          <UserCircle className="text-gray-400" size={22} />{" "}
                          {v.driver}
                        </span>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="text-gray-600 text-center">
                      {v.capacity}
                    </div>
                    <div className="text-gray-600 text-center">
                      {v.lastService}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/transportManager/Vehicle/view/${v.id}`)
                        }
                        className="p-1 rounded hover:bg-blue-100 hover:text-blue-700"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/transportManager/vehicle/edit/${v.id}`)
                        }
                        className="p-1 rounded hover:bg-yellow-100 hover:text-yellow-700"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setVehicleToDelete(v.id);
                          setConfirmModalOpen(true);
                        }}
                        className="p-1 rounded hover:bg-red-100 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-7 rounded-lg shadow-xl border w-[350px] max-w-full text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to remove this vehicle?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
