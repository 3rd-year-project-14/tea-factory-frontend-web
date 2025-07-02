import { ArrowLeft, DollarSign, Download } from "lucide-react";

export default function PaymentHeader({
  currentView,
  selectedRoute,
  onGoBack,
  onDownloadCSV,
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

  // Show enhanced header with month/year selection for routes and suppliers views
  if (currentView === "routes" || currentView === "suppliers") {
    return (
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">{getTitle()}</p>
              <div className="text-xl font-bold text-blue-600 px-4 py-2 rounded-lg">
                {monthNames[selectedMonth]} {selectedYear}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {currentView === "routes" && (
                <button
                  onClick={onProceedPayments}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Proceed Payments
                </button>
              )}
              {currentView === "suppliers" && (
                <>
                  <button
                    onClick={handleGoBack}
                    className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#f1f5f9] text-[#000] border-none hover:bg-[#e2e8f0]"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={onDownloadCSV}
                    className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#45a049] transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Bank CSV
                  </button>
                </>
              )}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Month:
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                >
                  {getAvailableMonths(selectedYear).map((monthIndex) => (
                    <option key={monthIndex} value={monthIndex}>
                      {monthNames[monthIndex]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Year:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const newYear = parseInt(e.target.value);
                    setSelectedYear(newYear);
                    // If selected year changes and current month is not available, reset to last available month
                    const availableMonths = getAvailableMonths(newYear);
                    if (!availableMonths.includes(selectedMonth)) {
                      setSelectedMonth(
                        availableMonths[availableMonths.length - 1]
                      );
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
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
        </div>
      </div>
    );
  }

  // Enhanced header for bill view with month/year selection
  if (currentView === "bill") {
    return (
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">{getTitle()}</p>
              <div className="text-xl font-bold text-blue-600 px-4 py-2 rounded-lg">
                {monthNames[selectedMonth]} {selectedYear}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={handleGoBack}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#f1f5f9] text-[#000] border-none hover:bg-[#e2e8f0]"
              >
                ← Back
              </button>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Month:
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                >
                  {getAvailableMonths(selectedYear).map((monthIndex) => (
                    <option key={monthIndex} value={monthIndex}>
                      {monthNames[monthIndex]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Year:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const newYear = parseInt(e.target.value);
                    setSelectedYear(newYear);
                    // If selected year changes and current month is not available, reset to last available month
                    const availableMonths = getAvailableMonths(newYear);
                    if (!availableMonths.includes(selectedMonth)) {
                      setSelectedMonth(
                        availableMonths[availableMonths.length - 1]
                      );
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
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
        </div>
      </div>
    );
  }

  // This should not be reached now
  return null;
}
