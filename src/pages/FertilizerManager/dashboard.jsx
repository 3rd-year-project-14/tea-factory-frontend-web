import React, { useState } from "react";
import {
  AlertTriangle,
  PackageSearch,
  UserPlus,
  Eye,
  ClipboardList,
  PackageCheck,
  X,
  Truck,
  Package,
  Clock,
} from "lucide-react";
import Card, { CardHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";

export default function FertilizerManagerDashboard() {
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentView, setCurrentView] = useState("approved");

  // Sample Data
  const totalFertilizers = 12;
  const pendingRequestCount = 4;
  const lowStocks = [
    { id: 1, name: "NPK 20-20-20", stock: 20 },
    { id: 2, name: "Urea", stock: 12 },
  ];
  const requests = [
    {
      id: 1,
      supplier: "GreenGrow Ltd",
      route: "R-2",
      driver: "Samuel",
      total: 2,
      items: [
        { type: "MOP", quantity: "5" },
        { type: "Urea", quantity: "3" },
      ],
    },
    {
      id: 2,
      supplier: "Agro Direct",
      route: "R-5",
      driver: "Michael",
      total: 3,
      items: [
        { type: "NPK", quantity: "40kg" },
        { type: "TSP", quantity: "25kg" },
        { type: "Urea", quantity: "18kg" },
      ],
    },
  ];

  const filtered = requests.filter((r) =>
    r.route.toLowerCase().includes(search.toLowerCase())
  );

  const summaryCards = [
    {
      type: "approved",
      label: "Total Fertilizers",
      value: totalFertilizers,
      icon: Package,
      iconClass: "text-tea-700 dark:text-tea-300",
      borderClass: "border-tea-600 dark:border-tea-500",
    },
    {
      type: "pending",
      label: "Pending Requests",
      value: pendingRequestCount,
      icon: Clock,
      iconClass: "text-amber-600 dark:text-amber-400",
      borderClass: "border-amber-500 dark:border-amber-500",
    },
  ];

  return (
    <div className="min-h-full space-y-6">
      {/* Header */}
      <Card>
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
          Dashboard
        </h1>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryCards.map(({ type, label, value, icon: Icon, iconClass, borderClass }) => (
          <Card
            key={type}
            hoverable
            onClick={() => setCurrentView(type)}
            className={`!border cursor-pointer transition-all duration-200 ${borderClass} ${
              currentView === type ? "ring-2 ring-tea-500 scale-[1.02] shadow-card" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{label}</p>
                <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{value}</p>
              </div>
              <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
                <Icon size={24} className={iconClass} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Low Stock */}
        <Card>
          <CardHeader
            title="Low Fertilizer Stock"
            action={<AlertTriangle className="w-5 h-5 text-tea-700 dark:text-tea-300" />}
          />
          {lowStocks.length === 0 ? (
            <EmptyState icon={UserPlus} title="No low stock alerts" description="" />
          ) : (
            <div className="space-y-3">
              {lowStocks.map(({ id, name, stock }) => (
                <div
                  key={id}
                  className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-500/30"
                >
                  <div>
                    <span className="font-semibold text-ink dark:text-ink-dark">{name}</span>
                    <span className="ml-2 text-ink/60 dark:text-muted-dark text-xs">
                      {stock} Kg left
                    </span>
                  </div>
                  <PackageCheck className="w-5 h-5 text-tea-700 dark:text-tea-300" />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Incoming Requests */}
        <Card>
          <CardHeader
            title="Incoming Fertilizer Orders"
            action={<PackageSearch className="w-5 h-5 text-tea-700 dark:text-tea-300" />}
          />

          {requests.length === 0 ? (
            <EmptyState icon={ClipboardList} title="No incoming requests" description="" />
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="flex justify-between p-3 border border-tea-100 dark:border-card-border-dark rounded-lg items-center"
                >
                  <div>
                    <span className="font-semibold text-ink dark:text-ink-dark">{r.supplier}</span>
                    <span className="ml-2 text-xs text-ink/60 dark:text-muted-dark">
                      Route {r.route}, Driver {r.driver}
                    </span>
                  </div>
                  <ClipboardList
                    className="w-5 h-5 cursor-pointer text-tea-700 dark:text-tea-300"
                    onClick={() => setSelectedRequest(r)}
                  />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Bottom: Release Queue Table */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark flex items-center gap-2">
            <Truck className="w-5 h-5" /> Release Queue
          </h3>
          <input
            placeholder="Search by route"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-tea-900 text-white">
                <th className="p-3 text-left rounded-tl-lg">Route</th>
                <th className="p-3 text-left">Driver</th>
                <th className="p-3 text-left">Total Count</th>
                <th className="p-3 text-left rounded-tr-lg">View</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <EmptyState icon={UserPlus} title="No requests found" description="" />
                  </td>
                </tr>
              ) : (
                filtered.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-tea-100 dark:border-card-border-dark last:border-0"
                  >
                    <td className="p-3 font-medium text-ink dark:text-ink-dark">
                      {req.route}
                    </td>
                    <td className="p-3 text-ink dark:text-ink-dark">{req.driver}</td>
                    <td className="p-3 text-ink dark:text-ink-dark">{req.total}</td>
                    <td className="p-3">
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedRequest(req)}
                        aria-label={`View details for route ${req.route}`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-card dark:bg-card-dark w-full max-w-lg rounded-2xl shadow-card p-6 border border-tea-100 dark:border-card-border-dark relative">
            <button
              className="absolute top-4 right-4 rounded-lg p-1 hover:bg-tea-50 dark:hover:bg-white/10 transition-colors"
              onClick={() => setSelectedRequest(null)}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-tea-700 dark:text-tea-300" />
            </button>
            <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2 text-tea-700 dark:text-tea-300">
              <Truck className="w-5 h-5" />
              Release Order Details
            </h3>
            <div className="space-y-2 mb-4">
              <div>
                <span className="font-semibold text-ink dark:text-ink-dark">Driver: </span>
                <span className="text-ink/70 dark:text-ink-dark/70">{selectedRequest.driver}</span>
              </div>
              <div>
                <span className="font-semibold text-ink dark:text-ink-dark">Route: </span>
                <span className="text-ink/70 dark:text-ink-dark/70">{selectedRequest.route}</span>
              </div>
            </div>
            <div className="border border-tea-100 dark:border-card-border-dark rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 bg-surface dark:bg-white/5 p-2 font-semibold text-ink dark:text-ink-dark">
                <div>Fertilizer Type</div>
                <div>Quantity</div>
              </div>
              {selectedRequest.items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-2 p-2 border-t border-tea-100 dark:border-card-border-dark text-sm text-ink dark:text-ink-dark"
                >
                  <div>{item.type}</div>
                  <div>{item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" className="!bg-gray-200 dark:!bg-white/10" onClick={() => setSelectedRequest(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("Released:", selectedRequest);
                  setSelectedRequest(null);
                }}
              >
                Release
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
