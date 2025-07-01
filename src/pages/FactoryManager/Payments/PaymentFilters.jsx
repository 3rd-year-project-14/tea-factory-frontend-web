import { Filter, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function PaymentFilters({
  filters,
  setFilters,
  currentView,
  onClearFilters,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const getSearchPlaceholder = () => {
    if (currentView === "routes") return "Search routes...";
    if (currentView === "suppliers") return "Search suppliers...";
    return "Search...";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="p-4">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-gray-900"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Enhanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by Amount
              </label>
              <select
                value={filters.sortOrder || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortOrder: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-gray-900"
              >
                <option value="">Default Order</option>
                <option value="high">High Payment First</option>
                <option value="low">Low Payment First</option>
              </select>
            </div>

            {currentView === "suppliers" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </label>
                  <select
                    value={filters.status || "All"}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-gray-900"
                  >
                    <option value="All">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    value={filters.paymentMethod || "All"}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        paymentMethod: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-gray-900"
                  >
                    <option value="All">All Methods</option>
                    <option value="Bank">Bank</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex items-end">
              <button
                onClick={onClearFilters}
                className="w-30 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] shadow-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
