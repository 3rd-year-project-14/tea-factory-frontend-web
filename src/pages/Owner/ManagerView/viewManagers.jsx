import { Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getManagers, getManagersByFactory } from "../../../api/manager";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";

export default function ManagerDashboard() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedFactory, setSelectedFactory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [managers, setManagers] = useState([]);

  const factoryOptions = [
    { id: "1", name: "Wawlugala Tea Factory" },
    { id: "2", name: "Miyanawathura Tea Factory" },
    { id: "3", name: "Andaradeniya Tea Factory" },
    { id: "4", name: "Andaradeniya Tea Factory" },
    { id: "5", name: "Duli Ella Tea Factory" },
    { id: "6", name: "Devonia Tea Factory" },
    { id: "7", name: "Fortune Tea Factory" },
    { id: "8", name: "Galaxi Tea Factory" },
    { id: "9", name: "Ruhunu Tea Factory" },
  ];

  useEffect(() => {
    let mounted = true;
    const fetchManagers = async () => {
      try {
        let data;
        if (selectedFactory) {
          data = await getManagersByFactory(Number(selectedFactory));
        } else {
          data = await getManagers();
        }
        if (!mounted) return;
        const mapped = (data || []).map((m) => {
          const found = factoryOptions.find((f) => String(f.id) === String(m.factoryId));
          return {
            id: m.id ? String(m.id) : "",
            name: m.name || m.email || "",
            email: m.email || "",
            role: m.role || "",
            status: m.status || "Active",
            factory: found ? found.name : (m.factoryId ? String(m.factoryId) : "-"),
            factoryId: m.factoryId,
          };
        });
        setManagers(mapped);
      } catch (err) {
        console.error("Failed to load managers:", err);
      }
    };
    fetchManagers();
    return () => {
      mounted = false;
    };
  }, [selectedFactory]);

  const filteredManagers = useMemo(() => {
    return managers.filter((manager) => {
      const matchesRole =
        !selectedRole ||
        manager.role.toLowerCase() === selectedRole.toLowerCase();
      const matchesFactory =
        !selectedFactory || String(manager.factoryId) === String(selectedFactory);
      const matchesSearch =
        !searchTerm ||
        manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manager.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRole && matchesFactory && matchesSearch;
    });
  }, [managers, selectedRole, selectedFactory, searchTerm]);

  const handleStatusToggle = (id) => {
    setManagers((prev) =>
      prev.map((manager) =>
        manager.id === id
          ? {
              ...manager,
              status: manager.status === "Active" ? "Suspended" : "Active",
            }
          : manager
      )
    );
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: "bg-tea-100 text-tea-800 dark:bg-tea-900/30 dark:text-tea-200",
      Suspended: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
    };
    const label = status === "Active" ? "Active" : "Suspended";
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusStyles[status] || "bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-ink-dark"
        }`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">Managers</h1>
            <p className="text-ink/60 dark:text-muted-dark mt-1 text-sm">
              Owner Dashboard - Manager Overview & Control
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/Owner/ManagerView/addManagers")}
          >
            + Add Manager
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 focus:outline-none focus:ring-2 focus:ring-tea-500/40 appearance-none"
              aria-label="Filter by Role"
            >
              <option value="">All Roles</option>
              <option value="Manager">Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Admin">Admin</option>
            </select>

            <select
              value={selectedFactory}
              onChange={(e) => setSelectedFactory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 focus:outline-none focus:ring-2 focus:ring-tea-500/40 appearance-none"
              aria-label="Filter by Factory"
            >
              <option value="">All Factories</option>
              {factoryOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>

            <div className="relative w-full col-span-2 md:col-span-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-ink/40 dark:text-muted-dark" />
              <input
                type="text"
                placeholder="Search managers ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-tea-700 dark:text-tea-200 placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                aria-label="Search managers"
              />
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card className="!p-0 overflow-hidden">
          <div className="bg-tea-900 text-white">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm">
              <div className="text-left">Manager ID</div>
              <div className="text-left">Name</div>
              <div className="text-left">Role</div>
              <div className="text-center">Status</div>
              <div className="text-center">Factory</div>
              <div className="text-center">Action</div>
            </div>
          </div>

          <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
            {filteredManagers.length > 0 ? (
              filteredManagers.map((manager) => (
                <div
                  key={`${manager.id}-${manager.status}`}
                  className="grid grid-cols-6 gap-4 p-3 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors text-tea-700 dark:text-tea-200"
                >
                  <div className="font-mono text-sm">{manager.id}</div>
                  <div>
                    <p className="font-semibold">{manager.name}</p>
                    <p className="text-xs text-ink/50 dark:text-muted-dark">{manager.email}</p>
                  </div>
                  <div>{manager.role}</div>
                  <div className="flex justify-center">
                    {getStatusBadge(manager.status)}
                  </div>
                  <div className="text-center">{manager.factory}</div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleStatusToggle(manager.id)}
                      className={`px-3 py-1 rounded-lg font-medium text-xs transition-colors ${
                        manager.status === "Active"
                          ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                          : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                      }`}
                      aria-label={
                        manager.status === "Active"
                          ? "Suspend manager"
                          : "Activate manager"
                      }
                    >
                      {manager.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={Users}
                title="No managers found"
                description="Try adjusting your filters or add a new manager."
              />
            )}
          </div>

          {/* Footer info */}
          <div className="flex items-center justify-between text-sm text-ink/60 dark:text-muted-dark p-4 border-t border-tea-100 dark:border-card-border-dark">
            <div>
              Showing {filteredManagers.length} of {managers.length} managers
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
