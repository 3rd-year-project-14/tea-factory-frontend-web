import { useState, useEffect } from "react";
import { Search, Truck, CheckCircle } from "lucide-react";
import PaginationControls from "../../../components/ui/PaginationControls";
import { useNavigate, Outlet, useMatch, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { getTripsByFactoryAndStatus, getTripStatusCounts } from "../../../api/inventoryManager/leafWeight";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";

export default function Route() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("arrived");
  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [counts, setCounts] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const factoryId = user?.factoryId;

  // Load trips when factoryId, view, page, searchTerm or location changes
  useEffect(() => {
    if (!factoryId) return;
    let mounted = true;
    const loadTrips = async () => {
      try {
        // use server-side status filtered endpoint
        const status = currentView === "completed" ? "weighed" : currentView;
        const data = await getTripsByFactoryAndStatus(
          factoryId,
          status,
          page,
          searchTerm
        );
        if (!mounted) return;
        // backend returns pageable response with `content` and pagination meta
        setTrips(Array.isArray(data.content) ? data.content : []);
        setTotalPages(
          typeof data.totalPages === "number" ? data.totalPages : 0
        );
        setTotalElements(
          typeof data.totalElements === "number" ? data.totalElements : 0
        );
      } catch (err) {
        console.error("Error fetching trip details:", err);
      }
    };

    loadTrips();
    return () => {
      mounted = false;
    };
  }, [factoryId, location.key, currentView, page, searchTerm]);

  // Load counts only when factoryId changes
  useEffect(() => {
    if (!factoryId) return;
    let mounted = true;
    const loadCounts = async () => {
      try {
        const data = await getTripStatusCounts(factoryId);
        if (!mounted) return;
        setCounts(data || null);
      } catch (err) {
        console.error("Error fetching trip counts:", err);
      }
    };

    loadCounts();
    return () => {
      mounted = false;
    };
  }, [factoryId, location.key]);

  // trips now contains server-side filtered content for the selected status
  const searchedTrips = trips;

  // debounce searchInput -> searchTerm to avoid calling API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setSearchTerm(searchInput.trim()), 500);
    return () => clearTimeout(t);
  }, [searchInput]);

  const handleArrivedRoutesClick = () => {
    setCurrentView("arrived");
    setPage(0);
    setSearchInput("");
    setSearchTerm("");
  };

  const handleCompletedRoutesClick = () => {
    setCurrentView("completed");
    setPage(0);
    setSearchInput("");
    setSearchTerm("");
  };

  const handlePendingRoutesClick = () => {
    setCurrentView("pending");
    setPage(0);
    setSearchInput("");
    setSearchTerm("");
  };

  const isBase = useMatch("/inventoryManager/leaf_weight");

  const summaryCards = [
    {
      key: "arrived",
      label: "Arrived Routes",
      value: counts?.arrivedCount ?? 0,
      icon: Truck,
      onClick: handleArrivedRoutesClick,
    },
    {
      key: "pending",
      label: "Pending Routes",
      value: counts?.pendingCount ?? 0,
      icon: CheckCircle,
      onClick: handlePendingRoutesClick,
    },
    {
      key: "completed",
      label: "Completed Routes",
      value: counts?.weighedCount ?? 0,
      icon: CheckCircle,
      onClick: handleCompletedRoutesClick,
    },
  ];

  return (
    <div className="h-full">
      <div className="space-y-6">
        {isBase && (
          <>
            <Card>
              <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
                Leaf Weight
              </h1>
            </Card>

            {/* Top Statistics Cards - Arrived, Pending, Completed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {summaryCards.map((card) => {
                const isActive = currentView === card.key;
                const Icon = card.icon;
                return (
                  <Card
                    key={card.key}
                    hoverable
                    onClick={card.onClick}
                    className={`cursor-pointer transition-all duration-200 ${
                      isActive ? "ring-2 ring-tea-500 shadow-card" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">
                          {card.label}
                        </p>
                        <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">
                          {card.value}
                        </p>
                        <p className="text-xs text-ink/40 dark:text-muted-dark mt-1">
                          {isActive ? "Currently viewing" : "Click to view"}
                        </p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-tea-50 dark:bg-tea-900/30 flex items-center justify-center shrink-0">
                        <Icon className="text-tea-700 dark:text-tea-300 w-5 h-5" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Action Bar */}
            <Card>
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark">
                  {currentView === "pending"
                    ? "Pending Routes"
                    : currentView === "completed"
                    ? "Completed Routes"
                    : "Arrived Routes"}
                </h2>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setPage(0); // reset to first page on search
                    }}
                    className="w-64 pl-4 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40 dark:text-muted-dark" />
                </div>
              </div>
            </Card>

            {/* Routes Table */}
            <Card className="!p-0 overflow-hidden">
              <div className="bg-tea-900">
                <div
                  className={`grid gap-4 p-3 font-medium text-center text-white ${
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

              <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
                {searchedTrips && searchedTrips.length > 0 ? (
                  searchedTrips.map((trip, index) => {
                    let rowContent;
                    if (currentView === "completed") {
                      rowContent = (
                        <>
                          <div className="font-medium text-ink dark:text-ink-dark text-center">
                            {trip.routeId}
                          </div>
                          <div className="text-ink/70 dark:text-ink-dark/70 text-center">
                            {trip.routeName}
                          </div>
                          <div className="text-ink/70 dark:text-ink-dark/70 text-center">
                            {trip.driverName}
                          </div>
                          <div className="text-ink dark:text-ink-dark font-medium text-center">
                            {trip.bagCount}
                          </div>
                          <div className="text-ink dark:text-ink-dark text-center">
                            {trip.grossWeight || "-"}
                          </div>
                        </>
                      );
                    } else {
                      rowContent = (
                        <>
                          <div className="font-medium text-ink dark:text-ink-dark text-center">
                            {trip.routeId}
                          </div>
                          <div className="text-ink/70 dark:text-ink-dark/70 text-center">
                            {trip.routeName}
                          </div>
                          <div className="text-ink/70 dark:text-ink-dark/70 text-center">
                            {trip.driverName}
                          </div>
                          <div className="text-ink dark:text-ink-dark font-medium text-center">
                            {trip.bagCount}
                          </div>
                        </>
                      );
                    }
                    if (currentView === "pending") {
                      return (
                        <div
                          key={trip.tripId || index}
                          className="grid gap-4 p-4 items-center grid-cols-4"
                        >
                          {rowContent}
                        </div>
                      );
                    } else if (currentView === "completed") {
                      return (
                        <div
                          key={trip.tripId || index}
                          className="grid gap-4 p-4 items-center grid-cols-5 hover:bg-tea-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                          onClick={() =>
                            navigate(`route/${trip.tripId}`, {
                              state: {
                                routeId: trip.routeId,
                                routeName: trip.routeName,
                                driverName: trip.driverName,
                                currentView,
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
                          className="grid gap-4 p-4 items-center grid-cols-4 hover:bg-tea-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                          onClick={() =>
                            navigate(`route/${trip.tripId}`, {
                              state: {
                                routeId: trip.routeId,
                                routeName: trip.routeName,
                                driverName: trip.driverName,
                                currentView,
                                sessionId: trip.sessionId,
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
                  <EmptyState icon={Truck} title="No trips found" description="" />
                )}
              </div>
            </Card>

            {/* Pagination Controls */}
            <PaginationControls
              page={page}
              totalPages={totalPages}
              totalElements={totalElements}
              setPage={setPage}
            />
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
}
