import { Filter, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function InventoryFilters({
  filters,
  onFiltersChange,
  currentView,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const getSearchPlaceholder = () => {
    if (currentView === "routes") return "Search routes...";
    if (currentView === "suppliers") return "Search suppliers...";
    return "Search...";
  };

  const onClearFilters = () => {
    onFiltersChange({
      search: "",
      sortOrder: "",
      status: "All",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-emerald-200 mb-6">
      <div className="p-4">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-gray-900 transition-colors"
                value={filters.search}
                onChange={(e) =>
                  onFiltersChange({ ...filters, search: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border-2 border-emerald-300 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Enhanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border border-emerald-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by Weight
              </label>
              <select
                value={filters.sortOrder || ""}
                onChange={(e) =>
                  onFiltersChange({ ...filters, sortOrder: e.target.value })
                }
                className="w-full p-2 border border-emerald-200 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-gray-900 transition-colors"
              >
                <option value="">Default Order</option>
                <option value="desc">High Weight First</option>
                <option value="asc">Low Weight First</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={onClearFilters}
                className="w-30 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border-2 border-emerald-300 rounded-md hover:bg-emerald-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-colors"
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
