import { Route, Plus } from "lucide-react";

export default function RouteHeader({
  currentView,
  selectedRoute,
  onGoBack,
  onCreateRoute,
}) {
  const getTitle = () => {
    if (currentView === "routes") return "Route Management";
    if (currentView === "details") return `${selectedRoute?.routeName}`;
    if (currentView === "suppliers")
      return `Suppliers: ${selectedRoute?.routeName}`;
    return "Route Management";
  };

  const handleGoBack = () => {
    if (currentView === "details" || currentView === "suppliers") {
      onGoBack("routes");
    }
  };

  return (
    <div className="bg-white shadow-md border-b border-emerald-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-emerald-800">
                {getTitle()}
              </h1>
            </div>
            {selectedRoute && (
              <div className="text-lg font-semibold text-emerald-600 mt-1">
                {selectedRoute.status}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {(currentView === "details" || currentView === "suppliers") && (
              <button
                onClick={handleGoBack}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200 transition-colors duration-200"
              >
                ← Back
              </button>
            )}
            {currentView === "routes" && (
              <button
                onClick={onCreateRoute}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
              >
                <Plus size={20} />
                Create New Route
              </button>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
}
