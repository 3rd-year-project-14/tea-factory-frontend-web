import React, { useState } from "react";
import { FileText, Search, Filter, Calendar, BarChart2 } from "lucide-react";

const sampleReports = [
  {
    id: 1,
    title: "Monthly Fertilizer Usage",
    date: "2025-06-30",
    type: "Usage",
    summary: "Overview of fertilizer usage for June 2025.",
  },
  {
    id: 2,
    title: "Supplier Performance Q2",
    date: "2025-06-28",
    type: "Supplier",
    summary: "Performance metrics for all suppliers in Q2.",
  },
  {
    id: 3,
    title: "Stock Level Trends",
    date: "2025-06-25",
    type: "Stock",
    summary: "Analysis of fertilizer stock levels over the last quarter.",
  },
  {
    id: 4,
    title: "Request Fulfillment Rate",
    date: "2025-06-20",
    type: "Requests",
    summary: "Report on fulfillment rates for fertilizer requests.",
  },
];

const reportTypes = ["All", "Usage", "Supplier", "Stock", "Requests"];

const ReportPage = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const filteredReports = sampleReports.filter(
    (r) =>
      (type === "All" || r.type === type) &&
      (r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all text-gray-900 shadow-sm"
              />
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all text-gray-900 shadow-sm"
            >
              {reportTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-16">
              No reports found.
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="group bg-white rounded-2xl border border-green-100 shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-6 h-6 text-green-500 group-hover:text-green-700 transition-colors" />
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    {report.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    {report.type}
                  </span>
                </div>
                <p className="text-gray-700 flex-1">{report.summary}</p>
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow">
                  View Report
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
