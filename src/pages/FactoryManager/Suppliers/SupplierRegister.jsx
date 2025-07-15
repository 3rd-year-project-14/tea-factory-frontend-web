import { useState, useMemo } from "react";
import SupplierRequestDetails from "./SupplierRequestDetails.jsx";
import SupplierHeader from "./SupplierHeader.jsx";
import SupplierSummaryCards from "./SupplierSummaryCards.jsx";
import SupplierFilters from "./SupplierFilters.jsx";
import SupplierTable from "./SupplierTable.jsx";
import { initialSuppliers, supplierUtils } from "./supplierData.jsx";

export default function SupplierRegister() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [currentView, setCurrentView] = useState("approved"); // Default to approved (total suppliers)
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    region: "",
  });
  const [detailedSupplier, setDetailedSupplier] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

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

  const filteredSuppliers = useMemo(() => {
    return supplierUtils.filterSuppliers(suppliers, filters, currentView);
  }, [suppliers, filters, currentView]);

  const approveSupplier = (id, approvalData) => {
    const updatedSuppliers = supplierUtils.approveSupplier(
      suppliers,
      id,
      approvalData
    );
    setSuppliers(updatedSuppliers);
    alert(
      `Supplier approved successfully! Route: ${approvalData.route}, Bag Limit: ${approvalData.bagLimit}`
    );
    setDetailedSupplier(null);
  };

  const rejectSupplier = (id, reason) => {
    const updatedSuppliers = supplierUtils.rejectSupplier(
      suppliers,
      id,
      reason
    );
    setSuppliers(updatedSuppliers);
    alert(`Supplier rejected. Reason: ${reason}`);
    setDetailedSupplier(null);
  };

  // Show detailed view if a supplier is selected
  if (detailedSupplier) {
    return (
      <SupplierRequestDetails
        supplier={detailedSupplier}
        onBack={() => setDetailedSupplier(null)}
        onApprove={approveSupplier}
        onReject={rejectSupplier}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SupplierHeader />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <SupplierSummaryCards
          metrics={metrics}
          currentView={currentView}
          setCurrentView={setCurrentView}
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
          setDetailedSupplier={setDetailedSupplier}
        />

        
      </div>
    </div>
  );
}
