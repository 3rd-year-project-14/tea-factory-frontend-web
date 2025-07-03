export default function RouteSummaryCards({ currentView, summary }) {
  if (currentView === "routes") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Routes Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Total Routes
              </p>
              <p className="text-2xl font-bold text-emerald-800">
                {summary.totalRoutes || 0}
              </p>
              <p className="text-xs text-emerald-600">
                {summary.activeRoutes || 0} active
              </p>
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <div className="text-emerald-600 text-2xl">🛣️</div>
            </div>
          </div>
        </div>

        {/* Total Suppliers Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Total Suppliers
              </p>
              <p className="text-2xl font-bold text-emerald-800">
                {summary.totalSuppliers || 0}
              </p>
              <p className="text-xs text-emerald-600">Across all routes</p>
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <div className="text-emerald-600 text-2xl">👥</div>
            </div>
          </div>
        </div>

        {/* Total Load Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-200 transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Total Load</p>
              <p className="text-2xl font-bold text-emerald-800">
                {summary.totalLoad?.toFixed(1) || "0.0"} kg
              </p>
              
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <div className="text-emerald-600 text-2xl">⚖️</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
