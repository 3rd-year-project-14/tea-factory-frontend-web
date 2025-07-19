import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SupplierHeader from "./SupplierHeader.jsx";
import SupplierSummaryCards from "./SupplierSummaryCards.jsx";
import SupplierFilters from "./SupplierFilters.jsx";
import SupplierTable from "./SupplierTable.jsx";
import { initialSuppliers, supplierUtils } from "./supplierData.jsx";

export default function SupplierRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const [suppliers] = useState(initialSuppliers);
  const [currentView, setCurrentView] = useState("approved"); // Default to approved (total suppliers)
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    region: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Set current view based on route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/pending")) {
      setCurrentView("pending");
    } else if (path.includes("/rejected")) {
      setCurrentView("rejected");
    } else {
      setCurrentView("approved"); // Default view for /factoryManager/suppliers
    }
  }, [location.pathname]);

  // Calculate dashboard metrics
  const metrics = useMemo(() => {
    return supplierUtils.calculateMetrics(suppliers);
  }, [suppliers]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "", region: "" });
  };

  const handleViewChange = (view) => {
    if (view === "pending") {
      navigate("/factoryManager/suppliers/pending");
    } else if (view === "rejected") {
      navigate("/factoryManager/suppliers/rejected");
    } else {
      // For 'approved' or any other view, go to main suppliers page
      navigate("/factoryManager/suppliers");
    }
  };

  const filteredSuppliers = useMemo(() => {
    return supplierUtils.filterSuppliers(suppliers, filters, currentView);
  }, [suppliers, filters, currentView]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplierHeader />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <SupplierSummaryCards
          metrics={metrics}
          currentView={currentView}
          setCurrentView={handleViewChange}
        />

        <SupplierFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <SupplierTable
          filteredSuppliers={filteredSuppliers}
          currentView={currentView}
        />
      </div>
    </div>
  );
}
