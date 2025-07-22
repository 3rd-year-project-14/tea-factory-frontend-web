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

const ACCENT_COLOR = "#01251F";

export default function InventorySuppliersPage() {
  const { routeId } = useParams();
  const navigate = useNavigate();

  const selectedRoute = routes.find((route) => route.id === routeId);

  const [viewMode, setViewMode] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [filters, setFilters] = useState({
    search: "",
    sortOrder: "",
    status: "All",
    storageType: "All",
  });

  // Filter and process supplier data
  const filteredData = useMemo(() => {
    if (!selectedRoute) return [];

    let data = suppliers.filter(
      (supplier) => supplier.routeId === selectedRoute.id
    );

    // Filter logic based on view mode
    if (viewMode === "daily") {
      const filterDate = new Date(selectedDate);
      data = data.filter((supplier) => {
        const received = new Date(supplier.receivedDate);
        const expiry = new Date(supplier.expiryDate);
        return filterDate >= received && filterDate <= expiry;
      });
    } else if (viewMode === "monthly") {
      data = data.filter((supplier) => {
        const received = new Date(supplier.receivedDate);
        const delivery = new Date(supplier.lastDelivery);
        return (
          (received.getMonth() === selectedMonth &&
            received.getFullYear() === selectedYear) ||
          (delivery.getMonth() === selectedMonth &&
            delivery.getFullYear() === selectedYear)
        );
      });
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(
        (s) =>
          s.supplierName.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }

    if (filters.status !== "All") {
      data = data.filter((s) => s.inventoryStatus === filters.status);
    }

    if (filters.storageType !== "All") {
      data = data.filter((s) => s.storageType === filters.storageType);
    }

    if (filters.sortOrder) {
      const sorted = [...data];
      sorted.sort((a, b) => {
        const aWt = a.totalWeight || 0;
        const bWt = b.totalWeight || 0;
        return filters.sortOrder === "asc" ? aWt - bWt : bWt - aWt;
      });
      data = sorted;
    }

    return data;
  }, [
    selectedRoute,
    filters,
    viewMode,
    selectedDate,
    selectedMonth,
    selectedYear,
  ]);

  const summary = useMemo(() => {
    return getUnifiedSummary(filteredData);
  }, [filteredData]);

  const handleViewSupplierDetail = (supplier) => {
    navigate(
      `/factoryManager/inventory/routes/${routeId}/${supplier.id}`
    );
  };

  const handleBackToRoutes = () => {
    navigate("/factoryManager/inventory");
  };

  const handleDownloadCSV = () => {
    const data = suppliers.filter((s) => s.routeId === routeId);
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
          onViewSupplierDetail={handleViewSupplierDetail}
          onDownloadCSV={handleDownloadCSV}
          ACCENT_COLOR={ACCENT_COLOR}
        />
      </div>
    </div>
  );
}

// CSV helpers
function generateCSV(data, viewType) {
  if (viewType === "suppliers") {
    const headers = [
      "Supplier ID",
      "Supplier Name",
      "Total Weight",
      "Storage Type",
      "Status",
    ];
    const rows = data.map((s) => [
      s.id,
      s.supplierName,
      s.totalWeight,
      s.storageType,
      s.inventoryStatus,
    ]);
    return [headers, ...rows].map((r) => r.join(",")).join("\n");
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
