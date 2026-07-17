import React from "react";
import {
  Route,
  Truck,
  Users,
  BellRing,
  AlertTriangle,
  CirclePlus,
} from "lucide-react";
import Card, { CardHeader } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";

export default function TransportManagerDashboard() {
  const stats = [
    { label: "Total Routes", value: 24, icon: Route },
    { label: "Active Trips", value: 11, icon: Truck },
    { label: "Approved Drivers", value: 18, icon: Users },
  ];

  const breakdowns = [
    { id: "TRK-001", driver: "Kasun Perera", route: "Galle - Neluwa" },
    { id: "TRK-002", driver: "Ajith Perera", route: "Mathugama - Neluwa" },
  ];

  const pendingDrivers = [
    { id: "DRV-101", name: "Ajith Kumara", appliedOn: "2025-07-17" },
    { id: "DRV-102", name: "Sanduni Silva", appliedOn: "2025-07-18" },
  ];

  const recentTrips = [
    { route: "Galle - Neluwa", driver: "Kasun Perera", vehicle: "TRK-003", status: "Ongoing" },
    { route: "Akuressa - Neluwa", driver: "Ajith Kumara", vehicle: "TRK-004", status: "Completed" },
    { route: "Galle - Neluwa", driver: "Kasun Perera", vehicle: "TRK-005", status: "Ongoing" },
    { route: "Akuressa - Neluwa", driver: "Ajith Kumara", vehicle: "TRK-006", status: "Completed" },
  ];

  const statusBadge = {
    Ongoing: "bg-amber-100 text-amber-800 border border-amber-700 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-500/40",
    Completed: "bg-tea-100 text-tea-800 border border-tea-700 dark:bg-tea-900/30 dark:text-tea-200 dark:border-tea-500/40",
    Pending: "bg-gray-100 text-gray-700 border border-gray-400 dark:bg-white/10 dark:text-ink-dark dark:border-white/20",
  };

  return (
    <div className="min-h-full">
      <Card className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            Dashboard Home
          </h1>
          <Button variant="primary" icon={CirclePlus} onClick={() => alert("Navigate to Assign Driver")}>
            Assign Driver to Route
          </Button>
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} hoverable>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{stat.label}</p>
                <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{stat.value}</p>
              </div>
              <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
                <stat.icon size={24} className="text-tea-700 dark:text-tea-300" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Alerts & Notifications + Pending Drivers + Recent Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Section */}
        <Card>
          <CardHeader
            title="Alerts & Notifications"
            action={<BellRing className="text-amber-500 dark:text-amber-400" />}
          />
          <div className="space-y-3">
            {breakdowns.length === 0 ? (
              <EmptyState icon={AlertTriangle} title="No active alerts" description="No alerts for trips or vehicles." />
            ) : (
              breakdowns.map((bd) => (
                <div
                  key={bd.id}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 dark:border-red-500 rounded-lg animate-pulse-slow flex gap-2 items-center"
                >
                  <AlertTriangle size={22} className="text-red-600 dark:text-red-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-red-700 dark:text-red-300 text-sm">
                      Vehicle <span className="text-red-600 dark:text-red-400">{bd.id}</span>{" "}
                      breakdown on{" "}
                      <span className="font-bold text-ink dark:text-ink-dark">{bd.route}</span>
                    </div>
                    <div className="text-xs text-ink/60 dark:text-muted-dark mt-1">
                      Driver: {bd.driver}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Pending Drivers */}
        <Card>
          <CardHeader
            title="Drivers Activation & Decline"
            action={<Users className="text-tea-700 dark:text-tea-300" />}
          />
          {pendingDrivers.length === 0 ? (
            <EmptyState icon={Users} title="No drivers awaiting review" description="" />
          ) : (
            <div>
              {pendingDrivers.map((drv) => (
                <div
                  key={drv.id}
                  className="flex justify-between items-center border-b border-tea-100 dark:border-card-border-dark py-2 last:border-b-0"
                >
                  <div>
                    <div className="font-semibold text-ink dark:text-ink-dark">{drv.name}</div>
                    <div className="text-xs text-ink/50 dark:text-muted-dark">
                      Applied on: {drv.appliedOn}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">Approve</Button>
                    <Button variant="danger" size="sm">Decline</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Trip Activity */}
        <Card>
          <CardHeader
            title="Recent Trip Activity"
            action={<Truck className="text-tea-700 dark:text-tea-300" />}
          />
          <div className="space-y-3">
            {recentTrips.length === 0 ? (
              <EmptyState icon={Truck} title="No recent trip events" description="" />
            ) : (
              recentTrips.map((trip, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-tea-100 dark:border-card-border-dark pb-2 last:border-b-0 last:pb-0"
                >
                  <div>
                    <div className="font-semibold text-ink dark:text-ink-dark">{trip.route}</div>
                    <div className="text-xs text-ink/60 dark:text-muted-dark">
                      Driver: <span className="text-ink dark:text-ink-dark">{trip.driver}</span>{" "}
                      | Vehicle: <span>{trip.vehicle}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusBadge[trip.status]}`}>
                    {trip.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Emergency/alert animation */}
      <style>{`
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
