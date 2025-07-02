import { Calendar, DollarSign, CreditCard, Banknote } from "lucide-react";

export default function SupplierBillView({
  selectedSupplier,
  selectedRoute,
  selectedMonth,
  selectedYear,
  monthNames,
}) {
  if (!selectedSupplier) return null;

  // Generate all days (1-31) for the selected month
  const generateMonthlyData = () => {
    const daysInMonth = 31; // Showing 31 days for consistency across all months
    const monthlyData = [];

    // Calculate proportional deductions based on supplier's actual data
    const totalActualWeight = selectedSupplier.totalWeight;
    const bagWeightRatio = selectedSupplier.bagWeight / totalActualWeight;
    const waterWeightRatio = selectedSupplier.waterWeight / totalActualWeight;
    const coarseLeafRatio =
      selectedSupplier.coarseLeafWeight / totalActualWeight;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${(selectedMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      // Find if there's an entry for this date
      const existingEntry = selectedSupplier.teaLeafEntries.find(
        (entry) => entry.date === dateStr
      );

      if (existingEntry) {
        // Use existing data with proportional deductions
        const dayBagWeight = existingEntry.weight * bagWeightRatio;
        const dayWaterWeight = existingEntry.weight * waterWeightRatio;
        const dayCoarseLeaf = existingEntry.weight * coarseLeafRatio;
        const dayNetWeight =
          existingEntry.weight - dayBagWeight - dayWaterWeight - dayCoarseLeaf;

        monthlyData.push({
          day,
          date: dateStr,
          bagCount:
            Math.floor(existingEntry.weight / 20) +
            Math.floor(Math.random() * 3), // Simulate bag count
          totalWeight: existingEntry.weight,
          bagWeight: dayBagWeight,
          waterContent: dayWaterWeight,
          coarseLeaf: dayCoarseLeaf,
          netWeight: dayNetWeight,
          amount: dayNetWeight * selectedSupplier.ratePerKg,
        });
      } else {
        // No delivery for this day
        monthlyData.push({
          day,
          date: dateStr,
          bagCount: 0,
          totalWeight: 0,
          bagWeight: 0,
          waterContent: 0,
          coarseLeaf: 0,
          netWeight: 0,
          amount: 0,
        });
      }
    }

    return monthlyData;
  };

  const monthlyData = generateMonthlyData();
  const totalNetWeight = monthlyData.reduce(
    (sum, day) => sum + day.netWeight,
    0
  );
  // Calculate total amount based on net weight and rate
  const totalAmount = totalNetWeight * selectedSupplier.ratePerKg;

  return (
    <div className="space-y-6">
      {/* Bill Header */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {selectedSupplier.supplierName}
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm text-gray-500">
                ID: {selectedSupplier.id}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">
                Period: {monthNames[selectedMonth]} {selectedYear}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <div
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  selectedSupplier.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedSupplier.status}
              </div>
            </div>
            <div className="space-y-1 text-sm text-[#666]">
              <p>
                <span className="font-medium">Route:</span>{" "}
                {selectedRoute?.routeName}
              </p>
              <p>
                <span className="font-medium">Rate:</span> Rs.{" "}
                {selectedSupplier.ratePerKg.toFixed(2)}/kg
              </p>
              <p>
                <span className="font-medium">Payment Method: </span>
                {selectedSupplier.paymentMethod}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-[#4CAF50]">
              Rs. {selectedSupplier.finalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-[#666]">Final Amount</div>

            {/* Upcoming Payments Info */}
            <div className="mt-4 space-y-1">
              <div className="text-sm font-medium text-[#666] border-b border-gray-200 pb-1 mb-2">
                Next Month Due:
              </div>

              {/* Loan installment due */}
              {selectedSupplier.upcomingPayments?.loanInstallment && (
                <div className="flex justify-between items-center text-sm text-[#666]">
                  <span>Loan Installment:</span>
                  <span className="font-mono">
                    Rs.{" "}
                    {selectedSupplier.upcomingPayments.loanInstallment.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Fertilizer payment due */}
              {selectedSupplier.upcomingPayments?.fertilizerDue && (
                <div className="flex justify-between items-center text-sm text-[#666]">
                  <span>Fertilizer Due:</span>
                  <span className="font-mono">
                    Rs.{" "}
                    {selectedSupplier.upcomingPayments.fertilizerDue.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Show total if there are any upcoming payments */}
              {selectedSupplier.upcomingPayments &&
                (selectedSupplier.upcomingPayments.loanInstallment ||
                  selectedSupplier.upcomingPayments.fertilizerDue) && (
                  <div className="flex justify-between items-center text-sm font-medium text-[#666] border-t border-gray-200 pt-1 mt-2">
                    <span>Total Due:</span>
                    <span className="font-mono">
                      Rs.{" "}
                      {(
                        (selectedSupplier.upcomingPayments.loanInstallment ||
                          0) +
                        (selectedSupplier.upcomingPayments.fertilizerDue || 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                )}

              {/* Show message if no upcoming payments */}
              {(!selectedSupplier.upcomingPayments ||
                (!selectedSupplier.upcomingPayments.loanInstallment &&
                  !selectedSupplier.upcomingPayments.fertilizerDue)) && (
                <div className="text-sm text-[#666] italic">
                  No payments due next month
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tea Leaf Entries */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-[#f8f9fa] border-b border-[#e0e0e0]">
          <h3 className="text-lg font-semibold text-[#2c2c2c] flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tea Leaf Deliveries
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e0e0e0] bg-[#f8f9fa]">
                <th className="text-center py-3 px-2 font-medium text-[#666]">
                  Date
                </th>
                <th className="text-center py-3 px-2 font-medium text-[#666]">
                  Bag Count
                </th>
                <th className="text-right py-3 px-2 font-medium text-[#666]">
                  Total Weight (kg)
                </th>
                <th className="text-right py-3 px-2 font-medium text-[#666]">
                  Bag Weight (kg)
                </th>
                <th className="text-right py-3 px-2 font-medium text-[#666]">
                  Water (kg)
                </th>
                <th className="text-right py-3 px-2 font-medium text-[#666]">
                  Coarse Leaf (kg)
                </th>
                <th className="text-right py-3 px-2 font-medium text-[#666]">
                  Net Weight (kg)
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((dayData) => (
                <tr
                  key={dayData.day}
                  className={`border-b border-[#f0f0f0] ${
                    dayData.netWeight > 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-2 text-center font-mono">
                    {dayData.day}
                  </td>
                  <td className="py-2 px-2 text-center font-mono">
                    {dayData.bagCount > 0 ? dayData.bagCount : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    {dayData.totalWeight > 0
                      ? dayData.totalWeight.toFixed(1)
                      : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    {dayData.bagWeight > 0 ? dayData.bagWeight.toFixed(1) : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    {dayData.waterContent > 0
                      ? dayData.waterContent.toFixed(1)
                      : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono">
                    {dayData.coarseLeaf > 0
                      ? dayData.coarseLeaf.toFixed(1)
                      : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-bold">
                    {dayData.netWeight > 0 ? dayData.netWeight.toFixed(1) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#e0e0e0] bg-[#f8f9fa] font-bold">
                <td className="py-3 px-2 text-center">Total</td>
                <td className="py-3 px-2 text-center font-mono">
                  {monthlyData.reduce((sum, day) => sum + day.bagCount, 0)}
                </td>
                <td className="py-3 px-2 text-right font-mono">
                  {monthlyData
                    .reduce((sum, day) => sum + day.totalWeight, 0)
                    .toFixed(1)}
                </td>
                <td className="py-3 px-2 text-right font-mono">
                  {monthlyData
                    .reduce((sum, day) => sum + day.bagWeight, 0)
                    .toFixed(1)}
                </td>
                <td className="py-3 px-2 text-right font-mono">
                  {monthlyData
                    .reduce((sum, day) => sum + day.waterContent, 0)
                    .toFixed(1)}
                </td>
                <td className="py-3 px-2 text-right font-mono">
                  {monthlyData
                    .reduce((sum, day) => sum + day.coarseLeaf, 0)
                    .toFixed(1)}
                </td>
                <td className="py-3 px-2 text-right font-mono font-bold text-[#4CAF50]">
                  {totalNetWeight.toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Total Summary */}
        <div className="p-4 bg-[#f8f9fa] border-t border-[#e0e0e0]">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-[#2c2c2c]">
              Total Net Weight:{" "}
              <span className="text-[#4CAF50]">
                {totalNetWeight.toFixed(1)} kg
              </span>
            </div>
            <div className="text-lg font-semibold text-[#2c2c2c]">
              Total Amount:{" "}
              <span className="text-[#4CAF50]">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Payment Summary
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[#666]">Gross Amount:</span>
            <span className="font-mono">
              Rs. {selectedSupplier.grossAmount.toLocaleString()}
            </span>
          </div>

          <div className="border-t border-[#e0e0e0] pt-3">
            <div className="text-sm font-medium text-[#666] mb-2">
              Deductions:
            </div>
            <div className="space-y-2 ml-4">
              <div className="flex justify-between text-sm">
                <span>Advances:</span>
                <span className="font-mono text-red-600">
                  - Rs. {selectedSupplier.advances.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fertilizer:</span>
                <span className="font-mono text-red-600">
                  - Rs. {selectedSupplier.fertilizer.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transport:</span>
                <span className="font-mono text-red-600">
                  - Rs. {selectedSupplier.transport.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Others:</span>
                <span className="font-mono text-red-600">
                  - Rs. {selectedSupplier.others.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium border-t border-[#f0f0f0] pt-2">
                <span>Total Deductions:</span>
                <span className="font-mono text-red-600">
                  - Rs. {selectedSupplier.totalDeductions.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e0e0e0] pt-3 flex justify-between text-lg font-bold">
            <span>Final Amount:</span>
            <span className="font-mono text-[#4CAF50]">
              Rs. {selectedSupplier.finalAmount.toLocaleString()}
            </span>
          </div>

          <div className="border-t border-[#e0e0e0] pt-3 flex justify-between text-sm">
            <span>Payment Method:</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                selectedSupplier.paymentMethod === "Bank"
                  ? "bg-[#e3f2fd] text-[#1976d2]"
                  : "bg-[#e8f5e8] text-[#4CAF50]"
              }`}
            >
              {selectedSupplier.paymentMethod === "Bank" ? (
                <CreditCard className="h-3 w-3" />
              ) : (
                <Banknote className="h-3 w-3" />
              )}
              {selectedSupplier.paymentMethod}
            </span>
          </div>

          {selectedSupplier.paidDate && (
            <div className="flex justify-between text-sm">
              <span>Payment Date:</span>
              <span className="font-mono">{selectedSupplier.paidDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
