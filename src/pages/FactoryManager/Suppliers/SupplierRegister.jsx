import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import SupplierHeader from "./SupplierHeader.jsx";
import SupplierSummaryCards from "./SupplierSummaryCards.jsx";
import SupplierFilters from "./SupplierFilters.jsx";
import SupplierTable from "./SupplierTable.jsx";

export default function SupplierRegister() {
  // Approve supplier request
  const handleApproveSupplierRequest = async (id, routeId, bagLimit) => {
    try {
      const initialBagCount = Number(bagLimit);
      const params = { routeId };
      if (initialBagCount > 0) {
        params.initialBagCount = initialBagCount;
      }
      await axios.post(
        `http://localhost:8080/api/supplier-requests/${id}/approve`,
        null,
        { params }
      );
      // Refetch data after approval
      fetchAllCounts();
      fetchTableData(currentView);
    } catch (error) {
      console.error("Error approving supplier request:", error);
    }
  };

  // Reject supplier request
  const handleRejectSupplierRequest = async (id, reason) => {
    try {
      await axios.post(
        `http://localhost:8080/api/supplier-requests/${id}/reject`,
        null,
        { params: { reason } }
      );
      // Refetch data after rejection
      fetchAllCounts();
      fetchTableData(currentView);
    } catch (error) {
      console.error("Error rejecting supplier request:", error);
    }
  };

  // Efficiently fetch counts for summary cards
  const fetchAllCounts = async () => {
    try {
      // You may want to create API endpoints that return only counts for each category
      const [approvedRes, requestsRes] = await Promise.all([
        fetch("http://localhost:8080/api/suppliers"),
        fetch("http://localhost:8080/api/supplier-requests"),
      ]);
      const approved = await approvedRes.json();
      const requests = await requestsRes.json();
      // Calculate counts
      const approvedCount = approved.length;
      const pendingCount = requests.filter(
        (r) => r.status === "pending"
      ).length;
      const rejectedCount = requests.filter(
        (r) => r.status === "rejected"
      ).length;
      setMetrics({
        approved: approvedCount,
        pending: pendingCount,
        rejected: rejectedCount,
      });
    } catch {
      setMetrics({ approved: 0, pending: 0, rejected: 0 });
    }
  };

  // Fetch table data for current view only
  const fetchTableData = async (view) => {
    setLoading(true);
    setSuppliers([]); // Clear suppliers before loading new data
    let endpoint = "";
    if (view === "approved") {
      endpoint = "http://localhost:8080/api/suppliers";
    } else {
      endpoint = "http://localhost:8080/api/supplier-requests";
    }
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      let mapped = [];
      if (view === "approved") {
        mapped = data.map((item) => ({
          id: item.supplierId,
          name: item.user?.name || "",
          nic: item.user?.nic || "",
          phone: item.user?.contactNo || "",
          location: item.user?.address || "",
          email: item.user?.email || "",
          monthlySupply: item.initialBagCount || "",
          landSize: item.landSize || "",
          supplierCreatedDate: item.user?.createdAt?.split("T")[0] || "",
          requestedRoute: item.route?.name || "",
          pickupLocation: item.pickupLocation || "",
          landLocation: item.landLocation || "",
          nicImage: item.nicImage || "",
          status: item.status === "approved" ? "approved" : "approved", // Always set to 'approved'
          approvedDate: item.approvedDate || null,
        }));
        setSuppliers(mapped);
      } else {
        const filtered = data.filter((item) => item.status === view);
        if (filtered.length === 0) {
          setSuppliers([]);
        } else {
          mapped = filtered.map((item) => ({
            id: item.id,
            name: item.user?.name || "",
            nic: item.user?.nic || "",
            phone: item.user?.contactNo || "",
            location: item.user?.address || "",
            monthlySupply: item.monthlySupply || "",
            landSize: item.landSize || "",
            date: item.submittedDate || "",
            supplierCreatedDate: item.user?.createdAt?.split("T")[0] || "",
            approvedDate: item.approvedDate || null,
            rejectedDate: item.rejectedDate || null,
            rejectionReason: item.rejectReason || "",
            status: item.status || "",
            email: item.user?.email || "",
            requestedRoute: item.requestedRoute || "",
            pickupLocation: item.pickupLocation || "",
            landLocation: item.landLocation || "",
            nicImage: item.nicImage || "",
          }));
          setSuppliers(mapped);
        }
      }
    } catch {
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  const [suppliers, setSuppliers] = useState([]);
  const [metrics, setMetrics] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(false);

  // Filter and search states
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Current view state
  const [currentView, setCurrentView] = useState("approved");

  // Effect to fetch initial data
  useEffect(() => {
    fetchAllCounts();
    fetchTableData(currentView);
  }, [currentView]);

  // Handle view change
  const handleViewChange = (view) => {
    setCurrentView(view);
    // Refetch data for the new view
    fetchTableData(view);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      search: "",
      status: "all",
    });
  };

  // Memoized filtered suppliers
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        supplier.nic.toLowerCase().includes(filters.search.toLowerCase()) ||
        supplier.phone.includes(filters.search) ||
        supplier.location
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        supplier.email.toLowerCase().includes(filters.search.toLowerCase());

      // For pending/rejected views, only show suppliers with that status
      if (currentView === "pending" || currentView === "rejected") {
        return matchesSearch && supplier.status === currentView;
      }
      // For approved view, allow 'all' or filter by status
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500 border-solid"></div>
            <span className="ml-4 text-emerald-700 font-semibold">
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
