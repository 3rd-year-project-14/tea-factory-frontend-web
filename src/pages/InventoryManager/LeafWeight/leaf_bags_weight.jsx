import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Package, CheckCircle, Scale, BarChart2 } from "lucide-react";

export default function Supplier() {
  const navigate = useNavigate();
  const [selectedBags, setSelectedBags] = useState([]);

  const location = useLocation();
  const [selectedBagsWeight, setSelectedBagsWeight] = useState("");
  const [waterWeight, setWaterWeight] = useState("");
  const [coarseWeight, setCoarseWeight] = useState("");
  const [otherWeight, setOtherWeight] = useState("");
  const [otherWeightReason, setOtherWeightReason] = useState("");
  const [bagWeightId, setBagWeightId] = useState(null);
  const [bagSearch, setBagSearch] = useState("");
  const {
    supplierBags = [],
    supplierId,
    supplierName,
    supplyRequestId,
    sessionId,
  } = location.state || {};
  console.log("supplierBags:", supplierBags);
  console.log("supplierId:", supplierId);
  console.log("supplierName:", supplierName);
  console.log("supplyRequestId:", supplyRequestId);

  // Reusable function to fetch bagWeightId
  const fetchBagWeightId = React.useCallback(() => {
    if (!supplyRequestId) return;
    fetch(
      `http://localhost:8080/api/inventory-process/supply-request/${supplyRequestId}/bagweight-id`
    )
      .then(async (response) => {
        if (!response.ok) return null;
        const text = await response.text();
        console.log("Response text (bagWeightId):", text);
        if (!text) return null;
        try {
          return JSON.parse(text);
        } catch (e) {
          console.error("Invalid JSON response for bagWeightId:", e);
          return null;
        }
      })
      .then((data) => {
        if (
          (Array.isArray(data) && data.length === 0) ||
          (typeof data === "object" &&
            data !== null &&
            Object.keys(data).length === 0)
        ) {
          setBagWeightId(null);
          console.log("No bagWeightId found for this supplyRequestId.");
        } else if (data) {
          setBagWeightId(data);
          console.log("bagWeightId exists:", data);
        } else {
          setBagWeightId(null);
          console.log("No bagWeightId found for this supplyRequestId.");
        }
      })
      .catch((error) => {
        setBagWeightId(null);
        console.error("Error checking bagWeightId:", error);
      });
  }, [supplyRequestId]);

  // Fetch bagWeightId when supplyRequestId is available
  React.useEffect(() => {
    fetchBagWeightId();
  }, [fetchBagWeightId]);

  // Use supplierBags from navigation state as the source of teaBags
  const [teaBags, setTeaBags] = useState(supplierBags);

  React.useEffect(() => {
    setTeaBags(supplierBags);
  }, [supplierBags]);

  const handleBagSelection = (bagNumber) => {
    setSelectedBags((prev) => {
      if (prev.includes(bagNumber)) {
        return prev.filter((bag) => bag !== bagNumber);
      } else if (prev.length < 3) {
        return [...prev, bagNumber];
      } else {
        return prev; // Do not add more than 3
      }
    });
  };

  // Removed unused handleLeafTypeChange

  const handleEnter = () => {
    const payload = {
      supplyRequestId: supplyRequestId ? Number(supplyRequestId) : null,
      sessionId: sessionId ? Number(sessionId) : null,
      bagNumbers: selectedBags.map((b) => String(b)),
      coarse: parseFloat(coarseWeight) || 0,
      water: parseFloat(waterWeight) || 0,
      grossWeight: parseFloat(selectedBagsWeight) || 0,
      otherWeight: parseFloat(otherWeight) || 0,
      reason: otherWeightReason || "",
    };
    console.log("Payload to send:", payload);
    console.log(bagWeightId);
    const url = bagWeightId
      ? `http://localhost:8080/api/bagweights/${bagWeightId}`
      : "http://localhost:8080/api/bagweights";
    const method = bagWeightId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Mark selected bags as weighed
        setTeaBags((prevBags) =>
          prevBags.map((bag) =>
            selectedBags.includes(bag.bagNumber)
              ? { ...bag, weighed: true }
              : bag
          )
        );
        setSelectedBags([]); 
        setSelectedBagsWeight("");
        setWaterWeight("");
        setCoarseWeight("");
        setOtherWeight("");
        setOtherWeightReason("");
        fetchBagWeightId();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Optionally show error message
      });
  };

  const selectedBagsTotal = teaBags
    .filter((bag) => selectedBags.includes(bag.bagNumber))
    .reduce((sum, bag) => {
      const weightStr = bag.driverWeight ? String(bag.driverWeight) : "0";
      const num = parseFloat(weightStr.replace(" Kg", ""));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 ">
          <h1 className="text-2xl font-bold" style={{ color: "#165E52" }}>
            Bag Weight Management
          </h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Total Bags",
              value: supplierBags.length,
              icon: <Package className="text-[#000000] w-5 h-5" />,
            },
            {
              label: "Selected Bags",
              value: selectedBags.length,
              icon: <CheckCircle className="text-[#000000] w-5 h-5" />,
            },
            {
              label: "Selected Weight",
              value: `${selectedBagsTotal} Kg`,
              icon: <Scale className="text-[#000000] w-5 h-5" />,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white px-4 py-3 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg"
              style={{ borderColor: "#000000" }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#000000" }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "#000000" }}
                  >
                    {card.value}
                  </p>
                  <p className="text-xs" style={{ color: "#000000" }}>
                    {card.subtitle}
                  </p>
                </div>
                <div className="h-10 w-10 bg-[#f3f4f6] rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supplier Info */}
        <div
          className="bg-white rounded-lg shadow-sm p-4 border"
          style={{ borderColor: "#cfece6" }}
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                className="text-sm font-semibold mb-1 block"
                style={{ color: "#165E52" }}
              >
                Supplier No
              </label>
              <div className="text-lg font-semibold text-[#01251F]">
                {supplierId}
              </div>
            </div>
            <div>
              <label
                className="text-sm font-semibold mb-1 block"
                style={{ color: "#165E52" }}
              >
                Supplier Name
              </label>
              <div className="text-lg font-semibold text-gray-900">
                {supplierName || "Supplier Name Not Available"}
              </div>
            </div>
          </div>
        </div>

        {/* Bags Table */}
        <div className="flex gap-6">
          {/* Bags Table - Left Side */}
          <div
            className="bg-white rounded-lg border overflow-hidden max-w-2xl flex-1"
            style={{ borderColor: "#cfece6" }}
          >
            <div className="bg-[#01251F] text-white">
              <div className="grid grid-cols-3 gap-4 p-3 font-medium text-center">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 text-[#165E52] border-gray-300 focus:ring-[#165E52]"
                    checked={
                      selectedBags.length ===
                      Math.min(3, teaBags.filter((b) => !b.weighed).length)
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Select up to 3 unweighed bags
                        const unweighedBags = teaBags
                          .filter((b) => !b.weighed)
                          .slice(0, 3)
                          .map((b) => b.bagNumber);
                        setSelectedBags(unweighedBags);
                      } else {
                        setSelectedBags([]);
                      }
                    }}
                  />
                  Bag No
                </div>
                <div>Driver Weight</div>
                <div>Quality</div>
              </div>
            </div>

            <div
              className="divide-y divide-gray-100"
              style={{
                maxHeight: "320px", // ~5 rows * 64px
                overflowY: teaBags.length > 5 ? "auto" : "visible",
                minHeight: "45px",
              }}
            >
              {teaBags
                .filter(
                  (bag) =>
                    bagSearch.trim() === "" ||
                    String(bag.bagNumber)
                      .toLowerCase()
                      .includes(bagSearch.trim().toLowerCase())
                )
                .sort((a, b) => {
                  // Unweighed bags first
                  if (!!a.weighed === !!b.weighed) return 0;
                  return a.weighed ? 1 : -1;
                })
                .map((bag, i) => {
                  let quality = "Good";
                  let color = "text-green-700 bg-green-100";
                  if (bag.wet && bag.coarse) {
                    quality = "Wet, Coarse";
                    color = "text-orange-800 bg-orange-100";
                  } else if (bag.wet) {
                    quality = "Wet";
                    color = "text-orange-800 bg-orange-100";
                  } else if (bag.coarse) {
                    quality = "Coarse";
                    color = "text-orange-800 bg-orange-100";
                  }
                  const isWeighed = !!bag.weighed;
                  return (
                    <div
                      key={bag.bagNumber || i}
                      className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-gray-50"
                      style={{ minHeight: "45px" }}
                    >
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 text-[#165E52] border-gray-300 focus:ring-[#165E52]"
                          checked={selectedBags.includes(bag.bagNumber)}
                          onChange={() => handleBagSelection(bag.bagNumber)}
                          disabled={
                            isWeighed ||
                            (!selectedBags.includes(bag.bagNumber) &&
                              selectedBags.length >= 3)
                          }
                        />
                        <span className="font-medium text-gray-900">
                          {bag.bagNumber}
                        </span>
                        {isWeighed && (
                          <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-700">
                            Weighed
                          </span>
                        )}
                      </div>
                      <div className="text-center font-medium text-[#165E52]">
                        {bag.driverWeight}
                      </div>
                      <div className="flex justify-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}
                        >
                          {quality}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* Search Bar - Right Side */}
          <div className="flex flex-col justify-start items-end min-w-[220px]">
            <label
              htmlFor="bagSearch"
              className="block text-sm font-semibold mb-2"
              style={{ color: "#165E52" }}
            >
              Search Bag No
            </label>
            <input
              id="bagSearch"
              type="text"
              placeholder="Type bag number..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-200 text-sm transition-all duration-200"
              style={{ borderColor: "#cfece6" }}
              value={bagSearch || ""}
              onChange={(e) => setBagSearch(e.target.value)}
            />
          </div>
        </div>

        {/* In Factory Section */}
        <div
          className="bg-white rounded-lg border p-4"
          style={{ borderColor: "#cfece6" }}
        >
          <h2
            className="text-lg font-semibold mb-4 text-center"
            style={{ color: "#165E52" }}
          >
            In Factory
          </h2>
          <div className="flex gap-6">
            {/* Left half: Selected Bags and Selected Weight */}
            <div className="w-2/3 flex flex-row gap-6 items-center">
              <div className="flex flex-col gap-1 w-1/2">
                <label
                  className="block text-sm font-semibold"
                  style={{ color: "#165E52" }}
                >
                  Selected Bags *
                </label>
                <div
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none text-sm font-medium min-h-[40px] flex items-center"
                  style={{
                    borderColor: "#cfece6",
                    color: "#01251F",
                    backgroundColor: "#f8fffe",
                  }}
                >
                  {selectedBags.length > 0 ? (
                    selectedBags.join(", ")
                  ) : (
                    <span className="text-gray-400">No bags selected</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label
                  className="block text-sm font-semibold"
                  style={{ color: "#165E52" }}
                >
                  Selected Weight (Kg) *
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={selectedBagsWeight}
                  onChange={(e) => setSelectedBagsWeight(e.target.value)}
                  placeholder="Enter weight..."
                  className="w-60 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:gray-100 text-sm font-medium transition-all duration-200"
                  style={{ borderColor: "#cfece6", backgroundColor: "#f8fffe" }}
                />
              </div>
            </div>
            {/* Right half: Enter button centered, change label if all weighed */}
            <div className="w-1/3 flex items-center justify-center">
              {teaBags.length > 0 && teaBags.every((bag) => bag.weighed) ? (
                <button
                  onClick={() => navigate(-1)}
                  className="w-3/5 h-10 px-6 py-5 text-sm font-semibold rounded-lg bg-[#165E52] text-white shadow hover:bg-[#01251F] hover:scale-105 active:scale-95 min-w-[100px]"
                >
                  Back to Route
                </button>
              ) : (
                <button
                  onClick={handleEnter}
                  disabled={selectedBags.length === 0 || !selectedBagsWeight}
                  className={` w-3/5 h-10 px-6 py-5 text-sm font-semibold rounded-lg transition-all duration-300 transform min-w-[100px] ${
                    selectedBags.length === 0 || !selectedBagsWeight
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#01251F] hover:bg-[#165E52] text-white shadow hover:scale-105 active:scale-95"
                  }`}
                >
                  Enter
                </button>
              )}
            </div>
          </div>
          {/* Optional Fields Section */}
          <div
            className="mt-6 pt-4 border-t"
            style={{ borderColor: "#e6f7f3" }}
          >
            <div className="grid grid-cols-4 gap-4">
              {/* Water Weight */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold"
                  style={{ color: "#165E52" }}
                >
                  Water (Kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={waterWeight || ""}
                  onChange={(e) => setWaterWeight(e.target.value)}
                  placeholder="0.00"
                  className="w-40 px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-200 text-xs transition-all duration-200"
                  style={{ borderColor: "#cfece6" }}
                />
              </div>
              {/* Coarse Weight */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold"
                  style={{ color: "#165E52" }}
                >
                  Coarse (Kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={coarseWeight || ""}
                  onChange={(e) => setCoarseWeight(e.target.value)}
                  placeholder="0.00"
                  className="w-40 px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-200 text-xs transition-all duration-200"
                  style={{ borderColor: "#cfece6" }}
                />
              </div>
              {/* Other Weight */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold"
                  style={{ color: "#165E52" }}
                >
                  Other (Kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={otherWeight || ""}
                  onChange={(e) => setOtherWeight(e.target.value)}
                  placeholder="0.00"
                  className="w-40 px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-200 text-xs transition-all duration-200"
                  style={{ borderColor: "#cfece6" }}
                />
              </div>
              {/* Reason */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold"
                  style={{ color: "#165E52" }}
                >
                  Other weight reason
                </label>
                <input
                  type="text"
                  value={otherWeightReason || ""}
                  onChange={(e) => setOtherWeightReason(e.target.value)}
                  placeholder="Enter reason..."
                  className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-200 text-xs transition-all duration-200"
                  style={{ borderColor: "#cfece6" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Measured Bags */}
        <div
          className="bg-white rounded-lg border p-4"
          style={{ borderColor: "#cfece6" }}
        >
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-lg font-semibold" style={{ color: "#165E52" }}>
              Measured Tea Leaf Bags
            </h2>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full">
              No Data
            </span>
          </div>
        </div>

        <div
          className="bg-white rounded-lg border overflow-hidden"
          style={{ borderColor: "#cfece6" }}
        >
          <div className="bg-[#01251F] text-white">
            <div className="grid grid-cols-4 gap-4 p-3 text-center font-medium">
              <div>Bag No</div>
              <div>Weight</div>
              <div>Type</div>
              <div>Status</div>
            </div>
          </div>
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-sm">No measured tea leaf bags data available</p>
            <p className="text-xs text-gray-400">
              Data will appear once bags are processed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
