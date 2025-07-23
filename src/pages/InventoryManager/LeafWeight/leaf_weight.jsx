import React, { useState } from "react";
import { Search, Truck, PackageCheck, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ACCENT_COLOR = "#01251F";






export default function Route() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("today");
  const navigate = useNavigate();


  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.getDate();


  const [routes] = useState([
    { id: "TN-1", routeName: "Route - 1", driverName: "Driver - 1", vehicleNo: "DAD-2435", suppliers: 10, status: "active" },
    { id: "TK-1", routeName: "Route - 2", driverName: "Driver - 2", vehicleNo: "DAD-2436", suppliers: 12, status: "active" },
    { id: "TB-1", routeName: "Route - 3", driverName: "Driver - 3", vehicleNo: "DAD-2437", suppliers: 8, status: "active" },
    { id: "TR-1", routeName: "Route - 4", driverName: "Driver - 4", vehicleNo: "DAD-2438", suppliers: 29, status: "active" },
    { id: "TB-2", routeName: "Route - 5", driverName: "Driver - 5", vehicleNo: "DAD-2439", suppliers: 16, status: "active" },
  ]);


  const [completedRoutes] = useState([
    {
      id: "TC-1",
      routeName: "Route A",
      driverName: "Driver A",
      vehicleNo: "DAD-2401",
      suppliers: 15,
      status: "completed",
      completedDate: "2025-07-20",
      totalWeight: "250 kg",
    },
    {
      id: "TC-2",
      routeName: "Route B",
      driverName: "Driver B",
      vehicleNo: "DAD-2402",
      suppliers: 18,
      status: "completed",
      completedDate: "2025-07-19",
      totalWeight: "320 kg",
    },
  ]);


  const currentRoutes = currentView === "completed" ? completedRoutes : routes;


  const filteredRoutes = currentRoutes.filter(
    (route) =>
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 rounded-lg border border-emerald-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Leaf Weight</h1>
            <div className="flex items-center gap-3 text-emerald-800 font-semibold">
              <span className="text-lg">{year}</span>
              <span className="text-md font-medium">{month}</span>
              <span className="text-lg">{date}</span>
            </div>
          </div>
        </div>


        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Today Routes */}
          <div
            onClick={() => setCurrentView("today")}
            className={`p-6 rounded-lg shadow-md cursor-pointer border transition-transform ${
              currentView === "today"
                ? "border-black"
                : "border-gray-300 hover:border-black"
            } hover:scale-[1.02] bg-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Today’s Routes</p>
                <p className="text-2xl font-bold text-black">{routes.length}</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Truck size={24} color="black" />
              </div>
            </div>
          </div>


          {/* Total Bags */}
          <div className="p-6 rounded-lg shadow-md border border-black bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Total Bags</p>
                <p className="text-2xl font-bold text-black">12</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <PackageCheck size={24} color="black" />
              </div>
            </div>
          </div>


          {/* Completed Routes */}
          <div
            onClick={() => setCurrentView("completed")}
            className={`p-6 rounded-lg shadow-md cursor-pointer border transition-transform ${
              currentView === "completed"
                ? "border-black"
                : "border-gray-300 hover:border-black"
            } hover:scale-[1.02] bg-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Completed Routes</p>
                <p className="text-2xl font-bold text-black">
                  {completedRoutes.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Scale size={24} color="black" />
              </div>
            </div>
          </div>
        </div>


        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            {currentView === "completed" ? "Completed Routes" : "Today Routes"}
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#165e52] focus:border-transparent bg-gray-50"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>


        {/* Routes Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="bg-[#01251F] text-white">
            <div
              className={`grid p-4 font-medium text-sm text-center ${
                currentView === "completed" ? "grid-cols-6" : "grid-cols-4"
              }`}
            >
              <div>Route No</div>
              <div>Route Name</div>
              <div>Driver</div>
              <div>No. of Bags</div>
              {currentView === "completed" && (
                <>
                  <div>Completed Date</div>
                  <div>Total Weight</div>
                </>
              )}
            </div>
          </div>


          <div className="divide-y divide-gray-100">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                onClick={() =>
                  currentView === "today" && navigate("/inventoryManager/route_leaf")
                }
                className={`grid px-4 py-3 text-sm items-center ${
                  currentView === "completed" ? "grid-cols-6" : "grid-cols-4"
                } ${
                  currentView === "today"
                    ? "hover:bg-gray-50 cursor-pointer"
                    : ""
                }`}
              >
                <div className="text-center font-semibold text-gray-800">
                  {route.id}
                </div>
                <div className="text-center text-gray-700">{route.routeName}</div>
                <div className="text-center text-gray-700">{route.driverName}</div>
                <div className="font-medium text-center text-gray-800">
                  {route.suppliers}
                </div>
                {currentView === "completed" && (
                  <>
                    <div className="text-center text-gray-600">{route.completedDate}</div>
                    <div className="text-center font-medium text-emerald-700">
                      {route.totalWeight}
                    </div>
                  </>
                )}
              </div>
            ))}
            {filteredRoutes.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No {currentView} routes match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
