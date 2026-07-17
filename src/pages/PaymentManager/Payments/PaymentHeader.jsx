import { ArrowLeft, DollarSign } from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function PaymentHeader({
  currentView,
  selectedRoute,
  onGoBack,
  onProceedPayments,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  monthNames,
  availableYears,
  getAvailableMonths,
}) {
  const getTitle = () => {
    if (currentView === "routes") return "Payment Management";
    if (currentView === "suppliers")
      return `Route: ${selectedRoute?.routeName} - Suppliers`;
    if (currentView === "bill") return "Payment Bill";
    return "Payment Management";
  };

  const handleGoBack = () => {
    if (currentView === "suppliers") {
      onGoBack("routes");
    } else if (currentView === "bill") {
      onGoBack("suppliers");
    }
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 mb-1">
            {getTitle()}
          </h1>
          <div className="text-sm font-semibold text-ink/60 dark:text-muted-dark">
            {monthNames[selectedMonth]} {selectedYear}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {currentView === "routes" && (
            <Button variant="primary" size="md" icon={DollarSign} onClick={onProceedPayments}>
              Proceed Payments
            </Button>
          )}

          {currentView !== "routes" && (
            <Button variant="primary" size="md" icon={ArrowLeft} onClick={handleGoBack}>
              Back
            </Button>
          )}

          {/* Month Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-tea-700 dark:text-tea-300">
              Month:
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-3 py-2 rounded-lg text-sm border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200"
            >
              {getAvailableMonths(selectedYear).map((monthIndex) => (
                <option key={monthIndex} value={monthIndex}>
                  {monthNames[monthIndex]}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-tea-700 dark:text-tea-300">
              Year:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => {
                const newYear = parseInt(e.target.value);
                setSelectedYear(newYear);
                const availableMonths = getAvailableMonths(newYear);
                if (!availableMonths.includes(selectedMonth)) {
                  setSelectedMonth(availableMonths[availableMonths.length - 1]);
                }
              }}
              className="px-3 py-2 rounded-lg text-sm border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
}
