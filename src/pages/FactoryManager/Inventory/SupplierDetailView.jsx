import { Calendar, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SupplierDetailView({ supplier }) {
  const [newNote, setNewNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  if (!supplier) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">No supplier selected</p>
      </div>
    );
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Here you would typically save to database/API
      console.log("Adding note:", newNote);
      setNewNote("");
      setShowNoteInput(false); // Hide input after adding note
      // You could also update the supplier object or trigger a callback
    }
  };

  const handleShowNoteInput = () => {
    setShowNoteInput(true);
  };

  const handleCancelNote = () => {
    setNewNote("");
    setShowNoteInput(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Generate monthly data (1-31 days) with actual delivery data
  const generateMonthlyData = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const monthlyData = [];

    // Fallback sample data if supplier doesn't have teaLeafEntries
    const fallbackEntries = [
      { day: 1, weight: 125.5, hasWater: true, hasCoarseLeaf: true },
      { day: 3, weight: 142.2, hasWater: false, hasCoarseLeaf: true },
      { day: 4, weight: 135.8, hasWater: true, hasCoarseLeaf: false },
      { day: 7, weight: 152.3, hasWater: true, hasCoarseLeaf: true },
      { day: 10, weight: 148.7, hasWater: false, hasCoarseLeaf: false },
      { day: 12, weight: 138.7, hasWater: true, hasCoarseLeaf: true },
      { day: 15, weight: 145.6, hasWater: false, hasCoarseLeaf: true },
      { day: 18, weight: 154.5, hasWater: true, hasCoarseLeaf: false },
      { day: 20, weight: 108.9, hasWater: false, hasCoarseLeaf: false },
    ];

    // Use supplier data if available, otherwise fallback
    const teaLeafEntries = supplier.teaLeafEntries || fallbackEntries;

    for (let day = 1; day <= daysInMonth; day++) {
      // Find if there's a delivery for this day from supplier data
      const deliveryEntry = teaLeafEntries.find((entry) => entry.day === day);

      if (deliveryEntry) {
        const totalWeight = deliveryEntry.weight || 0;
        const bagCount = Math.max(
          1,
          Math.floor(totalWeight / 25) + Math.floor(Math.random() * 3)
        );

        // Minimum 1 kg per bag deduction
        const bagWeight = Math.max(bagCount * 1.0, totalWeight * 0.02);

        // Water content only if hasWater is true
        const waterContent = deliveryEntry.hasWater ? totalWeight * 0.15 : 0;

        // Coarse leaf only if hasCoarseLeaf is true
        const coarseLeaf = deliveryEntry.hasCoarseLeaf ? totalWeight * 0.05 : 0;

        const netWeight = totalWeight - bagWeight - waterContent - coarseLeaf;

        monthlyData.push({
          day,
          bagCount,
          totalWeight,
          bagWeight,
          waterContent,
          coarseLeaf,
          netWeight,
          hasDelivery: true,
        });
      } else {
        monthlyData.push({
          day,
          bagCount: 0,
          totalWeight: 0,
          bagWeight: 0,
          waterContent: 0,
          coarseLeaf: 0,
          netWeight: 0,
          hasDelivery: false,
        });
      }
    }

    return monthlyData;
  };

  const monthlyData = generateMonthlyData();

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier ID
            </label>
            <p className="mt-1 text-sm text-gray-900">{supplier.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {supplier.supplierName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {supplier.contactNumber}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Delivery
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {formatDate(supplier.lastDelivery)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Net Weight
            </label>
            <p className="mt-1 text-lg font-semibold text-emerald-600">
              {(
                (supplier.totalWeight || 0) *
                (1 - (supplier.moistureContent || 3.0) / 100)
              ).toFixed(1)}{" "}
              kg
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Bags
            </label>
            <p className="mt-1 text-lg font-semibold text-emerald-600">
              {supplier.totalBags}
            </p>
          </div>
        </div>
      </div>

      {/* Notice Section */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Notice</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Water is increasing weekly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Notes Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          {/* Show Add Note button when input is hidden */}
          {!showNoteInput && (
            <button
              onClick={handleShowNoteInput}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </button>
          )}

          {/* Show input area when toggled on */}
          {showNoteInput && (
            <div className="space-y-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-900 bg-white"
                placeholder="Enter your note about this supplier..."
                style={{ color: "#111827" }}
                autoFocus
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancelNote}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Save Note
                </button>
              </div>
            </div>
          )}

          {/* Display existing note if available */}
          {supplier.notes && (
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Note
              </label>
              <div className="bg-gray-50 rounded-md p-3 border">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {supplier.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tea Leaf Entries */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-[#f8f9fa] border-b border-[#e0e0e0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Tea Leaf Deliveries
            </h3>

            {/* Month/Year Selector */}
            <div className="flex items-center gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 hover:border-green-400"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i} className="text-gray-900">
                    {new Date(2024, i, 1).toLocaleDateString("en-US", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 hover:border-green-400"
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - 2 + i;
                  return (
                    <option key={year} value={year} className="text-gray-900">
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Monthly Summary Cards */}
        <div className="p-4 bg-gray-50 border-b border-[#e0e0e0]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg border">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Delivery Days
              </div>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {monthlyData.filter((day) => day.hasDelivery).length}
              </div>
              <div className="text-xs text-gray-500">
                out of {new Date(selectedYear, selectedMonth + 1, 0).getDate()}{" "}
                days
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Total Bags
              </div>
              <div className="mt-1 text-lg font-semibold text-green-600">
                {monthlyData.reduce((sum, day) => sum + day.bagCount, 0)}
              </div>
              <div className="text-xs text-gray-500">bags collected</div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Gross Weight
              </div>
              <div className="mt-1 text-lg font-semibold text-blue-600">
                {monthlyData
                  .reduce((sum, day) => sum + day.totalWeight, 0)
                  .toFixed(1)}{" "}
                kg
              </div>
              <div className="text-xs text-gray-500">before deductions</div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Net Weight
              </div>
              <div className="mt-1 text-lg font-semibold text-green-600">
                {monthlyData
                  .reduce((sum, day) => sum + day.netWeight, 0)
                  .toFixed(1)}{" "}
                kg
              </div>
              <div className="text-xs text-gray-500">after deductions</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e0e0e0] bg-[#f8f9fa]">
                <th className="text-center py-3 px-2 font-medium text-gray-700">
                  Date
                </th>
                <th className="text-center py-3 px-2 font-medium text-gray-700">
                  Bag Count
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-700">
                  Gross Weight (kg)
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-700">
                  Bag Weight (kg)
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-700">
                  Water (kg)
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-700">
                  Coarse Leaf (kg)
                </th>
                <th className="text-right py-3 px-2 font-medium text-gray-700">
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
                  <td className="py-2 px-2 text-center font-mono text-gray-900">
                    {dayData.day}
                  </td>
                  <td className="py-2 px-2 text-center font-mono text-gray-900">
                    {dayData.bagCount > 0 ? dayData.bagCount : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-gray-900">
                    {dayData.totalWeight > 0
                      ? dayData.totalWeight.toFixed(1)
                      : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-gray-900">
                    {dayData.bagWeight > 0 ? dayData.bagWeight.toFixed(1) : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-gray-900">
                    {dayData.waterContent > 0
                      ? dayData.waterContent.toFixed(1)
                      : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-gray-900">
                    {dayData.coarseLeaf > 0
                      ? dayData.coarseLeaf.toFixed(1)
                      : "-"}
                  </td>
                  <td className="py-2 px-2 text-right font-mono font-bold text-gray-900">
                    {dayData.netWeight > 0 ? dayData.netWeight.toFixed(1) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#e0e0e0] bg-[#f8f9fa] font-bold">
                <td className="py-3 px-2 text-center text-gray-900">Total</td>
                <td className="py-3 px-2 text-center font-mono text-gray-900">
                  {monthlyData.reduce((sum, day) => sum + day.bagCount, 0)}
                </td>
                <td className="py-3 px-2 text-right font-mono text-gray-900">
                  {monthlyData
                    .reduce((sum, day) => sum + day.totalWeight, 0)
                    .toFixed(1)}
                </td>
                <td className="py-3 px-2 text-right font-mono text-gray-900">
                  {monthlyData
                    .reduce((sum, day) => sum + day.bagWeight, 0)
                    .toFixed(1)}
                </td>
                <td className="py-3 px-2 text-right font-mono text-gray-900">
                  {monthlyData
                    .reduce((sum, day) => sum + day.waterContent, 0)
                    .toFixed(1)}
                </td>
                <td className="py-3 px-2 text-right font-mono text-gray-900">
                  {monthlyData
                    .reduce((sum, day) => sum + day.coarseLeaf, 0)
                    .toFixed(1)}
                </td>
                <td className="py-3 px-2 text-right font-mono font-bold text-[#4CAF50]">
                  {monthlyData
                    .reduce((sum, day) => sum + day.netWeight, 0)
                    .toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Total Summary */}
        <div className="p-4 bg-[#f8f9fa] border-t border-[#e0e0e0]">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-900">
              Total Net Weight:{" "}
              <span className="text-[#4CAF50]">
                {monthlyData
                  .reduce((sum, day) => sum + day.netWeight, 0)
                  .toFixed(1)}{" "}
                kg
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
