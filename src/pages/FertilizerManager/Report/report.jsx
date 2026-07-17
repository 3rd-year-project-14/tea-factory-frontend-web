import React, { useState } from "react";
import { FileText, Search, Calendar } from "lucide-react";
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
import { Line } from "react-chartjs-2";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/ui/EmptyState";
import { useTheme } from "../../../contexts/ThemeContext";

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
    title: "Supplier Performance",
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

const getChartData = (type, lineColor) => {
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
        borderColor: lineColor,
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };
};

const ReportPage = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const lineColor = isDark ? "#4ADE9E" : "#165E52";
  const axisColor = isDark ? "#A0ABA3" : "#374151";

  const filteredReports = sampleReports.filter(
    (r) =>
      (type === "All" || r.type === type) &&
      (r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
          Reports
        </h1>
      </Card>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-muted-dark w-5 h-5" />
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-card dark:bg-card-dark text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40 transition text-sm shadow-soft w-full"
          />
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-card dark:bg-card-dark text-ink dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40 transition text-sm shadow-soft"
        >
          {reportTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <Card className="!p-0 overflow-hidden">
          <EmptyState icon={FileText} title="No reports found" description="" />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card
              key={report.id}
              hoverable
              className="group flex flex-col gap-4 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-tea-700 dark:text-tea-300 group-hover:text-tea-800 dark:group-hover:text-tea-200 transition-colors" />
                <h2 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark group-hover:text-tea-700 dark:group-hover:text-tea-300 transition-colors">
                  {report.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-ink/50 dark:text-muted-dark text-xs">
                <Calendar className="w-4 h-4" />
                <span>{new Date(report.date).toLocaleDateString()}</span>
                <span className="mx-1">•</span>
                <Badge variant="success">{report.type}</Badge>
              </div>

              <p className="text-sm text-ink/80 dark:text-ink-dark/80 leading-relaxed flex-1">
                {report.summary}
              </p>

              {report.type !== "All" && (
                <div className="mt-2">
                  <Line
                    data={getChartData(report.type, lineColor)}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: {
                          title: { display: true, text: "Month", color: axisColor },
                          ticks: { color: axisColor },
                        },
                        y: { display: false },
                      },
                    }}
                    height={120}
                  />
                </div>
              )}

              <Button variant="primary" className="mt-auto justify-center">
                View Report
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportPage;
