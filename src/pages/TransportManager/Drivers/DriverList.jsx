import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search, Plus } from "lucide-react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";

const initialDrivers = [
  {
    id: "DRV-001",
    name: "Kasun Perera",
    email: "kasun.perera@example.com",
    type: "PRIVATE",
    assignedVehicle: "WP-AB-1234",
    phone: "0771234567",
    licenseNo: "B123456",
    nic: "881234567V",
  },
  {
    id: "DRV-002",
    name: "Nadeesha Silva",
    email: "nadeesha.silva@example.com",
    type: "PRIVATE",
    assignedVehicle: "TRK-002",
    phone: "0777654321",
    licenseNo: "C987654",
    nic: "992345678V",
  },
  {
    id: "DRV-003",
    name: "Saman Jayawardena",
    email: "saman.jayawardena@example.com",
    type: "INHOUSE",
    assignedVehicle: null,
    phone: "0761239874",
    licenseNo: "D123789",
    nic: "973462351V",
  },
  {
    id: "DRV-004",
    name: "Saman Jayawardena",
    email: "saman.jayawardena@example.com",
    type: "INHOUSE",
    assignedVehicle: null,
    phone: "0761239874",
    licenseNo: "D123789",
    nic: "973462351V",
  },
];

const typeColor = {
  INHOUSE: "bg-tea-50 dark:bg-tea-900/30 text-tea-700 dark:text-tea-200",
  PRIVATE: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200",
};

export default function DriversList() {
  const [drivers] = useState(initialDrivers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filteredDrivers, setFilteredDrivers] = useState(initialDrivers);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = drivers;

    if (filterType !== "All") {
      filtered = filtered.filter((d) => d.type === filterType);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(term) ||
          d.email.toLowerCase().includes(term) ||
          (d.assignedVehicle && d.assignedVehicle.toLowerCase().includes(term))
      );
    }
    setFilteredDrivers(filtered);
  }, [searchTerm, filterType, drivers]);

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            Driver Management
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button variant="primary" icon={Plus} onClick={() => navigate("/transportManager/drivers/user")}>
              Add Driver
            </Button>
            <Button variant="secondary" onClick={() => navigate("/transportManager/drivers/details")}>
              View Pending Approvals
            </Button>
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search drivers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
              autoComplete="off"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40 dark:text-muted-dark" />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full md:w-auto px-4 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 focus:outline-none focus:ring-2 focus:ring-tea-500/40"
          >
            <option value="All">All Types</option>
            <option value="INHOUSE">INHOUSE</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
        </div>
      </Card>

      {/* Drivers Table */}
      <Card className="!p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-tea-900 text-white">
              <th className="py-3 px-4 text-left">Driver</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Assigned Vehicle</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">License No</th>
              <th className="py-3 px-4 text-left">NIC</th>
              <th className="py-3 px-4 text-left">View</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <EmptyState title="No drivers found" description="" />
                </td>
              </tr>
            ) : (
              filteredDrivers.map((d, idx) => (
                <tr
                  key={d.id}
                  className={`border-b border-tea-100 dark:border-card-border-dark ${
                    idx % 2 === 0 ? "bg-card dark:bg-card-dark" : "bg-surface dark:bg-white/5"
                  } hover:bg-tea-50 dark:hover:bg-white/10 transition-colors`}
                >
                  <td className="py-3 px-4 text-ink dark:text-ink-dark">
                    <div>
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-xs text-ink/60 dark:text-muted-dark">
                        ID: {d.id}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-ink/80 dark:text-ink-dark/80">{d.email}</td>
                  <td className="py-3 px-4">
                    <span className={`${typeColor[d.type] || "text-ink/60 dark:text-muted-dark"} px-3 py-1 rounded-full text-xs font-medium`}>
                      {d.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-ink/80 dark:text-ink-dark/80">
                    {d.assignedVehicle || "-"}
                  </td>
                  <td className="py-3 px-4 text-ink/80 dark:text-ink-dark/80">
                    {d.phone || "-"}
                  </td>
                  <td className="py-3 px-4 text-ink/80 dark:text-ink-dark/80">
                    {d.licenseNo || "-"}
                  </td>
                  <td className="py-3 px-4 text-ink/80 dark:text-ink-dark/80">{d.nic || "-"}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => navigate(`/transportManager/driver/view/${d.id}`)}
                      className="p-2 rounded-full text-tea-700 dark:text-tea-300 hover:bg-tea-50 dark:hover:bg-white/10 transition-colors"
                      title="View Driver"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
