import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBagWeightIdBySupplyRequest, updateEmptyBagTare } from "../../../api/inventoryManager/bagWeight";
import { getSupplierInfoBySupplyRequest, getBagDetailsBySupplyRequest } from "../../../api/inventoryManager/leafWeight";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function Supplier() {
  const navigate = useNavigate();
  const { supplyRequestId } = useParams();
  const [teaBags, setTeaBags] = useState([]);
  const [selectedBags, setSelectedBags] = useState([]);
  const [selectedBagsWeight, setSelectedBagsWeight] = useState("");
  const [bagWeightId, setBagWeightId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [supplierInfo, setSupplierInfo] = useState(null);

  useEffect(() => {
    if (!supplyRequestId) return;
    getBagWeightIdBySupplyRequest(supplyRequestId)
      .then((data) => setBagWeightId(data ? data : null))
      .catch(() => setBagWeightId(null));
    getSupplierInfoBySupplyRequest(supplyRequestId)
      .then((data) => {
        setSupplierInfo(data);
      })
      .catch(() => setSupplierInfo(null));
    getBagDetailsBySupplyRequest(supplyRequestId, "weighed")
      .then((data) => {
        const bags = Array.isArray(data) ? data : [];
        setTeaBags(bags);
        setSelectedBags(bags.map((bag) => bag.bagNo)); // Select all by default
      })
      .catch(() => {
        setTeaBags([]);
        setSelectedBags([]);
      });
  }, [supplyRequestId]);

  const handleEnter = async () => {
    if (apiSuccess) {
      navigate(-1);
      return;
    }
    if (submitted) return;
    setSubmitted(true);
    const payload = {
      tareWeight: selectedBagsWeight,
    };
    try {
      await updateEmptyBagTare(bagWeightId, payload);
      setApiSuccess(true);
      setSubmitted(false);
      setSelectedBagsWeight("");
    } catch (err) {
      setSubmitted(false);
      setApiSuccess(false);
      console.log("Error submitting bag weights:", err);
    }
  };

  return (
    <div className="min-h-full">
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
            Empty Bag Weighing
          </h1>
        </Card>

        {/* Supplier Info Section */}
        <Card>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-semibold mb-1 block text-tea-700 dark:text-tea-300">
                Supplier ID
              </label>
              <div className="text-lg font-semibold text-ink dark:text-ink-dark">
                {supplierInfo?.supplierId || "-"}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block text-tea-700 dark:text-tea-300">
                Supplier Name
              </label>
              <div className="text-lg font-semibold text-ink dark:text-ink-dark">
                {supplierInfo?.supplierName || "Supplier Name Not Available"}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block text-tea-700 dark:text-tea-300">
                Total Bags
              </label>
              <div className="text-lg font-semibold text-ink dark:text-ink-dark">
                {teaBags.length}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Bar */}
        <Card>
          <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark">
            Bags Containing Tea Leaves
          </h2>
        </Card>

        {/* Bags Table */}
        <Card className="!p-0 overflow-hidden max-w-md">
          <div className="bg-tea-900 text-white">
            <div className="p-3 font-medium text-center">Bag No</div>
          </div>
          <div
            className="divide-y divide-tea-100 dark:divide-card-border-dark"
            style={{
              maxHeight: teaBags.length > 5 ? "320px" : "auto",
              overflowY: teaBags.length > 5 ? "auto" : "visible",
              minHeight: "45px",
            }}
          >
            {teaBags.map((bag, index) => (
              <div
                key={index}
                className="p-4 text-center bg-tea-50 dark:bg-tea-900/20 font-medium text-tea-700 dark:text-tea-300"
              >
                <span className="px-2 py-1 rounded">{bag.bagNo}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* In Factory Section */}
        <Card>
          <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark mb-4">
            In Factory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-2">
                Selected Bags
              </label>
              <div className="text-sm text-ink dark:text-ink-dark bg-tea-50 dark:bg-tea-900/20 p-3 rounded-lg border border-tea-100 dark:border-card-border-dark min-h-10 flex items-center">
                {selectedBags.length > 0
                  ? selectedBags.join(", ")
                  : "No bags selected"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-2">
                Selected Bags Weight
              </label>
              <input
                type="number"
                value={selectedBagsWeight}
                onChange={(e) => setSelectedBagsWeight(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                placeholder="Enter weight"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!submitted) {
                      handleEnter();
                    }
                    e.preventDefault();
                  }
                }}
                disabled={submitted}
              />
            </div>

            <div>
              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={handleEnter}
                disabled={
                  !apiSuccess &&
                  (selectedBags.length === 0 ||
                    submitted ||
                    !selectedBagsWeight ||
                    !bagWeightId)
                }
              >
                {apiSuccess ? "Back to Route" : "Enter"}
              </Button>
              {!bagWeightId && (
                <div className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
                  No bag record found for today. Please check the date or supply
                  request.
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
