import { Search, Filter, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function FertilizerFilters({
  filters = {},
  handleFilterChange,
  clearFilters,
  categories = [],
  companies = [],
  currentView = "pending",
}) {
  const [showFilters, setShowFilters] = useState(false);
  const activeCount = Object.values(filters).filter(
    (v) => v !== "" && v !== undefined
  ).length;

  return (
    <Card className="mb-6 !p-4">
      {/* Search + Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink/40 dark:text-muted-dark h-4 w-4" />
            <input
              type="text"
              placeholder="Search by ID, category, or company..."
              className="block w-full pl-10 pr-3 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
        </div>

        <Button
          variant={showFilters ? "primary" : "outline"}
          size="md"
          icon={Filter}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-ink/80 dark:bg-white/20 text-white ml-1">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="pt-4 mt-4 border-t border-tea-100 dark:border-card-border-dark">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-ink dark:text-ink-dark">
              Filter Requests
            </h3>
            <button
              onClick={clearFilters}
              className="text-sm text-ink/50 dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark flex items-center gap-1 transition-colors"
            >
              <X size={14} />
              <span>Clear Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                Category
              </label>
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40 appearance-none"
                  value={filters.categoryId || ""}
                  onChange={(e) => handleFilterChange("categoryId", e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ink/50 dark:text-muted-dark">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                Company
              </label>
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40 appearance-none"
                  value={filters.companyId || ""}
                  onChange={(e) => handleFilterChange("companyId", e.target.value)}
                >
                  <option value="">All Companies</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ink/50 dark:text-muted-dark">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
