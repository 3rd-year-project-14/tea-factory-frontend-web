import { useState, useEffect } from "react";
import { Search, Users, Package, Scale } from "lucide-react";
import {
  useNavigate,
  Outlet,
  useMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
  getTripDetails,
  getWeighingSessionByTrip,
  getPendingBagsForTrip,
  getBagWeightsBySession,
  createWeighingSession,
} from "../../../api/inventoryManager/leafWeight";

export default function DriverRoute() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bags, setBags] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);
  const [session, setSession] = useState(null);
  const [supplierSummary, setSupplierSummary] = useState([]); // For completed view
  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    supplierBags: null,
    supplierId: null,
    supplierName: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { routeId, routeName, driverName, currentView } = location.state || {};
  const view = currentView;
  console.log("Route details:", {
    routeId,
    routeName,
    driverName,
    currentView: view,
  });
  const { tripId } = useParams();
  const { user } = useAuth();
  // Always fetch latest data when this page is shown or navigated to
  useEffect(() => {
    if (!tripId) return;
    let mounted = true;
    // Always fetch trip details and session first
    const load = async () => {
      try {
        const data = await getTripDetails(tripId);
        if (mounted) setTripDetails(data);
      } catch (err) {
        if (mounted) setTripDetails(null);
        console.error("Error fetching trip details for tripId", tripId, err);
      }

      try {
        const sessionData = await getWeighingSessionByTrip(tripId);
        if (!mounted) return;
        if (sessionData && sessionData.sessionId) {
          setSession(sessionData);
        } else {
          setSession(null);
        }
      } catch (err) {
        if (mounted) setSession(null);
        console.error(
          "Error fetching weighing session for tripId",
          tripId,
          err
        );
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [location.key, tripId]);

  // Fetch bags or supplier summary depending on status
  useEffect(() => {
    if (!tripDetails || !tripId) return;
    let mounted = true;
    const load = async () => {
      if (view === "arrived") {
        // Arrived view: fetch bags
        try {
          const data = await getPendingBagsForTrip(tripId);
          if (!mounted) return;
          setBags(Array.isArray(data) ? data : []);
        } catch (err) {
          if (mounted) setBags([]);
          console.error("Error fetching bags for tripId", tripId, err);
        }
        if (mounted) setSupplierSummary([]);
      } else {
        // Completed view: fetch supplier summary using sessionId
        const sessionId = session?.sessionId;
        if (!sessionId) return;
        try {
          const data = await getBagWeightsBySession(sessionId);
          if (!mounted) return;
          setSupplierSummary(Array.isArray(data) ? data : []);
        } catch (err) {
          if (mounted) setSupplierSummary([]);
          console.error(
            "Error fetching supplier summary for sessionId",
            sessionId,
            err
          );
        }
        if (mounted) setBags([]);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [tripDetails, session, tripId, view]);

  // Summary cards: use bags for arrived, supplierSummary for completed
  const totalSuppliers =
    view === "arrived"
      ? [...new Set(bags.map((b) => b.supplierId))].length
      : supplierSummary.length;
  const totalBags =
    view === "arrived"
      ? bags.length
      : supplierSummary.reduce((sum, s) => sum + (s.bagTotal || 0), 0);
  const totalWeight =
    view === "arrived"
      ? bags.reduce((sum, b) => sum + b.driverWeight, 0)
      : supplierSummary.reduce((sum, s) => sum + (s.grossWeight || 0), 0);

  const filteredBags = bags.filter((b) =>
    String(b.bagNumber).toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSuppliers = supplierSummary.filter(
    (s) =>
      (s.supplierName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(s.supplierId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isBase = useMatch("/inventoryManager/leaf_weight/route/:routeId");

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-5">
        {isBase && (
          <>
            {/* Header */}
            <div className="bg-white p-4 shadow-sm ">
              <h1 className="text-2xl font-bold" style={{ color: "#165E52" }}>
                Route Details
              </h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "No of Suppliers",
                  value: totalSuppliers,
                  icon: <Users className="text-[#000000] w-5 h-5" />,
                },
                {
                  label: "No of Bags",
                  value: totalBags,
                  icon: <Package className="text-[#000000] w-5 h-5" />,
                },
                {
                  label: "Total Weight",
                  value: `${totalWeight} Kg`,
                  icon: <Scale className="text-[#000000]w-5 h-5" />,
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg"
                  style={{ borderColor: "#000000" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#000000" }}
                      >
                        {card.label}
                      </p>
                      <p className="text-2xl font-bold text-[#000000]">
                        {card.value}
                      </p>
                    </div>
                    <div className="h-10 w-10 bg-[#f3f4f6] rounded-full flex items-center justify-center text-lg">
                      {card.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Route Info + Search */}
            <div
              className="bg-white rounded-lg shadow-sm p-4 border"
              style={{ borderColor: "#cfece6" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label
                    className="text-sm font-semibold mb-1 block"
                    style={{ color: "#165E52" }}
                  >
                    Route No
                  </label>
                  <div className="text-lg font-bold text-[#01251F]">
                    {routeId || "Route ID Not Available"}
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm font-semibold mb-1 block"
                    style={{ color: "#165E52" }}
                  >
                    Route Name
                  </label>
                  <div className="text-lg font-bold text-gray-800">
                    {routeName || "Route Name Not Available"}
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm font-semibold mb-1 block"
                    style={{ color: "#165E52" }}
                  >
                    Driver Name
                  </label>
                  <div className="text-lg font-bold text-gray-800">
                    {driverName || "Driver Name Not Available"}
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="w-full px-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-[#165E52] focus:border-transparent"
                  />
                  <Search className="absolute text-gray-400 h-4 w-4 right-3 top-3" />
                </div>
              </div>
            </div>

            {/* Supplier Action Bar */}
            <div
              className="bg-white rounded-lg shadow-sm p-4 border"
              style={{ borderColor: "#cfece6" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: "#165E52" }}
                  >
                    Supplier Bags
                  </h2>
                </div>
              </div>
            </div>

            {/* Table: Arrived = bag list, Completed = supplier summary */}
            <div
              className="bg-white rounded-lg border overflow-hidden"
              style={{ borderColor: "#cfece6" }}
            >
              {view === "arrived" ? (
                <>
                  <div className="bg-[#01251F] text-white">
                    <div className="grid grid-cols-3 gap-4 p-3 text-sm font-semibold text-center">
                      <div>Bag No</div>
                      <div>Weight</div>
                      <div>Quality</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {filteredBags.map((bag, index) => {
                      let quality = "Good";
                      let qualityColor = "#165E52";
                      if (bag.wet && bag.coarse) {
                        quality = "Wet, Coarse";
                        qualityColor = "#ff8400ff";
                      } else if (bag.wet) {
                        quality = "Wet";
                        qualityColor = "#f59e42";
                      } else if (bag.coarse) {
                        quality = "Coarse";
                        qualityColor = "#f59e42";
                      }
                      const handleBagClick = () => {
                        const supplierBags = bags.filter(
                          (b) => b.supplierId === bag.supplierId
                        );
                        const supplyRequestId =
                          bag.supplyRequestId ??
                          bag.supply_request_id ??
                          bag.supplyRequest?.id ??
                          bag.supplyRequest?.supplyRequestId ??
                          bag.supplyRequest?.supplyRequestID ??
                          bag.supplyRequest?.requestId ??
                          null;
                        if (supplyRequestId == null) {
                          console.warn(
                            "supplyRequestId not found on bag, available keys:",
                            Object.keys(bag)
                          );
                        }
                        const sessionId = session?.sessionId;
                        if (!session) {
                          setConfirmPopup({
                            open: true,
                            supplierBags,
                            supplierId: bag.supplierId,
                            supplierName: bag.supplierName,
                            supplyRequestId,
                            sessionId,
                          });
                        } else if (
                          session.userId === user?.userId &&
                          session.status === "pending"
                        ) {
                          navigate(`supplier/${bag.supplierId}`, {
                            state: {
                              supplierBags,
                              supplierId: bag.supplierId,
                              supplierName: bag.supplierName,
                              supplyRequestId,
                              sessionId,
                            },
                          });
                        } else {
                          setConfirmPopup({
                            open: "session",
                            supplierBags,
                            supplierId: bag.supplierId,
                            supplierName: bag.supplierName,
                            supplyRequestId,
                            sessionId,
                          });
                        }
                      };
                      return (
                        <div
                          key={index}
                          onClick={handleBagClick}
                          className="grid grid-cols-3 gap-4 p-4 text-center hover:bg-gray-200 cursor-pointer transition"
                        >
                          <div className="font-medium text-[#01251F]">
                            {bag.bagNumber}
                          </div>
                          <div className="font-medium text-[#165E52]">
                            {bag.driverWeight}
                          </div>
                          <div
                            className="font-medium"
                            style={{
                              color:
                                quality === "Good" ? "#165E52" : qualityColor,
                            }}
                          >
                            {quality}
                          </div>
                        </div>
                      );
                    })}
                    {filteredBags.length === 0 &&
                      tripDetails?.status !== "weighed" && (
                        <div className="p-8 text-center text-gray-500">
                          No bags found
                        </div>
                      )}
                  </div>
                  {/* Show 'All bags weighed' only in arrived view and if status is weighed */}
                  {tripDetails?.status === "weighed" && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="text-green-600 font-semibold text-lg mb-4">
                        All bags weighed
                      </div>
                      <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 rounded-lg font-medium bg-[#165E52] text-white hover:bg-[#11453f] transition"
                      >
                        Go Back
                      </button>
                    </div>
                  )}
                </>
              ) : (
                // Completed view: supplier summary table
                <>
                  <div className="bg-[#01251F] text-white">
                    <div className="grid grid-cols-5 gap-4 p-3 text-sm font-semibold text-center">
                      <div>Supplier ID</div>
                      <div>Supplier Name</div>
                      <div>Total Bags</div>
                      <div>Gross Weight</div>
                      <div>Deductions</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {filteredSuppliers.map((s, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-5 gap-4 p-4 text-center"
                      >
                        <div className="font-medium text-[#01251F]">
                          {s.supplierId}
                        </div>
                        <div className="font-medium text-[#165E52]">
                          {s.supplierName}
                        </div>
                        <div className="font-medium">{s.bagTotal}</div>
                        <div className="font-medium">{s.grossWeight} Kg</div>
                        <div className="font-medium">
                          {(s.water || 0) +
                            (s.coarse || 0) +
                            (s.otherWeight || 0)}
                        </div>
                      </div>
                    ))}
                    {filteredSuppliers.length === 0 && (
                      <div className="p-8 text-center text-gray-500">
                        No suppliers found
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
        <Outlet />
      </div>

      {confirmPopup.open && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] backdrop-blur-sm bg-black/30">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 border relative"
            style={{ borderColor: "#cfece6" }}
          >
            <div className="p-6 text-center">
              {confirmPopup.open === true && (
                <>
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#165E52" }}
                  >
                    Start Weighing?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Do you want to start weighing for{" "}
                    <span className="font-semibold text-[#165E52]">
                      {routeName}
                    </span>
                    ?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={async () => {
                        setConfirmPopup({ open: false });
                        let newSessionId = null;
                        try {
                          const data = await createWeighingSession({
                            userId: user?.userId,
                            tripId: tripId,
                          });
                          // backend may return sessionId directly or an object
                          newSessionId =
                            data?.sessionId || (data && data.sessionId) || null;
                        } catch (error) {
                          console.error(
                            "Error creating weighing session:",
                            error
                          );
                          // Optionally show error to user
                        }
                        navigate(`supplier/${confirmPopup.supplierId}`, {
                          state: {
                            supplierBags: confirmPopup.supplierBags,
                            supplierId: confirmPopup.supplierId,
                            supplierName: confirmPopup.supplierName,
                            sessionId: newSessionId,
                          },
                        });
                      }}
                      className="px-6 py-2 rounded-lg text-white font-medium transition"
                      style={{ backgroundColor: "#165E52" }}
                    >
                      Yes, Start
                    </button>
                    <button
                      onClick={() => setConfirmPopup({ open: false })}
                      className="px-6 py-2 rounded-lg font-medium"
                      style={{
                        border: "2px solid #cfece6",
                        backgroundColor: "transparent",
                        color: "#165E52",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
              {confirmPopup.open === "session" && (
                <>
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#165E52" }}
                  >
                    Session In Progress
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Weighing session is in progress by another user.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setConfirmPopup({ open: false })}
                      className="px-6 py-2 rounded-lg font-medium transition-colors bg-transparent text-[#165E52] hover:bg-[#165E52] hover:text-white border-2"
                      style={{ borderColor: "#3ec5aaff" }}
                    >
                      OK
                    </button>
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
