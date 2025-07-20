import React, { useState } from "react";
import { UserCircle, AlertTriangle, CheckCircle2, Search } from "lucide-react";

const allVehicles = [
  {
    id: "TRK-001",
    type: "Lorry",
    model: "Tata Ace",
    status: "Available",
    driver: "Mr. Silva",
  },
  {
    id: "TRK-002",
    type: "Pickup Truck",
    model: "Tata Ace",
    status: "In Use",
    driver: "Mr. Perera",
  },
  {
    id: "TRK-003",
    type: "Lorry",
    model: "Tata Ace",
    status: "Maintenance",
    driver: null,
  },
  {
    id: "TRK-004",
    type: "Pickup Truck",
    model: "Tata Ace",
    status: "Available",
    driver: "Mr. Kumar",
  },
  {
    id: "TRK-005",
    type: "Lorry",
    model: "Tata Ace",
    status: "Available",
    driver: "Mr. Fernando",
  },
];

const breakdownVehicles = [
  {
    id: "TRK-002",
    type: "Pickup Truck",
    model: "Tata Ace",
    driver: "Mr. Perera",
    route: "Galle - Neluwa",
    breakdownTime: "2025-07-02 10:30",
  },
  {
    id: "TRK-006",
    type: "Lorry",
    model: "Tata Ace",
    driver: "Mr. Jayasuriya",
    route: "Matara - Neluwa",
    breakdownTime: "2025-07-02 11:15",
  },
];

export default function Emergency() {
  const [searchTerm, setSearchTerm] = useState("");
  const [assignments, setAssignments] = useState({});

  const availableVehicles = allVehicles.filter((v) => v.status === "Available");

  const filteredAvailable = availableVehicles.filter(
    (v) =>
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driver?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAssigned = (vehicleId) =>
    Object.values(assignments).includes(vehicleId);

  function handleAssign(brokenId, replacementId) {
    setAssignments((prev) => ({
      ...prev,
      [brokenId]: replacementId,
    }));
  }

  function handleConfirm() {
    alert("Assignments confirmed:\n" + JSON.stringify(assignments, null, 2));
  }

  const allAssigned =
    Object.keys(assignments).length === breakdownVehicles.length;

  return (
    <div className="bg-[#f9fbfc] min-h-screen p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-red-700 flex items-center gap-3">
        <AlertTriangle size={32} />
        Emergency Vehicle Replacement
      </h1>

      {/* Search Input */}
      <div className="mb-6 max-w-xl bg-white shadow rounded-lg flex items-center gap-2 px-4 py-2 border">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search available vehicles or drivers..."
          className="flex-grow bg-transparent outline-none text-sm text-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Assign Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {breakdownVehicles.map((broken) => (
          <div
            key={broken.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 border border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🚛</div>
                <div>
                  <h2 className="font-bold text-lg text-gray-800">
                    {broken.id} - {broken.model}
                  </h2>
                  <p className="text-sm text-gray-500">{broken.type}</p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Driver:</strong> {broken.driver}
              </p>
              <p>
                <strong>Route:</strong> {broken.route}
              </p>
              <p>
                <strong>Breakdown:</strong> {broken.breakdownTime}
              </p>
            </div>

            {/* Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Replacement Vehicle
              </label>
              <select
                className="w-full border rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={assignments[broken.id] || ""}
                onChange={(e) => handleAssign(broken.id, e.target.value)}
              >
                <option value="">-- Select Vehicle --</option>
                {filteredAvailable.map((v) => (
                  <option
                    key={v.id}
                    value={v.id}
                    disabled={
                      isAssigned(v.id) && assignments[broken.id] !== v.id
                    }
                  >
                    {v.id} - {v.driver || "No Driver"} ({v.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Confirm Button (per card, optional) */}
            <div className="pt-2 text-center">
              <button
                onClick={handleConfirm}
                disabled={!allAssigned}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium text-sm transition ${
                  allAssigned
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-emerald-600 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 size={18} />
                Confirm Assignments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
