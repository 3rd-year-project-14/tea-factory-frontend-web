import { useState, useMemo } from "react";
import { Eye, Edit, MapPin, Truck, Users, Clock, Package } from "lucide-react";
import RouteHeader from "./RouteHeader";
import RouteFilters from "./RouteFilters";
import RouteSummaryCards from "./RouteSummaryCards";
import RouteModal from "./RouteModal";
import SupplierSelectionModal from "./SupplierSelectionModal";
import {
  routes as initialRoutes,
  routeSuppliers,
  availableDrivers,
  regions,
} from "./routeData";
import {
  getRouteSummary,
  filterRoutes,
  sortRoutes,
  generateRouteId,
} from "./routeUtils";

export default function RouteManagement() {
  // State management
  const [currentView, setCurrentView] = useState("routes"); // "routes", "details", "suppliers"
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState(initialRoutes);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  // Filter and sort state
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    region: "All",
    driverAssignment: "All",
  });
  const [sortBy, setSortBy] = useState("routeName");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter and sort routes
  const filteredAndSortedRoutes = useMemo(() => {
    const filtered = filterRoutes(routes, filters);
    return sortRoutes(filtered, sortBy, sortOrder);
  }, [routes, filters, sortBy, sortOrder]);

  // Calculate summary data
  const summary = useMemo(() => {
    if (currentView === "routes") {
      return getRouteSummary(filteredAndSortedRoutes);
    } else if (currentView === "details" && selectedRoute) {
      return { route: selectedRoute };
    }
    return {};
  }, [currentView, filteredAndSortedRoutes, selectedRoute]);

  // Navigation handlers
  const handleGoBack = (view) => {
    setCurrentView(view);
    if (view === "routes") {
      setSelectedRoute(null);
    }
  };

  const handleViewRoute = (route) => {
    setSelectedRoute(route);
    setCurrentView("details");
  };

  const handleManageSuppliers = () => {
    setCurrentView("suppliers");
  };

  // Supplier operations
  const handleAddSuppliers = () => {
    setShowSupplierModal(true);
  };

  const handleSupplierSubmit = (newSuppliers) => {
    if (!selectedRoute || !newSuppliers.length) return;

    // Get the current suppliers for this route, or initialize an empty array
    const currentSuppliers = routeSuppliers[selectedRoute.id] || [];

    // Add new suppliers to the route
    routeSuppliers[selectedRoute.id] = [...currentSuppliers, ...newSuppliers];

    // Update route info
    setRoutes((prev) =>
      prev.map((route) =>
        route.id === selectedRoute.id
          ? {
              ...route,
              supplierCount: (routeSuppliers[selectedRoute.id] || []).length,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : route
      )
    );

    // Update selected route if needed
    if (selectedRoute) {
      setSelectedRoute({
        ...selectedRoute,
        supplierCount: (routeSuppliers[selectedRoute.id] || []).length,
        lastUpdated: new Date().toISOString().split("T")[0],
      });
    }
  };

  // Route CRUD operations
  const handleCreateRoute = () => {
    setEditingRoute(null);
    setShowRouteModal(true);
  };

  const handleEditRoute = (route) => {
    setEditingRoute(route);
    setShowRouteModal(true);
  };

  const handleSubmitRoute = (routeData) => {
    if (editingRoute) {
      // Update existing route
      setRoutes((prev) =>
        prev.map((route) =>
          route.id === editingRoute.id
            ? {
                ...route,
                ...routeData,
                lastUpdated: new Date().toISOString().split("T")[0],
              }
            : route
        )
      );
      if (selectedRoute && selectedRoute.id === editingRoute.id) {
        setSelectedRoute({ ...selectedRoute, ...routeData });
      }
    } else {
      // Create new route
      const newRoute = {
        id: generateRouteId(routes),
        ...routeData,
        supplierCount: 0,
        actualLoad: 0,
        createdDate: new Date().toISOString().split("T")[0],
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setRoutes((prev) => [...prev, newRoute]);
    }
    setShowRouteModal(false);
    setEditingRoute(null);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
      "Under Maintenance": "bg-yellow-100 text-yellow-800",
      Suspended: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <RouteHeader
        currentView={currentView}
        selectedRoute={selectedRoute}
        onGoBack={handleGoBack}
        onCreateRoute={handleCreateRoute}
        onEditRoute={handleEditRoute}
        onManageSuppliers={handleManageSuppliers}
      />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards - only show for routes view */}
        {currentView === "routes" && (
          <RouteSummaryCards currentView={currentView} summary={summary} />
        )}

        {/* Routes List View */}
        {currentView === "routes" && (
          <>
            {/* Filters */}
            <RouteFilters
              filters={filters}
              setFilters={setFilters}
              regions={regions}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />

            {/* Routes Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="bg-green-600 text-white">
                <div className="grid grid-cols-8 gap-4 p-4 font-medium text-sm">
                  <div className="text-left">Route ID</div>
                  <div className="text-left">Route</div>
                  <div className="text-left">Driver</div>
                  <div className="text-center">Suppliers</div>
                  <div className="text-right">Last Month (kg)</div>
                  <div className="text-right">Distance</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">View Details</div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredAndSortedRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="grid grid-cols-8 gap-4 p-3 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-mono text-sm text-gray-700">
                      {route.id}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {route.routeName}
                      </p>
                    </div>
                    <div>
                      {route.assignedDriver ? (
                        <span className="text-sm text-gray-900">
                          {route.assignedDriver}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic text-sm">
                          Not assigned
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-900">
                        {route.supplierCount}
                      </span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium text-gray-900">
                        {route.lastMonthWeight || route.actualLoad || 0} kg
                      </div>
                      {route.lastMonthWeight &&
                        route.lastMonthWeight !== route.actualLoad && (
                          <div className="text-gray-600">
                            Prev: {route.actualLoad || 0} kg
                          </div>
                        )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {route.distance} km
                      </div>
                      {route.estimatedTime && (
                        <div className="text-xs text-gray-600">
                          {route.estimatedTime}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {getStatusBadge(route.status)}
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewRoute(route)}
                        className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-full transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAndSortedRoutes.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <div className="h-12 w-12 text-gray-400 mx-auto mb-4 text-4xl">
                    🚛
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No routes found
                  </h3>
                  <p className="text-gray-600">
                    {filters.search ||
                    filters.status !== "All" ||
                    filters.region !== "All"
                      ? "Try adjusting your filters"
                      : "Create your first route to get started"}
                  </p>
                </div>
              )}

              {/* Results count at bottom */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-600 p-4 border-t border-gray-200">
                <div>
                  Showing {filteredAndSortedRoutes.length} of {routes.length}{" "}
                  routes
                </div>
              </div>
            </div>
          </>
        )}

        {/* Route Details View */}
        {currentView === "details" && selectedRoute && (
          <div className="space-y-6">
            {/* Route Information Header Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-green-600" size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {selectedRoute.routeName}
                        </h2>
                        {getStatusBadge(selectedRoute.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        ID:{" "}
                        <span className="font-mono">{selectedRoute.id}</span> •
                        Last updated: {selectedRoute.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleEditRoute(selectedRoute)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Route
                  </button>
                </div>
              </div>

              {/* Route Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Driver</p>
                  <p className="font-medium text-gray-900">
                    {selectedRoute.assignedDriver || "Not assigned"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-medium text-gray-900">
                    {selectedRoute.distance} km
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Month Weight</p>
                  <p className="font-medium text-gray-900">
                    {selectedRoute.lastMonthWeight ||
                      selectedRoute.actualLoad ||
                      0}{" "}
                    kg
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bag Counts</p>
                  <p className="font-medium text-gray-900">
                    {selectedRoute.bagCounts || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Route Map Location */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Route Map
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center p-6 w-full">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-gray-400" size={32} />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Interactive map showing full route will be implemented soon
                  </p>
                </div>
              </div>
            </div>

            {/* Suppliers List */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Suppliers on Route
                </h3>
                <button
                  onClick={handleAddSuppliers}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Users size={16} />
                  Add Suppliers
                </button>
              </div>

              {routeSuppliers[selectedRoute.id]?.length > 0 ? (
                <>
                  {/* Suppliers Table Header */}
                  <div className="bg-green-600 text-white">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium text-sm">
                      <div className="text-left">Supplier ID</div>
                      <div className="text-left">Name</div>
                      <div className="text-left">Location</div>
                      <div className="text-center">Bag Count</div>
                      <div className="text-right">Last Month (kg)</div>
                    </div>
                  </div>

                  {/* Suppliers Table Body */}
                  <div className="divide-y divide-gray-200">
                    {routeSuppliers[selectedRoute.id].map((supplier) => (
                      <div
                        key={supplier.id}
                        className="grid grid-cols-5 gap-4 p-3 items-center hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-mono text-sm text-gray-700">
                          {supplier.id}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {supplier.name}
                          </p>
                        </div>
                        <div className="text-sm text-gray-700">
                          {supplier.location}
                        </div>
                        <div className="text-center">
                          <span className="font-medium text-gray-900">
                            {supplier.bagCount || 0}
                          </span>
                        </div>
                        <div className="text-right text-sm">
                          <div className="font-medium text-gray-900">
                            {supplier.lastMonthWeight ||
                              supplier.actualLoad ||
                              0}{" "}
                            kg
                          </div>
                          {supplier.lastMonthWeight &&
                            supplier.lastMonthWeight !==
                              supplier.actualLoad && (
                              <div className="text-gray-600">
                                Prev: {supplier.actualLoad || 0} kg
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Results count at bottom */}
                  <div className="flex items-center justify-between text-sm text-gray-600 p-4 border-t border-gray-200">
                    <div>
                      Showing {routeSuppliers[selectedRoute.id].length}{" "}
                      suppliers on this route
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="font-medium text-gray-700 mb-2">
                    No suppliers assigned to this route yet
                  </p>
                  <button
                    onClick={handleAddSuppliers}
                    className="mt-2 text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                  >
                    Add First Supplier
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Route Modal */}
      <RouteModal
        isOpen={showRouteModal}
        onClose={() => {
          setShowRouteModal(false);
          setEditingRoute(null);
        }}
        onSubmit={handleSubmitRoute}
        route={editingRoute}
        drivers={availableDrivers}
        regions={regions}
      />

      {/* Supplier Selection Modal */}
      <SupplierSelectionModal
        isOpen={showSupplierModal}
        onClose={() => setShowSupplierModal(false)}
        onSubmit={handleSupplierSubmit}
        currentSupplierIds={(routeSuppliers[selectedRoute?.id] || []).map(
          (supplier) => supplier.id
        )}
      />
    </div>
  );
}
