import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";

const ACCENT_COLOR = "#165E52";
const HEADER_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const BG_LIGHT_GREEN = "#e1f4ef";

export default function RequestHistory() {
  const [requests] = useState([
    {
      id: 1,
      date: "2024-07-04",
      type: "supplier",
      requester: "Green Valley Supplies",
      fertilizer: "NPK 15-15-15",
      quantity: "500 kg",
      status: "pending",
      notes: "Urgent request",
    },
    {
      id: 2,
      date: "2024-07-02",
      type: "manager",
      requester: "Lisa Chen",
      fertilizer: "Urea 46-0-0",
      quantity: "1000 kg",
      status: "approved",
      notes: "For field section A",
    },
    {
      id: 3,
      date: "2024-07-01",
      type: "supplier",
      requester: "AgroTech",
      fertilizer: "Phosphate 0-46-0",
      quantity: "750 kg",
      status: "rejected",
      notes: "Budget exceeded",
    },
    {
      id: 4,
      date: "2024-06-28",
      type: "supplier",
      requester: "EcoFarm Ltd",
      fertilizer: "Compost Organic",
      quantity: "1200 kg",
      status: "delivered",
      notes: "Delivered to Main Warehouse",
    },
    {
      id: 5,
      date: "2024-06-25",
      type: "manager",
      requester: "Mike Johnson",
      fertilizer: "NPK 20-20-20",
      quantity: "600 kg",
      status: "approved",
      notes: "Greenhouse usage",
    },
    {
      id: 6,
      date: "2024-06-24",
      type: "supplier",
      requester: "GrowMore",
      fertilizer: "Liquid Fertilizer",
      quantity: "500 L",
      status: "pending",
      notes: "Summer supply",
    },
  ]);

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    search: "",
    dateFrom: "",
    dateTo: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = requests.filter((item) => {
    const matchSearch =
      item.requester.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.fertilizer.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.notes.toLowerCase().includes(filters.search.toLowerCase());

    const matchType = !filters.type || item.type === filters.type;
    const matchStatus = !filters.status || item.status === filters.status;
    const matchFrom = !filters.dateFrom || item.date >= filters.dateFrom;
    const matchTo = !filters.dateTo || item.date <= filters.dateTo;

    return matchSearch && matchType && matchStatus && matchFrom && matchTo;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const pageData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () =>
    setFilters({
      type: "",
      status: "",
      search: "",
      dateFrom: "",
      dateTo: "",
    });

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusBadgeClass = (status) => {
    const base =
      "text-sm px-3 py-1 rounded-full font-semibold capitalize inline-block";
    switch (status) {
      case "approved":
        return `${base} bg-green-100 text-green-700`;
      case "pending":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "rejected":
        return `${base} bg-red-100 text-red-700`;
      case "delivered":
        return `${base} bg-blue-100 text-blue-700`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Correct Header */}
      <div className="bg-white shadow-md border-b" style={{ borderColor: BORDER_COLOR }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold mb-1" style={{ color: ACCENT_COLOR }}>
            Request History
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div
          className="bg-white rounded-lg shadow-md border mb-6"
          style={{ borderColor: BORDER_COLOR }}
        >
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-4">
              {/* Search input */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  name="search"
                  value={filters.search}
                  onChange={handleChange}
                  placeholder="Search by requester, fertilizer..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none"
                  style={{ borderColor: BORDER_COLOR }}
                />
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: BG_LIGHT_GREEN,
                  color: ACCENT_COLOR,
                  border: `2px solid ${BORDER_COLOR}`,
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown
                  className={`ml-2 w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {showFilters && (
              <div
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg border"
                style={{ borderColor: BORDER_COLOR }}
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    style={{ borderColor: BORDER_COLOR }}
                  >
                    <option value="">All</option>
                    <option value="supplier">Supplier</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    style={{ borderColor: BORDER_COLOR }}
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date From</label>
                  <input
                    type="date"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    style={{ borderColor: BORDER_COLOR }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date To</label>
                  <input
                    type="date"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    style={{ borderColor: BORDER_COLOR }}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm"
                    style={{
                      backgroundColor: BG_LIGHT_GREEN,
                      color: ACCENT_COLOR,
                      border: `2px solid ${BORDER_COLOR}`,
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Table */}
        <div className="bg-white rounded-lg shadow-md border" style={{ borderColor: BORDER_COLOR }}>
          <div style={{ backgroundColor: HEADER_COLOR, color: "#fff" }}>
            <div className="grid grid-cols-7 gap-4 font-medium text-sm text-left px-6 py-3">
              <div>Date</div>
              <div>Type</div>
              <div>Requester</div>
              <div>Fertilizer</div>
              <div>Quantity</div>
              <div>Status</div>
              <div>Notes</div>
            </div>
          </div>
          {pageData.length > 0 ? (
            pageData.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-7 gap-4 px-6 py-3 border-t text-sm items-start"
              >
                <div>{formatDate(r.date)}</div>
                <div className="capitalize">{r.type}</div>
                <div>{r.requester}</div>
                <div>{r.fertilizer}</div>
                <div>{r.quantity}</div>
                <div>
                  <span className={getStatusBadgeClass(r.status)}>
                    {r.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600">{r.notes}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No matching results
            </div>
          )}
        </div>

        {/* Pagination */}
        {filtered.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-6 text-sm">
            <p className="text-gray-700">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded ${currentPage === 1 ? "text-gray-300" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${currentPage === totalPages ? "text-gray-300" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
