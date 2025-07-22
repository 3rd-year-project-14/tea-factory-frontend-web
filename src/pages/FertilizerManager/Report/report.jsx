import React, { useState } from "react";
import { FileText, Search, Calendar, BarChart2 } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ACCENT_COLOR = "#165E52";
const BTN_COLOR = "#01251F";
const BORDER_COLOR = "#cfece6";
const BG_LIGHT = "#e1f4ef";

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

// Helper to get chart data by report type
const getChartData = (type) => {
  const labels = ["Apr", "May", "Jun", "Jul"];
  const datasets = {
    Usage: [100, 120, 150, 170],
    Supplier: [80, 85, 78, 90],
    Stock: [300, 270, 260, 240],
    Requests: [50, 60, 65, 70],
  };

  return {
    labels,
    datasets: [
      {
        label: `${type} Trend`,
        data: datasets[type] || [],
        fill: false,
        borderColor: ACCENT_COLOR,
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };
};

// Summary Bar Chart Data (latest values as in mini-charts above)
const barChartData = {
  labels: ["Usage", "Supplier", "Stock", "Requests"],
  datasets: [
    {
      label: "Latest Metrics",
      data: [170, 90, 240, 70], // These should match the last value of each type's dataset
      backgroundColor: [
        "#165E52",
        "#2a7f64",
        "#4aab85",
        "#70c1a0"
      ],
      borderRadius: 8,
      barThickness: 48,
      borderSkipped: false,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: "Summary by Report Type",
      color: "#165E52",
      font: { size: 24 },
    },
  },
  scales: {
    x: { ticks: { color: "#165E52", font: { weight: "bold" } } },
    y: {
      beginAtZero: true,
      ticks: { color: "#6B7280" },
      grid: { color: BG_LIGHT },
    },
  },
};

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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* BIG BAR CHART AT THE TOP */}
        <div className="mb-10 w-full max-w-3xl mx-auto">
          <Bar data={barChartData} options={barChartOptions} height={120} />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-8 h-8 text-[#165E52]" />
            <h1 className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>
              Reports
            </h1>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-[#cfece6] bg-white focus:ring-2 focus:ring-[#165E52] focus:border-transparent transition text-sm shadow-sm w-64"
              />
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-[#cfece6] bg-white focus:ring-2 focus:ring-[#165E52] focus:border-transparent transition-all text-sm shadow-sm"
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
                className="group bg-white rounded-2xl border p-6 flex flex-col gap-4 transition-all hover:shadow-lg hover:-translate-y-1 duration-200"
                style={{ borderColor: BORDER_COLOR }}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#165E52] group-hover:text-black transition-colors" />
                  <h2
                    className="text-lg font-semibold text-gray-900 group-hover:text-[#165E52] transition-colors"
                    style={{ lineHeight: "1.3" }}
                  >
                    {report.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: BG_LIGHT,
                      color: ACCENT_COLOR,
                    }}
                  >
                    {report.type}
                  </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed flex-1">
                  {report.summary}
                </p>

                {/* Mini line chart below summary */}
                {report.type !== "All" && (
                  <div className="mt-2">
                    <Line
                      data={getChartData(report.type)}
                      options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: {
                            title: { display: true, text: "Month" },
                          },
                          y: {
                            display: false,
                          },
                        },
                      }}
                      height={120}
                    />
                  </div>
                )}

                <button
                  className="mt-auto px-4 py-2 rounded-lg text-white font-medium shadow transition-all"
                  style={{
                    backgroundColor: BTN_COLOR,
                  }}
                >
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
