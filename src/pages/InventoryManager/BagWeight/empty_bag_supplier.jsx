import React, { useState, useEffect } from "react";
import { Search, Users, Package, Scale } from "lucide-react";
import {
  useNavigate,
  Outlet,
  useMatch,
  useLocation,
  useParams,
} from "react-router-dom";

export default function DriverRoute() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { routeId, routeName, driverName, currentView, sessionId } =
    location.state || {};
  console.log("Route Details:", {
    routeId,
    routeName,
    driverName,
    currentView,
    sessionId,
  });
  const { tripId } = useParams();
  console.log("Trip ID:", tripId);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tripId) return;
    setLoading(true);
    setError(null);
    if (currentView === "weighed") {
      // Weighed view: fetch bags
      fetch(
        `http://localhost:8080/api/inventory-process/trip/${tripId}/bags/weighed`
      )
        .then((res) => res.json())
        .then((data) => {
          setSuppliers(
            Array.isArray(data)
              ? data.map((item) => ({
                  bagNo: item.bagNumber || "-",
                  supplierId: item.supplierId || "-",
                  supplierName: item.supplierName || "Unknown Supplier",
                  supplyRequestId: item.supplyRequestId || "-",
                }))
              : []
          );
          setLoading(false);
        })
        .catch((err) => {
          setSuppliers([]);
          setError(err.message);
          setLoading(false);
        });
    } else if (currentView === "completed") {
      // Completed view: fetch supplier summary using sessionId
      if (!sessionId) {
        setSuppliers([]);
        setLoading(false);
        return;
      }
      fetch(`http://localhost:8080/api/bagweights/session/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSuppliers(
            Array.isArray(data)
              ? data.map((item) => ({
                  tareWeight: item.tareWeight,
                  bagTotal: item.bagTotal || "-",
                  supplierId: item.supplierId,
                  supplierName: item.supplierName,
                }))
              : []
          );
          setLoading(false);
        })
        .catch((err) => {
          setSuppliers([]);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("Invalid view type");
      setSuppliers([]);
      setLoading(false);
    }
  }, [tripId, location.key, currentView, sessionId]);

  const totalSuppliers = [...new Set(suppliers.map((s) => s.supplierId))]
    .length;
  const totalBags = suppliers.length;

  const filteredSuppliers = suppliers.filter((s) =>
    (s.bagNo || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isBase = useMatch("/inventoryManager/empty_bags_weight/route/:routeId");
  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-5">
        {loading && (
          <div className="bg-white p-4 rounded shadow text-center text-gray-600">
            Loading bag details...
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded shadow text-center">
            {error}
          </div>
        )}
        {!loading && !error && isBase && (
          <>
            {/* Header */}
            <div className="bg-white p-4 shadow-sm">
              <h1 className="text-2xl font-bold" style={{ color: "#165E52" }}>
                Route Details
              </h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "No of Suppliers",
                  value: totalSuppliers,
                  icon: <Users className="text-[#000000] w-5 h-5" />,
                },
                {
                  label: "No of Bags",
                  value: totalBags,
                  icon: <Package className="text-[#000000] w-5 h-5" />,
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg"
                  style={{ borderColor: "#000000" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#000000" }}
                      >
                        {card.label}
                      </p>
                      <p className="text-2xl font-bold text-[#000000]">
                        {card.value}
                      </p>
                    </div>
                    <div className="h-10 w-10 bg-[#f3f4f6] rounded-full flex items-center justify-center text-lg">
                      {card.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Route Info + Search */}
            <div
              className="bg-white rounded-lg shadow-sm p-4 border"
              style={{ borderColor: "#cfece6" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label
                    className="text-sm font-semibold mb-1 block"
                    style={{ color: "#165E52" }}
                  >
                    Route No
                  </label>
                  <div className="text-lg font-bold text-[#01251F]">
                    {routeId || "Route ID Not Available"}
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm font-semibold mb-1 block"
                    style={{ color: "#165E52" }}
                  >
                    Route Name
                  </label>
                  <div className="text-lg font-bold text-gray-800">
                    {routeName || "Route Name Not Available"}
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm font-semibold mb-1 block"
                    style={{ color: "#165E52" }}
                  >
                    Driver Name
                  </label>
                  <div className="text-lg font-bold text-gray-800">
                    {driverName || "Driver Name Not Available"}
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="w-full px-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50
                 focus:outline-none focus:ring-2 focus:ring-[#165E52] focus:border-transparent"
                  />
                  <Search className="absolute text-gray-400 h-4 w-4 right-3 top-3" />
                </div>
              </div>
            </div>

            {/* Supplier Action Bar */}
            <div
              className="bg-white rounded-lg shadow-sm p-4 border"
              style={{ borderColor: "#cfece6" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: "#165E52" }}
                  >
                    Supplier Bags
                  </h2>
                </div>
              </div>
            </div>

            {/* Main content changes by currentView */}
            {currentView === "weighed" ? (
              suppliers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-green-600 font-semibold text-lg mb-4">
                    All Bags Weighed
                  </div>
                  <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 rounded-lg font-medium bg-[#165E52] text-white hover:bg-[#11453f] transition"
                  >
                    Back
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((col) => {
                    // Split filteredSuppliers into 3 columns
                    const colBags = filteredSuppliers.filter(
                      (_, idx) => idx % 3 === col
                    );
                    return (
                      <div
                        key={col}
                        className="bg-white rounded-lg border overflow-hidden"
                        style={{ borderColor: "#cfece6" }}
                      >
                        <div className="bg-[#01251F] text-white p-3 text-sm font-semibold text-center">
                          Bag Numbers
                        </div>
                        <div>
                          {colBags.map((supplier, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                const bagsForSupplier = suppliers.filter(
                                  (b) => b.supplierId === supplier.supplierId
                                );
                                navigate(`supplier/${supplier.supplierId}`, {
                                  state: {
                                    supplierId: supplier.supplierId,
                                    supplierName: supplier.supplierName,
                                    supplyRequestId: supplier.supplyRequestId,
                                    tripId,
                                    sessionId,
                                    routeId,
                                    bags: bagsForSupplier.map((b) => ({
                                      bagNo: b.bagNo,
                                    })),
                                  },
                                });
                              }}
                              className="p-4 text-center hover:bg-gray-50 cursor-pointer transition font-medium text-[#01251F] border-b last:border-b-0"
                            >
                              {supplier.bagNo}
                            </div>
                          ))}
                          {colBags.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                              No bags found.
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : currentView === "completed" ? (
              suppliers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-green-600 font-semibold text-lg mb-4">
                    No supplier summary found
                  </div>
                  <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 rounded-lg font-medium bg-[#165E52] text-white hover:bg-[#11453f] transition"
                  >
                    Back
                  </button>
                </div>
              ) : (
                <div
                  className="bg-white rounded-lg border overflow-hidden"
                  style={{ borderColor: "#cfece6" }}
                >
                  <div className="bg-[#01251F] text-white grid grid-cols-4 gap-4 p-3 text-sm font-semibold text-center">
                    <div>Supplier ID</div>
                    <div>Supplier Name</div>
                    <div>Total Bags</div>
                    <div>Tare Weight</div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {suppliers.map((s, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-4 gap-4 p-4 text-center"
                      >
                        <div className="font-medium text-[#01251F]">
                          {s.supplierId}
                        </div>
                        <div className="font-medium text-[#165E52]">
                          {s.supplierName}
                        </div>
                        <div className="font-medium">{s.bagTotal}</div>
                        <div className="font-medium">{s.tareWeight}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : null}
            <Outlet />
          </>
        )}
        {!isBase && <Outlet />}
      </div>
    </div>
  );
}
