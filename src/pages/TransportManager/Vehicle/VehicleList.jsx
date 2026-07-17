import React, { useState } from "react";
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
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";

const initialVehicles = [
  { id: "TRK-001", model: "Tata Ace", status: "Available", driver: null, lastService: "2024-03-15", capacity: "200kg" },
  { id: "TRK-002", model: "Tata Ace", status: "In Use", driver: "Mr.Perera", lastService: "2024-06-15", capacity: "500kg" },
  { id: "TRK-003", model: "Tata Ace", status: "Maintenance", driver: null, lastService: "2023-06-15", capacity: "500kg" },
  { id: "TRK-004", model: "Tata Ace", status: "In Use", driver: "Mr.Perera", lastService: "2024-06-15", capacity: "500kg" },
];

const statusColors = {
  Available: "bg-tea-50 dark:bg-tea-900/30 text-tea-700 dark:text-tea-200",
  "In Use": "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200",
  Maintenance: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
};

function VehicleHeader({ onAddVehicle }) {
  return (
    <Card className="mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
          Vehicle Management
        </h1>
        <Button variant="primary" icon={Plus} onClick={onAddVehicle}>
          New Vehicle
        </Button>
      </div>
    </Card>
  );
}

function VehicleSummaryCards({ summary }) {
  const cards = [
    { label: "Total Vehicles", value: summary.total || 0, sub: `${summary.available || 0} available`, icon: Truck },
    { label: "Available", value: summary.available || 0, sub: "Ready to use", icon: CheckCircle2 },
    { label: "Maintenance", value: summary.maintenance || 0, sub: "Under repair", icon: Wrench },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <Card key={card.label} hoverable>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{card.label}</p>
              <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{card.value}</p>
              <p className="text-xs text-ink/40 dark:text-muted-dark mt-1">{card.sub}</p>
            </div>
            <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
              <card.icon className="w-6 h-6 text-tea-700 dark:text-tea-300" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function Vehicle() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredVehicles, setFilteredVehicles] = useState(initialVehicles);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    let filtered = vehicles;
    if (filterStatus !== "All") {
      filtered = filtered.filter((v) => v.status === filterStatus);
    }
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.id.toLowerCase().includes(term) ||
          v.model.toLowerCase().includes(term)
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

  const vehicleStats = {
    total: vehicles.length,
    available: vehicles.filter((v) => v.status === "Available").length,
    inUse: vehicles.filter((v) => v.status === "In Use").length,
    maintenance: vehicles.filter((v) => v.status === "Maintenance").length,
  };

  return (
    <div className="min-h-full">
      <VehicleHeader onAddVehicle={() => navigate("/transportManager/Vehicle/add")} />

      <VehicleSummaryCards
        summary={{
          total: vehicleStats.total,
          available: vehicleStats.available,
          maintenance: vehicleStats.maintenance,
        }}
      />

      {/* Search & Filter */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-56 pl-4 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-auto px-4 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 focus:outline-none focus:ring-2 focus:ring-tea-500/40"
          >
            <option>All</option>
            <option>Available</option>
            <option>In Use</option>
            <option>Maintenance</option>
          </select>
        </div>
      </Card>

      {/* Vehicles Table */}
      <Card className="!p-0 overflow-x-auto">
        <div className="bg-tea-900 text-white">
          <div className="grid grid-cols-7 gap-4 p-4 font-medium text-center text-sm">
            <div>Vehicle</div>
            <div>Status</div>
            <div>Driver</div>
            <div>Capacity</div>
            <div>Last Service</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
          {filteredVehicles.length === 0 ? (
            <EmptyState title="No vehicles found" description="" />
          ) : (
            filteredVehicles.map((v, idx) => (
              <div
                key={v.id}
                className={`grid grid-cols-7 gap-4 p-4 items-center ${
                  idx % 2 === 0 ? "bg-card dark:bg-card-dark" : "bg-surface dark:bg-white/5"
                } hover:bg-tea-50 dark:hover:bg-white/10 transition-colors`}
              >
                <div className="flex items-center gap-2 justify-center text-tea-700 dark:text-tea-300 font-semibold text-lg">
                  <div>
                    <div>{v.id}</div>
                    <div className="text-xs text-ink/50 dark:text-muted-dark">
                      {v.model}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className={`font-semibold text-sm rounded-full px-3 py-1 ${statusColors[v.status] || "text-ink/50 dark:text-muted-dark"}`}>
                    {v.status}
                  </span>
                </div>

                <div className="text-ink/80 dark:text-ink-dark/80 text-center">
                  {v.driver ? (
                    <span className="flex items-center justify-center gap-2">
                      <UserCircle size={20} />
                      {v.driver}
                    </span>
                  ) : (
                    <span className="italic text-ink/40 dark:text-muted-dark">-</span>
                  )}
                </div>

                <div className="text-ink/80 dark:text-ink-dark/80 text-center">{v.capacity}</div>
                <div className="text-ink/80 dark:text-ink-dark/80 text-center">
                  {v.lastService}
                </div>

                <div className="flex justify-center gap-3 col-span-2">
                  <button
                    onClick={() => navigate(`/transportManager/Vehicle/view/${v.id}`)}
                    className="p-2 rounded-full text-tea-700 dark:text-tea-300 hover:bg-tea-50 dark:hover:bg-white/10 transition-colors"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => navigate(`/transportManager/vehicle/edit/${v.id}`)}
                    className="p-2 rounded-full text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setVehicleToDelete(v.id);
                      setConfirmModalOpen(true);
                    }}
                    className="p-2 rounded-full text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card border border-tea-100 dark:border-card-border-dark max-w-sm w-full p-6 text-center">
            <h3 className="text-xl font-heading font-semibold mb-4 text-tea-700 dark:text-tea-300">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-ink/70 dark:text-ink-dark/70">
              Are you sure you want to remove this vehicle?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
