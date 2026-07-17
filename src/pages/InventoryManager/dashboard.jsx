import React, { useState, useEffect } from "react";
import {
  getInventoryManagerDashboardSummary,
  getTodayTrips,
} from "../../api/inventoryManager/history";
import PaginationControls from "../../components/ui/PaginationControls";
import {
  MapPin,
  User,
  Scale,
  TrendingUp,
  Weight,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { CardSkeleton } from "../../components/ui/Skeleton";

const STATUS_STYLES = {
  active: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-500/30",
  completed: "bg-tea-100 text-tea-800 border-tea-200 dark:bg-tea-900/30 dark:text-tea-200 dark:border-tea-500/30",
  delayed: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-500/30",
  pending: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-500/30",
  default: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-white/10 dark:text-ink-dark dark:border-white/10",
};

const PROGRESS_COLORS = {
  high: "bg-tea-600",
  mid: "bg-emerald-500",
  low: "bg-amber-500",
  poor: "bg-red-500",
};

export default function InventoryManagerDashboard() {
  const [refreshTripsFlag, setRefreshTripsFlag] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [trips, setTrips] = useState([]);
  const [tripsPage, setTripsPage] = useState(0);
  const [tripsTotalPages, setTripsTotalPages] = useState(1);
  const [tripsTotalElements, setTripsTotalElements] = useState(0);
  const [tripsLoading, setTripsLoading] = useState(false);

  const { user } = useAuth();
  const factoryId = user?.factoryId;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getInventoryManagerDashboardSummary(factoryId);
        setDashboardSummary(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
    const interval = setInterval(fetchSummary, 60000);
    return () => clearInterval(interval);
  }, [factoryId]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch paginated trips for today
  useEffect(() => {
    if (!factoryId) return;
    setTripsLoading(true);
    getTodayTrips(factoryId, {
      page: tripsPage,
      size: 10,
      search: debouncedSearch,
    })
      .then((data) => {
        setTrips(data.content || []);
        setTripsTotalPages(data.totalPages || 1);
        setTripsTotalElements(data.totalElements || 0);
      })
      .catch(() => {
        setTrips([]);
      })
      .finally(() => setTripsLoading(false));
  }, [factoryId, tripsPage, debouncedSearch, refreshTripsFlag]);

  // Example daily targets (replace with real if available)
  const dailyTargets = [
    {
      key: "routes",
      label: "Routes",
      completed: dashboardSummary?.completedRoutes || 0,
      target: dashboardSummary?.totalActiveRoutes || 0,
      percentage:
        dashboardSummary && dashboardSummary.totalActiveRoutes > 0
          ? Math.round(
              (dashboardSummary.completedRoutes /
                dashboardSummary.totalActiveRoutes) *
                100
            )
          : 0,
    },
    {
      key: "bags",
      label: "Bags",
      completed: dashboardSummary?.totalBags || 0,
      target: dashboardSummary?.estimatedTotalBags || 0,
      percentage:
        dashboardSummary && dashboardSummary.estimatedTotalBags > 0
          ? Math.round(
              (dashboardSummary.totalBags /
                dashboardSummary.estimatedTotalBags) *
                100
            )
          : 0,
    },
    {
      key: "suppliers",
      label: "Suppliers",
      completed: dashboardSummary?.completedSuppliers || 0,
      target: dashboardSummary?.todaySuppliers || 0,
      percentage:
        dashboardSummary && dashboardSummary.todaySuppliers > 0
          ? Math.round(
              (dashboardSummary.completedSuppliers /
                dashboardSummary.todaySuppliers) *
                100
            )
          : 0,
    },
  ];

  const getStatusColor = (status) => STATUS_STYLES[status] || STATUS_STYLES.default;

  const getProgressColor = (progress) => {
    if (progress >= 80) return PROGRESS_COLORS.high;
    if (progress >= 50) return PROGRESS_COLORS.mid;
    if (progress >= 25) return PROGRESS_COLORS.low;
    return PROGRESS_COLORS.poor;
  };

  const MetricCard = ({ title, value, trend, icon: Icon }) => (
    <Card hoverable className="group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-ink/60 dark:text-muted-dark mb-2 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-heading font-bold text-ink dark:text-ink-dark leading-tight">
            {value}
          </p>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="w-14 h-14 bg-tea-50 dark:bg-tea-900/30 rounded-xl flex items-center justify-center">
            <Icon className="w-7 h-7 text-tea-700 dark:text-tea-300" />
          </div>
        </div>
      </div>
      {trend && (
        <div className="flex items-center pt-2 border-t border-tea-100 dark:border-card-border-dark">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {trend}
          </span>
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
          Dashboard
        </h1>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        <Button
          variant={activeTab === "overview" ? "primary" : "outline"}
          icon={BarChart3}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "routes" ? "primary" : "outline"}
          icon={MapPin}
          onClick={() => setActiveTab("routes")}
        >
          Active Routes
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Active Routes"
              value={dashboardSummary?.totalActiveRoutes ?? "-"}
              icon={MapPin}
            />
            <MetricCard
              title="Today's Suppliers"
              value={dashboardSummary?.todaySuppliers ?? "-"}
              icon={User}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Total Bags"
              value={dashboardSummary?.totalBags ?? "-"}
              icon={Weight}
            />
            <MetricCard
              title="Gross Weight"
              value={dashboardSummary?.totalGrossWeight ?? "-"}
              icon={Scale}
            />
          </div>

          {/* Daily Progress from API */}
          <Card>
            <h3 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark mb-4">
              Daily Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dailyTargets.map((data) => (
                <div key={data.key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-ink dark:text-ink-dark">
                      {data.label}
                    </span>
                    <span className="text-sm text-ink/50 dark:text-muted-dark">
                      {data.completed}/{data.target}
                    </span>
                  </div>
                  <div className="w-full bg-tea-100 dark:bg-white/10 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(
                        data.percentage
                      )}`}
                      style={{ width: `${Math.min(data.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-ink/60 dark:text-muted-dark">
                    {data.percentage}% completed
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Active Routes Tab */}
      {activeTab === "routes" && (
        <Card>
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300">
              Active Routes Monitoring
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setTripsPage(0);
                }}
                placeholder="Search routes"
                className="rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark px-3 py-2 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                style={{ minWidth: 180 }}
              />
              <button
                className="bg-tea-50 dark:bg-white/10 text-tea-700 dark:text-tea-300 px-3 py-2 rounded-lg hover:bg-tea-100 dark:hover:bg-white/20 transition-colors flex items-center"
                title="Refresh"
                onClick={() => setRefreshTripsFlag((f) => f + 1)}
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          {tripsLoading ? (
            <div className="space-y-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : trips.length === 0 ? (
            <EmptyState icon={MapPin} title="No trips found for today" description="" />
          ) : (
            <>
              <div className="space-y-4">
                {trips.map((trip) => {
                  const progressPct =
                    trip.totalSuppliers > 0
                      ? Math.round((trip.completedSuppliers / trip.totalSuppliers) * 100)
                      : 0;
                  return (
                    <div
                      key={trip.tripId}
                      className="border border-tea-100 dark:border-card-border-dark rounded-lg p-4 hover:shadow-soft transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-ink dark:text-ink-dark">
                            {trip.routeName} ({trip.routeCode})
                          </h4>
                          <p className="text-sm text-ink/60 dark:text-muted-dark">
                            {trip.driverName}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            trip.tripStatus
                          )}`}
                        >
                          {trip.tripStatus.charAt(0).toUpperCase() + trip.tripStatus.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
                            {progressPct}%
                          </p>
                          <p className="text-xs text-ink/60 dark:text-muted-dark">Progress</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-ink dark:text-ink-dark">
                            {trip.completedSuppliers}/{trip.totalSuppliers}
                          </p>
                          <p className="text-xs text-ink/60 dark:text-muted-dark">Suppliers</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-ink dark:text-ink-dark">
                            {trip.totalBags}
                          </p>
                          <p className="text-xs text-ink/60 dark:text-muted-dark">Bags Collected</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-tea-700 dark:text-tea-300">
                            {trip.totalWeight} Kg
                          </p>
                          <p className="text-xs text-ink/60 dark:text-muted-dark">Total Weight</p>
                        </div>
                      </div>
                      <div className="w-full bg-tea-100 dark:bg-white/10 rounded-full h-2 mb-3">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progressPct)}`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-end items-center text-sm text-ink/50 dark:text-muted-dark">
                        <span>Last Update: {trip.lastUpdate?.slice(0, 5) ?? "-"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <PaginationControls
                page={tripsPage}
                totalPages={tripsTotalPages}
                totalElements={tripsTotalElements}
                setPage={setTripsPage}
              />
            </>
          )}
        </Card>
      )}
    </div>
  );
}
