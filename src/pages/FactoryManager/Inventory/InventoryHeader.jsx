export default function InventoryHeader({
  currentView,
  selectedRoute,
  viewMode,
  onViewModeChange,
  selectedDate,
  onDateChange,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  monthNames,
  availableYears,
  getAvailableMonths,
  onBackToRoutes,
  onBackToSuppliers,
}) {
  const getTitle = () => {
    if (currentView === "routes") return "Inventory Management";
    if (currentView === "suppliers")
      return `${selectedRoute?.routeName}`;
    if (currentView === "detail") return "Inventory Details";
    return "Inventory Management";
  };

  const handleGoBack = () => {
    if (currentView === "suppliers") {
      onBackToRoutes();
    } else if (currentView === "detail") {
      onBackToSuppliers();
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format month/year for display
  const formatMonthYear = () => {
    return `${monthNames[selectedMonth]} ${selectedYear}`;
  };

  // Show enhanced header with date selection for routes and suppliers views
  if (currentView === "routes" || currentView === "suppliers") {
    return (
      <div className="bg-white shadow-md border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-emerald-800">
                  {getTitle()}
                </p>

                {/* View Mode Toggle */}
                <div className="flex bg-emerald-100 rounded-lg p-1">
                  <button
                    onClick={() => onViewModeChange("daily")}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      viewMode === "daily"
                        ? "bg-emerald-600 text-white"
                        : "text-emerald-700 hover:bg-emerald-200"
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => onViewModeChange("monthly")}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      viewMode === "monthly"
                        ? "bg-emerald-600 text-white"
                        : "text-emerald-700 hover:bg-emerald-200"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div className="text-lg font-semibold text-emerald-600 mt-1">
                {viewMode === "daily"
                  ? formatDate(selectedDate)
                  : formatMonthYear()}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {currentView === "suppliers" && (
                <button
                  onClick={handleGoBack}
                  className="px-6 py-3 rounded-lg text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200 transition-colors duration-200"
                >
                  ← Back
                </button>
              )}

              {/* Conditional Controls based on view mode */}
              {viewMode === "daily" ? (
                <>
                  <button
                    onClick={() => {
                      const yesterday = new Date();
                      yesterday.setDate(yesterday.getDate() - 1);
                      onDateChange(yesterday.toISOString().split("T")[0]);
                    }}
                    className="px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors duration-200"
                  >
                    Yesterday
                  </button>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-emerald-700">
                      Date:
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => onDateChange(e.target.value)}
                      className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-800 font-medium bg-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-emerald-700">
                      Month:
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => onMonthChange(parseInt(e.target.value))}
                      className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-800 font-medium bg-white"
                    >
                      {getAvailableMonths(selectedYear).map((monthIndex) => (
                        <option key={monthIndex} value={monthIndex}>
                          {monthNames[monthIndex]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-emerald-700">
                      Year:
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => {
                        const newYear = parseInt(e.target.value);
                        onYearChange(newYear);
                        // Reset month if current month is not available for new year
                        const availableMonths = getAvailableMonths(newYear);
                        if (!availableMonths.includes(selectedMonth)) {
                          onMonthChange(
                            availableMonths[availableMonths.length - 1]
                          );
                        }
                      }}
                      className="px-3 py-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-800 font-medium bg-white"
                    >
                      {availableYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced header for detail view with date selection
  if (currentView === "detail") {
    return (
      <div className="bg-white shadow-md border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <p className="text-3xl font-bold text-emerald-800">
                {getTitle()}
              </p>
              <div className="text-lg font-semibold text-emerald-600 mt-1">
                {formatDate(selectedDate)}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={handleGoBack}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200 transition-colors duration-200"
              >
                ← Back
              </button>

              
            </div>
          </div>
        </div>
      </div>
    );
  }

  // This should not be reached now
  return null;
}
