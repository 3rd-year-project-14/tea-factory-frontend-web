import { UserCheck, Plus } from "lucide-react";

export default function DriverHeader({
  currentView,
  selectedDriver,
  onGoBack,
  onCreateDriver,
  onQuickAssign,
}) {
  const getTitle = () => {
    if (currentView === "list") return "Driver Management";
    if (currentView === "profile") return `${selectedDriver?.name}`;
    if (currentView === "assign") return "Daily Assignments";
    return "Driver Management";
  };

  

  const handleGoBack = () => {
    if (currentView === "profile" || currentView === "assign") {
      onGoBack("list");
    }
  };

  return (
    <div className="bg-white shadow-md border-b border-emerald-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-3xl font-bold text-emerald-800">
                  {getTitle()}
                </h1>
                
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {(currentView === "profile" || currentView === "assign") && (
              <button
                onClick={handleGoBack}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200 transition-colors duration-200"
              >
                ← Back to Drivers
              </button>
            )}

            {currentView === "list" && (
              <div className="flex gap-3">
                <button
                  onClick={onQuickAssign}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
                >
                  <UserCheck size={20} />
                  Quick Assign
                </button>
                <button
                  onClick={onCreateDriver}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Driver
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
