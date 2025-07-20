import React from "react";
import {
  Truck,
  Users,
  Map,
  BellRing,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  UserCheck,
  CirclePlus,
} from "lucide-react";

export default function TransportManagerDashboard() {
  // Sample stats (replace with real data as needed)
  const stats = [
    {
      label: "Total Routes",
      value: 24,
      icon: <div className="text-emerald-700 text-2xl">🗺️</div>,
      bg: "bg-emerald-100",
    },
    {
      label: "Active Trips",
      value: 11,
      icon: <div className="text-emerald-600 text-2xl">📋</div>,
      bg: "bg-emerald-100",
    },
    {
      label: "Approved Drivers",
      value: 18,
      icon: <div className="text-emerald-700 text-2xl">✅</div>,
      bg: "bg-emerald-100",
    },
  ];

  // Alerts for urgent attention (breakdowns, etc)
  const breakdowns = [
    { id: "TRK-002", driver: "Kasun Perera", route: "Galle - Neluwa" },
  ];

  // Pending driver accounts awaiting approval
  const pendingDrivers = [
    { id: "DRV-101", name: "Ajith Kumara", appliedOn: "2025-07-17" },
    { id: "DRV-102", name: "Sanduni Silva", appliedOn: "2025-07-18" },
  ];

  // Example recent trips (can be replaced by recent activity if desired)
  const recentTrips = [
    {
      route: "Galle - Neluwa",
      driver: "Kasun Perera",
      vehicle: "TRK-002",
      status: "Ongoing",
    },
    {
      route: "Deniyaya - Akuressa",
      driver: "Ajith Kumara",
      vehicle: "TRK-003",
      status: "Completed",
    },
  ];

  const statusBadge = {
    Ongoing: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-gray-50 py-4 px-2">
      <div className="max-w-8xl mx-auto space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white px-4 py-3 rounded-lg shadow-md border-emerald-200 border transition-all duration-200 hover:shadow-lg hover:border-emerald-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-emerald-800">
                    {stat.value}
                  </p>
                </div>
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <div className="text-orange-600 text-xl">{stat.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Trip Management */}
        <section className="flex justify-end gap-3 mt-2">
          <button
            onClick={() => alert("Navigate to Assign Driver")}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
          >
            <CirclePlus size={20} /> Assign Driver to Route
          </button>
        </section>

        {/* Alert & Notifications */}
        <section className="bg-white rounded-xl shadow-md border border-emerald-100 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-900">
            <BellRing className="text-yellow-500" /> Alerts & Notifications
          </h2>
          {breakdowns.length === 0 ? (
            <div className="text-emerald-800">
              No active alerts for trips or vehicles.
            </div>
          ) : (
            breakdowns.map((bd) => (
              <div
                key={bd.id}
                className="flex items-center gap-3 border-l-4 border-red-500 bg-red-50 p-3 mb-2 rounded"
              >
                <AlertTriangle className="text-red-500" />
                <div>
                  <p className="font-semibold">
                    Vehicle <span className="text-red-600">{bd.id}</span>{" "}
                    breakdown on <b>{bd.route}</b>
                  </p>
                  <p className="text-sm text-gray-800">Driver: {bd.driver}</p>
                </div>
              </div>
            ))
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Drivers Approval */}
          <section className="bg-white rounded-xl shadow-md border border-emerald-100 p-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-emerald-900">
              <Users className="text-emerald-600" /> Drivers Activation &
              Decline
            </h2>
            {pendingDrivers.length === 0 ? (
              <div className="text-emerald-800">
                No drivers awaiting review.
              </div>
            ) : (
              pendingDrivers.map((drv) => (
                <div
                  key={drv.id}
                  className="flex justify-between items-center border-b border-gray-100 py-2"
                >
                  <div>
                    <div className="font-semibold text-gray-900">
                      {drv.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Applied on: {drv.appliedOn}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700 transition font-medium">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition font-medium">
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>

          {/* Recent Trip Activity */}
          <section className="bg-white rounded-xl shadow-md border border-emerald-100 p-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-emerald-900">
              <Truck className="text-emerald-700" /> Recent Trip Activity
            </h2>
            {recentTrips.length === 0 ? (
              <div className="text-gray-800 font-medium">
                No recent trip events.
              </div>
            ) : (
              <div className="space-y-3">
                {recentTrips.map((trip, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between items-center border-b border-gray-100 pb-2`}
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {trip.route}
                      </div>
                      <div className="text-xs text-gray-600">
                        Driver:{" "}
                        <span className="text-gray-900">{trip.driver}</span> |
                        Vehicle: <span>{trip.vehicle}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        statusBadge[trip.status]
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
