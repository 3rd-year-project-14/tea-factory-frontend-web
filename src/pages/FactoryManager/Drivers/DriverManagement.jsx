import React, { useState, useMemo } from "react";
import {
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Truck,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import DriverHeader from "./DriverHeader";
import DriverFilters from "./DriverFilters";
import DriverSummaryCards from "./DriverSummaryCards";
import DriverModal from "./DriverModal";
import AssignmentModal from "./AssignmentModal";
import {
  drivers as initialDrivers,
  availableRoutes as _availableRoutes,
} from "./driverData";
import {
  getDriverSummary,
  filterDrivers,
  sortDrivers,
  generateDriverId,
} from "./driverUtils";

const ACCENT_COLOR = "#01251F";

const DriverManagement = () => {
  const [currentView, setCurrentView] = useState("list"); // 'list', 'profile', 'assign'
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  // Driver data
  const [drivers, setDrivers] = useState(initialDrivers);

  // Filter and sort state
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
  });
  const [sortBy, _setSortBy] = useState("name");
  const [sortOrder, _setSortOrder] = useState("asc");

  // Filter and sort drivers
  const filteredAndSortedDrivers = useMemo(() => {
    const filtered = filterDrivers(drivers, filters);
    return sortDrivers(filtered, sortBy, sortOrder);
  }, [drivers, filters, sortBy, sortOrder]);

  // Calculate summary data
  const summary = useMemo(() => {
    if (currentView === "list") {
      return getDriverSummary(filteredAndSortedDrivers);
    } else if (currentView === "profile" && selectedDriver) {
      return { driver: selectedDriver };
    }
    return {};
  }, [currentView, filteredAndSortedDrivers, selectedDriver]);

  // Navigation handlers
  const handleGoBack = (view) => {
    setCurrentView(view);
    if (view === "list") {
      setSelectedDriver(null);
    }
  };

  const handleViewDriver = (driver) => {
    setSelectedDriver(driver);
    setCurrentView("profile");
  };

  // Driver operations
  const handleCreateDriver = () => {
    setEditingDriver(null);
    setShowDriverModal(true);
  };

  const _handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setShowDriverModal(true);
  };

  const handleDriverSubmit = (driverData) => {
    if (editingDriver) {
      setDrivers((prev) =>
        prev.map((d) =>
          d.id === editingDriver.id ? { ...d, ...driverData } : d
        )
      );
    } else {
      const newDriver = {
        ...driverData,
        id: generateDriverId(drivers),
        assignedRoutes: [],
        availabilityToday: true,
        joinDate: new Date().toISOString().split("T")[0],
        licenseStatus:
          new Date(driverData.licenseExpiry) > new Date() ? "valid" : "expired",
      };
      setDrivers((prev) => [...prev, newDriver]);
    }
    setShowDriverModal(false);
    setEditingDriver(null);
  };

  // Assignment operations
  const handleQuickAssign = () => {
    setShowAssignmentModal(true);
  };

  const handleAssignRoute = (assignmentData) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === assignmentData.driverId
          ? {
              ...d,
              assignedRoutes: [
                ...(d.assignedRoutes || []),
                assignmentData.route,
              ],
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : d
      )
    );
    setShowAssignmentModal(false);
  };

  const getLicenseStatusIcon = (status) => {
    return status === "valid" ? (
      <CheckCircle size={16} className="text-emerald-500" />
    ) : (
      <AlertTriangle size={16} className="text-red-500" />
    );
  };

  const availableDrivers = drivers.filter(
    (d) => d.availabilityToday && d.status === "active"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DriverHeader
        currentView={currentView}
        selectedDriver={selectedDriver}
        onGoBack={handleGoBack}
        onCreateDriver={handleCreateDriver}
        onQuickAssign={handleQuickAssign}
      />

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Summary Cards */}
        <DriverSummaryCards currentView={currentView} summary={summary} />

        {/* Filters */}
        {currentView === "list" && (
          <DriverFilters filters={filters} onFiltersChange={setFilters} />
        )}

        {/* Driver List Tab */}
        {currentView === "list" && (
          <div className="space-y-6">
            {/* Drivers Table */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div style={{ backgroundColor: ACCENT_COLOR, color: "#fff" }}>
                <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm text-center">
                  <div>ID</div>
                  <div>Name</div>
                  <div>Vehicle Number</div>
                  <div>Route</div>
                  <div>View Details</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredAndSortedDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-center"
                  >
                    <div>
                      <span
                        className="font-semibold text-sm px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: "#e1f4ef",
                          color: "#165e52",
                          borderColor: "#165e52",
                        }}
                      >
                        {driver.id}
                      </span>
                    </div>
                    <div className="font-medium text-black text-sm">
                      {driver.name}
                    </div>
                    <div className="text-sm text-black font-medium">
                      {driver.assignedVehicle}
                    </div>
                    <div className="text-sm text-black font-medium">
                      {driver.assignedRoutes.length > 0 ? (
                        driver.assignedRoutes.slice(0, 1).map((route, i) => (
                          <span key={i}>{route}</span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">
                          Not assigned
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewDriver(driver)}
                        className="p-2 rounded-full transition-colors border"
                        style={{
                          border: `1.5px solid ${ACCENT_COLOR}`,
                          color: ACCENT_COLOR,
                        }}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredAndSortedDrivers.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No drivers found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
              {filteredAndSortedDrivers.length > 0 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-700">
                      <span>
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">
                          {filteredAndSortedDrivers.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {drivers.length}
                        </span>{" "}
                        drivers
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Driver Profile Tab */}
        {currentView === "profile" && selectedDriver && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-md border border-emerald-200 p-6">
                <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <User size={20} className="text-emerald-500" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      Full Name
                    </label>
                    <p className="text-emerald-900">{selectedDriver.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      NIC Number
                    </label>
                    <p className="font-mono text-emerald-900">
                      {selectedDriver.nic}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      Contact Number
                    </label>
                    <p className="text-emerald-900 flex items-center gap-2">
                      <Phone size={14} />
                      {selectedDriver.contact}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      Address
                    </label>
                    <p className="text-emerald-900 flex items-center gap-2">
                      <MapPin size={14} />
                      {selectedDriver.address}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      Driver Type
                    </label>
                    <p className="text-emerald-900">{selectedDriver.type}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle & License Information */}
              <div className="bg-white rounded-lg shadow-md border border-emerald-200 p-6">
                <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <Truck size={20} className="text-emerald-500" />
                  Vehicle & License
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      Assigned Vehicle
                    </label>
                    <p className="font-mono text-emerald-900 text-lg">
                      {selectedDriver.assignedVehicle}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      License Status
                    </label>
                    <div className="flex items-center gap-2">
                      {getLicenseStatusIcon(selectedDriver.licenseStatus)}
                      <span
                        className={`font-medium ${
                          selectedDriver.licenseStatus === "valid"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedDriver.licenseStatus === "valid"
                          ? "Valid"
                          : "Expired"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      License Expiry
                    </label>
                    <p className="text-emerald-900">
                      {selectedDriver.licenseExpiry}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      Bag Quota
                    </label>
                    <p className="text-emerald-900 font-medium">
                      {selectedDriver.bagQuota} bags
                    </p>
                  </div>
                  <div className="pt-2">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200">
                      <FileText size={16} />
                      Download License Copy
                    </button>
                  </div>
                </div>
              </div>

              {/* Route Assignments */}
              <div className="bg-white rounded-lg shadow-md border border-emerald-200 p-6">
                <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-emerald-500" />
                  Route Assignments
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      Current Routes
                    </label>
                    {selectedDriver.assignedRoutes.length > 0 ? (
                      <div className="space-y-2 mt-2">
                        {selectedDriver.assignedRoutes.map((route, index) => (
                          <div
                            key={index}
                            className="bg-emerald-50 border border-emerald-200 rounded-lg p-3"
                          >
                            <p className="font-medium text-emerald-800">
                              {route}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-emerald-500 italic mt-2">
                        No routes currently assigned
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-700">
                      Availability Today
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedDriver.availabilityToday ? (
                        <>
                          <CheckCircle size={16} className="text-emerald-500" />
                          <span className="text-emerald-600 font-medium">
                            Available
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle size={16} className="text-red-500" />
                          <span className="text-red-600 font-medium">
                            Not Available
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="pt-2 space-y-2">
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Assign New Route
                    </button>
                    <button className="w-full border border-emerald-300 hover:bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Edit Assignments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Assignments Tab */}
        {currentView === "assign" && (
          <div className="space-y-6">
            {/* Date Header */}
            <div className="bg-white rounded-lg shadow-md border border-emerald-200 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900">
                    Daily Route Assignments
                  </h3>
                  <p className="text-emerald-600 mt-1">
                    Assign drivers to routes for today's collections
                  </p>
                </div>
                <div className="text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                  Today:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Available Drivers */}
            <div className="bg-white rounded-lg shadow-md border border-emerald-200 p-6">
              <h3 className="text-lg font-semibold text-emerald-900 mb-4">
                Available Drivers Today
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="border border-emerald-200 rounded-lg p-4 hover:bg-emerald-50 transition-colors duration-150"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <User size={18} className="text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-emerald-900">
                            {driver.name}
                          </h4>
                          <p className="text-sm text-emerald-600">
                            {driver.assignedVehicle}
                          </p>
                        </div>
                      </div>
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-emerald-600">
                        Current Routes:
                      </p>
                      {driver.assignedRoutes.length > 0 ? (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {driver.assignedRoutes.map((route, index) => (
                            <span
                              key={index}
                              className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs"
                            >
                              {route}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 mt-1">
                          No assignments
                        </p>
                      )}
                    </div>

                    <button className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200">
                      Assign Route
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Driver Modal */}
        <DriverModal
          isOpen={showDriverModal}
          onClose={() => setShowDriverModal(false)}
          onSubmit={handleDriverSubmit}
          driver={editingDriver}
        />

        {/* Assignment Modal */}
        <AssignmentModal
          isOpen={showAssignmentModal}
          onClose={() => setShowAssignmentModal(false)}
          onSubmit={handleAssignRoute}
          availableDrivers={availableDrivers}
        />
      </div>
    </div>
  );
};

export default DriverManagement;
