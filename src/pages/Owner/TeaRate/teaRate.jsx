import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Edit3,
  Eye,
  Factory,
  FileSpreadsheet,
  FileText,
  History,
  RefreshCw,
  Search,
  TrendingUp,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedFactory, setSelectedFactory] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [editingRate, setEditingRate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    format: "pdf",
    reportType: "summary",
    dateRange: "current_month",
    includeCharts: true,
    includePending: true,
    includeApproved: true,
    includeRejected: true,
    factories: "all",
  });

  // State for pending and processed rates
  const [pendingRates, setPendingRates] = useState([
    {
      id: 1,
      factoryName: "TeaFactory - Kandy",
      manager: "Dasun Perera",
      submittedDate: "2025-07-03",
      month: "July 2025",
      currentRate: 21.5,
      proposedRate: 23.0,
      nsa: 850.0,
      gsa: 920.0,
      totalWeight: 15420,
      totalPayout: 354860,
      status: "pending",
      urgent: true,
    },
    {
      id: 2,
      factoryName: "Highland Tea Co.",
      manager: "Priya Fernando",
      submittedDate: "2025-07-02",
      month: "July 2025",
      currentRate: 20.0,
      proposedRate: 22.5,
      nsa: 780.0,
      gsa: 890.0,
      totalWeight: 12800,
      totalPayout: 288000,
      status: "pending",
      urgent: false,
    },
    {
      id: 3,
      factoryName: "Valley Green Tea",
      manager: "Rajesh Silva",
      submittedDate: "2025-07-01",
      month: "July 2025",
      currentRate: 19.5,
      proposedRate: 21.0,
      nsa: 720.0,
      gsa: 810.0,
      totalWeight: 11200,
      totalPayout: 235200,
      status: "pending",
      urgent: false,
    },
  ]);

  const [processedRates, setProcessedRates] = useState([
    {
      id: 4,
      factoryName: "TeaFactory - Kandy",
      manager: "Dasun Perera",
      submittedDate: "2025-06-28",
      processedDate: "2025-06-29",
      month: "June 2025",
      originalRate: 20.5,
      finalRate: 21.5,
      adjustedBy: "Owner",
      status: "approved",
      totalPayout: 332400,
    },
    {
      id: 5,
      factoryName: "Highland Tea Co.",
      manager: "Priya Fernando",
      submittedDate: "2025-06-25",
      processedDate: "2025-06-26",
      month: "June 2025",
      originalRate: 19.0,
      finalRate: 19.0,
      adjustedBy: null,
      status: "approved",
      totalPayout: 243200,
    },
    {
      id: 6,
      factoryName: "Mountain Peak Tea",
      manager: "Sunil Kumar",
      submittedDate: "2025-06-20",
      processedDate: "2025-06-21",
      month: "June 2025",
      originalRate: 22.0,
      finalRate: 20.5,
      adjustedBy: "Owner",
      status: "rejected",
      reason: "Rate too high for current market conditions",
      totalPayout: 0,
    },
  ]);

  const factories = [
    "TeaFactory - Kandy",
    "Highland Tea Co.",
    "Valley Green Tea",
    "Mountain Peak Tea",
  ];

  const handleApprove = (rateId, adjustedRate = null) => {
    const rateIndex = pendingRates.findIndex((r) => r.id === rateId);
    if (rateIndex === -1) return;

    const approvedRate = { ...pendingRates[rateIndex] };
    if (adjustedRate !== null) {
      approvedRate.finalRate = adjustedRate;
      approvedRate.adjustedBy = "Owner";
    } else {
      approvedRate.finalRate = approvedRate.proposedRate;
      approvedRate.adjustedBy = null;
    }
    approvedRate.status = "approved";
    approvedRate.processedDate = new Date().toISOString().split("T")[0];

    setPendingRates((prev) => prev.filter((r) => r.id !== rateId));
    setProcessedRates((prev) => [approvedRate, ...prev]);
    setEditingRate(null);
  };

  const handleReject = (rateId, reason) => {
    const rateIndex = pendingRates.findIndex((r) => r.id === rateId);
    if (rateIndex === -1) return;

    const rejectedRate = { ...pendingRates[rateIndex] };
    rejectedRate.status = "rejected";
    rejectedRate.reason = reason || "No reason provided";
    rejectedRate.processedDate = new Date().toISOString().split("T")[0];

    setPendingRates((prev) => prev.filter((r) => r.id !== rateId));
    setProcessedRates((prev) => [rejectedRate, ...prev]);
    setEditingRate(null);
  };

  const generateReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      config: exportConfig,
      data: {
        pending: exportConfig.includePending ? filteredRates(pendingRates) : [],
        processed: [
          ...(exportConfig.includeApproved
            ? processedRates.filter((r) => r.status === "approved")
            : []),
          ...(exportConfig.includeRejected
            ? processedRates.filter((r) => r.status === "rejected")
            : []),
        ],
      },
      summary: {
        totalPendingRates: pendingRates.length,
        totalApprovedRates: processedRates.filter(
          (r) => r.status === "approved"
        ).length,
        totalRejectedRates: processedRates.filter(
          (r) => r.status === "rejected"
        ).length,
        totalFactories: factories.length,
        avgRateIncrease: 5.2,
        totalPayouts: processedRates.reduce(
          (sum, rate) => sum + (rate.totalPayout || 0),
          0
        ),
      },
    };

    if (exportConfig.format === "pdf") {
      generatePDFReport(reportData);
    } else if (exportConfig.format === "excel") {
      generateExcelReport(reportData);
    } else if (exportConfig.format === "csv") {
      generateCSVReport(reportData);
    }

    setShowExportModal(false);
  };

  const generatePDFReport = (data) => {
    const reportContent = `
Tea Rate Management Report
Generated on: ${new Date(data.generatedAt).toLocaleString()}

SUMMARY:
- Total Pending Rates: ${data.summary.totalPendingRates}
- Total Approved Rates: ${data.summary.totalApprovedRates}
- Total Rejected Rates: ${data.summary.totalRejectedRates}
- Total Factories: ${data.summary.totalFactories}
- Average Rate Increase: ${data.summary.avgRateIncrease}%
- Total Payouts: Rs. ${data.summary.totalPayouts.toLocaleString()}

PENDING RATES:
${data.data.pending
  .map(
    (rate) =>
      `Factory: ${rate.factoryName}
   Manager: ${rate.manager}
   Month: ${rate.month}
   Current Rate: Rs. ${rate.currentRate}
   Proposed Rate: Rs. ${rate.proposedRate}
   Total Weight: ${rate.totalWeight} kg
   Total Payout: Rs. ${rate.totalPayout.toLocaleString()}
   Status: ${rate.urgent ? "URGENT" : "Normal"}
   ---`
  )
  .join("\n")}

PROCESSED RATES:
${data.data.processed
  .map(
    (rate) =>
      `Factory: ${rate.factoryName}
   Manager: ${rate.manager}
   Month: ${rate.month}
   Original Rate: Rs. ${rate.originalRate}
   Final Rate: Rs. ${rate.finalRate}
   Status: ${rate.status.toUpperCase()}
   ${rate.adjustedBy ? `Adjusted by: ${rate.adjustedBy}` : ""}
   ${rate.reason ? `Reason: ${rate.reason}` : ""}
   ---`
  )
  .join("\n")}
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tea-rate-report-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generateExcelReport = (data) => {
    const headers = [
      "Factory Name",
      "Manager",
      "Month",
      "Submission Date",
      "Current Rate",
      "Proposed/Final Rate",
      "Total Weight (kg)",
      "Total Payout (Rs.)",
      "Status",
      "Notes",
    ];

    const rows = [];

    data.data.pending.forEach((rate) => {
      rows.push([
        rate.factoryName,
        rate.manager,
        rate.month,
        rate.submittedDate,
        rate.currentRate,
        rate.proposedRate,
        rate.totalWeight,
        rate.totalPayout,
        rate.urgent ? "PENDING (URGENT)" : "PENDING",
        rate.urgent ? "Requires immediate attention" : "",
      ]);
    });

    data.data.processed.forEach((rate) => {
      rows.push([
        rate.factoryName,
        rate.manager,
        rate.month,
        rate.submittedDate,
        rate.originalRate,
        rate.finalRate,
        "", // weight not available in processed data
        rate.totalPayout || 0,
        rate.status.toUpperCase(),
        rate.reason ||
          (rate.adjustedBy ? `Adjusted by ${rate.adjustedBy}` : ""),
      ]);
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tea-rate-report-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generateCSVReport = (data) => {
    generateExcelReport(data);
  };

  const ExportModal = () => (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-white/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-[#cfece6]">
        <div className="flex justify-between items-center p-6 border-b border-[#cfece6]">
          <h2 className="text-xl font-semibold text-[#165E52]">
            Export Report
          </h2>
          <button
            onClick={() => setShowExportModal(false)}
            className="text-[#165E52] opacity-80 hover:opacity-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Report Format */}
          <div>
            <label className="block text-sm font-medium text-[#165E52] mb-3">
              Report Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() =>
                  setExportConfig({ ...exportConfig, format: "pdf" })
                }
                className={`p-4 rounded-lg border-2 transition-all ${
                  exportConfig.format === "pdf"
                    ? "border-[#165E52] bg-[#e1f4ef]"
                    : "border-[#cfece6] hover:border-[#165E52]"
                }`}
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-sm font-medium text-black">PDF Report</div>
                <div className="text-xs text-[#165E52] opacity-80">
                  Formatted document
                </div>
              </button>
              <button
                onClick={() =>
                  setExportConfig({ ...exportConfig, format: "excel" })
                }
                className={`p-4 rounded-lg border-2 transition-all ${
                  exportConfig.format === "excel"
                    ? "border-[#165E52] bg-[#e1f4ef]"
                    : "border-[#cfece6] hover:border-[#165E52]"
                }`}
              >
                <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium text-black">Excel</div>
                <div className="text-xs text-[#165E52] opacity-80">
                  Spreadsheet format
                </div>
              </button>
              <button
                onClick={() =>
                  setExportConfig({ ...exportConfig, format: "csv" })
                }
                className={`p-4 rounded-lg border-2 transition-all ${
                  exportConfig.format === "csv"
                    ? "border-[#165E52] bg-[#e1f4ef]"
                    : "border-[#cfece6] hover:border-[#165E52]"
                }`}
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium text-black">CSV</div>
                <div className="text-xs text-[#165E52] opacity-80">
                  Raw data
                </div>
              </button>
            </div>
          </div>

          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-[#165E52] mb-3">
              Report Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="summary"
                  checked={exportConfig.reportType === "summary"}
                  onChange={(e) =>
                    setExportConfig({
                      ...exportConfig,
                      reportType: e.target.value,
                    })
                  }
                  className="mr-3 accent-[#165E52]"
                />
                <div>
                  <div className="font-medium text-black">Summary Report</div>
                  <div className="text-sm text-[#165E52] opacity-80">
                    Key metrics and overview
                  </div>
                </div>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="detailed"
                  checked={exportConfig.reportType === "detailed"}
                  onChange={(e) =>
                    setExportConfig({
                      ...exportConfig,
                      reportType: e.target.value,
                    })
                  }
                  className="mr-3 accent-[#165E52]"
                />
                <div>
                  <div className="font-medium text-black">Detailed Report</div>
                  <div className="text-sm text-[#165E52] opacity-80">
                    Complete data with all fields
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-[#165E52] mb-3">
              Date Range
            </label>
            <div className="min-w-64 w-64">
              <select
                value={exportConfig.dateRange}
                onChange={(e) =>
                  setExportConfig({
                    ...exportConfig,
                    dateRange: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-[#cfece6] rounded-lg bg-white text-black focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52] appearance-none shadow-sm"
              >
                <option value="current_month">Current Month</option>
                <option value="last_month">Last Month</option>
                <option value="last_3_months">Last 3 Months</option>
                <option value="last_6_months">Last 6 Months</option>
                <option value="current_year">Current Year</option>
                <option value="all_time">All Time</option>
              </select>
            </div>
          </div>

          {/* Include Data Types */}
          <div>
            <label className="block text-sm font-medium text-[#165E52] mb-3">
              Include Data
            </label>
            <div className="min-w-64 w-64 bg-white rounded-lg p-4 border border-[#cfece6] shadow-sm">
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportConfig.includePending}
                    onChange={(e) =>
                      setExportConfig({
                        ...exportConfig,
                        includePending: e.target.checked,
                      })
                    }
                    className="mr-3 accent-[#165E52]"
                  />
                  <span className="text-black">
                    Pending Rates ({pendingRates.length})
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportConfig.includeApproved}
                    onChange={(e) =>
                      setExportConfig({
                        ...exportConfig,
                        includeApproved: e.target.checked,
                      })
                    }
                    className="mr-3 accent-green-600"
                  />
                  <span className="text-black">
                    Approved Rates (
                    {
                      processedRates.filter((r) => r.status === "approved")
                        .length
                    }
                    )
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportConfig.includeRejected}
                    onChange={(e) =>
                      setExportConfig({
                        ...exportConfig,
                        includeRejected: e.target.checked,
                      })
                    }
                    className="mr-3 accent-red-600"
                  />
                  <span className="text-black">
                    Rejected Rates (
                    {
                      processedRates.filter((r) => r.status === "rejected")
                        .length
                    }
                    )
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Factory Selection */}
          <div>
            <label className="block text-sm font-medium text-[#165E52] mb-3">
              Factories
            </label>
            <div className="min-w-64 w-64">
              <select
                value={exportConfig.factories}
                onChange={(e) =>
                  setExportConfig({
                    ...exportConfig,
                    factories: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-[#cfece6] rounded-lg bg-white text-black focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52] appearance-none shadow-sm"
              >
                <option value="all">All Factories</option>
                {factories.map((factory) => (
                  <option
                    key={factory}
                    value={factory}
                    className="bg-white text-black"
                  >
                    {factory}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Options */}
          {exportConfig.format === "pdf" && (
            <div className="min-w-64 w-64 bg-white rounded-lg p-4 border border-[#cfece6] shadow-sm mt-4">
              <label className="block text-sm font-medium text-[#165E52] mb-3">
                Additional Options
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exportConfig.includeCharts}
                  onChange={(e) =>
                    setExportConfig({
                      ...exportConfig,
                      includeCharts: e.target.checked,
                    })
                  }
                  className="mr-3 accent-purple-600"
                />
                <span className="text-black">Include Charts and Graphs</span>
              </label>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-[#cfece6] bg-[#f8fdfc]">
          <button
            onClick={() => setShowExportModal(false)}
            className="px-4 py-2 text-[#165E52] bg-white border border-[#cfece6] rounded-lg hover:bg-[#e1f4ef]"
          >
            Cancel
          </button>
          <button
            onClick={generateReport}
            className="px-6 py-2 bg-[#01251F] text-white rounded-lg hover:bg-[#01251F] flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );

  const AdjustRateForm = ({ rate, onApprove, onCancel }) => {
    const [adjustedRate, setAdjustedRate] = useState(rate.proposedRate);
    const [reason, setReason] = useState("");
    return (
      <div className="mt-4 p-4 bg-[#e1f4ef] rounded-lg border border-[#cfece6] shadow-sm">
        <h4 className="font-semibold mb-3 text-[#165E52]">Adjust Rate</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#165E52] mb-1">
              Adjusted Rate (Rs.)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={adjustedRate}
              onChange={(e) => setAdjustedRate(e.target.value)}
              className="w-full p-2 border border-[#cfece6] rounded-lg focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52] bg-white text-black"
              placeholder="Enter adjusted rate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#165E52] mb-1">
              Adjustment Reason
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-[#cfece6] rounded-lg focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52] bg-white text-black"
              placeholder="Reason for adjustment"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onApprove(Number(adjustedRate), reason)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Apply & Approve
          </button>
          <button
            onClick={onCancel}
            className="bg-[#01251F] hover:bg-[#01251F] text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const RateCard = ({ rate, type = "pending" }) => (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-4 ${
        rate.urgent && type === "pending"
          ? "border-red-500"
          : rate.status === "approved"
          ? "border-green-500"
          : rate.status === "rejected"
          ? "border-red-500"
          : "border-[#165E52]"
      } border border-[#cfece6] p-6 mb-4`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-[#165E52]" />
            <h3 className="text-lg font-semibold text-black">
              {rate.factoryName}
            </h3>
            {rate.urgent && type === "pending" && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Urgent
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#165E52] opacity-80 mt-1">
            <User className="w-4 h-4" />
            <span>Manager: {rate.manager}</span>
            <span className="mx-2">•</span>
            <Calendar className="w-4 h-4" />
            <span>{rate.month}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-[#165E52] opacity-80">
            Submitted: {new Date(rate.submittedDate).toLocaleDateString()}
          </div>
          {rate.processedDate && (
            <div className="text-sm text-[#165E52] opacity-80">
              Processed: {new Date(rate.processedDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-[#f8fdfc] p-3 rounded border border-[#cfece6]">
          <div className="text-sm text-[#165E52] opacity-80">Current Rate</div>
          <div className="text-lg font-semibold text-black">
            Rs. {(rate.currentRate || rate.originalRate || 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-[#e1f4ef] p-3 rounded border border-[#cfece6]">
          <div className="text-sm text-[#165E52] opacity-80">
            {type === "pending" ? "Proposed Rate" : "Final Rate"}
          </div>
          <div className="text-lg font-semibold text-[#165E52]">
            Rs. {(rate.proposedRate || rate.finalRate || 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded border border-[#cfece6]">
          <div className="text-sm text-[#165E52] opacity-80">Total Weight</div>
          <div className="text-lg font-semibold text-green-600">
            {(rate.totalWeight || 0).toLocaleString()} kg
          </div>
        </div>
        <div className="bg-yellow-50 p-3 rounded border border-[#cfece6]">
          <div className="text-sm text-[#165E52] opacity-80">Total Payout</div>
          <div className="text-lg font-semibold text-yellow-600">
            Rs. {(rate.totalPayout || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {type === "pending" && rate.nsa && rate.gsa && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-[#f8fdfc] p-3 rounded border border-[#cfece6]">
            <div className="text-sm text-[#165E52] opacity-80">
              N.S.A (Net Sale Average)
            </div>
            <div className="text-lg font-semibold text-black">
              Rs. {rate.nsa.toFixed(2)}
            </div>
          </div>
          <div className="bg-[#f8fdfc] p-3 rounded border border-[#cfece6]">
            <div className="text-sm text-[#165E52] opacity-80">
              G.S.A (Gross Sale Average)
            </div>
            <div className="text-lg font-semibold text-black">
              Rs. {rate.gsa.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {type === "processed" && rate.status === "rejected" && rate.reason && (
        <div className="bg-red-50 border border-red-200 p-3 rounded mb-4">
          <div className="text-sm text-red-800">
            <strong>Rejection Reason:</strong> {rate.reason}
          </div>
        </div>
      )}

      {type === "processed" && rate.adjustedBy && (
        <div className="bg-[#e1f4ef] border border-[#cfece6] p-3 rounded mb-4">
          <div className="text-sm text-[#165E52]">
            <strong>Rate adjusted by:</strong> {rate.adjustedBy}
            (from Rs. {rate.originalRate} to Rs. {rate.finalRate})
          </div>
        </div>
      )}

      {type === "pending" && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleApprove(rate.id)}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => setEditingRate(rate.id)}
            className="bg-[#01251F] hover:bg-[#01251F] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Adjust & Approve
          </button>
          <button
            onClick={() => handleReject(rate.id, "Rate adjustment required")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>
          <button className="bg-[#165E52] hover:bg-[#165E52] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      )}

      {editingRate === rate.id && (
        <AdjustRateForm
          rate={rate}
          onApprove={(adjustedRate, reason) => {
            handleApprove(rate.id, adjustedRate);
            setEditingRate(null);
          }}
          onCancel={() => setEditingRate(null)}
        />
      )}
    </div>
  );

  const filteredRates = (rates) => {
    return rates.filter((rate) => {
      const matchesFactory =
        selectedFactory === "all" || rate.factoryName === selectedFactory;
      const matchesMonth =
        selectedMonth === "all" || rate.month.includes(selectedMonth);
      const matchesSearch =
        rate.factoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rate.manager.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFactory && matchesMonth && matchesSearch;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fdfc]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-[#165E52]">
                Tea Rate Management
              </h1>
              <p className="text-[#165E52] opacity-80 mt-1">
                Owner Dashboard - Rate Approval & Management
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowExportModal(true)}
                className="bg-[#01251F] hover:bg-[#01251F] text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="bg-[#165E52] hover:bg-[#165E52] text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              {/* <div className="relative">
                <Bell className="w-6 h-6 text-[#165E52]" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                {/* Remove colored text, use neutral black */}
                <p className="text-sm text-black opacity-80">
                  Pending Approvals
                </p>
                <p className="text-3xl font-bold text-black">3</p>
              </div>
              {/* Icon in neutral black or default color */}
              <Clock className="w-8 h-8 text-black" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black opacity-80">
                  Approved This Month
                </p>
                <p className="text-3xl font-bold text-black">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-black" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black opacity-80">Total Factories</p>
                <p className="text-3xl font-bold text-black">8</p>
              </div>
              <Factory className="w-8 h-8 text-black" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black opacity-80">Avg Rate Change</p>
                {/* Remove purple, make value text black */}
                <p className="text-3xl font-bold text-black">+5.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-black" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur p-6 rounded-lg shadow-sm border border-[#cfece6] mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#165E52] opacity-80" />
                <input
                  type="text"
                  placeholder="Search factories or managers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#cfece6] rounded-lg bg-white text-black focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52]"
                />
              </div>
            </div>
            <div className="min-w-64 w-64">
              <select
                value={selectedFactory}
                onChange={(e) => setSelectedFactory(e.target.value)}
                className="w-full px-4 py-2 border border-[#cfece6] rounded-lg bg-white text-black focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52] appearance-none shadow-sm"
              >
                <option value="all">All Factories</option>
                {factories.map((factory) => (
                  <option
                    key={factory}
                    value={factory}
                    className="bg-white text-black"
                  >
                    {factory}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-64 w-64">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 border border-[#cfece6] rounded-lg bg-white text-black focus:ring-2 focus:ring-[#165E52] focus:border-[#165E52] appearance-none shadow-sm"
              >
                <option value="all">All Months</option>
                <option value="July">July 2025</option>
                <option value="June">June 2025</option>
                <option value="May">May 2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-[#cfece6]">
          <div className="border-b border-[#cfece6]">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "pending"
                    ? "border-[#165E52] text-[#165E52]"
                    : "border-transparent text-[#165E52] opacity-80 hover:opacity-100 hover:border-[#cfece6]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pending Approvals
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {filteredRates(pendingRates).length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "history"
                    ? "border-[#165E52] text-[#165E52]"
                    : "border-transparent text-[#165E52] opacity-80 hover:opacity-100 hover:border-[#cfece6]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Rate History
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "pending" && (
              <div>
                {filteredRates(pendingRates).length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-[#cfece6] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[#165E52] mb-2">
                      No Pending Rates
                    </h3>
                    <p className="text-[#165E52] opacity-80">
                      All rate submissions have been processed.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-[#165E52]">
                        Pending Rate Approvals (
                        {filteredRates(pendingRates).length})
                      </h3>
                    </div>
                    {filteredRates(pendingRates).map((rate) => (
                      <RateCard key={rate.id} rate={rate} type="pending" />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div>
                {filteredRates(processedRates).length === 0 ? (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 text-[#cfece6] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[#165E52] mb-2">
                      No Rate History
                    </h3>
                    <p className="text-[#165E52] opacity-80">
                      No processed rates found for the selected filters.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-[#165E52]">
                        Rate Processing History (
                        {filteredRates(processedRates).length})
                      </h3>
                    </div>
                    {filteredRates(processedRates).map((rate) => (
                      <RateCard key={rate.id} rate={rate} type="processed" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && <ExportModal />}
    </div>
  );
};

export default OwnerDashboard;
