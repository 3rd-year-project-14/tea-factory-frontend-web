/*
 * NOTE: This component has been refactored into separate route-based pages:
 * - InventoryRoutesPage.jsx - Main routes view (/factoryManager/inventory)
 * - InventorySuppliersPage.jsx - Suppliers for a specific route (/factoryManager/inventory/routes/:routeId/suppliers)
 * - InventorySupplierDetailPage.jsx - Supplier detail view (/factoryManager/inventory/routes/:routeId/suppliers/:supplierId)
 *
 * This file is kept for backward compatibility but the new route structure should be used.
 */

import { useState, useMemo } from "react";
import InventoryHeader from "./InventoryHeader";
import InventoryFilters from "./InventoryFilters";
import InventoryModal from "./InventoryModal";
import SummaryCards from "./SummaryCards";
import MainContent from "./MainContent";
import {
  routes,
  suppliers,
  monthNames,
  availableYears,
  getAvailableMonths,
} from "./inventoryData";
import { getInventoryStatistics, getUnifiedSummary } from "./inventoryUtils";

export default function InventoryManagement() {
  // Navigation state
  const [currentView, setCurrentView] = useState("routes"); // "routes", "suppliers", "detail"
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // View mode state - daily or monthly
  const [viewMode, setViewMode] = useState("daily"); // "daily" or "monthly"

  // Date selection state - set to current date by default
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // YYYY-MM-DD format

  // Month/Year selection state for monthly view
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0-indexed
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Inventory processing state
  const [showInventoryModal, setShowInventoryModal] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    sortOrder: "",
    status: "All",
    storageType: "All",
  });

  // Filter data based on current view, filters, and selected date/month
  const filteredData = useMemo(() => {
    // Get current data based on view
    let data = [];
    if (currentView === "routes") {
      data = routes;
    } else if (currentView === "suppliers" && selectedRoute) {
      data = suppliers.filter(
        (supplier) => supplier.routeId === selectedRoute.id
      );
    } else if (currentView === "detail" && selectedSupplier) {
      data = selectedSupplier;
    }

    // Filter by date/month based on view mode
    if (currentView === "suppliers") {
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
    }

    // Apply search filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      data = data.filter((item) => {
        if (currentView === "routes") {
          return (
            item.routeName.toLowerCase().includes(searchLower) ||
            item.routeNumber?.toLowerCase().includes(searchLower)
          );
        } else if (currentView === "suppliers") {
          return (
            item.supplierName.toLowerCase().includes(searchLower) ||
            item.id.toLowerCase().includes(searchLower)
          );
        }
        return true;
      });
    }

    // Apply status filter
    if (filters.status !== "All") {
      data = data.filter((item) => {
        if (currentView === "routes") {
          return item.status === filters.status;
        } else if (currentView === "suppliers") {
          return item.inventoryStatus === filters.status;
        }
        return true;
      });
    }

    // Apply storage type filter
    if (filters.storageType !== "All") {
      data = data.filter((item) => {
        if (currentView === "suppliers") {
          return item.storageType === filters.storageType;
        }
        return true;
      });
    }

    // Apply sorting
    if (filters.sortOrder) {
      data = [...data].sort((a, b) => {
        if (currentView === "routes") {
          const aValue = a.totalWeight || 0;
          const bValue = b.totalWeight || 0;
          return filters.sortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue;
        } else if (currentView === "suppliers") {
          const aValue = a.totalWeight || 0;
          const bValue = b.totalWeight || 0;
          return filters.sortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
    }

    return data;
  }, [
    currentView,
    selectedRoute,
    selectedSupplier,
    filters,
    selectedDate,
    viewMode,
    selectedMonth,
    selectedYear,
  ]);

  // Calculate summary data
  const summary = useMemo(() => {
    if (currentView === "routes") {
      return getInventoryStatistics(filteredData);
    } else if (currentView === "suppliers" && selectedRoute) {
      return getUnifiedSummary(filteredData);
    }
    return {};
  }, [currentView, filteredData, selectedRoute]);

  const getCurrentData = () => {
    if (currentView === "routes") {
      return routes;
    } else if (currentView === "suppliers" && selectedRoute) {
      return suppliers.filter(
        (supplier) => supplier.routeId === selectedRoute.id
      );
    }
    return [];
  };

  const handleViewRoute = (route) => {
    setSelectedRoute(route);
    setCurrentView("suppliers");
  };

  const handleViewSupplierDetail = (supplier) => {
    setSelectedSupplier(supplier);
    setCurrentView("detail");
  };

  const handleBackToRoutes = () => {
    setCurrentView("routes");
    setSelectedRoute(null);
    setSelectedSupplier(null);
  };

  const handleBackToSuppliers = () => {
    setCurrentView("suppliers");
    setSelectedSupplier(null);
  };

  const handleDownloadCSV = () => {
    const data = getCurrentData();
    const csvContent = generateCSV(data, currentView);
    downloadCSV(csvContent, `inventory_${currentView}_${Date.now()}.csv`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <InventoryHeader
        currentView={currentView}
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
        onBackToSuppliers={handleBackToSuppliers}
      />
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards - show before filters for routes and suppliers views */}
        {currentView !== "detail" && (
          <SummaryCards summary={summary} currentView={currentView} />
        )}

        {/* Filters - show after summary cards */}
        {currentView !== "detail" && (
          <InventoryFilters
            filters={filters}
            onFiltersChange={setFilters}
            currentView={currentView}
          />
        )}

        {/* Main Content */}
        <MainContent
          currentView={currentView}
          filteredData={filteredData}
          summary={summary}
          getCurrentData={getCurrentData}
          onViewRoute={handleViewRoute}
          onViewSupplierDetail={handleViewSupplierDetail}
          onDownloadCSV={handleDownloadCSV}
          selectedSupplier={selectedSupplier}
          selectedRoute={selectedRoute}
          viewMode={viewMode}
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          monthNames={monthNames}
        />

        {/* Inventory Modal - always render this at the end */}
        {showInventoryModal && (
          <InventoryModal
            isOpen={showInventoryModal}
            onClose={() => setShowInventoryModal(false)}
            onConfirm={() => setShowInventoryModal(false)}
          />
        )}
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
  } else if (viewType === "suppliers") {
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
