import React, { useState, useEffect } from "react";
import { Search, Truck, Package, CheckCircle } from "lucide-react";
import { useNavigate, Outlet, useMatch } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";

export default function Route() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("arrived");
  const navigate = useNavigate();
  const { user } = useAuth();
  const factoryId = user?.factoryId;
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (!factoryId) return;
    fetch(`http://localhost:8080/api/inventory-process/factory/${factoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setTrips(Array.isArray(data) ? data : []);
        console.log("Fetched trips:", data);
      })
      .catch((err) => {
        console.error("Error fetching trip details:", err);
      });
  }, [factoryId]);

  const arrivedTrips = trips.filter((trip) => trip.tripStatus === "arrived");
  const completedTrips = trips.filter(
    (trip) => trip.tripStatus === "completed"
  );
  const pendingTrips = trips.filter(
    (trip) => trip.tripStatus === "pending" || trip.tripStatus === "collected"
  );

  // Filtered for table: show arrived, completed, or pending
  let filteredTrips = [];
  if (currentView === "arrived") filteredTrips = arrivedTrips;
  else if (currentView === "completed") filteredTrips = completedTrips;
  else filteredTrips = pendingTrips;

  // Optionally, add search filter
  const searchedTrips = filteredTrips.filter(
    (trip) =>
      (trip.routeName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (trip.driverName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArrivedRoutesClick = () => {
    setCurrentView("arrived");
    setSearchTerm("");
  };

  const handleCompletedRoutesClick = () => {
    setCurrentView("completed");
    setSearchTerm("");
  };

  const handlePendingRoutesClick = () => {
    setCurrentView("pending");
    setSearchTerm("");
  };

  const isBase = useMatch("/inventoryManager/leaf_weight");

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-8xl mx-auto space-y-4">
        {isBase && (
          <>
            <div className="bg-white shadow-sm p-4 mb-6  transition-all duration-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold" style={{ color: "#165E52" }}>
                  Leaf Weight
                </h1>
              </div>
            </div>

            {/* Top Statistics Cards - Arrived, Pending, Completed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Arrived Routes Card - Clickable */}
              <div
                onClick={handleArrivedRoutesClick}
                className={`bg-white px-4 py-3 rounded-lg shadow-md border   ${
                  currentView === "arrived"
                    ? "border-black-500 bg-gray-200"
                    : "border-black-200 "
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        currentView === "arrived"
                          ? "text-black-800"
                          : "text-black-700"
                      }`}
                    >
                      Arrived Routes
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        currentView === "arrived"
                          ? "text-black-900"
                          : "text-black-800"
                      }`}
                    >
                      {arrivedTrips.length}
                    </p>
                    <p
                      className={`text-xs ${
                        currentView === "arrived"
                          ? "text-black-700"
                          : "text-black-600"
                      }`}
                    >
                      {currentView === "arrived"
                        ? "Currently viewing"
                        : "Click to view"}
                    </p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      currentView === "arrived" ? "bg-gray-200" : "bg-gray-200"
                    }`}
                  >
                    <Truck className="text-black-600 w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Pending Routes Card - Clickable */}
              <div
                onClick={handlePendingRoutesClick}
                className={`bg-white px-4 py-3 rounded-lg shadow-md border  ${
                  currentView === "pending"
                    ? "border-black-500 bg-gray-200"
                    : "border-black-200 "
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        currentView === "pending"
                          ? "text-black-800"
                          : "text-black-700"
                      }`}
                    >
                      Pending Routes
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        currentView === "pending"
                          ? "text-black-900"
                          : "text-black-800"
                      }`}
                    >
                      {pendingTrips.length}
                    </p>
                    <p
                      className={`text-xs ${
                        currentView === "pending"
                          ? "text-black-700"
                          : "text-black-600"
                      }`}
                    >
                      {currentView === "pending"
                        ? "Currently viewing"
                        : "Click to view"}
                    </p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      currentView === "pending" ? "bg-gray-200" : "bg-gray-200"
                    }`}
                  >
                    <CheckCircle className="text-black-600 w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Completed Routes Card - Clickable */}
              <div
                onClick={handleCompletedRoutesClick}
                className={`bg-white px-4 py-3 rounded-lg shadow-md border   ${
                  currentView === "completed"
                    ? "border-black-500 bg-gray-200"
                    : "border-black-200 "
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        currentView === "completed"
                          ? "text-black-800"
                          : "text-black-700"
                      }`}
                    >
                      Completed Routes
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        currentView === "completed"
                          ? "text-black-900"
                          : "text-black-800"
                      }`}
                    >
                      {completedTrips.length}
                    </p>
                    <p
                      className={`text-xs ${
                        currentView === "completed"
                          ? "text-black-700"
                          : "text-black-600"
                      }`}
                    >
                      {currentView === "completed"
                        ? "Currently viewing"
                        : "Click to view"}
                    </p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      currentView === "completed"
                        ? "bg-gray-200"
                        : "bg-gray-200"
                    }`}
                  >
                    <CheckCircle className="text-black-600 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 ">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {currentView === "pending"
                      ? "Pending Routes"
                      : currentView === "completed"
                      ? "Completed Routes"
                      : "Arrived Routes"}
                  </h2>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Routes Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden border-emerald-200 duration-200">
              <div className="bg-[#01251F] text-white">
                <div
                  className={`grid gap-4 p-3 font-medium text-center ${
                    currentView === "completed" ? "grid-cols-5" : "grid-cols-4"
                  }`}
                >
                  <div>Route No</div>
                  <div>Route Name</div>
                  <div>Driver Name</div>
                  <div>No of Bags</div>
                  {currentView === "completed" && <div>Gross Weight</div>}
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {searchedTrips.length > 0 ? (
                  searchedTrips.map((trip, index) => {
                    let rowContent;
                    if (currentView === "completed") {
                      rowContent = (
                        <>
                          <div className="font-medium text-gray-900 text-center">
                            {trip.routeId}
                          </div>
                          <div className="text-gray-600 text-center">
                            {trip.routeName}
                          </div>
                          <div className="text-gray-600 text-center">
                            {trip.driverName}
                          </div>
                          <div className="text-gray-900 font-medium text-center">
                            {trip.bagCount}
                          </div>
                          <div className="text-gray-900 text-center">
                            {trip.grossWeight || "-"}
                          </div>
                        </>
                      );
                    } else {
                      rowContent = (
                        <>
                          <div className="font-medium text-gray-900 text-center">
                            {trip.routeId}
                          </div>
                          <div className="text-gray-600 text-center">
                            {trip.routeName}
                          </div>
                          <div className="text-gray-600 text-center">
                            {trip.driverName}
                          </div>
                          <div className="text-gray-900 font-medium text-center">
                            {trip.bagCount}
                          </div>
                        </>
                      );
                    }
                    if (currentView === "pending") {
                      return (
                        <div
                          key={trip.tripId || index}
                          className="grid gap-4 p-4 items-center grid-cols-4 bg-white"
                        >
                          {rowContent}
                        </div>
                      );
                    } else if (currentView === "completed") {
                      return (
                        <div
                          key={trip.tripId || index}
                          className="grid gap-4 p-4 items-center grid-cols-5 hover:bg-gray-50 cursor-pointer"
                          onClick={() =>
                            navigate(`route/${trip.tripId}`, {
                              state: {
                                routeId: trip.routeId,
                                routeName: trip.routeName,
                                driverName: trip.driverName,
                              },
                            })
                          }
                        >
                          {rowContent}
                        </div>
                      );
                    } else if (currentView === "arrived") {
                      return (
                        <div
                          key={trip.tripId || index}
                          className="grid gap-4 p-4 items-center grid-cols-4 hover:bg-gray-50 cursor-pointer"
                          onClick={() =>
                            navigate(`route/${trip.tripId}`, {
                              state: {
                                routeId: trip.routeId,
                                routeName: trip.routeName,
                                driverName: trip.driverName,
                              },
                            })
                          }
                        >
                          {rowContent}
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No trips found.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
}
