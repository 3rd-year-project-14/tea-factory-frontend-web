import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  ChevronDown,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import SupplierRequestDetails from "./SupplierRequestDetails.jsx";

const initialSuppliers = [
  // Pending Suppliers
  {
    id: 1,
    name: "Kamal Perera",
    nic: "952847393V",
    phone: "+94 77 123 4567",
    location: "Maharagama, Colombo",
    supply: "500 kg",
    date: "2025-06-08",
    approvedDate: null,
    rejectedDate: null,
    rejectionReason: null,
    status: "pending",
    email: "kamal@email.com",
    businessType: "Individual Farmer",
    experience: "5 years",
    priority: "medium",
    supplierId: null,
    route: null,
  },
  {
    id: 2,
    name: "Nimal Silva",
    nic: "891234567V",
    phone: "+94 71 987 6543",
    location: "Kegalle, Sabaragamuwa",
    supply: "750 kg",
    date: "2025-06-07",
    approvedDate: null,
    rejectedDate: null,
    rejectionReason: null,
    status: "pending",
    email: "nimal.silva@email.com",
    businessType: "Cooperative",
    experience: "10 years",
    priority: "high",
    supplierId: null,
    route: null,
  },
  {
    id: 5,
    name: "Amara Wickramasinghe",
    nic: "881234567V",
    phone: "+94 78 456 7890",
    location: "Ratnapura, Sabaragamuwa",
    supply: "600 kg",
    date: "2025-06-15",
    approvedDate: null,
    rejectedDate: null,
    rejectionReason: null,
    status: "pending",
    email: "amara.w@email.com",
    businessType: "Family Farm",
    experience: "8 years",
    priority: "medium",
    supplierId: null,
    route: null,
  },
  // Approved Suppliers
  {
    id: 3,
    name: "Sunil Jayawardena",
    nic: "751234567V",
    phone: "+94 76 555 1234",
    location: "Kandy, Central",
    supply: "300 kg",
    date: "2025-06-05",
    approvedDate: "2025-06-10",
    rejectedDate: null,
    rejectionReason: null,
    status: "approved",
    email: "sunil.j@email.com",
    businessType: "Individual Farmer",
    experience: "3 years",
    priority: "low",
    supplierId: "SUP-2025-003",
    route: "Route A-01 (Colombo North)",
  },
  {
    id: 6,
    name: "Chamari Fernando",
    nic: "821234567V",
    phone: "+94 75 123 4567",
    location: "Nuwara Eliya, Central",
    supply: "800 kg",
    date: "2025-05-28",
    approvedDate: "2025-06-02",
    rejectedDate: null,
    rejectionReason: null,
    status: "approved",
    email: "chamari.f@email.com",
    businessType: "Cooperative",
    experience: "12 years",
    priority: "high",
    supplierId: "SUP-2025-006",
    route: "Route B-02 (Central Hills)",
  },
  {
    id: 7,
    name: "Ruwan Kumara",
    nic: "791234567V",
    phone: "+94 77 987 6543",
    location: "Badulla, Uva",
    supply: "400 kg",
    date: "2025-05-25",
    approvedDate: "2025-05-30",
    rejectedDate: null,
    rejectionReason: null,
    status: "approved",
    email: "ruwan.k@email.com",
    businessType: "Individual Farmer",
    experience: "6 years",
    priority: "medium",
    supplierId: "SUP-2025-007",
    route: "Route C-03 (Uva Province)",
  },
  {
    id: 8,
    name: "Sanduni Rajapaksa",
    nic: "831234567V",
    phone: "+94 76 234 5678",
    location: "Hatton, Central",
    supply: "650 kg",
    date: "2025-05-20",
    approvedDate: "2025-05-25",
    rejectedDate: null,
    rejectionReason: null,
    status: "approved",
    email: "sanduni.r@email.com",
    businessType: "Family Farm",
    experience: "9 years",
    priority: "high",
    supplierId: "SUP-2025-008",
    route: "Route B-02 (Central Hills)",
  },
  // Rejected Suppliers
  {
    id: 4,
    name: "Priya Mendis",
    nic: "754567890V",
    phone: "+94 77 234 5678",
    location: "Galle, Southern",
    supply: "450 kg",
    date: "2025-06-04",
    approvedDate: null,
    rejectedDate: "2025-06-12",
    rejectionReason:
      "Insufficient land documentation and location too far from collection points.",
    status: "rejected",
    email: "priya.mendis@email.com",
    businessType: "Individual Farmer",
    experience: "2 years",
    priority: "low",
    supplierId: null,
    route: null,
  },
  {
    id: 9,
    name: "Lakmal Dissanayake",
    nic: "771234567V",
    phone: "+94 78 345 6789",
    location: "Hambantota, Southern",
    supply: "200 kg",
    date: "2025-06-01",
    approvedDate: null,
    rejectedDate: "2025-06-08",
    rejectionReason:
      "Tea quality samples did not meet factory standards. Requires improvement in cultivation practices.",
    status: "rejected",
    email: "lakmal.d@email.com",
    businessType: "Individual Farmer",
    experience: "1 year",
    priority: "low",
    supplierId: null,
    route: null,
  },
  {
    id: 10,
    name: "Tharaka Bandara",
    nic: "801234567V",
    phone: "+94 71 456 7890",
    location: "Matara, Southern",
    supply: "350 kg",
    date: "2025-05-30",
    approvedDate: null,
    rejectedDate: "2025-06-05",
    rejectionReason:
      "Unable to verify land ownership documents and transportation logistics not feasible.",
    status: "rejected",
    email: "tharaka.b@email.com",
    businessType: "Individual Farmer",
    experience: "4 years",
    priority: "medium",
    supplierId: null,
    route: null,
  },
];

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
  const [viewMode, setViewMode] = useState("compact"); // "detailed" or "compact"

  // Calculate dashboard metrics
  const metrics = useMemo(() => {
    const total = suppliers.length;
    const pending = suppliers.filter((s) => s.status === "pending").length;
    const approved = suppliers.filter((s) => s.status === "approved").length;
    const rejected = suppliers.filter((s) => s.status === "rejected").length;
    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;
    const overdue = suppliers.filter((s) => {
      const requestDate = new Date(s.date);
      const daysDiff = Math.floor(
        (new Date() - requestDate) / (1000 * 60 * 60 * 24)
      );
      return s.status === "pending" && daysDiff > 3;
    }).length;

    return { total, pending, approved, rejected, approvalRate, overdue };
  }, [suppliers]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: "", status: "", region: "" });
  };

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      // First filter by current view
      let matchesView = false;
      if (currentView === "approved") {
        matchesView = s.status === "approved";
      } else if (currentView === "pending") {
        matchesView = s.status === "pending";
      } else if (currentView === "rejected") {
        matchesView = s.status === "rejected";
      }

      if (!matchesView) return false;

      // Then apply search and other filters
      const matchesSearch =
        filters.search === "" ||
        s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        (s.supplierId && s.supplierId.includes(filters.search)) ||
        ("SUP-2025-00" + s.id).includes(filters.search);
      const matchesStatus = !filters.status || s.status === filters.status;
      const matchesRegion =
        !filters.region || s.location.includes(filters.region);
      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [suppliers, filters, currentView]);

  const approveSupplier = (id, approvalData) => {
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "approved",
              approvedDate: new Date().toISOString().split("T")[0],
              supplierId: `SUP-2025-00${s.id}`,
              route: approvalData.route,
            }
          : s
      )
    );
    alert(
      `Supplier approved successfully! Route: ${approvalData.route}, Bag Limit: ${approvalData.bagLimit}`
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
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                Supplier Management
              </p>
            </div>
            {/* <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                Bulk Contact
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setCurrentView("approved")}
            className={`bg-white p-4 rounded-lg shadow-sm border transition-colors hover:bg-gray-50 ${
              currentView === "approved" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Suppliers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.approved}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {metrics.pending}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
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
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {metrics.rejected}
                </p>
              </div>
              <X className="h-8 w-8 text-red-600" />
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
                    placeholder="Search by name, location, or ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    value={filters.search}
                    onChange={handleFilterChange}
                    name="search"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("compact")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      viewMode === "compact"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Compact
                  </button>
                  <button
                    onClick={() => setViewMode("detailed")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      viewMode === "detailed"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Detailed
                  </button>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>

                {/* <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button> */}
              </div>
            </div>

            {/* Enhanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div> */}

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
                    <option value="">All Routess</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Sabaragamuwa">Sabaragamuwa</option>
                    <option value="Central">Central</option>
                    <option value="Southern">Southern</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div> */}

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
            {currentView === "approved" ? (
              <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm">
                <div className="text-left">Supplier ID</div>
                <div className="text-left">Supplier Details</div>
                <div className="text-left">Supply & Location</div>
                <div className="text-left">Route</div>
                <div className="text-left">Approved Date</div>
                <div className="text-center">View Details</div>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm">
                <div className="text-left">Supplier Name</div>
                <div className="text-left">Supplier Details</div>
                <div className="text-left">Supply & Location</div>
                <div className="text-left">
                  {currentView === "pending" ? "Request Date" : "Rejected Date"}
                </div>
                <div className="text-center">View Details</div>
              </div>
            )}
          </div>

          <div className="divide-y divide-gray-200">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id}>
                {currentView === "approved" ? (
                  viewMode === "detailed" ? (
                    <div className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full inline-block w-fit">
                        {supplier.supplierId}
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900 text-sm">
                          {supplier.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{supplier.email}</span>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                          {supplier.phone}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 font-semibold px-2 py-1 rounded ">
                          {supplier.supply}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{supplier.location}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          <span className="px-2 py-0.5 rounded-full">
                            {supplier.businessType}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-900 font-medium px-2 py-1 rounded">
                        {supplier.route}
                      </div>
                      <div className="text-sm text-gray-900 flex items-center px-2 py-1 rounded">
                        <Calendar className="h-3 w-3 mr-1" />
                        {supplier.approvedDate}
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
                  ) : (
                    <div className="grid grid-cols-6 gap-4 p-3 items-center hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full inline-block w-fit">
                        {supplier.supplierId}
                      </div>
                      <div className="font-medium text-gray-900 text-sm">
                        {supplier.name}
                      </div>
                      <div className="text-sm text-gray-900 font-semibold">
                        {supplier.supply}
                      </div>
                      <div className="text-sm text-gray-900 font-medium">
                        {supplier.route}
                      </div>
                      <div className="text-sm text-gray-900">
                        {supplier.approvedDate}
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
                  )
                ) : viewMode === "detailed" ? (
                  <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 text-sm">
                      {supplier.name}
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {supplier.name}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{supplier.email}</span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                        {supplier.phone}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900 font-semibold px-2 py-1 rounded">
                        {supplier.supply}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{supplier.location}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        <span className="px-2 py-0.5 rounded-full">
                          {supplier.businessType}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-900 flex items-center px-2 py-1 rounded">
                      <Calendar className="h-3 w-3 mr-1" />
                      {currentView === "pending"
                        ? supplier.date
                        : supplier.rejectedDate}
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
                ) : (
                  <div className="grid grid-cols-5 gap-4 p-3 items-center hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 text-sm">
                      {supplier.name}
                    </div>
                    <div className="font-medium text-gray-900 text-sm">
                      {supplier.name}
                    </div>
                    <div className="text-sm text-gray-900 font-semibold">
                      {supplier.supply}
                    </div>
                    <div className="text-sm text-gray-900">
                      {currentView === "pending"
                        ? supplier.date
                        : supplier.rejectedDate}
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
                )}
              </div>
            ))}

            {filteredSuppliers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No suppliers found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
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
              suppliers.filter((s) => {
                if (currentView === "approved") return s.status === "approved";
                if (currentView === "pending") return s.status === "pending";
                if (currentView === "rejected") return s.status === "rejected";
                return false;
              }).length
            }{" "}
            {currentView} suppliers
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="flex items-center space-x-2">
              <span>Priority:</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-xs">High</span>
                <div className="w-3 h-3 bg-yellow-500 rounded ml-2"></div>
                <span className="text-xs">Medium</span>
                <div className="w-3 h-3 bg-green-500 rounded ml-2"></div>
                <span className="text-xs">Low</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
