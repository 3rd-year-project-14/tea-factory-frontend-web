import { useState, useEffect } from "react";
import { Search, Users, Package, Scale } from "lucide-react";
import { useNavigate, Outlet, useMatch, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import PaginationControls from "../../../components/ui/PaginationControls";
import { getTripDetails, getPaginatedBagsForTrip, getBagWeightsBySession, createWeighingSession, getTripSummary, getTripWeighingSummary } from "../../../api/inventoryManager/leafWeight";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import EmptyState from "../../../components/ui/EmptyState";

export default function DriverRoute() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bags, setBags] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [tripDetails, setTripDetails] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessionUserId, setSessionUserId] = useState(null);
  const [supplierSummary, setSupplierSummary] = useState([]);
  const [cardStats, setCardStats] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState({ open: false, supplierBags: null });
  const navigate = useNavigate();
  const location = useLocation();
  const { routeId, routeName, driverName, currentView } = location.state || {};
  const view = currentView;
  const { tripId } = useParams();
  const { user } = useAuth();

  // Always fetch latest data when this page is shown or navigated to
  useEffect(() => {
    if (!tripId) return;
    let mounted = true;
    const load = async () => {
      try {
        const data = await getTripDetails(tripId);
        if (mounted) setTripDetails(data);
      } catch (err) {
        if (mounted) setTripDetails(null);
        console.error("Error fetching trip details for tripId", tripId, err);
      }

      try {
        const summaryData = await getTripSummary(tripId);
        if (!mounted) return;
        setCardStats(summaryData || null);
        setSessionId(summaryData?.sessionId || null);
        setSessionUserId(summaryData?.userId || null);
      } catch (err) {
        setCardStats(null);
        setSessionId(null);
        setSessionUserId(null);
        console.error("Error fetching trip summary for tripId", tripId, err);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [location.key, tripId]);

  // Fetch paginated bags for arrived view (depends on search/page)
  useEffect(() => {
    if (!tripDetails || !tripId || view !== "arrived") return;
    let mounted = true;
    const loadBags = async () => {
      try {
        const bagsPage = await getPaginatedBagsForTrip(
          tripId,
          page,
          searchTerm
        );
        if (!mounted) return;
        setBags(Array.isArray(bagsPage.content) ? bagsPage.content : []);
        setTotalPages(
          typeof bagsPage.totalPages === "number" ? bagsPage.totalPages : 0
        );
        setTotalElements(
          typeof bagsPage.totalElements === "number"
            ? bagsPage.totalElements
            : 0
        );
      } catch (err) {
        if (mounted) setBags([]);
        setTotalPages(0);
        setTotalElements(0);
        console.error("Error fetching bags for tripId", tripId, err);
      }
      if (mounted) setSupplierSummary([]);
    };
    loadBags();
    return () => {
      mounted = false;
    };
  }, [tripDetails, tripId, view, page, searchTerm]);

  // Completed view: fetch paginated supplier summary and weighing summary for cards
  useEffect(() => {
    if (!tripDetails || !tripId || view === "arrived") return;
    let mounted = true;
    const loadCompleted = async () => {
      try {
        const [supplierDataPage, weighSummary] = await Promise.all([
          sessionId
            ? getBagWeightsBySession(sessionId, "weighed", page, searchTerm )
            : Promise.resolve({ content: [], totalPages: 0, totalElements: 0 }),
          getTripWeighingSummary(tripId, "weighed"),
        ]);
        if (!mounted) return;
        setSupplierSummary(
          Array.isArray(supplierDataPage.content)
            ? supplierDataPage.content
            : []
        );
        setTotalPages(
          typeof supplierDataPage.totalPages === "number"
            ? supplierDataPage.totalPages
            : 0
        );
        setTotalElements(
          typeof supplierDataPage.totalElements === "number"
            ? supplierDataPage.totalElements
            : 0
        );
        setCardStats(weighSummary || null);
      } catch (err) {
        if (mounted) setSupplierSummary([]);
        setTotalPages(0);
        setTotalElements(0);
        setCardStats(null);
        console.error(
          "Error fetching supplier/weight summary for tripId",
          tripId,
          err
        );
      }
      if (mounted) setBags([]);
    };
    loadCompleted();
    return () => {
      mounted = false;
    };
  }, [tripDetails, sessionId, tripId, view, page, searchTerm]);

  // Summary cards: use bags for arrived, supplierSummary for completed
  const computedTotalSuppliers =
    view === "arrived"
      ? [...new Set(bags.map((b) => b.supplierId))].length
      : supplierSummary.length;
  const computedTotalBags =
    view === "arrived"
      ? bags.length
      : supplierSummary.reduce((sum, s) => sum + (Number(s.bagTotal) || 0), 0);
  const computedTotalWeight =
    view === "arrived"
      ? bags.reduce((sum, b) => sum + (Number(b.driverWeight) || 0), 0)
      : supplierSummary.reduce(
          (sum, s) => sum + (Number(s.grossWeight) || 0),
          0
        );

  const totalSuppliers =
    cardStats && view === "arrived"
      ? Number(cardStats.supplierRequestCount || cardStats.totalSuppliers || 0)
      : cardStats && view !== "arrived"
      ? Number(cardStats.totalSuppliers || 0)
      : computedTotalSuppliers;

  const totalBags =
    cardStats && view === "arrived"
      ? Number(cardStats.totalBags || 0)
      : cardStats && view !== "arrived"
      ? Number(cardStats.totalBags || 0)
      : computedTotalBags;

  const totalWeight =
    cardStats && view === "arrived"
      ? Number(cardStats.totalWeight || 0)
      : cardStats && view !== "arrived"
      ? Number(cardStats.totalGrossWeight || cardStats.totalWeight || 0)
      : computedTotalWeight;

  const filteredBags = bags;
  const filteredSuppliers = supplierSummary;

  const isBase = useMatch("/inventoryManager/leaf_weight/route/:routeId");

  return (
    <div className="h-full">
      <div className="space-y-5">
        {isBase && (
          <>
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
                { label: "Total Weight", value: `${totalWeight} Kg`, icon: Scale },
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

            {/* Route Info + Search */}
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
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="w-full px-4 pr-10 py-2 text-sm rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                  />
                  <Search className="absolute text-ink/40 dark:text-muted-dark h-4 w-4 right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </Card>

            {/* Supplier Action Bar */}
            <Card>
              <h2 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300">
                Supplier Bags
              </h2>
            </Card>

            {/* Table: Arrived = bag list, Completed = supplier summary */}
            <Card className="!p-0 overflow-hidden">
              {view === "arrived" ? (
                <>
                  <div className="bg-tea-900">
                    <div className="grid grid-cols-3 gap-4 p-3 text-sm font-semibold text-center text-white">
                      <div>Bag No</div>
                      <div>Weight</div>
                      <div>Quality</div>
                    </div>
                  </div>
                  <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
                    {filteredBags.map((bag, index) => {
                      let quality = "Good";
                      let qualityClass = "text-tea-700 dark:text-tea-300";
                      if (bag.wet && bag.coarse) {
                        quality = "Wet, Coarse";
                        qualityClass = "text-orange-600 dark:text-orange-400";
                      } else if (bag.wet) {
                        quality = "Wet";
                        qualityClass = "text-amber-600 dark:text-amber-400";
                      } else if (bag.coarse) {
                        quality = "Coarse";
                        qualityClass = "text-amber-600 dark:text-amber-400";
                      }
                      const handleBagClick = () => {
                        const supplyRequestId = bag.supplyRequestId ?? null;

                        if (!sessionId) {
                          setConfirmPopup({
                            open: true,
                            supplyRequestId,
                            tripId,
                          });
                        } else if (sessionUserId === user?.userId) {
                          navigate(`supplier/${supplyRequestId}`, {
                            state: { sessionId, tripId },
                          });
                        } else {
                          setConfirmPopup({ open: "session" });
                        }
                      };
                      return (
                        <div
                          key={index}
                          onClick={handleBagClick}
                          className="grid grid-cols-3 gap-4 p-4 text-center hover:bg-tea-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <div className="font-medium text-ink dark:text-ink-dark">
                            {bag.bagNo || bag.bagNumber}
                          </div>
                          <div className="font-medium text-tea-700 dark:text-tea-300">
                            {bag.weight || bag.driverWeight}
                          </div>
                          <div className={`font-medium ${qualityClass}`}>
                            {quality}
                          </div>
                        </div>
                      );
                    })}
                    {filteredBags.length === 0 &&
                      tripDetails?.status !== "weighed" && (
                        <EmptyState icon={Package} title="No bags found" description="" />
                      )}
                  </div>
                  {/* Pagination Controls for current view (arrived) */}
                  {view === "arrived" && tripDetails?.status !== "weighed" && (
                    <PaginationControls
                      page={page}
                      totalPages={totalPages}
                      totalElements={totalElements}
                      setPage={setPage}
                    />
                  )}
                  {/* Show 'All bags weighed' only in arrived view and if status is weighed */}
                  {tripDetails?.status === "weighed" && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="text-green-600 dark:text-green-400 font-semibold text-lg mb-4">
                        All bags weighed
                      </div>
                      <Button variant="primary" onClick={() => navigate(-1)}>
                        Go Back
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                // Completed view: supplier summary table
                <>
                  <div className="bg-tea-900">
                    <div className="grid grid-cols-5 gap-4 p-3 text-sm font-semibold text-center text-white">
                      <div>Supplier ID</div>
                      <div>Supplier Name</div>
                      <div>Total Bags</div>
                      <div>Gross Weight</div>
                      <div>Deductions</div>
                    </div>
                  </div>
                  <div className="divide-y divide-tea-100 dark:divide-card-border-dark">
                    {filteredSuppliers.map((s, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-5 gap-4 p-4 text-center"
                      >
                        <div className="font-medium text-ink dark:text-ink-dark">
                          {s.supplierId}
                        </div>
                        <div className="font-medium text-tea-700 dark:text-tea-300">
                          {s.supplierName}
                        </div>
                        <div className="font-medium text-ink/80 dark:text-ink-dark/80">{s.bagTotal}</div>
                        <div className="font-medium text-ink/80 dark:text-ink-dark/80">{s.grossWeight} Kg</div>
                        <div className="font-medium text-ink/80 dark:text-ink-dark/80">
                          {(s.water || 0) +
                            (s.coarse || 0) +
                            (s.otherWeight || 0)}
                        </div>
                      </div>
                    ))}
                    {filteredSuppliers.length === 0 && (
                      <EmptyState icon={Users} title="No suppliers found" description="" />
                    )}
                  </div>
                  {/* Pagination Controls for completed view */}
                  {view !== "arrived" && (
                    <PaginationControls
                      page={page}
                      totalPages={totalPages}
                      totalElements={totalElements}
                      setPage={setPage}
                    />
                  )}
                </>
              )}
            </Card>
          </>
        )}
        <Outlet />
      </div>

      {confirmPopup.open && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
          <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card max-w-md w-full mx-4 border border-tea-100 dark:border-card-border-dark relative">
            <div className="p-6 text-center">
              {confirmPopup.open === true && (
                <>
                  <h3 className="text-xl font-heading font-semibold mb-4 text-tea-700 dark:text-tea-300">
                    Start Weighing?
                  </h3>
                  <p className="text-ink/70 dark:text-ink-dark/70 mb-6">
                    Do you want to start weighing for{" "}
                    <span className="font-semibold text-tea-700 dark:text-tea-300">
                      {routeName}
                    </span>
                    ?
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="primary"
                      onClick={async () => {
                        setConfirmPopup({ open: false });
                        let newSessionId = null;
                        try {
                          const data = await createWeighingSession({
                            userId: user?.userId,
                            tripId: tripId,
                          });
                          newSessionId = data?.sessionId;
                        } catch (error) {
                          console.error(
                            "Error creating weighing session:",
                            error
                          );
                        }
                        navigate(`supplier/${confirmPopup.supplyRequestId}`, {
                          state: {
                            sessionId: newSessionId,
                            tripId: confirmPopup.tripId,
                          },
                        });
                      }}
                    >
                      Yes, Start
                    </Button>
                    <Button variant="outline" onClick={() => setConfirmPopup({ open: false })}>
                      Cancel
                    </Button>
                  </div>
                </>
              )}
              {confirmPopup.open === "session" && (
                <>
                  <h3 className="text-xl font-heading font-semibold mb-4 text-tea-700 dark:text-tea-300">
                    Session In Progress
                  </h3>
                  <p className="text-ink/70 dark:text-ink-dark/70 mb-6">
                    Weighing session is in progress by another user.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => setConfirmPopup({ open: false })}>
                      OK
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
