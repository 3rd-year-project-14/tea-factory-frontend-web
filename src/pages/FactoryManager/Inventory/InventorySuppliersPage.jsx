import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";
import InventoryFilters from "./InventoryFilters";
import SummaryCards from "./SummaryCards";
import MainContent from "./MainContent";
import {
  routes,
  suppliers,
  monthNames,
  availableYears,
  getAvailableMonths,
} from "./inventoryData";
import { getUnifiedSummary } from "./inventoryUtils";

export default function InventorySuppliersPage() {
  const { routeId } = useParams();
  const navigate = useNavigate();

  // Find the selected route
  const selectedRoute = routes.find((route) => route.id === routeId);

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

  // Filter suppliers data for this route
  const filteredData = useMemo(() => {
    if (!selectedRoute) return [];

    let data = suppliers.filter(
      (supplier) => supplier.routeId === selectedRoute.id
    );

    // Filter by date/month based on view mode
    if (viewMode === "daily") {
      // Daily view: filter by selected date
      data = data.filter((supplier) => {
        const receivedDate = new Date(supplier.receivedDate);
        const expiryDate = new Date(supplier.expiryDate);
        const filterDate = new Date(selectedDate);

        // Include inventory if the selected date is between received and expiry dates
        return filterDate >= receivedDate && filterDate <= expiryDate;
      });
    } else if (viewMode === "monthly") {
      // Monthly view: filter by selected month/year
      data = data.filter((supplier) => {
        const receivedDate = new Date(supplier.receivedDate);
        const lastDeliveryDate = new Date(supplier.lastDelivery);

        // Include if received or had delivery in the selected month
        return (
          (receivedDate.getMonth() === selectedMonth &&
            receivedDate.getFullYear() === selectedYear) ||
          (lastDeliveryDate.getMonth() === selectedMonth &&
            lastDeliveryDate.getFullYear() === selectedYear)
        );
      });
    }

    // Apply search filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      data = data.filter(
        (item) =>
          item.supplierName.toLowerCase().includes(searchLower) ||
          item.id.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status !== "All") {
      data = data.filter((item) => item.inventoryStatus === filters.status);
    }

    // Apply storage type filter
    if (filters.storageType !== "All") {
      data = data.filter((item) => item.storageType === filters.storageType);
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
  }, [
    selectedRoute,
    filters,
    selectedDate,
    viewMode,
    selectedMonth,
    selectedYear,
  ]);

  // Calculate summary data
  const summary = useMemo(() => {
    return getUnifiedSummary(filteredData);
  }, [filteredData]);

  const handleViewSupplierDetail = (supplier) => {
    navigate(`/factoryManager/inventory/routes/${routeId}/${supplier.id}`);
  };

  const handleBackToRoutes = () => {
    navigate("/factoryManager/inventory");
  };

  const handleDownloadCSV = () => {
    const data = suppliers.filter((supplier) => supplier.routeId === routeId);
    const csvContent = generateCSV(data, "suppliers");
    downloadCSV(
      csvContent,
      `inventory_suppliers_route_${routeId}_${Date.now()}.csv`
    );
  };

  if (!selectedRoute) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Route Not Found
          </h2>
          <button
            onClick={handleBackToRoutes}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Back to Routes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InventoryHeader
        currentView="suppliers"
        selectedRoute={selectedRoute}
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
        onBackToRoutes={handleBackToRoutes}
      />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <SummaryCards summary={summary} currentView="suppliers" />

        <InventoryFilters
          filters={filters}
          onFiltersChange={setFilters}
          currentView="suppliers"
        />

        <MainContent
          currentView="suppliers"
          filteredData={filteredData}
          summary={summary}
          getCurrentData={() =>
            suppliers.filter((supplier) => supplier.routeId === routeId)
          }
          onViewSupplierDetail={handleViewSupplierDetail}
          onDownloadCSV={handleDownloadCSV}
          selectedRoute={selectedRoute}
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
  if (viewType === "suppliers") {
    const headers = [
      "Supplier ID",
      "Supplier Name",
      "Total Weight",
      "Storage Type",
      "Status",
    ];
    const rows = data.map((supplier) => [
      supplier.id,
      supplier.supplierName,
      supplier.totalWeight,
      supplier.storageType,
      supplier.inventoryStatus,
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
