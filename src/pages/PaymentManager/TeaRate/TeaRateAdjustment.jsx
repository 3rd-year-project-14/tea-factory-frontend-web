import { useState, useEffect } from "react";
import {
  Calculator,
  TrendingUp,
  History,
  Send,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react";

const ACCENT_COLOR = "#165E52";
const BUTTON_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const BORDER = "#000000";
const BG_LIGHT_GREEN = "#e1f4ef";

export default function TeaRateAdjustment() {
  const [nsaValue, setNsaValue] = useState("");
  const [gsaValue, setGsaValue] = useState("");
  const [monthlyRate, setMonthlyRate] = useState(21);
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [calculatedRate, setCalculatedRate] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(15420);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterRateType, setFilterRateType] = useState("");

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
  const getMonthName = (monthNum) => months[monthNum - 1];
  const getDefaultRate = (month) =>
    [1, 2, 3, 7, 8].includes(month) ? 21.5 : 21;

  useEffect(() => {
    setMonthlyRate(getDefaultRate(currentMonth));
  }, [currentMonth]);

  useEffect(() => {
    if (gsaValue) {
      const gsa = parseFloat(gsaValue) || 0;
      const gsa68 = gsa * 0.68;
      const rate = gsa68 * (monthlyRate / 100);
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
    setIsSubmitted(true);
    alert("Tea rate submitted for approval!");
  };

  const clearFilters = () => {
    setFilterMonth("");
    setFilterYear("");
    setFilterRateType("");
  };

  const getFilteredHistory = () => {
    let filtered = [...rateHistory];
    if (filterMonth) {
      filtered = filtered.filter((rec) =>
        rec.month.startsWith(filterMonth)
      );
    }
    if (filterYear) {
      filtered = filtered.filter((rec) => rec.month.endsWith(filterYear));
    }
    if (filterRateType === "high") {
      filtered.sort((a, b) => b.finalRate - a.finalRate);
    } else if (filterRateType === "low") {
      filtered.sort((a, b) => a.finalRate - b.finalRate);
    }
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      {/* Header */}
<div className="bg-white shadow-md border-b mb-10" style={{ borderColor: "#cfece6" }}>
  <div className="max-w-7xl mx-auto px-6 py-6">
    <h1 className="text-3xl font-bold mb-1" style={{ color: "#165e52" }}>
      Tea Rate Adjustment Panel
    </h1>
  </div>
</div>



      {/* Input & Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Rate Inputs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Calculator className="h-5 w-5 text-black mr-2" />
            <h2 className="text-lg font-semibold">Rate Inputs</h2>
          </div>

          <div className="bg-gray-50 p-3 mb-4 rounded">
            <label className="text-sm font-medium text-gray-600">
              Current Month
            </label>
            <p className="text-base font-semibold text-black">
              {getMonthName(currentMonth)} 2025
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-600">NSA</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-2 border rounded "
                value={nsaValue}
                onChange={(e) => setNsaValue(e.target.value)}
                placeholder="Net Sale Average"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">GSA *</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-2 border rounded"
                value={gsaValue}
                onChange={(e) => setGsaValue(e.target.value)}
                placeholder="Gross Sale Average"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Monthly Rate %
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full p-2 border rounded "
                value={monthlyRate}
                onChange={(e) =>
                  setMonthlyRate(parseFloat(e.target.value) || 0)
                }
              />
              <p className="text-xs text-gray-400 mt-1">
                Default: {getDefaultRate(currentMonth)}%
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Total Weight (kg)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded "
                value={totalWeight}
                onChange={(e) =>
                  setTotalWeight(parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-black mr-2" />
            <h2 className="text-lg font-semibold">Calculation Results</h2>
          </div>

          <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
            <div>
              <strong>GSA:</strong> Rs. {(parseFloat(gsaValue) || 0).toFixed(2)}
            </div>
            <div>
              <strong>68% of GSA:</strong> Rs.{" "}
              {((parseFloat(gsaValue) || 0) * 0.68).toFixed(2)}
            </div>
            <div>
              <strong>{monthlyRate}%:</strong> Rs. {calculatedRate.toFixed(2)}
            </div>
          </div>

          <div className="mt-4 bg-white-50 border-l-4 border-black-600 p-3 rounded">
            <p className="text-xs text-gray-600 mb-1">Final Rate per Kg</p>
            <p className="text-lg font-bold text-black-600">
              Rs. {calculatedRate.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 bg-white-50 border-l-4 border-black-500 p-3 rounded">
            <p className="text-xs text-gray-600 mb-1">Total Payout</p>
            <p className="text-lg font-bold text-black-800">
              Rs. {totalPayout.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Based on {totalWeight.toLocaleString()} kg
            </p>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSubmit}
              disabled={!gsaValue || calculatedRate === 0 || isSubmitted}
              className={`w-full px-5 py-2 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                isSubmitted
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : "bg-[#01251F] text-white hover:bg-[#104239]"
              }`}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitted ? "Submitted" : "Submit for Approval"}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
     {/* Rate History Filters - Styled like SupplierFilters */}
<div
  className="bg-white rounded-lg shadow-md border mb-6"
  style={{ borderColor: BORDER_COLOR }}
>
  <div className="p-4">
    {/* 🔍 Search + Toggle */}
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
      {/* You can remove this block if search not needed */}
      <div className="flex-1 max-w-md">
        
      </div>

      {/* Toggle Button */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm"
          style={{
            backgroundColor: BG_LIGHT_GREEN,
            color: ACCENT_COLOR,
            border: `2px solid ${BORDER_COLOR}`,
          }}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          <ChevronDown
            className={`h-4 w-4 ml-2 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>

    {/* Advanced Filters */}
    {showFilters && (
      <div
        className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border"
        style={{ borderColor: BORDER_COLOR }}
      >
        {/* Month Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Month
          </label>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="w-full p-2 rounded-md text-sm focus:ring-2 focus:ring-[#165E52] focus:outline-none text-gray-900"
            style={{ borderColor: BORDER_COLOR }}
          >
            <option value="">All Months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-full p-2 rounded-md text-sm focus:ring-2 focus:ring-[#165E52] focus:outline-none text-gray-900"
            style={{ borderColor: BORDER_COLOR }}
          >
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Rate Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by Final Rate
          </label>
          <select
            value={filterRateType}
            onChange={(e) => setFilterRateType(e.target.value)}
            className="w-full p-2 rounded-md text-sm focus:ring-2 focus:ring-[#165E52] focus:outline-none text-gray-900"
            style={{ borderColor: BORDER_COLOR }}
          >
            <option value="">Default</option>
            <option value="high">High to Low</option>
            <option value="low">Low to High</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors"
            style={{
              backgroundColor: BG_LIGHT_GREEN,
              color: ACCENT_COLOR,
              border: `2px solid ${BORDER_COLOR}`,
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
    )}
  </div>
</div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md border overflow-x-auto">
        <table className="min-w-full text-sm table-auto">
          <thead style={{ backgroundColor: BUTTON_COLOR, color: "white" }}>
            <tr>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">NSA</th>
              <th className="px-4 py-3 text-left">GSA</th>
              <th className="px-4 py-3 text-left">Rate %</th>
              <th className="px-4 py-3 text-left">Final Rate</th>
              <th className="px-4 py-3 text-left">Total Payout</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredHistory().map((record, i) => (
              <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">

                <td className="px-4 py-3">{record.month}</td>
                <td className="px-4 py-3">Rs. {record.nsa.toFixed(2)}</td>
                <td className="px-4 py-3">Rs. {record.gsa.toFixed(2)}</td>
                <td className="px-4 py-3">{record.rate}%</td>
                <td className="px-4 py-3 text-green-700 font-semibold">Rs. {record.finalRate.toFixed(2)}</td>
                <td className="px-4 py-3 font-semibold">Rs. {record.totalPayout.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 border rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: "#e1f4ef",
                      color: ACCENT_COLOR,
                      borderColor: ACCENT_COLOR,
                    }}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{record.date}</td>
              </tr>
            ))}
            {getFilteredHistory().length === 0 && (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-400">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
