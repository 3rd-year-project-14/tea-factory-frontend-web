import React, { useState } from "react";
import {
  Truck,
  CheckCircle2,
  Wrench,
  UserCheck,
  AlertTriangle,
  Users,
  Map,
  BellRing,
} from "lucide-react";

export default function TransportManagerDashboard() {
  // Sample data - replace with API calls
  const vehicles = [
    { id: "TRK-001", status: "Available" },
    { id: "TRK-002", status: "In Use" },
    { id: "TRK-003", status: "Maintenance" },
  ];
  const breakdowns = [
    { id: "TRK-002", driver: "Mr. Perera", route: "Galle - Neluwa" },
  ];
  const pendingDrivers = [
    { id: "DRV-101", name: "Mr. Kamal", appliedOn: "2025-06-30" },
  ];
  const routes = [
    { id: "A", driver: "Mr. Silva", vehicle: "TRK-001", status: "Ongoing" },
    { id: "B", driver: "Mr. Perera", vehicle: "TRK-004", status: "Pending" },
  ];

  return (
    <div className="bg-gray-50">
      <header className="flex justify-between items-center"></header>
      {/* Alerts */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BellRing className="text-yellow-500" /> Alerts & Notifications
        </h2>
        {breakdowns.length === 0 ? (
          <p className="text-gray-600">No active alerts.</p>
        ) : (
          breakdowns.map((bd) => (
            <div
              key={bd.id}
              className="border-l-4 border-red-500 bg-red-50 p-3 mb-3 rounded"
            >
              <p className="font-semibold">
                Vehicle {bd.id} broke down on route {bd.route}
              </p>
              <p className="text-sm text-gray-700">Driver: {bd.driver}</p>
            </div>
          ))
        )}
      </section>

      {/* Pending Driver Approvals */}
      <section className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="text-green-500" /> New Drivers Pending Assignment
        </h2>
        {pendingDrivers.length === 0 ? (
          <p className="text-gray-600">No pending approvals.</p>
        ) : (
          pendingDrivers.map((drv) => (
            <div
              key={drv.id}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <div>
                <p className="font-semibold">{drv.name}</p>
                <p className="text-sm text-gray-500">
                  Applied on: {drv.appliedOn}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Approve
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

function KpiCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 border-t-4 border-green-400">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-gray-500 font-semibold">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}
