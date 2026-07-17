import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

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
    if (currentView === "suppliers") return selectedRoute?.routeName || "Route";
    if (currentView === "detail") return "Inventory Details";
    return "Inventory";
  };

  const handleGoBack = () => {
    if (currentView === "suppliers") {
      onBackToRoutes();
    } else if (currentView === "detail") {
      onBackToSuppliers();
    }
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 mb-1">
            {getTitle()}
          </h1>
        </div>

        {/* Right Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {(currentView === "suppliers" || currentView === "detail") && (
            <Button variant="outline" size="sm" onClick={handleGoBack}>
              ← Back
            </Button>
          )}

          {/* View Mode Buttons (Only for routes/suppliers) */}
          {(currentView === "routes" || currentView === "suppliers") && (
            <>
              {/* View Toggle */}
              <div className="flex gap-2">
                {["daily", "monthly"].map((mode) => (
                  <Button
                    key={mode}
                    size="sm"
                    variant={viewMode === mode ? "primary" : "outline"}
                    onClick={() => onViewModeChange(mode)}
                    className="min-w-[90px]"
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Controls for Daily View */}
              {viewMode === "daily" && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="min-w-[90px] !bg-tea-50 !text-tea-700 dark:!bg-tea-900/30 dark:!text-tea-200"
                    onClick={() => {
                      const today = new Date();
                      const todayStr = today.toISOString().split("T")[0];

                      const yesterday = new Date();
                      yesterday.setDate(today.getDate() - 1);
                      const yesterdayStr = yesterday.toISOString().split("T")[0];

                      onDateChange(
                        selectedDate === todayStr ? yesterdayStr : todayStr
                      );
                    }}
                  >
                    {(() => {
                      const today = new Date().toISOString().split("T")[0];
                      return selectedDate === today ? "Yesterday" : "Today";
                    })()}
                  </Button>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-tea-700 dark:text-tea-300">
                      Date:
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => onDateChange(e.target.value)}
                      className="px-3 py-2 rounded-lg font-medium outline-none bg-tea-50 dark:bg-tea-900/30 text-tea-700 dark:text-tea-200 border border-tea-100 dark:border-card-border-dark"
                    />
                  </div>
                </>
              )}

              {/* Controls for Monthly View */}
              {viewMode === "monthly" && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-tea-700 dark:text-tea-300">
                      Month:
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => onMonthChange(parseInt(e.target.value))}
                      className="px-3 py-2 rounded-lg font-medium bg-tea-50 dark:bg-tea-900/30 text-tea-700 dark:text-tea-200 border border-tea-100 dark:border-card-border-dark"
                    >
                      {getAvailableMonths(selectedYear).map((monthIndex) => (
                        <option key={monthIndex} value={monthIndex}>
                          {monthNames[monthIndex]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-tea-700 dark:text-tea-300">
                      Year:
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => {
                        const newYear = parseInt(e.target.value);
                        onYearChange(newYear);
                        const availableMonths = getAvailableMonths(newYear);
                        if (!availableMonths.includes(selectedMonth)) {
                          onMonthChange(availableMonths[availableMonths.length - 1]);
                        }
                      }}
                      className="px-3 py-2 rounded-lg font-medium bg-tea-50 dark:bg-tea-900/30 text-tea-700 dark:text-tea-200 border border-tea-100 dark:border-card-border-dark"
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
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
