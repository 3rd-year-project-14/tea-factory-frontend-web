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

      suppliers: 10,
    },
    {
      id: "TK-1",
      routeName: "Route - 2",
      driverName: "Driver - 2",

      suppliers: 12,
    },
    {
      id: "TB-1",
      routeName: "Route - 3",
      driverName: "Driver - 3",

      suppliers: 8,
    },
    {
      id: "TR-1",
      routeName: "Route - 4",
      driverName: "Driver - 4",

      suppliers: 29,
    },
    {
      id: "TB-1",
      routeName: "Route - 5",
      driverName: "Driver - 5",

      suppliers: 16,
    },
  ]);

  const filteredRoutes = routes.filter(
    (route) =>
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filteredRoutes by suppliers (No of Bags) ascending
  const sortedRoutes = [...filteredRoutes].sort(
    (a, b) => a.suppliers - b.suppliers
  );

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* All content inside one card */}
        <div className="bg-green-50 rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Leaf Weight</h1>
          {/* Top Statistics Cards - Card 3 style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-2 rounded-lg shadow-sm ring-2 ring-green-500 transition-colors hover:bg-gray-50 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">
                    Total Suppliers
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {routes.length}
                  </p>
                  <p className="text-[10px] text-gray-500">Tracked</p>
                </div>
                <div className="h-6 w-6 text-green-600 text-xl">🌱</div>
              </div>
            </div>
            <div className="p-2 rounded-lg shadow-sm ring-2 ring-blue-500 transition-colors hover:bg-gray-50 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">
                    Total Bags
                  </p>
                  <p className="text-lg font-bold text-blue-600">12</p>
                  <p className="text-[10px] text-gray-500">All Bags</p>
                </div>
                <div className="h-6 w-6 text-blue-600 text-xl">📦</div>
              </div>
            </div>
            <div className="p-2 rounded-lg shadow-sm ring-2 ring-red-500 transition-colors hover:bg-gray-50 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">
                    Total Weight
                  </p>
                  <p className="text-lg font-bold text-red-600">12</p>
                  <p className="text-[10px] text-gray-500">Kg</p>
                </div>
                <div className="h-6 w-6 text-red-600 text-xl">⚖️</div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
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
          <div className="rounded-lg shadow-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600">
                <tr>
                  <th className="pl-24  py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Route No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Route Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    Driver Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                    No of Bags
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sortedRoutes.map((route, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      navigate(`/inventoryManager/route_bags_weight`)
                    }
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="pl-24 pr-4 py-3 font-medium text-gray-900">
                      {route.id}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {route.routeName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {route.driverName}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {route.suppliers}
                    </td>
                  </tr>
                ))}
                {sortedRoutes.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      No routes found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
