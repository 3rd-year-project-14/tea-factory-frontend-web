import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CheckCircle2,
  Map,
  Clock,
  Truck,
  Edit2,
  UserCircle,
} from "lucide-react";

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
    status: "Pending",
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
    status: "Pending",
    driver: "Mr.Kamal",
    distance: "20Km",
    estTime: "1h",
    suppliers: 15,
    supply: "500Kg",
  },
];

const statusStyles = {
  Ongoing: "bg-green-100 text-green-800 border-green-300",
  Pending: "bg-orange-100 text-orange-700 border-orange-300",
  Completed: "bg-blue-100 text-blue-700 border-blue-300",
};

export default function RouteDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className=" bg-[#f7fafc]">
      <div className="flex justify-end mb-4 gap-3">
        <button
          onClick={() => navigate("/transportManager/route/add")}
          className="text-white bg-emerald-800 px-5 py-2 rounded-lg font-semibold shadow hover:bg-emerald-700 transition"
        >
          + Add Route
        </button>
      </div>
      {/* Filter and Add Route */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 rounded-xl shadow-md p-2 border-green-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="🔍 Search Routes...."
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-30"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Ongoing</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Route Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {routes
          .filter((r) => filter === "All" || r.status === filter)
          .map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col relative"
            >
              {/* Status Badge */}
              <span
                className={`absolute right-4 top-4 px-3 py-1 rounded-full text-xs font-semibold border ${
                  statusStyles[route.status]
                }`}
              >
                {route.status}
              </span>

              <div className="mb-2">
                <div className="font-semibold text-lg text-gray-800">
                  Galle - Neluwa
                </div>
                <div className="text-gray-500 text-sm">Route - {route.id}</div>
              </div>

              <div className="flex flex-col gap-1 mb-4 text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                  <Map size={15} />
                  <span>Distance</span>
                  <span className="ml-auto">{route.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} />
                  <span>Est.time</span>
                  <span className="ml-auto">{route.estTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={15} />
                  <span>Suppliers</span>
                  <span className="ml-auto">{route.suppliers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={15} />
                  <span>Est. supply</span>
                  <span className="ml-auto">{route.supply}</span>
                </div>
              </div>

              {/* Driver and Edit */}
              <div className="flex items-center gap-2 mt-auto">
                <UserCircle className="text-gray-400" size={22} />
                <span className="text-sm font-medium text-gray-700">
                  Driver:{" "}
                  {route.driver ? (
                    route.driver
                  ) : (
                    <span className="italic text-gray-400">N/A</span>
                  )}
                </span>
                {route.status === "Ongoing" && (
                  <button className="ml-2 px-2 py-0.5 bg-green-200 text-green-900 rounded text-xs">
                    Track
                  </button>
                )}
                <button
                  className="ml-auto hover:bg-green-100 p-1 rounded transition text-green-100"
                  title="Edit Route"
                >
                  <Edit2 className="text-emerald-800" size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
