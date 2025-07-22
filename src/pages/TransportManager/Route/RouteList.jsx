import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Truck,
  Clock,
  Map,
  Edit2,
  UserCircle,
  Search,
} from "lucide-react";

// You can adapt routes data structure as needed
const routes = [
  {
    id: "A",
    status: "Ongoing",
    driver: "Mr.Perera",
    distance: "20Km",
    estTime: "1h",
    suppliers: 15,
    supply: "500Kg",
  },
  {
    id: "B",
    status: "Scheduled",
    driver: "Mr.Kamal",
    distance: "20Km",
    estTime: "1h",
    suppliers: 15,
    supply: "500Kg",
  },
  {
    id: "C",
    status: "Completed",
    driver: null,
    distance: "20Km",
    estTime: "1h",
    suppliers: 15,
    supply: "500Kg",
  },
  {
    id: "D",
    status: "Ongoing",
    driver: "Mr.Perera",
    distance: "20Km",
    estTime: "1h",
    suppliers: 15,
    supply: "500Kg",
  },
  {
    id: "E",
    status: "Completed",
    driver: "Mr.Kamal",
    distance: "20Km",
    estTime: "1h",
    suppliers: 15,
    supply: "500Kg",
  },
  {
    id: "F",
    status: "Scheduled",
    driver: "Mr.Kamal",
    distance: "20Km",
    estTime: "1h",
    suppliers: 15,
    supply: "500Kg",
  },
];

// Status badge styles
const statusStyles = {
  Ongoing: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Scheduled: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Completed: "bg-blue-100 text-blue-700 border-blue-300",
};

export default function RouteDashboard() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filtered route logic (by status and search)
  const filteredRoutes = routes.filter((r) => {
    if (filter !== "All" && r.status !== filter) return false;
    if (
      searchTerm &&
      !(
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.driver?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      )
    )
      return false;
    return true;
  });

  return (
    <div className="h-full bg-gray-50 p-4 min-h-screen overflow-hidden">
      <div className="max-w-8xl mx-auto space-y-4">
        <div className="bg-gray-50 rounded-2xl shadow-2xl p-4">
          <h2 className="text-2xl font-bold text-emerald-900 text-center">
            Route Management
          </h2>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/transportManager/route/add")}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
            >
              + Add Route
            </button>
          </div>
          {/* Search and Filter Bar */}
          <div className="rounded-lg bg-white p-4 mb-8 shadow-md border-emerald-200 border flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search by route/driver"
                className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <select
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>Ongoing</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
          {/* Route Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500 text-lg">
                No routes found.
              </div>
            )}
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className={`bg-white border border-emerald-100 rounded-xl shadow-md transition hover:shadow-emerald-200 hover:border-emerald-300 p-5 flex flex-col relative min-h-[230px]`}
              >
                {/* Status Badge */}
                <span
                  className={`absolute right-4 top-4 px-3 py-1 rounded-full text-xs font-semibold border ${
                    statusStyles[route.status]
                  }`}
                >
                  {route.status}
                </span>
                {/* Route Info */}
                <div className="mb-2">
                  <div className="font-semibold text-lg text-gray-800">
                    Galle - Neluwa
                  </div>
                  <div className="text-gray-500 text-sm">
                    Route - {route.id}
                  </div>
                </div>
                {/* Route Meta */}
                <div className="flex flex-col gap-2 mb-4 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <Map size={18} className="text-emerald-600" />
                    <span>Distance</span>
                    <span className="ml-auto">{route.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-emerald-600" />
                    <span>Est. time</span>
                    <span className="ml-auto">{route.estTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-emerald-600" />
                    <span>Suppliers</span>
                    <span className="ml-auto">{route.suppliers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-emerald-600" />
                    <span>Est. supply</span>
                    <span className="ml-auto">{route.supply}</span>
                  </div>
                </div>
                {/* Driver & Actions */}
                <div className="flex items-center gap-2 mt-auto pt-1">
                  <UserCircle className="text-gray-400 shrink-0" size={22} />
                  <span className="text-sm font-medium text-gray-700">
                    Driver:{" "}
                    {route.driver ? (
                      route.driver
                    ) : (
                      <span className="italic text-gray-400">N/A</span>
                    )}
                  </span>
                  {route.status === "Ongoing" && (
                    <button className="ml-2 px-2 py-0.5 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-green-300 transition">
                      Track
                    </button>
                  )}
                  <button
                    className="ml-auto hover:bg-emerald-100 p-1 rounded transition"
                    title="Edit Route"
                  >
                    <Edit2 className="text-emerald-800" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
