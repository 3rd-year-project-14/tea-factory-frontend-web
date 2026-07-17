import { Filter, X, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

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
    <Card className="mb-6 !p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink/40 dark:text-muted-dark h-4 w-4" />
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
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
          <ChevronDown
            size={16}
            className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
          />
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 mt-4 bg-surface dark:bg-white/5 rounded-lg border border-tea-100 dark:border-card-border-dark">
          <div>
            <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-2">
              Sort by Weight
            </label>
            <select
              value={filters.sortOrder || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, sortOrder: e.target.value })
              }
              className="w-full p-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-card dark:bg-card-dark text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
            >
              <option value="">Default Order</option>
              <option value="desc">High Weight First</option>
              <option value="asc">Low Weight First</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" size="sm" icon={X} onClick={onClearFilters} className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
