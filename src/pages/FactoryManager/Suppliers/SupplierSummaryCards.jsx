import { Users, Clock, X } from "lucide-react";

export default function SupplierSummaryCards({
  metrics,
  currentView,
  setCurrentView,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div
        onClick={() => setCurrentView("approved")}
        className={`bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300 cursor-pointer ${
          currentView === "approved"
            ? "ring-2 ring-emerald-500 ring-opacity-50"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              Total Suppliers
            </p>
            <p className="text-2xl font-bold text-emerald-800">
              {metrics.approved}
            </p>
          </div>
          <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <div className="text-emerald-600 text-2xl">👥</div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setCurrentView("pending")}
        className={`bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300 cursor-pointer ${
          currentView === "pending"
            ? "ring-2 ring-emerald-500 ring-opacity-50"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              Pending Requests
            </p>
            <p className="text-2xl font-bold text-emerald-800">
              {metrics.pending}
            </p>
          </div>
          <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <div className="text-emerald-600 text-2xl">🕐</div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setCurrentView("rejected")}
        className={`bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300 cursor-pointer ${
          currentView === "rejected"
            ? "ring-2 ring-emerald-500 ring-opacity-50"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">Rejected</p>
            <p className="text-2xl font-bold text-emerald-800">
              {metrics.rejected}
            </p>
          </div>
          <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <div className="text-emerald-600 text-2xl">❌</div>
          </div>
        </div>
      </div>
    </div>
  );
}
