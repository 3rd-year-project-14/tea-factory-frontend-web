import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Route() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [routes] = useState([
    {
      id: "TN-1",
      routeName: "Route - 1",
      driverName: "Driver - 1",
      vehicleNo: "DAD-2435",
      suppliers: 10,
    },
    {
      id: "TK-1",
      routeName: "Route - 2",
      driverName: "Driver - 2",
      vehicleNo: "DAD-2436",
      suppliers: 12,
    },
    {
      id: "TB-1",
      routeName: "Route - 3",
      driverName: "Driver - 3",
      vehicleNo: "DAD-2437",
      suppliers: 8,
    },
    {
      id: "TR-1",
      routeName: "Route - 4",
      driverName: "Driver - 4",
      vehicleNo: "DAD-2438",
      suppliers: 29,
    },
    {
      id: "TB-1",
      routeName: "Route - 5",
      driverName: "Driver - 5",
      vehicleNo: "DAD-2439",
      suppliers: 16,
    },
    {
      id: "TB-1",
      routeName: "Route - 5",
      driverName: "Driver - 5",
      vehicleNo: "DAD-2439",
      suppliers: 16,
    },
    {
      id: "TB-1",
      routeName: "Route - 5",
      driverName: "Driver - 5",
      vehicleNo: "DAD-2439",
      suppliers: 16,
    },
    {
      id: "TB-1",
      routeName: "Route - 5",
      driverName: "Driver - 5",
      vehicleNo: "DAD-2439",
      suppliers: 16,
    },
    {
      id: "TB-1",
      routeName: "Route - 5",
      driverName: "Driver - 5",
      vehicleNo: "DAD-2439",
      suppliers: 16,
    },
  ]);

  const filteredRoutes = routes.filter(
    (route) =>
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-8xl mx-auto space-y-4">
        <div className="bg-gray-50 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Leaf Weight</h1>
        {/* Top Statistics Cards - Factory Manager Routes style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Suppliers Card */}
          <div className="bg-white px-4 py-3 rounded-lg shadow-md border-emerald-200 border transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  Total Suppliers
                </p>
                <p className="text-2xl font-bold text-emerald-800">
                  {routes.length}
                </p>
                <p className="text-xs text-emerald-600">Tracked</p>
              </div>
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">🌱</div>
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
          {/* Total Weight Card */}
          <div className="bg-white px-4 py-3 rounded-lg shadow-md border-emerald-200 border transition-all duration-200 hover:shadow-lg hover:border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  Total Weight
                </p>
                <p className="text-2xl font-bold text-emerald-800">12</p>
                <p className="text-xs text-emerald-600">Kg</p>
              </div>
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="text-emerald-600 text-xl">⚖️</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border-emerald-200 border transition-all duration-200  ">
          <div className="flex justify-between items-center gap-4">
            {/* <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 text-sm rounded transition-colors duration-200">
              Enter
            </button> */}

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
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden border-emerald-200  duration-200 ">
          <div className="bg-emerald-800 text-white">
            <div className="grid grid-cols-6 gap-4 p-3 font-medium text-center">
              <div>Route No</div>
              <div>Route Name</div>
              <div>Driver Name</div>
              <div>No of Bags</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredRoutes.map((route, index) => (
              <div
                key={index}
                onClick={() => navigate(`/inventoryManager/route_leaf`)}
                className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50"
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
                <div>
                  {/* <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-xs font-medium transition-colors duration-200">
                    View
                  </button> */}
                  {/* <button
                        onClick={() => navigate(`/inventoryManager/route_leaf`)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-xs font-medium transition-colors duration-200"
                        >
                        View
                    </button> */}
                </div>
              </div>
            ))}

            {filteredRoutes.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No routes found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
