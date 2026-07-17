import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Package, CheckCircle, Scale } from "lucide-react";
import { getBagWeightIdBySupplyRequest, createBagWeights, updateBagWeights, getSupplierInfoBySupplyRequest, getBagDetailsBySupplyRequest } from "../../../api/inventoryManager/leafWeight";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

const inputClass =
  "px-3 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40 transition-all duration-200";

export default function Supplier() {
  const [enterLoading, setEnterLoading] = useState(false);
  const [selectedBags, setSelectedBags] = useState([]);
  const [selectedBagsWeight, setSelectedBagsWeight] = useState("");
  const [waterWeight, setWaterWeight] = useState("");
  const [coarseWeight, setCoarseWeight] = useState("");
  const [otherWeight, setOtherWeight] = useState("");
  const [otherWeightReason, setOtherWeightReason] = useState("");
  const [bagWeightId, setBagWeightId] = useState(null);
  const [bagSearch, setBagSearch] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [teaBags, setTeaBags] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { supplyRequestId } = useParams();
  const sessionId = location.state?.sessionId;

  // Fetch supplier info
  useEffect(() => {
    if (!supplyRequestId) return;
    getSupplierInfoBySupplyRequest(supplyRequestId)
      .then((data) => {
        setSupplierId(data.supplierId);
        setSupplierName(data.supplierName);
      })
      .catch(() => {
        setSupplierId("");
        setSupplierName("");
      });
  }, [supplyRequestId]);

  // Fetch bag details
  useEffect(() => {
    if (!supplyRequestId) return;
    getBagDetailsBySupplyRequest(supplyRequestId, "pending")
      .then((data) => {
        setTeaBags(data);
      })
      .catch(() => {
        setTeaBags([]);
      });
  }, [supplyRequestId]);

  // Fetch bagWeightId when supplyRequestId is available
  const fetchBagWeightId = React.useCallback(async () => {
    if (!supplyRequestId) {
      setBagWeightId(null);
      return;
    }
    try {
      const id = await getBagWeightIdBySupplyRequest(supplyRequestId);
      setBagWeightId(id || null);
    } catch {
      setBagWeightId(null);
    }
  }, [supplyRequestId]);

  useEffect(() => {
    fetchBagWeightId();
  }, [fetchBagWeightId]);

  const handleEnter = async () => {
    setEnterLoading(true);
    const payload = {
      ...(supplyRequestId !== undefined && supplyRequestId !== null
        ? { supplyRequestId: Number(supplyRequestId) }
        : {}),
      ...(sessionId !== undefined && sessionId !== null
        ? { sessionId: Number(sessionId) }
        : {}),
      bagNumbers: selectedBags.map((b) => String(b)),
      coarse: parseFloat(coarseWeight) || 0,
      water: parseFloat(waterWeight) || 0,
      grossWeight: parseFloat(selectedBagsWeight) || 0,
      otherWeight: parseFloat(otherWeight) || 0,
      reason: otherWeightReason || "",
    };
    try {
      if (bagWeightId) {
        await updateBagWeights(bagWeightId, payload);
      } else {
        await createBagWeights(payload);
      }
      setTeaBags((prevBags) =>
        prevBags.map((bag) =>
          selectedBags.includes(bag.bagNo) ? { ...bag, weighed: true } : bag
        )
      );
      setSelectedBags([]);
      setSelectedBagsWeight("");
      setWaterWeight("");
      setCoarseWeight("");
      setOtherWeight("");
      setOtherWeightReason("");
      fetchBagWeightId();
    } catch (error) {
      console.error(error);
    } finally {
      setEnterLoading(false);
    }
  };

  const selectedBagsTotal = teaBags
    .filter((bag) => selectedBags.includes(bag.bagNo))
    .reduce((sum, bag) => {
      const weightStr = bag.driverWeight ? String(bag.driverWeight) : "0";
      const num = parseFloat(weightStr.replace(" Kg", ""));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

  return (
    <div className="h-full">
      <div className="space-y-5">
        {/* Header */}
        <Card>
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            Bag Weight Management
          </h1>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Bags", value: teaBags.length, icon: Package },
            { label: "Selected Bags", value: selectedBags.length, icon: CheckCircle },
            { label: "Selected Weight", value: `${selectedBagsTotal} Kg`, icon: Scale },
          ].map((card, i) => (
            <Card key={i} hoverable>
              <div className="flex justify-between items-center">
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

        {/* Supplier Info */}
        <Card>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold mb-1 block text-tea-700 dark:text-tea-300">
                Supplier No
              </label>
              <div className="text-lg font-semibold text-ink dark:text-ink-dark">
                {supplierId || "-"}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block text-tea-700 dark:text-tea-300">
                Supplier Name
              </label>
              <div className="text-lg font-semibold text-ink dark:text-ink-dark">
                {supplierName || "Supplier Name Not Available"}
              </div>
            </div>
          </div>
        </Card>

        {/* Bags Table */}
        <div className="flex gap-6">
          {/* Bags Table - Left Side */}
          <Card className="!p-0 overflow-hidden max-w-2xl flex-1">
            <div className="bg-tea-900">
              <div className="grid grid-cols-3 gap-4 p-3 font-medium text-center text-white">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 text-tea-700 border-tea-100 rounded focus:ring-tea-500"
                    checked={
                      selectedBags.length ===
                        Math.min(3, teaBags.filter((b) => !b.weighed).length) &&
                      selectedBags.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        const unweighedBags = teaBags
                          .filter((b) => !b.weighed)
                          .slice(0, 3)
                          .map((b) => b.bagNo);
                        setSelectedBags(unweighedBags);
                      } else {
                        setSelectedBags([]);
                      }
                    }}
                    disabled={teaBags.filter((b) => !b.weighed).length === 0}
                  />
                  Bag No
                </div>
                <div>Driver Weight</div>
                <div>Quality</div>
              </div>
            </div>

            <div
              className="divide-y divide-tea-100 dark:divide-card-border-dark"
              style={{
                maxHeight: "320px",
                overflowY: teaBags.length > 5 ? "auto" : "visible",
                minHeight: "45px",
              }}
            >
              {teaBags
                .filter(
                  (bag) =>
                    bagSearch.trim() === "" ||
                    String(bag.bagNo)
                      .toLowerCase()
                      .includes(bagSearch.trim().toLowerCase())
                )
                .sort((a, b) => {
                  if (!!a.weighed === !!b.weighed) return 0;
                  return a.weighed ? 1 : -1;
                })
                .map((bag, i) => {
                  let quality = "Good";
                  let color = "text-tea-700 bg-tea-100 dark:text-tea-200 dark:bg-tea-900/30";
                  if (bag.wet && bag.coarse) {
                    quality = "Wet, Coarse";
                    color = "text-orange-800 bg-orange-100 dark:text-orange-200 dark:bg-orange-900/30";
                  } else if (bag.wet) {
                    quality = "Wet";
                    color = "text-orange-800 bg-orange-100 dark:text-orange-200 dark:bg-orange-900/30";
                  } else if (bag.coarse) {
                    quality = "Coarse";
                    color = "text-orange-800 bg-orange-100 dark:text-orange-200 dark:bg-orange-900/30";
                  }
                  const isWeighed = !!bag.weighed;
                  return (
                    <div
                      key={bag.bagNo || i}
                      className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-tea-50 dark:hover:bg-white/5 transition-colors"
                      style={{ minHeight: "45px" }}
                    >
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 text-tea-700 border-tea-100 rounded focus:ring-tea-500"
                          checked={selectedBags.includes(bag.bagNo)}
                          onChange={() => {
                            if (isWeighed) return;
                            if (selectedBags.includes(bag.bagNo)) {
                              setSelectedBags(
                                selectedBags.filter((id) => id !== bag.bagNo)
                              );
                            } else if (selectedBags.length < 3) {
                              setSelectedBags([...selectedBags, bag.bagNo]);
                            }
                          }}
                          disabled={
                            isWeighed ||
                            (!selectedBags.includes(bag.bagNo) &&
                              selectedBags.length >= 3)
                          }
                        />
                        <span className="font-medium text-ink dark:text-ink-dark">
                          {bag.bagNo}
                        </span>
                        {isWeighed && (
                          <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-gray-300 dark:bg-white/10 text-gray-700 dark:text-muted-dark">
                            Weighed
                          </span>
                        )}
                      </div>
                      <div className="text-center font-medium text-tea-700 dark:text-tea-300">
                        {bag.driverWeight}
                      </div>
                      <div className="flex justify-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
                          {quality}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
          {/* Search Bar - Right Side */}
          <div className="flex flex-col justify-start items-end min-w-[220px]">
            <label
              htmlFor="bagSearch"
              className="block text-sm font-semibold mb-2 text-tea-700 dark:text-tea-300"
            >
              Search Bag No
            </label>
            <input
              id="bagSearch"
              type="text"
              placeholder="Type bag number..."
              className={`w-full ${inputClass}`}
              value={bagSearch || ""}
              onChange={(e) => setBagSearch(e.target.value)}
            />
          </div>
        </div>

        {/* In Factory Section */}
        <Card>
          <h2 className="text-lg font-heading font-semibold mb-4 text-center text-tea-700 dark:text-tea-300">
            In Factory
          </h2>
          <div className="flex gap-6">
            {/* Left half: Selected Bags and Selected Weight */}
            <div className="w-2/3 flex flex-row gap-6 items-center">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="block text-sm font-semibold text-tea-700 dark:text-tea-300">
                  Selected Bags *
                </label>
                <div className="w-full px-3 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark text-sm font-medium min-h-[40px] flex items-center text-ink dark:text-ink-dark bg-surface dark:bg-white/5">
                  {selectedBags.length > 0 ? (
                    selectedBags.join(", ")
                  ) : (
                    <span className="text-ink/40 dark:text-muted-dark">No bags selected</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label className="block text-sm font-semibold text-tea-700 dark:text-tea-300">
                  Selected Weight (Kg) *
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={selectedBagsWeight}
                  onChange={(e) => setSelectedBagsWeight(e.target.value)}
                  placeholder="Enter weight..."
                  className={`w-60 ${inputClass}`}
                />
              </div>
            </div>
            {/* Right half: Enter button centered, change label if all weighed */}
            <div className="w-1/3 flex items-center justify-center">
              {teaBags.length > 0 && teaBags.every((bag) => bag.weighed) ? (
                <Button variant="primary" className="w-3/5 justify-center" onClick={() => navigate(-1)}>
                  Back to Route
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-3/5 justify-center"
                  onClick={handleEnter}
                  disabled={
                    enterLoading ||
                    selectedBags.length === 0 ||
                    !selectedBagsWeight
                  }
                >
                  {enterLoading ? "Saving..." : "Enter"}
                </Button>
              )}
            </div>
          </div>
          {/* Optional Fields Section */}
          <div className="mt-6 pt-4 border-t border-tea-100 dark:border-card-border-dark">
            <div className="grid grid-cols-4 gap-4">
              {/* Water Weight */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-tea-700 dark:text-tea-300">
                  Water (Kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={waterWeight || ""}
                  onChange={(e) => setWaterWeight(e.target.value)}
                  placeholder="0"
                  className={`w-40 text-xs ${inputClass}`}
                />
              </div>
              {/* Coarse Weight */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-tea-700 dark:text-tea-300">
                  Coarse (Kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={coarseWeight || ""}
                  onChange={(e) => setCoarseWeight(e.target.value)}
                  placeholder="0"
                  className={`w-40 text-xs ${inputClass}`}
                />
              </div>
              {/* Other Weight */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-tea-700 dark:text-tea-300">
                  Other (Kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={otherWeight || ""}
                  onChange={(e) => setOtherWeight(e.target.value)}
                  placeholder="0"
                  className={`w-40 text-xs ${inputClass}`}
                />
              </div>
              {/* Reason */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-tea-700 dark:text-tea-300">
                  Other weight reason
                </label>
                <input
                  type="text"
                  value={otherWeightReason || ""}
                  onChange={(e) => setOtherWeightReason(e.target.value)}
                  placeholder="Enter reason..."
                  className={`w-full text-xs ${inputClass}`}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
