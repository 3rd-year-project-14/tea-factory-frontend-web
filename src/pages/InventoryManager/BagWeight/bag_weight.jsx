import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Route() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("today"); // "today" or "completed"
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.getDate();

  const [routes] = useState([
    {
      id: "TN-1",
      routeName: "Route - 1",
      driverName: "Driver - 1",
      vehicleNo: "DAD-2435",
      suppliers: 10,
      status: "active"
    },
    {
      id: "TK-1",
      routeName: "Route - 2",
      driverName: "Driver - 2",
      vehicleNo: "DAD-2436",
      suppliers: 12,
      status: "active"
    },
    {
      id: "TB-1",
      routeName: "Route - 3",
      driverName: "Driver - 3",
      vehicleNo: "DAD-2437",
      suppliers: 8,
      status: "active"
    },
    {
      id: "TR-1",
      routeName: "Route - 4",
      driverName: "Driver - 4",
      vehicleNo: "DAD-2438",
      suppliers: 29,
      status: "active"
    },
    {
      id: "TB-2",
      routeName: "Route - 5",
      driverName: "Driver - 5",
      vehicleNo: "DAD-2439",
      suppliers: 16,
      status: "active"
    },
    {
      id: "TB-2",
      routeName: "Route - 5",
      driverName: "Driver - 5",
      vehicleNo: "DAD-2439",
      suppliers: 16,
      status: "active"
    },
    {
      id: "TB-2",
      routeName: "Route - 5",
      driverName: "Driver - 5",
      vehicleNo: "DAD-2439",
      suppliers: 16,
      status: "active"
    }
  ]);

  // Sample completed routes
  const [completedRoutes] = useState([
    {
      id: "TC-1",
      routeName: "Route - A",
      driverName: "Driver - A",
      vehicleNo: "DAD-2401",
      suppliers: 15,
      status: "completed",
      completedDate: "2025-07-20",
      totalWeight: "250 kg"
    },
    {
      id: "TC-2",
      routeName: "Route - B",
      driverName: "Driver - B",
      vehicleNo: "DAD-2402",
      suppliers: 18,
      status: "completed",
      completedDate: "2025-07-19",
      totalWeight: "320 kg"
    },
    {
      id: "TC-3",
      routeName: "Route - C",
      driverName: "Driver - C",
      vehicleNo: "DAD-2403",
      suppliers: 22,
      status: "completed",
      completedDate: "2025-07-18",
      totalWeight: "450 kg"
    },
    {
      id: "TC-4",
      routeName: "Route - D",
      driverName: "Driver - D",
      vehicleNo: "DAD-2404",
      suppliers: 14,
      status: "completed",
      completedDate: "2025-07-17",
      totalWeight: "280 kg"
    }
  ]);

  const currentRoutes = currentView === "completed" ? completedRoutes : routes;
  
  const filteredRoutes = currentRoutes.filter(
    (route) =>
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTodayRoutesClick = () => {
    setCurrentView("today");
    setSearchTerm(""); // Reset search when switching views
  };

  const handleCompleteRouteClick = () => {
    setCurrentView("completed");
    setSearchTerm(""); // Reset search when switching views
  };

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-8xl mx-auto space-y-4">
 
        <div className="bg-white shadow-sm p-4 mb-6 border-emerald-200 border transition-all duration-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Bag Weight</h1>
            <div className="flex items-center gap-3 text-emerald-800">
              <span className="text-lg font-semibold">{year}</span>
              <span className="text-md font-medium">{month}</span>
              <span className="text-lg font-semibold">{date}</span>
            </div>
          </div>
        </div>

        {/* Top Statistics Cards - Updated with Today Routes and Complete Route cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Today Routes Card - Clickable */}
          <div 
            onClick={handleTodayRoutesClick}
            className={`bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:scale-105 ${
              currentView === "today" 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-emerald-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  currentView === "today" ? 'text-emerald-800' : 'text-emerald-700'
                }`}>
                  Today Routes
                </p>
                <p className={`text-2xl font-bold ${
                  currentView === "today" ? 'text-emerald-900' : 'text-emerald-800'
                }`}>
                  {routes.length}
                </p>
                <p className={`text-xs ${
                  currentView === "today" ? 'text-emerald-700' : 'text-emerald-600'
                }`}>
                  {currentView === "today" ? 'Currently viewing' : 'Click to view'}
                </p>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                currentView === "today" ? 'bg-emerald-200' : 'bg-emerald-100'
              }`}>
                <div className={`text-xl ${
                  currentView === "today" ? 'text-emerald-800' : 'text-emerald-600'
                }`}>🚛</div>
              </div>
            </div>
          </div>

          {/* Total Bags Card */}
          <div className="bg-white px-4 py-3 rounded-lg shadow-md border-emerald-200 border transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  Total Bags
                </p>
                <p className="text-2xl font-bold text-emerald-800">12</p>
                <p className="text-xs text-emerald-600">All Bags</p>
              </div>
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">📦</div>
              </div>
            </div>
          </div>

          {/* Complete Route Card - Clickable */}
          <div 
            onClick={handleCompleteRouteClick}
            className={`bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:scale-105 ${
              currentView === "completed" 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-emerald-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  currentView === "completed" ? 'text-emerald-800' : 'text-emerald-700'
                }`}>
                  Complete Routes
                </p>
                <p className={`text-2xl font-bold ${
                  currentView === "completed" ? 'text-emerald-900' : 'text-emerald-800'
                }`}>
                  {completedRoutes.length}
                </p>
                <p className={`text-xs ${
                  currentView === "completed" ? 'text-emerald-700' : 'text-emerald-600'
                }`}>
                  {currentView === "completed" ? 'Currently viewing' : 'Click to view'}
                </p>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                currentView === "completed" ? 'bg-emerald-200' : 'bg-emerald-100'
              }`}>
                <div className={`text-xl ${
                  currentView === "completed" ? 'text-emerald-800' : 'text-emerald-600'
                }`}>✅</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border-emerald-200 border transition-all duration-200">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {currentView === "completed" ? 'Completed Routes' : 'Today Routes'}
              </h2>
              {currentView === "completed" ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Completed
                </span>
              ) : (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Today
                </span>
              )}
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
          <div className="bg-emerald-900 text-white">
            <div className={`grid gap-4 p-3 font-medium text-center ${
              currentView === "completed" ? 'grid-cols-6' : 'grid-cols-4'
            }`}>
              <div>Route No</div>
              <div>Route Name</div>
              <div>Driver Name</div>
              <div>No of Bags</div>
              {currentView === "completed" && (
                <>
                  <div>Completed Date</div>
                  <div>Total Weight</div>
                </>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredRoutes.map((route, index) => (
              <div
                key={index}
                onClick={() => currentView === "today" && navigate(`/inventoryManager/empty_bags_weight_supplier`)}
                className={`grid gap-4 p-4 items-center ${
                  currentView === "completed" ? 'grid-cols-6' : 'grid-cols-4'
                } ${currentView === "today" ? 'hover:bg-gray-50 cursor-pointer' : 'hover:bg-green-50'}`}
              >
                <div className="font-medium text-gray-900 text-center">
                  {route.id}
                </div>
                <div className="text-gray-600 text-center">
                  {route.routeName}
                </div>
                <div className="text-gray-600 text-center">
                  {route.driverName}
                </div>
                <div className="text-gray-900 font-medium text-center">
                  {route.suppliers}
                </div>
                {currentView === "completed" && (
                  <>
                    <div className="text-gray-600 text-center">
                      {route.completedDate}
                    </div>
                    <div className="text-emerald-700 font-medium text-center">
                      {route.totalWeight}
                    </div>
                  </>
                )}
              </div>
            ))}

            {filteredRoutes.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No {currentView === "completed" ? 'completed' : 'today'} routes found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}