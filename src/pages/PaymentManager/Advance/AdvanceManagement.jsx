import { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, Eye } from "lucide-react";
import AdvanceDetails from "./AdvanceDetails.jsx";

const initialSuppliers = [
  {
    id: "SP-2025-001",
    name: "Kamal Perera",
    amount: "20000",
    last_income: "74000",
    this_weight: "280",
    this_income: "560000",
    loans: "",
    fertilizer_loans: "12000",
    date: "2025-06-08",
    status: "pending",
    eligibility: "PASS",
    email: "kamal@email.com",
    type: "cash",
  },
  {
    id: "SP-2025-002",
    name: "Nimal Silva",
    amount: "55000",
    last_income: "128000",
    this_weight: "480",
    this_income: "960000",
    loans: "15000",
    fertilizer_loans: "12000",
    date: "2025-06-07",
    status: "rejected",
    eligibility: "FAIL",
    email: "nimal@email.com",
    rejectionReason:
      "Insufficient supply consistency and high existing loan burden",
    type: "bank",
  },
  {
    id: "SP-2025-003",
    name: "Sunil Jayawardena",
    amount: "3000",
    last_income: "28000",
    this_weight: "80",
    this_income: "16000",
    loans: "",
    fertilizer_loans: "",
    date: "2025-06-05",
    status: "approved",
    eligibility: "PASS",
    email: "sunil@email.com",
    approvedDate: "2025-06-10",
    type: "cash",
  },
  // May 2025 data
  {
    id: "SP-2025-004",
    name: "Ravi Gunasekara",
    amount: "25000",
    last_income: "95000",
    this_weight: "320",
    this_income: "640000",
    loans: "",
    fertilizer_loans: "8000",
    date: "2025-05-15",
    status: "approved",
    eligibility: "PASS",
    email: "ravi@email.com",
    approvedDate: "2025-05-18",
    type: "bank",
  },
  {
    id: "SP-2025-005",
    name: "Priya Fernando",
    amount: "18000",
    last_income: "67000",
    this_weight: "250",
    this_income: "500000",
    loans: "5000",
    fertilizer_loans: "10000",
    date: "2025-05-22",
    status: "pending",
    eligibility: "PASS",
    email: "priya@email.com",
    type: "cash",
  },
  // April 2025 data
  {
    id: "SP-2025-006",
    name: "Ajith Bandara",
    amount: "35000",
    last_income: "110000",
    this_weight: "420",
    this_income: "840000",
    loans: "",
    fertilizer_loans: "15000",
    date: "2025-04-12",
    status: "approved",
    eligibility: "PASS",
    email: "ajith@email.com",
    approvedDate: "2025-04-15",
    type: "bank",
  },
  {
    id: "SP-2025-007",
    name: "Kumari Wijesinghe",
    amount: "12000",
    last_income: "45000",
    this_weight: "150",
    this_income: "300000",
    loans: "8000",
    fertilizer_loans: "6000",
    date: "2025-04-28",
    status: "rejected",
    eligibility: "FAIL",
    email: "kumari@email.com",
    rejectionReason:
      "Low tea supply volume and insufficient financial stability",
    type: "cash",
  },
  // Additional Pending Requests
  {
    id: "SP-2025-008",
    name: "Saman Rathnayake",
    amount: "15000",
    last_income: "52000",
    this_weight: "200",
    this_income: "400000",
    loans: "",
    fertilizer_loans: "8000",
    date: "2025-06-10",
    status: "pending",
    eligibility: "PASS",
    email: "saman@email.com",
    type: "bank",
  },
  {
    id: "SP-2025-009",
    name: "Chamari Dissanayake",
    amount: "8000",
    last_income: "35000",
    this_weight: "120",
    this_income: "240000",
    loans: "3000",
    fertilizer_loans: "5000",
    date: "2025-06-12",
    status: "pending",
    eligibility: "PASS",
    email: "chamari@email.com",
    type: "cash",
  },
  {
    id: "SP-2025-010",
    name: "Rohan Mendis",
    amount: "30000",
    last_income: "98000",
    this_weight: "380",
    this_income: "760000",
    loans: "12000",
    fertilizer_loans: "10000",
    date: "2025-06-15",
    status: "pending",
    eligibility: "PASS",
    email: "rohan@email.com",
    type: "bank",
  },
  // Additional Approved Requests
  {
    id: "SP-2025-011",
    name: "Nilmini Perera",
    amount: "22000",
    last_income: "85000",
    this_weight: "320",
    this_income: "640000",
    loans: "",
    fertilizer_loans: "7000",
    date: "2025-05-20",
    status: "approved",
    eligibility: "PASS",
    email: "nilmini@email.com",
    approvedDate: "2025-05-22",
    type: "cash",
  },
  {
    id: "SP-2025-012",
    name: "Mahesh Silva",
    amount: "40000",
    last_income: "150000",
    this_weight: "500",
    this_income: "1000000",
    loans: "",
    fertilizer_loans: "18000",
    date: "2025-05-25",
    status: "approved",
    eligibility: "PASS",
    email: "mahesh@email.com",
    approvedDate: "2025-05-28",
    type: "bank",
  },
  {
    id: "SP-2025-013",
    name: "Deepika Fernando",
    amount: "16000",
    last_income: "62000",
    this_weight: "240",
    this_income: "480000",
    loans: "4000",
    fertilizer_loans: "9000",
    date: "2025-04-08",
    status: "approved",
    eligibility: "PASS",
    email: "deepika@email.com",
    approvedDate: "2025-04-10",
    type: "cash",
  },
  {
    id: "SP-2025-017",
    name: "Thilaka Ranasinghe",
    amount: "28000",
    last_income: "105000",
    this_weight: "390",
    this_income: "780000",
    loans: "",
    fertilizer_loans: "11000",
    date: "2025-06-02",
    status: "approved",
    eligibility: "PASS",
    email: "thilaka@email.com",
    approvedDate: "2025-06-04",
    type: "bank",
  },
  {
    id: "SP-2025-018",
    name: "Amara Wickremaratne",
    amount: "32000",
    last_income: "120000",
    this_weight: "450",
    this_income: "900000",
    loans: "6000",
    fertilizer_loans: "13000",
    date: "2025-06-06",
    status: "approved",
    eligibility: "PASS",
    email: "amara@email.com",
    approvedDate: "2025-06-08",
    type: "cash",
  },
  // Additional Rejected Requests
  {
    id: "SP-2025-014",
    name: "Lasitha Gamage",
    amount: "45000",
    last_income: "75000",
    this_weight: "180",
    this_income: "360000",
    loans: "25000",
    fertilizer_loans: "15000",
    date: "2025-06-03",
    status: "rejected",
    eligibility: "FAIL",
    email: "lasitha@email.com",
    rejectedDate: "2025-06-05",
    rejectionReason:
      "Requested amount exceeds eligibility criteria based on current supply volume and existing debt",
    type: "bank",
  },
  {
    id: "SP-2025-015",
    name: "Sanduni Wickramasinghe",
    amount: "28000",
    last_income: "65000",
    this_weight: "160",
    this_income: "320000",
    loans: "18000",
    fertilizer_loans: "12000",
    date: "2025-05-12",
    status: "rejected",
    eligibility: "FAIL",
    email: "sanduni@email.com",
    rejectedDate: "2025-05-15",
    rejectionReason:
      "High debt-to-income ratio and inconsistent tea supply patterns",
    type: "cash",
  },
  {
    id: "SP-2025-016",
    name: "Tharaka Jayasinghe",
    amount: "35000",
    last_income: "90000",
    this_weight: "220",
    this_income: "440000",
    loans: "20000",
    fertilizer_loans: "14000",
    date: "2025-04-18",
    status: "rejected",
    eligibility: "FAIL",
    email: "tharaka@email.com",
    rejectedDate: "2025-04-20",
    rejectionReason:
      "Multiple outstanding loans and below-average supply consistency for the requested advance amount",
    type: "bank",
  },
];

export default function AdvanceManagement() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [currentView, setCurrentView] = useState("approved");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    eligibility: "",
    year: "",
  });
  const [detailedSupplier, setDetailedSupplier] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Date selection state - default to current month/year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth()); // 0-based (5 = June)
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Month names for display
  const monthNames = [
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

  // Generate available years (current year and previous years)
  const availableYears = Array.from(
    { length: 10 },
    (_, i) => currentDate.getFullYear() - i
  );

  // Generate available months based on selected year
  const getAvailableMonths = (year) => {
    if (year === currentDate.getFullYear()) {
      // For current year, only show months up to current month
      return Array.from({ length: currentDate.getMonth() + 1 }, (_, i) => i);
    } else {
      // For previous years, show all months
      return Array.from({ length: 12 }, (_, i) => i);
    }
  };

  // Filter suppliers by selected month and year
  const suppliersBySelectedDate = useMemo(() => {
    return suppliers.filter((supplier) => {
      const supplierDate = new Date(supplier.date);
      return (
        supplierDate.getMonth() === selectedMonth &&
        supplierDate.getFullYear() === selectedYear
      );
    });
  }, [suppliers, selectedMonth, selectedYear]);

  // Calculate dashboard metrics based on filtered suppliers
  const metrics = useMemo(() => {
    const totalAmount = suppliersBySelectedDate.reduce(
      (sum, s) => sum + parseInt(s.amount || 0),
      0
    );
    const pendingAmount = suppliersBySelectedDate
      .filter((s) => s.status === "pending")
      .reduce((sum, s) => sum + parseInt(s.amount || 0), 0);
    const givenAmount = suppliersBySelectedDate
      .filter((s) => s.status === "approved")
      .reduce((sum, s) => sum + parseInt(s.amount || 0), 0);
    const rejectedAmount = suppliersBySelectedDate
      .filter((s) => s.status === "rejected")
      .reduce((sum, s) => sum + parseInt(s.amount || 0), 0);
    const pendingCount = suppliersBySelectedDate.filter(
      (s) => s.status === "pending"
    ).length;
    const approvedCount = suppliersBySelectedDate.filter(
      (s) => s.status === "approved"
    ).length;
    const rejectedCount = suppliersBySelectedDate.filter(
      (s) => s.status === "rejected"
    ).length;

    return {
      totalAmount,
      pendingAmount,
      givenAmount,
      rejectedAmount,
      pendingCount,
      approvedCount,
      rejectedCount,
      totalSuppliers: suppliersBySelectedDate.length,
      eligibleSuppliers: suppliersBySelectedDate.filter(
        (s) => s.eligibility === "PASS"
      ).length,
      utilizationRate:
        totalAmount > 0 ? Math.round((givenAmount / totalAmount) * 100) : 0,
    };
  }, [suppliersBySelectedDate]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "", eligibility: "", year: "" });
  };

  const filteredSuppliers = useMemo(() => {
    return suppliersBySelectedDate.filter((s) => {
      // First filter by current view
      let matchesView = false;
      if (currentView === "pending") {
        matchesView = s.status === "pending";
      } else if (currentView === "approved") {
        matchesView = s.status === "approved";
      } else if (currentView === "rejected") {
        matchesView = s.status === "rejected";
      }

      if (!matchesView) return false;

      // Then apply search and other filters
      const matchesSearch =
        filters.search === "" ||
        s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.id.includes(filters.search);
      const matchesStatus = !filters.status || s.status === filters.status;
      const matchesEligibility =
        !filters.eligibility || s.eligibility === filters.eligibility;

      // Year filter - filter by request year
      let matchesYear = true;
      if (filters.year) {
        const requestYear = new Date(s.date).getFullYear();
        matchesYear = requestYear === parseInt(filters.year);
      }

      return (
        matchesSearch && matchesStatus && matchesEligibility && matchesYear
      );
    });
  }, [suppliersBySelectedDate, filters, currentView]);

  const approveSupplier = (id, approvalData) => {
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "approved",
              approvedDate: new Date().toISOString().split("T")[0],
              route: approvalData?.route || "Route A-01",
            }
          : s
      )
    );
    alert(
      `Advance approved successfully! Amount: Rs. ${
        suppliers.find((s) => s.id === id)?.amount
      }`
    );
    setDetailedSupplier(null);
  };

  const rejectSupplier = (id, reason) => {
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "rejected",
              rejectedDate: new Date().toISOString().split("T")[0],
              rejectionReason: reason,
            }
          : s
      )
    );
    alert(`Advance rejected. Reason: ${reason}`);
    setDetailedSupplier(null);
  };

  // Show detailed view if a supplier is selected
  if (detailedSupplier) {
    return (
      <AdvanceDetails
        supplier={detailedSupplier}
        onBack={() => setDetailedSupplier(null)}
        onApprove={approveSupplier}
        onReject={rejectSupplier}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                Advance Management
              </p>
              <div className="text-xl font-bold text-blue-600 px-4 py-2 rounded-lg">
                {monthNames[selectedMonth]} {selectedYear}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Month:
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                >
                  {getAvailableMonths(selectedYear).map((monthIndex) => (
                    <option key={monthIndex} value={monthIndex}>
                      {monthNames[monthIndex]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Year:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const newYear = parseInt(e.target.value);
                    setSelectedYear(newYear);
                    // If selected year changes and current month is not available, reset to last available month
                    const availableMonths = getAvailableMonths(newYear);
                    if (!availableMonths.includes(selectedMonth)) {
                      setSelectedMonth(
                        availableMonths[availableMonths.length - 1]
                      );
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-medium"
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setCurrentView("approved")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "approved" ? "ring-2 ring-green-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Given Advances
                </p>
                <p className="text-2xl font-bold text-green-600">
                  Rs. {metrics.givenAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {metrics.approvedCount} approved
                </p>
              </div>
              <div className="h-8 w-8 text-green-600 text-2xl">✅</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("pending")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "pending" ? "ring-2 ring-yellow-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Advances
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  Rs. {metrics.pendingAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {metrics.pendingCount} requests
                </p>
              </div>
              <div className="h-8 w-8 text-yellow-600 text-2xl">⏳</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("rejected")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "rejected" ? "ring-2 ring-red-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Rejected Advances
                </p>
                <p className="text-2xl font-bold text-red-600">
                  Rs. {metrics.rejectedAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {metrics.rejectedCount} rejected
                </p>
              </div>
              <div className="h-8 w-8 text-red-600 text-2xl">❌</div>
            </div>
          </button>
        </div>

        {/* Enhanced Controls */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-4">
            {/* Search and Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by name, supplier ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={filters.search}
                    onChange={handleFilterChange}
                    name="search"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>

            {/* Enhanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route
                  </label>
                  <select
                    name="region"
                    value={filters.region}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">All Routes</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Sabaragamuwa">Sabaragamuwa</option>
                    <option value="Central">Central</option>
                    <option value="Southern">Southern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount Range
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
                    <option>All Amounts</option>
                    <option>Under Rs. 10,000</option>
                    <option>Rs. 10,000 - 50,000</option>
                    <option>Above Rs. 50,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Year
                  </label>
                  <select
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">All Years</option>
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-30 px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="bg-green-600 text-white">
            {currentView === "pending" ? (
              <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm">
                <div className="text-left">Supplier ID</div>
                <div className="text-left">Supplier Name</div>
                <div className="text-left">Amount Requested</div>
                <div className="text-left">Request Date</div>
                <div className="text-center">View Details</div>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm">
                <div className="text-left">Supplier ID</div>
                <div className="text-left">Supplier Name</div>
                <div className="text-left">Amount</div>
                <div className="text-left">
                  {currentView === "approved"
                    ? "Approved Date"
                    : "Rejected Date"}
                </div>
                <div className="text-center">View Details</div>
              </div>
            )}
          </div>

          <div className="divide-y divide-gray-200">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="grid grid-cols-5 gap-4 p-3 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="font-semibold text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full inline-block w-fit">
                  {supplier.id}
                </div>
                <div className="font-medium text-gray-900 text-sm">
                  {supplier.name}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  Rs. {parseInt(supplier.amount || 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-900">
                  {currentView === "approved"
                    ? supplier.approvedDate || supplier.date
                    : currentView === "rejected"
                    ? supplier.rejectedDate || supplier.date
                    : supplier.date}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setDetailedSupplier(supplier)}
                    className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-full transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {filteredSuppliers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <div className="h-12 w-12 text-gray-400 mx-auto mb-4 text-4xl">
                  💰
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {suppliersBySelectedDate.length === 0
                    ? `No advance requests found for ${monthNames[selectedMonth]} ${selectedYear}`
                    : "No advance requests found"}
                </h3>
                <p className="text-gray-600">
                  {suppliersBySelectedDate.length === 0
                    ? "Try selecting a different month or year"
                    : "Try adjusting your search or filter criteria"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing {filteredSuppliers.length} of{" "}
            {
              suppliersBySelectedDate.filter((s) => {
                if (currentView === "pending") return s.status === "pending";
                if (currentView === "approved") return s.status === "approved";
                if (currentView === "rejected") return s.status === "rejected";
                return false;
              }).length
            }{" "}
            results
          </div>
        </div>
      </div>
    </div>
  );
}
