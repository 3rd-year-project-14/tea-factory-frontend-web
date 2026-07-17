import React, { useState } from "react";
import { CheckCircle2, Search, Truck } from "lucide-react";
import Card from "../../../components/ui/Card";

const allVehicles = [
  { id: "TRK-001", type: "Lorry", model: "Tata Ace", status: "Available", driver: "Mr. Silva" },
  { id: "TRK-002", type: "Pickup Truck", model: "Tata Ace", status: "In Use", driver: "Mr. Perera" },
  { id: "TRK-003", type: "Lorry", model: "Tata Ace", status: "Maintenance", driver: null },
  { id: "TRK-004", type: "Pickup Truck", model: "Tata Ace", status: "Available", driver: "Mr. Kumar" },
  { id: "TRK-005", type: "Lorry", model: "Tata Ace", status: "Available", driver: "Mr. Fernando" },
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
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
          Emergency Vehicle Replacement
        </h1>
      </Card>

      {/* Search and Filter */}
      <Card className="mb-6">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search available vehicles or drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            autoComplete="off"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40 dark:text-muted-dark" />
        </div>
      </Card>

      {/* Assign Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {breakdownVehicles.map((broken) => (
          <Card key={broken.id} hoverable className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Truck className="text-tea-700 dark:text-tea-300 w-8 h-8" />
              <div>
                <h2 className="font-bold text-lg text-ink dark:text-ink-dark">
                  {broken.id} - {broken.model}
                </h2>
                <p className="text-sm text-ink/60 dark:text-muted-dark">
                  {broken.type}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="text-ink/80 dark:text-ink-dark/80 space-y-1 text-sm font-medium">
              <p>
                <span className="font-semibold">Driver:</span> {broken.driver}
              </p>
              <p>
                <span className="font-semibold">Route:</span> {broken.route}
              </p>
              <p>
                <span className="font-semibold">Breakdown:</span>{" "}
                {broken.breakdownTime}
              </p>
            </div>

            {/* Selector */}
            <div>
              <label className="block text-sm font-semibold text-ink/70 dark:text-ink-dark/70 mb-1">
                Assign Replacement Vehicle
              </label>
              <select
                className="w-full rounded-lg px-3 py-2 border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                value={assignments[broken.id] || ""}
                onChange={(e) => handleAssign(broken.id, e.target.value)}
              >
                <option value="">-- Select Vehicle --</option>
                {filteredAvailable.map((v) => (
                  <option
                    key={v.id}
                    value={v.id}
                    disabled={isAssigned(v.id) && assignments[broken.id] !== v.id}
                  >
                    {v.id} - {v.driver || "No Driver"} ({v.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!allAssigned}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white text-sm transition-colors duration-200 ${
                allAssigned
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-tea-900/60 dark:bg-white/10 cursor-not-allowed"
              }`}
            >
              <CheckCircle2 size={18} />
              Confirm Assignments
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
