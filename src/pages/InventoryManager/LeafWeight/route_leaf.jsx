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

export default function DriverRoute() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bags, setBags] = useState([]);
  const [session, setSession] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    supplierBags: null,
    supplierId: null,
    supplierName: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { routeId, routeName, driverName } = location.state || {};
  const { tripId } = useParams();
  const { user } = useAuth();
  // Always fetch latest data when this page is shown
  useEffect(() => {
    if (!tripId) return;
    // Fetch bags
    fetch(`http://localhost:8080/api/inventory-process/trip/${tripId}/bags`)
      .then((res) => res.json())
      .then((data) => {
        setBags(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setBags([]);
        console.error("Error fetching bags for tripId", tripId, err);
      });
    // Fetch session
    fetch(`http://localhost:8080/api/weighing-sessions/trip/${tripId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.sessionId) {
          setSession(data);
        } else {
          setSession(null);
        }
      })
      .catch((err) => {
        setSession(null);
        console.error(
          "Error fetching weighing session for tripId",
          tripId,
          err
        );
      });
  }, [location.pathname, tripId]);

  const totalSuppliers = [...new Set(bags.map((b) => b.supplierId))].length;
  const totalBags = bags.length;
  const totalWeight = bags.reduce((sum, b) => sum + b.driverWeight, 0);

  const filteredBags = bags.filter((b) =>
    String(b.bagNumber).toLowerCase().includes(searchTerm.toLowerCase())
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

            {/* Table */}
            <div
              className="bg-white rounded-lg border overflow-hidden"
              style={{ borderColor: "#cfece6" }}
            >
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
                    if (!session) {
                      setConfirmPopup({
                        open: true,
                        supplierBags,
                        supplierId: bag.supplierId,
                        supplierName: bag.supplierName,
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
                        },
                      });
                    } else {
                      setConfirmPopup({
                        open: "session",
                        supplierBags,
                        supplierId: bag.supplierId,
                        supplierName: bag.supplierName,
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
                          color: quality === "Good" ? "#165E52" : qualityColor,
                        }}
                      >
                        {quality}
                      </div>
                    </div>
                  );
                })}

                {filteredBags.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No bags found
                  </div>
                )}
              </div>
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
                        try {
                          const response = await fetch(
                            "http://localhost:8080/api/weighing-sessions",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                userId: user?.userId,
                                tripId: tripId,
                              }),
                            }
                          );
                          if (!response.ok) {
                            throw new Error("Failed to create session");
                          }
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
