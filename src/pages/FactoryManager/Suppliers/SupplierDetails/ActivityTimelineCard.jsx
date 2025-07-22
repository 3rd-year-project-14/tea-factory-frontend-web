import { Search, Filter, ChevronDown } from "lucide-react";


const ACCENT_COLOR = "#165e52";


export default function SupplierFilters({
  filters,
  handleFilterChange,
  clearFilters,
  showFilters,
  setShowFilters,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border" style={{ borderColor: "#cfece6", marginBottom: "1.5rem" }}>
      <div className="p-4">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              />
              <input
                type="text"
                placeholder="Search by supplier name or ID..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#165e52] focus:border-[#165e52] focus:outline-none text-gray-900 transition-colors"
                style={{ borderColor: "#cfece6" }}
                value={filters.search}
                onChange={handleFilterChange}
                name="search"
              />
            </div>
          </div>


          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-medium"
              style={{
                borderColor: "#cfece6",
                color: ACCENT_COLOR,
                background: "#f3fdfa",
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-medium"
              style={{
                borderColor: "#cfece6",
                color: "#fff",
                background: ACCENT_COLOR,
              }}
            >
              Clear
            </button>
          </div>
        </div>


        {/* Advanced Filter Panel */}
        {showFilters && (
          <div className="flex flex-wrap gap-4 items-center mt-4">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#165e52] focus:border-[#165e52] focus:outline-none text-gray-900 transition-colors"
              style={{ borderColor: "#cfece6" }}
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            {/* Add more filters here as needed */}
          </div>
        )}
      </div>
    </div>
  );
}



