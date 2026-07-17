import { useState, useEffect, useRef } from "react";
import { Search, Users, Package } from "lucide-react";
import { getWeighedBagsForTripPaginated } from "../../../api/inventoryManager/bagWeight";
import {
  getTripWeighingSummary,
  getTripSummary,
  getBagWeightsBySession,
} from "../../../api/inventoryManager/leafWeight";
import PaginationControls from "../../../components/ui/PaginationControls";
import {
  useNavigate,
  Outlet,
  useMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";

export default function DriverRoute() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalSuppliers: 0, totalBags: 0 });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { routeId, routeName, driverName, currentView } = location.state || {};
  const { tripId } = useParams();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Keep search input focused after searchTerm changes (API call)
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!tripId) return;
    setLoading(true);
    setError(null);
    getTripWeighingSummary(tripId, currentView)
      .then((summary) => {
        setStats({
          totalSuppliers: summary.totalSuppliers ?? 0,
          totalBags: summary.totalBags ?? 0,
        });
      })
      .catch((err) => {
        setStats({ totalSuppliers: 0, totalBags: 0 });
        setError(err.message);
      });

    if (currentView === "weighed") {
      getWeighedBagsForTripPaginated(tripId, {
        page,
        size: 15,
        search: searchTerm,
      })
        .then((data) => {
          setBags(Array.isArray(data.content) ? data.content : []);
          setTotalPages(data.totalPages || 1);
          setTotalElements(data.totalElements || 0);
        })
        .catch((err) => {
          setBags([]);
          setTotalPages(1);
          setTotalElements(0);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    } else if (currentView === "completed") {
      getTripSummary(tripId)
        .then((summary) => {
          const sessionId = summary.sessionId;
          if (!sessionId) {
            setBags([]);
            setTotalPages(1);
            setTotalElements(0);
            setLoading(false);
            return;
          }
          getBagWeightsBySession(sessionId, "completed", page, searchTerm)
            .then((data) => {
              setBags(Array.isArray(data.content) ? data.content : []);
              setTotalPages(data.totalPages || 1);
              setTotalElements(data.totalElements || 0);
            })
            .catch(() => {
              setBags([]);
              setTotalPages(1);
              setTotalElements(0);
            })
            .finally(() => setLoading(false));
        })
        .catch(() => {
          setBags([]);
          setTotalPages(1);
          setTotalElements(0);
          setLoading(false);
        });
    }
  }, [tripId, location.key, currentView, page, searchTerm]);

  const totalSuppliers = stats.totalSuppliers;
  const totalBags = stats.totalBags;
  const isBase = useMatch("/inventoryManager/empty_bags_weight/route/:routeId");

  // For weighed view: split bags into up to 3 columns, each with up to 5 bags
  const getColumns = (bagsList) => {
    const columns = [[], [], []];
    bagsList.forEach((bag, idx) => {
      const colIdx = idx % 3;
      if (columns[colIdx].length < 5) columns[colIdx].push(bag);
    });
    return columns.filter((col) => col.length > 0);
  };

  return (
    <div className="h-full">
      <div className="space-y-5">
        {/* Header */}
        <Card>
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            Route Details
          </h1>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "No of Suppliers", value: totalSuppliers, icon: Users },
            { label: "No of Bags", value: totalBags, icon: Package },
          ].map((card, idx) => (
            <Card key={idx} hoverable>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">
                    {card.label}
                  </p>
                  <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">
                    {card.value}
                  </p>
                </div>
                <div className="h-10 w-10 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
                  <card.icon className="text-tea-700 dark:text-tea-300 w-5 h-5" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Route Info + Search (always rendered) */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-sm font-semibold mb-1 block text-tea-700 dark:text-tea-300">
                Route No
              </label>
              <div className="text-lg font-bold text-ink dark:text-ink-dark">
                {routeId || "Route ID Not Available"}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block text-tea-700 dark:text-tea-300">
                Route Name
              </label>
              <div className="text-lg font-bold text-ink dark:text-ink-dark">
                {routeName || "Route Name Not Available"}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block text-tea-700 dark:text-tea-300">
                Driver Name
              </label>
              <div className="text-lg font-bold text-ink dark:text-ink-dark">
                {driverName || "Driver Name Not Available"}
              </div>
            </div>
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setPage(0);
                  setSearchInput(e.target.value);
                }}
                placeholder="Search"
                className="w-full px-4 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
              />
              <Search className="absolute text-ink/40 dark:text-muted-dark h-4 w-4 right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </Card>

        {/* Loading/Error messages (do not unmount search) */}
        {loading && isBase && (
          <Card className="text-center text-ink/60 dark:text-muted-dark">
            Loading bag details...
          </Card>
        )}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Supplier Action Bar */}
        <Card>
          <h2 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300">
            Supplier Bags
          </h2>
        </Card>

        {/* Main content changes by currentView */}
        {isBase && (
          <>
            {currentView === "weighed" ? (
              totalElements === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-green-600 dark:text-green-400 font-semibold text-lg mb-4">
                    All Bags Weighed
                  </div>
                  <Button variant="primary" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getColumns(bags).map((colBags, colIdx) => (
                      <Card key={colIdx} className="!p-0 overflow-hidden">
                        <div className="bg-tea-900 text-white p-3 text-sm font-semibold text-center">
                          Bag Numbers
                        </div>
                        <div>
                          {colBags.map((bag, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                navigate(`supplier/${bag.supplyRequestId}`, {
                                  state: {
                                    sessionId: bag.sessionId,
                                  },
                                });
                              }}
                              className="p-4 text-center hover:bg-tea-50 dark:hover:bg-white/5 cursor-pointer transition-colors font-medium text-ink dark:text-ink-dark border-b border-tea-100 dark:border-card-border-dark last:border-b-0"
                            >
                              {bag.bagNumber || bag.bagNo}
                            </div>
                          ))}
                          {colBags.length === 0 && (
                            <EmptyState icon={Package} title="No bags found" description="" />
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                  <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    setPage={setPage}
                  />
                </>
              )
            ) : currentView === "completed" ? (
              totalElements === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-green-600 dark:text-green-400 font-semibold text-lg mb-4">
                    No supplier summary found
                  </div>
                  <Button variant="primary" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </div>
              ) : (
                <>
                  <Card className="!p-0 overflow-hidden">
                    <div className="bg-tea-900 text-white grid grid-cols-4 gap-4 p-3 text-sm font-semibold text-center">
                      <div>Supplier ID</div>
                      <div>Supplier Name</div>
                      <div>Total Bags</div>
                      <div>Tare Weight</div>
                    </div>
                    <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
                      {bags.map((s, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-4 gap-4 p-4 text-center"
                        >
                          <div className="font-medium text-ink dark:text-ink-dark">
                            {s.supplierId}
                          </div>
                          <div className="font-medium text-tea-700 dark:text-tea-300">
                            {s.supplierName}
                          </div>
                          <div className="font-medium text-ink/80 dark:text-ink-dark/80">{s.bagTotal}</div>
                          <div className="font-medium text-ink/80 dark:text-ink-dark/80">{s.tareWeight}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    setPage={setPage}
                  />
                </>
              )
            ) : null}
            <Outlet />
          </>
        )}
        {!isBase && <Outlet />}
      </div>
    </div>
  );
}
