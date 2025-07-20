import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";
import MainContent from "./MainContent";
import {
  routes,
  suppliers,
  monthNames,
  availableYears,
  getAvailableMonths,
} from "./inventoryData";

export default function InventorySupplierDetailPage() {
  const { routeId, supplierId } = useParams();
  const navigate = useNavigate();

  // Find the selected route and supplier
  const selectedRoute = routes.find((route) => route.id === routeId);
  const selectedSupplier = suppliers.find(
    (supplier) => supplier.id === supplierId
  );

  // View mode state - daily or monthly
  const [viewMode, setViewMode] = useState("daily");

  // Date selection state
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Month/Year selection state for monthly view
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleBackToRoutes = () => {
    navigate("/factoryManager/inventory");
  };

  const handleBackToSuppliers = () => {
    navigate(`/factoryManager/inventory/routes/${routeId}`);
  };

  if (!selectedRoute || !selectedSupplier) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {!selectedRoute ? "Route Not Found" : "Supplier Not Found"}
          </h2>
          <div className="space-x-4">
            <button
              onClick={handleBackToRoutes}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Back to Routes
            </button>
            {selectedRoute && (
              <button
                onClick={handleBackToSuppliers}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Back to Suppliers
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InventoryHeader
        currentView="detail"
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
        <MainContent
          currentView="detail"
          filteredData={selectedSupplier}
          selectedSupplier={selectedSupplier}
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
