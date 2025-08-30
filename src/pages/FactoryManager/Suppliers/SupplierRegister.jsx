import { useState, useMemo, useEffect, useCallback } from "react";
import {
  getSupplierCounts,
  approveSupplierRequest,
  rejectSupplierRequest,
  getApprovedSuppliers,
  getSupplierRequestsByStatus,
} from "../../../api/supplier";
import SupplierHeader from "./SupplierHeader.jsx";
import SupplierSummaryCards from "./SupplierSummaryCards.jsx";
import SupplierFilters from "./SupplierFilters.jsx";
import SupplierTable from "./SupplierTable.jsx";
import { useAuth } from "../../../contexts/AuthContext.jsx";

const ACCENT_COLOR = "#165E52";

export default function SupplierRegister() {
  const [suppliers, setSuppliers] = useState([]);
  const [metrics, setMetrics] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: "", status: "all" });
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState("approved");
  const { user } = useAuth();
  const factoryId = user?.factoryId;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getSupplierCounts(factoryId);
        if (data.status === 404 && data.message) {
          setMetrics({ approved: 0, pending: 0, rejected: 0 });
          console.error(data.message);
        } else {
          setMetrics({
            approved: data.activeSupplierCount,
            pending: data.pendingRequestCount,
            rejected: data.rejectedRequestCount,
          });
        }
      } catch (error) {
        setMetrics({ approved: 0, pending: 0, rejected: 0 });
        if (error.response?.data?.message) {
          console.error(error.response.data.message);
        } else {
          console.error("Error fetching supplier counts:", error);
        }
      }
    };
    if (factoryId) fetchCounts();
  }, [factoryId]);

  const handleApproveSupplierRequest = async (id, routeId, bagLimit) => {
    try {
      const initialBagCount = Number(bagLimit);
      await approveSupplierRequest(id, routeId, initialBagCount);
      fetchTableData(currentView);
    } catch (error) {
      console.error("Error approving supplier request:", error);
    }
  };

  // API: Reject Supplier
  const handleRejectSupplierRequest = async (id, reason) => {
    try {
      await rejectSupplierRequest(id, reason);
      fetchTableData(currentView);
    } catch (error) {
      console.error("Error rejecting supplier request:", error);
    }
  };

  // Table data load
  const fetchTableData = useCallback(
    async (view) => {
      setLoading(true);
      setSuppliers([]);

      try {
        let data = [];
        if (view === "approved") {
          data = await getApprovedSuppliers(factoryId);
        } else if (view === "pending" || view === "rejected") {
          data = await getSupplierRequestsByStatus(factoryId, view);
        }
        console.log("Raw fetched data:", data);
        let mapped = [];

        if (view === "approved") {
          mapped = data.map((item) => ({
            id: item.supplierId || null,
            name: item.supplierName || null,
            routeName: item.routeName || null,
            approvedDate: item.approvedDate || null,
          }));
        } else {
          mapped = data.map((item) => ({
            id: item.supplierRequestId || null,
            name: item.name || "N/A",
            monthlySupply: item.monthlySupply || null,
            supplierCreatedDate: item.requestDate || null,
            rejectedDate: item.rejectedDate || null,
            status: view,
          }));
        }
        setSuppliers(mapped);
        console.log("Mapped supplier data:", mapped);
      } catch (error) {
        setSuppliers([]);
        if (error.response?.data?.message) {
          // TODO: Replace with a toast or custom UI notification
          console.error(error.response.data.message);
        } else {
          console.error("Error fetching supplier table data:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    [factoryId]
  );

  // Filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "all" });
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    // fetchTableData will be triggered by useEffect below
  };

  useEffect(() => {
    fetchTableData(currentView);
  }, [currentView, fetchTableData]);

  // Apply search + status filter
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        supplier.nic?.toLowerCase().includes(filters.search.toLowerCase()) ||
        supplier.phone?.includes(filters.search) ||
        supplier.location
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        supplier.email?.toLowerCase().includes(filters.search.toLowerCase());

      if (currentView === "pending" || currentView === "rejected") {
        return matchesSearch && supplier.status === currentView;
      }

      const matchesStatus =
        filters.status === "all" || supplier.status === filters.status;

      return matchesSearch && matchesStatus;
    });
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

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#165E52] border-solid"></div>
            <span className="ml-4 text-[#165E52] font-semibold">
              Loading suppliers...
            </span>
          </div>
        ) : (
          <SupplierTable
            filteredSuppliers={filteredSuppliers}
            currentView={currentView}
            onApproveSupplierRequest={handleApproveSupplierRequest}
            onRejectSupplierRequest={handleRejectSupplierRequest}
          />
        )}
      </div>
    </div>
  );
}
