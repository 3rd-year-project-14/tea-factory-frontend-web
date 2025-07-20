import React, { useState } from "react";
import {
  Truck,
  UserCircle,
  AlertTriangle,
  CheckCircle2,
  Search,
} from "lucide-react";

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
  const [assignments, setAssignments] = useState({}); // { brokenVehicleId: replacementVehicleId }
  const [availableVehicles] = useState(
    allVehicles.filter((v) => v.status === "Available")
  );

  // Filter available vehicles by search term
  const filteredAvailable = availableVehicles.filter(
    (v) =>
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driver?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle assignment change
  function handleAssign(brokenId, replacementId) {
    setAssignments((prev) => ({
      ...prev,
      [brokenId]: replacementId,
    }));
  }

  // Confirm assignments (you can expand this to save to backend)
  function handleConfirm() {
    alert("Assignments confirmed:\n" + JSON.stringify(assignments, null, 2));
  }

  return (
    <div className="bg-[#f7fafc]">
      <h1 className="text-3xl font-bold mb-6 text-red-700 flex items-center gap-3">
        <AlertTriangle size={32} />
        Emergency Vehicle Replacement
      </h1>

      {/* Search available vehicles */}
      <div className="mb-6 flex items-center gap-3 bg-white-100 rounded-2xl shadow p-4">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search available vehicles or drivers..."
          className="flex-grow rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Breakdown vehicles list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {breakdownVehicles.map((broken) => (
          <div
            key={broken.id}
            className="bg-white rounded-xl shadow p-5 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <Truck className="text-emerland-600" size={28} />
              <div>
                <div className="font-bold text-lg">
                  {broken.id} - {broken.model}
                </div>
                <div className="text-gray-600 text-sm">{broken.type}</div>
              </div>
            </div>
            <div className="text-gray-700">
              <strong>Driver:</strong> {broken.driver}
            </div>
            <div className="text-gray-700">
              <strong>Route:</strong> {broken.route}
            </div>
            <div className="text-gray-700">
              <strong>Breakdown Time:</strong> {broken.breakdownTime}
            </div>

            {/* Replacement vehicle selector */}
            <div>
              <label
                htmlFor={`replacement-${broken.id}`}
                className="block mb-1 font-semibold"
              >
                Assign Replacement Vehicle
              </label>
              <select
                id={`replacement-${broken.id}`}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={assignments[broken.id] || ""}
                onChange={(e) => handleAssign(broken.id, e.target.value)}
              >
                <option value="">-- Select Vehicle --</option>
                {filteredAvailable.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.id} - {v.driver || "No Driver"} ({v.type})
                  </option>
                ))}
              </select>
            </div>
            {/* Confirm button */}
            <div className="flex justify-center">
              <button
                onClick={handleConfirm}
                disabled={
                  Object.keys(assignments).length !== breakdownVehicles.length
                }
                className={`px-6 py-3 rounded-lg font-semibold text-green-400 text transition ${
                  Object.keys(assignments).length === breakdownVehicles.length
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-300 cursor-not-allowed"
                }`}
              >
                Confirm Assignments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
