import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Users,
  Clock,
  X,
} from "lucide-react";

const ACCENT_COLOR = "#165E52";
const  BUTTON = "#01251F";
const BORDER_COLOR = "#cfece6";
const BG_LIGHT_GREEN = "#e1f4ef";

const initialSuppliers = [
  {
    id: "SUP-0001",
    name: "John Tea Factory",
    date: "2025-05-04",
    amount: 45000,
    eligibility: "PASS",
    approvedDate: "2025-05-08",
    status: "approved",
  },
  {
    id: "SUP-0002",
    name: "Green Gold Estates",
    date: "2025-03-14",
    amount: 32000,
    eligibility: "FAIL",
    rejectedDate: "2025-03-18",
    status: "rejected",
  },
  {
    id: "SUP-0003",
    name: "Ceylon Fresh",
    date: "2025-06-01",
    amount: 28000,
    eligibility: "PASS",
    status: "pending",
  },
  {
    id: "SUP-0004",
    name: "Highland Tea Supply",
    date: "2024-12-10",
    amount: 50000,
    eligibility: "PASS",
    approvedDate: "2024-12-15",
    status: "approved",
  },
];

export default function AdvanceManagement() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [currentView, setCurrentView] = useState("approved");
  const [filters, setFilters] = useState({
    search: "",
    eligibility: "",
    year: "",
    month: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [detailedSupplier, setDetailedSupplier] = useState(null);

  const currentDate = new Date();
  const availableYears = Array.from(
    { length: 10 },
    (_, i) => currentDate.getFullYear() - i
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const metrics = useMemo(() => {
    return {
      approvedCount: suppliers.filter((s) => s.status === "approved").length,
      pendingCount: suppliers.filter((s) => s.status === "pending").length,
      rejectedCount: suppliers.filter((s) => s.status === "rejected").length,
    };
  }, [suppliers]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      eligibility: "",
      year: "",
      month: "",
    });
  };

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const statusMatch = currentView ? s.status === currentView : true;
      const searchMatch =
        filters.search === "" ||
        s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.id.toLowerCase().includes(filters.search.toLowerCase());

      const eligibilityMatch =
        filters.eligibility === "" || s.eligibility === filters.eligibility;

      const yearMatch =
        filters.year === "" ||
        new Date(s.date).getFullYear().toString() === filters.year;

      const monthMatch =
        filters.month === "" ||
        new Date(s.date).toLocaleString("default", { month: "long" }) ===
          filters.month;

      return (
        statusMatch && searchMatch && eligibilityMatch && yearMatch && monthMatch
      );
    });
  }, [suppliers, currentView, filters]);

  const getBadgeColor = (status) => {
    if (status === "approved")
      return {
        backgroundColor: "#e1f4ef",
        color: "#165e52",
        borderColor: "#165e52",
      };
    if (status === "pending")
      return {
        backgroundColor: "#fffbeb",
        color: "#b45309",
        borderColor: "#f59e0b",
      };
    if (status === "rejected")
      return {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        borderColor: "#ef4444",
      };
    return {};
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="bg-white shadow-md border-b"
        style={{ borderColor: BORDER_COLOR }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-[${ACCENT_COLOR}]">
            Advance Management
          </h1>
          <div className="flex gap-4">
            <select
              name="month"
              value={filters.month}
              onChange={handleFilterChange}
              className="p-2 text-sm rounded-md border focus:ring-2 focus:ring-[#165E52]"
              style={{ borderColor: BORDER_COLOR }}
            >
              <option value="">All Months</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="p-2 text-sm rounded-md border focus:ring-2 focus:ring-[#165E52]"
              style={{ borderColor: BORDER_COLOR }}
            >
              <option value="">All Years</option>
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Approved", count: metrics.approvedCount, icon: <Users /> },
            { label: "Pending Requests", count: metrics.pendingCount, icon: <Clock /> },
            { label: "Rejected", count: metrics.rejectedCount, icon: <X /> },
          ].map((card, i) => (
            <div
              key={i}
              onClick={() => setCurrentView(card.label.toLowerCase().split(" ")[0])}
              className={`bg-white p-6 rounded-lg shadow-md cursor-pointer border   transition`}
              style={{ borderColor: card.label === "Rejected" ? "#ef4444" : currentView === card.label.toLowerCase().split(" ")[0] ? ACCENT_COLOR : "#000" }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-black">{card.label}</p>
                  <p className="text-2xl font-bold text-black">{card.count}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded-full">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        {/* Filters (Updated Styling) */}
<div
  className="bg-white rounded-lg shadow-md border mb-6"
  style={{ borderColor: BORDER_COLOR }}
>
  <div className="p-4">
    {/* 🔍 Search + Toggle */}
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
      {/* Search Input */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by name or ID"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#165E52] focus:outline-none text-gray-900 transition-colors text-sm"
            style={{
              borderColor: BORDER_COLOR,
              color: "#000",
            }}
          />
        </div>
      </div>

      {/* ☰ Show / Hide Advanced Filters Button */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm"
          style={{
            backgroundColor: BG_LIGHT_GREEN,
            color: ACCENT_COLOR,
            border: `2px solid ${BORDER_COLOR}`,
          }}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          <ChevronDown
            className={`h-4 w-4 ml-2 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>

    {/* 🔧 Expanded Filter Options */}
    {showFilters && (
      <div
        className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border"
        style={{ borderColor: BORDER_COLOR }}
      >
        {/* Eligibility Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Eligibility
          </label>
          <select
            name="eligibility"
            value={filters.eligibility}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-md focus:ring-2 focus:ring-[#165E52] focus:outline-none text-gray-900 text-sm"
            style={{
              borderColor: BORDER_COLOR,
            }}
          >
            <option value="">All</option>
            <option value="PASS">PASS</option>
            <option value="FAIL">FAIL</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors"
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

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div style={{ backgroundColor: BUTTON, color: "white" }}>
            <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-center">
              <div>Supplier ID</div>
              <div>Name</div>
              <div>Amount</div>
              <div>Date</div>
              <div>View</div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredSuppliers.map((supplier, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 border-b"
              >
                <div className="text-center">
                  <span
                    className="font-semibold text-sm px-3 py-1 rounded-full border"
                    style={getBadgeColor(supplier.status)}
                  >
                    {supplier.id}
                  </span>
                </div>
                <div className="text-center text-sm font-medium text-gray-900">
                  {supplier.name}
                </div>
                <div className="text-center text-sm">
                  Rs. {supplier.amount.toLocaleString()}
                </div>
                <div className="text-center text-sm">
                  {new Date(supplier.date).toLocaleDateString()}
                </div>
                <div className="flex justify-center">
                  <button
                    className="p-2 rounded-full border border-gray-400 text-black hover:text-white hover:bg-black"
                    onClick={() => setDetailedSupplier(supplier)}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {filteredSuppliers.length === 0 && (
              <div className="text-center text-sm p-10 text-gray-400">
                No matching results.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
