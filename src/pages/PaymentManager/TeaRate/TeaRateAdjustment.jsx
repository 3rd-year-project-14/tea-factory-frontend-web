import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  History,
  Send,
  Save,
  Filter,
} from "lucide-react";

export default function TeaRateAdjustment() {
  const [nsaValue, setNsaValue] = useState("");
  const [gsaValue, setGsaValue] = useState("");
  const [monthlyRate, setMonthlyRate] = useState(21);
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [calculatedRate, setCalculatedRate] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(15420); // Example total weight for the month
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter states for history
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterRateType, setFilterRateType] = useState(""); // "high", "low", or ""

  // History data for previous months
  const [rateHistory] = useState([
    {
      month: "May 2025",
      nsa: 1050.2,
      gsa: 1045.8,
      rate: 21.0,
      finalRate: 295.32,
      totalPayout: 4553640,
      totalWeight: 15420,
      status: "Approved",
      approvedBy: "Owner",
      date: "2025-05-30",
    },
    {
      month: "April 2025",
      nsa: 1020.5,
      gsa: 1015.3,
      rate: 21.0,
      finalRate: 288.24,
      totalPayout: 4443860,
      totalWeight: 15420,
      status: "Approved",
      approvedBy: "Owner",
      date: "2025-04-30",
    },
    {
      month: "March 2025",
      nsa: 980.75,
      gsa: 975.4,
      rate: 21.5,
      finalRate: 285.96,
      totalPayout: 4409300,
      totalWeight: 15420,
      status: "Approved",
      approvedBy: "Owner",
      date: "2025-03-31",
    },
  ]);

  // Get default rate based on month
  const getDefaultRate = (month) => {
    // January(1), February(2), March(3), July(7), August(8) = 21.5%
    // Other months = 21%
    const highRateMonths = [1, 2, 3, 7, 8];
    return highRateMonths.includes(month) ? 21.5 : 21.0;
  };

  useEffect(() => {
    const defaultRate = getDefaultRate(currentMonth);
    setMonthlyRate(defaultRate);
  }, [currentMonth]);

  useEffect(() => {
    if (gsaValue) {
      const gsa = parseFloat(gsaValue) || 0;

      // Calculate 68% of GSA only
      const gsaAdjusted = gsa * 0.68;

      // Apply monthly rate percentage
      const rate = gsaAdjusted * (monthlyRate / 100);

      setCalculatedRate(rate);
      setTotalPayout(rate * totalWeight);
    } else {
      setCalculatedRate(0);
      setTotalPayout(0);
    }
  }, [gsaValue, monthlyRate, totalWeight]);

  const handleSubmit = () => {
    if (!gsaValue || calculatedRate === 0) {
      alert("Please enter valid GSA value");
      return;
    }

    // Here you would typically send to backend
    setIsSubmitted(true);
    alert("Tea rate adjustment submitted to owner for approval!");
  };

  const getMonthName = (monthNum) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNum - 1];
  };

  // Filter function for rate history
  const getFilteredHistory = () => {
    let filtered = [...rateHistory];

    // Filter by month
    if (filterMonth) {
      filtered = filtered.filter((record) => {
        const recordMonth = record.month.split(" ")[0];
        return recordMonth.toLowerCase() === filterMonth.toLowerCase();
      });
    }

    // Filter by year
    if (filterYear) {
      filtered = filtered.filter((record) => {
        const recordYear = record.month.split(" ")[1];
        return recordYear === filterYear;
      });
    }

    // Sort by rate type
    if (filterRateType === "high") {
      filtered = filtered.sort((a, b) => b.finalRate - a.finalRate); // High to Low
    } else if (filterRateType === "low") {
      filtered = filtered.sort((a, b) => a.finalRate - b.finalRate); // Low to High
    }

    return filtered;
  };

  const clearFilters = () => {
    setFilterMonth("");
    setFilterYear("");
    setFilterRateType("");
  };

  return (
    <div className="main-content flex-1 bg-[#f8f9fa] overflow-y-auto text-black">
      <div className="header bg-white p-6 border-b border-[#e0e0e0] shadow-sm">
        <p className="text-3xl font-bold text-[#2c2c2c] mb-1">
          Tea Rate Adjustment Panel
        </p>
      </div>

      <div className="dashboard-content p-6">
        {/* Input and Results Container - Fixed height to fit in viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 h-fit">
          {/* Input Section */}
          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-[#4CAF50]">
            <div className="flex items-center mb-4">
              <Calculator className="h-5 w-5 text-[#4CAF50] mr-2" />
              <h3 className="text-lg font-semibold text-[#2c2c2c]">
                Rate Calculation Input
              </h3>
            </div>

            <div className="space-y-4">
              {/* Current Month Display */}
              <div className="bg-[#f8f9fa] p-3 rounded-lg">
                <label className="block text-sm font-medium text-[#666] mb-1">
                  Current Month
                </label>
                <div className="text-base font-semibold text-[#2c2c2c]">
                  {getMonthName(currentMonth)} 2025
                </div>
              </div>

              {/* NSA and GSA in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NSA Input */}
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-1">
                    N.S.A. (Net Sale Average)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={nsaValue}
                    onChange={(e) => setNsaValue(e.target.value)}
                    className="w-full p-2 border border-[#ddd] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm"
                    placeholder="Enter NSA value"
                  />
                </div>

                {/* GSA Input */}
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-1">
                    G.S.A. (Gross Sale Average) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={gsaValue}
                    onChange={(e) => setGsaValue(e.target.value)}
                    className="w-full p-2 border border-[#ddd] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm"
                    placeholder="Enter GSA value"
                  />
                </div>
              </div>

              {/* Monthly Rate and Total Weight in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Monthly Rate */}
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-1">
                    Monthly Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={monthlyRate}
                    onChange={(e) =>
                      setMonthlyRate(parseFloat(e.target.value) || 0)
                    }
                    className="w-full p-2 border border-[#ddd] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm"
                    placeholder="Enter rate percentage"
                  />
                  <p className="text-xs text-[#666] mt-1">
                    Default: {getDefaultRate(currentMonth)}% for{" "}
                    {getMonthName(currentMonth)}
                  </p>
                </div>

                {/* Total Weight */}
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-1">
                    Total Weight for Month (kg)
                  </label>
                  <input
                    type="number"
                    value={totalWeight}
                    onChange={(e) =>
                      setTotalWeight(parseInt(e.target.value) || 0)
                    }
                    className="w-full p-2 border border-[#ddd] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent text-sm"
                    placeholder="Enter total weight"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Results */}
          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-[#2196F3]">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-[#2196F3] mr-2" />
              <h3 className="text-lg font-semibold text-[#2c2c2c]">
                Calculation Results
              </h3>
            </div>

            <div className="space-y-4">
              {/* Calculation Steps */}
              <div className="bg-[#f8f9fa] p-3 rounded-lg">
                <h4 className="font-medium text-[#2c2c2c] mb-2 text-sm">
                  Calculation Steps:
                </h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>GSA Value:</span>
                    <span>Rs. {(parseFloat(gsaValue) || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>68% of GSA:</span>
                    <span>
                      Rs. {((parseFloat(gsaValue) || 0) * 0.68).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Apply {monthlyRate}% rate:</span>
                    <span>Rs. {calculatedRate.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Results Display */}
              <div className="space-y-3">
                {/* Final Rate */}
                <div className="bg-[#e8f5e8] p-3 rounded-lg border-l-4 border-[#4CAF50]">
                  <div className="text-xs text-[#666] mb-1">
                    Final Rate per Kg
                  </div>
                  <div className="text-xl font-bold text-[#4CAF50]">
                    Rs. {calculatedRate.toFixed(2)}
                  </div>
                </div>

                {/* Total Payout */}
                <div className="bg-[#fff3cd] p-3 rounded-lg border-l-4 border-[#ffc107]">
                  <div className="text-xs text-[#666] mb-1">
                    Total Payout at New Rate
                  </div>
                  <div className="text-lg font-bold text-[#856404]">
                    Rs. {totalPayout.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#666] mt-1">
                    For {totalWeight.toLocaleString()} kg total weight
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={!gsaValue || calculatedRate === 0 || isSubmitted}
                  className={`flex items-center justify-center px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                    isSubmitted
                      ? "bg-[#28a745] text-white cursor-not-allowed"
                      : !gsaValue || calculatedRate === 0
                      ? "bg-[#e9ecef] text-[#6c757d] cursor-not-allowed"
                      : "bg-[#4CAF50] text-white hover:bg-[#45a049] hover:shadow-lg"
                  }`}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitted ? "Submitted" : "Submit to Owner"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rate History Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-6">
            <History className="h-6 w-6 text-[#4CAF50] mr-3" />
            <h3 className="text-lg font-semibold text-[#2c2c2c]">
              Rate History
            </h3>
          </div>

          {/* Filter Section */}
          <div className="bg-[#f8f9fa] p-4 rounded-lg mb-6">
            <div className="flex items-center mb-4">
              <Filter className="h-4 w-4 text-[#666] mr-2" />
              <h4 className="text-sm font-semibold text-[#2c2c2c]">Filters</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Month Filter */}
              <div>
                <label className="block text-xs font-medium text-[#666] mb-1">
                  Filter by Month
                </label>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-lg text-sm focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                >
                  <option value="">All Months</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-xs font-medium text-[#666] mb-1">
                  Filter by Year
                </label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-lg text-sm focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                >
                  <option value="">All Years</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              {/* Rate Type Filter */}
              <div>
                <label className="block text-xs font-medium text-[#666] mb-1">
                  Sort by Rate
                </label>
                <select
                  value={filterRateType}
                  onChange={(e) => setFilterRateType(e.target.value)}
                  className="w-full p-2 border border-[#ddd] rounded-lg text-sm focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                >
                  <option value="">Default Order</option>
                  <option value="high">High to Low Rates</option>
                  <option value="low">Low to High Rates</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-3 py-2 bg-[#6c757d] text-white rounded-lg hover:bg-[#5a6268] transition-all text-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Filter Summary */}
            <div className="mt-3 text-xs text-[#666]">
              Showing {getFilteredHistory().length} of {rateHistory.length}{" "}
              records
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e0e0e0]">
                  <th className="text-left py-3 px-4 font-medium text-[#666]">
                    Month
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-[#666]">
                    NSA
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-[#666]">
                    GSA
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-[#666]">
                    Rate %
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-[#666]">
                    Final Rate/kg
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-[#666]">
                    Total Payout
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-[#666]">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-[#666]">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {getFilteredHistory().map((record, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#f0f0f0] hover:bg-[#f8f9fa]"
                  >
                    <td className="py-3 px-4 font-medium text-[#2c2c2c]">
                      {record.month}
                    </td>
                    <td className="py-3 px-4">Rs. {record.nsa.toFixed(2)}</td>
                    <td className="py-3 px-4">Rs. {record.gsa.toFixed(2)}</td>
                    <td className="py-3 px-4">{record.rate}%</td>
                    <td className="py-3 px-4 font-semibold text-[#4CAF50]">
                      Rs. {record.finalRate.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      Rs. {record.totalPayout.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-[#e8f5e8] text-[#4CAF50]">
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#666]">{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* No Results Message */}
            {getFilteredHistory().length === 0 && (
              <div className="text-center py-8 text-[#666]">
                <p>No records found matching the selected filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
