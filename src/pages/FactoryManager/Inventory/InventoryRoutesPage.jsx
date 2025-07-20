import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";
import InventoryFilters from "./InventoryFilters";
import SummaryCards from "./SummaryCards";
import MainContent from "./MainContent";
import {
  routes,
  monthNames,
  availableYears,
  getAvailableMonths,
} from "./inventoryData";
import { getInventoryStatistics } from "./inventoryUtils";

export default function InventoryRoutesPage() {
  const navigate = useNavigate();

  // View mode state - daily or monthly
  const [viewMode, setViewMode] = useState("daily");

  // Date selection state
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Month/Year selection state for monthly view
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [filters, setFilters] = useState({
    search: "",
    sortOrder: "",
    status: "All",
    storageType: "All",
  });

  // Filter routes data
  const filteredData = useMemo(() => {
    let data = routes;

    // Apply search filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      data = data.filter(
        (item) =>
          item.routeName.toLowerCase().includes(searchLower) ||
          item.routeNumber?.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status !== "All") {
      data = data.filter((item) => item.status === filters.status);
    }

    // Apply sorting
    if (filters.sortOrder) {
      data = [...data].sort((a, b) => {
        const aValue = a.totalWeight || 0;
        const bValue = b.totalWeight || 0;
        return filters.sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    return data;
  }, [filters]);

  // Calculate summary data
  const summary = useMemo(() => {
    return getInventoryStatistics(filteredData);
  }, [filteredData]);

  const handleViewRoute = (route) => {
    navigate(`/factoryManager/inventory/routes/${route.id}`);
  };

  const handleDownloadCSV = () => {
    const csvContent = generateCSV(routes, "routes");
    downloadCSV(csvContent, `inventory_routes_${Date.now()}.csv`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <InventoryHeader
        currentView="routes"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
        monthNames={monthNames}
        availableYears={availableYears}
        getAvailableMonths={getAvailableMonths}
      />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <SummaryCards summary={summary} currentView="routes" />

        <InventoryFilters
          filters={filters}
          onFiltersChange={setFilters}
          currentView="routes"
        />

        <MainContent
          currentView="routes"
          filteredData={filteredData}
          summary={summary}
          getCurrentData={() => routes}
          onViewRoute={handleViewRoute}
          onDownloadCSV={handleDownloadCSV}
          viewMode={viewMode}
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          monthNames={monthNames}
        />
      </div>
    </div>
  );
}

// Helper functions for CSV generation and download
function generateCSV(data, viewType) {
  if (viewType === "routes") {
    const headers = [
      "Route ID",
      "Route Name",
      "Total Weight",
      "Supplier Count",
      "Status",
    ];
    const rows = data.map((route) => [
      route.id,
      route.routeName,
      route.totalWeight,
      route.supplierCount,
      route.status,
    ]);
    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  }
  return "";
}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
