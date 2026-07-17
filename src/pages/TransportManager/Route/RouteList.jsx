import React, { useState } from "react";
import {
  Users,
  Truck,
  Clock,
  Map,
  Edit2,
  UserCircle,
  Search,
  Plus,
} from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";
import CreateRoutePage from "./CreateRoute";

const routes = [
  { id: "RT-001", routeName: "Neluwa – Deniyaya", status: "Ongoing", driver: "Mr.Perera", distance: "25 Km", estTime: "1.5h", suppliers: 15, supply: "520 Kg" },
  { id: "RT-002", routeName: "Neluwa – Lankagama", status: "Scheduled", driver: "Mr.Kamal", distance: "18 Km", estTime: "1h", suppliers: 12, supply: "450 Kg" },
  { id: "RT-003", routeName: "Neluwa – Pitadeniya", status: "Completed", driver: null, distance: "20 Km", estTime: "1.2h", suppliers: 10, supply: "480 Kg" },
  { id: "RT-004", routeName: "Neluwa – Hiniduma", status: "Ongoing", driver: "Mr.Perera", distance: "22 Km", estTime: "1.3h", suppliers: 14, supply: "500 Kg" },
  { id: "RT-005", routeName: "Neluwa – Morawaka", status: "Completed", driver: "Mr.Kamal", distance: "30 Km", estTime: "2h", suppliers: 16, supply: "600 Kg" },
  { id: "RT-006", routeName: "Neluwa – Thawalama", status: "Scheduled", driver: "Mr.Kamal", distance: "19 Km", estTime: "1.1h", suppliers: 13, supply: "470 Kg" },
];

// Status badge styles
const statusStyles = {
  Ongoing: "bg-tea-50 dark:bg-tea-900/30 text-tea-700 dark:text-tea-200 border border-tea-100 dark:border-card-border-dark",
  Scheduled: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-200 border border-amber-300 dark:border-amber-500/30",
  Completed: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-500/30",
};

export default function RouteDashboard() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredRoutes = routes.filter((r) => {
    if (filter !== "All" && r.status !== filter) return false;
    if (
      searchTerm &&
      !(
        r.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.driver?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            Route Management
          </h2>
          <Button variant="primary" icon={Plus} onClick={() => setShowCreateModal(true)} aria-label="Add route">
            Add Route
          </Button>
        </div>
      </Card>

      {/* Search and Filter Bar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by route/driver"
              className="w-full pl-4 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search routes"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40 dark:text-muted-dark" />
          </div>
          <select
            className="w-full md:w-auto px-4 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter routes by status"
          >
            <option>All</option>
            <option>Ongoing</option>
            <option>Scheduled</option>
            <option>Completed</option>
          </select>
        </div>
      </Card>

      {/* Route Cards */}
      {filteredRoutes.length === 0 ? (
        <Card>
          <EmptyState title="No routes found" description="" />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <Card key={route.id} hoverable className="flex flex-col relative min-h-[230px]">
              {/* Status Badge */}
              <span
                className={`absolute right-5 top-5 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                  statusStyles[route.status] || ""
                }`}
              >
                {route.status}
              </span>

              {/* Route Info */}
              <div className="mb-2">
                <h3 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark">
                  {route.routeName}
                </h3>
                <p className="text-sm text-ink/60 dark:text-muted-dark">Route - {route.id}</p>
              </div>

              {/* Route Meta */}
              <div className="flex flex-col gap-3 text-ink/80 dark:text-ink-dark/80 text-sm mb-5">
                <div className="flex items-center gap-2">
                  <Map size={18} className="text-tea-700 dark:text-tea-300" />
                  <span>Distance</span>
                  <span className="ml-auto font-semibold">{route.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-tea-700 dark:text-tea-300" />
                  <span>Est. time</span>
                  <span className="ml-auto font-semibold">{route.estTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-tea-700 dark:text-tea-300" />
                  <span>Suppliers</span>
                  <span className="ml-auto font-semibold">{route.suppliers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-tea-700 dark:text-tea-300" />
                  <span>Est. supply</span>
                  <span className="ml-auto font-semibold">{route.supply}</span>
                </div>
              </div>

              {/* Driver & Actions */}
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-tea-100 dark:border-card-border-dark">
                <UserCircle className="text-ink/40 dark:text-muted-dark" size={22} />
                <span className="text-sm font-medium text-ink/80 dark:text-ink-dark/80">
                  Driver:{" "}
                  {route.driver ? (
                    route.driver
                  ) : (
                    <span className="italic text-ink/40 dark:text-muted-dark">N/A</span>
                  )}
                </span>
                {route.status === "Ongoing" && (
                  <button className="ml-4 px-3 py-1 bg-tea-900 text-white rounded text-xs font-semibold hover:bg-tea-800 transition-colors">
                    Track
                  </button>
                )}
                <button
                  className="ml-auto hover:bg-tea-50 dark:hover:bg-white/10 p-2 rounded transition-colors"
                  title="Edit Route"
                  aria-label={`Edit route ${route.id}`}
                  type="button"
                >
                  <Edit2 className="text-tea-700 dark:text-tea-300" size={18} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Route Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-route-title"
        >
          <CreateRoutePage onCancel={() => setShowCreateModal(false)} />
        </div>
      )}
    </div>
  );
}
