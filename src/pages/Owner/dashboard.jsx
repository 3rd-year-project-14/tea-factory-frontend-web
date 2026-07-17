import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import {
  Leaf,
  Truck,
  Users,
  DollarSign,
  TrendingUp,
  Calculator,
  MapPin,
  Calendar,
} from "lucide-react";
import Card from "../../components/ui/Card";
import { useTheme } from "../../contexts/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const suppliers = [
  { name: "Supplier - A", weight: "485 kg" },
  { name: "Supplier - B", weight: "412 kg" },
  { name: "Supplier - C", weight: "387 kg" },
  { name: "Supplier - D", weight: "342 kg" },
  { name: "Supplier - E", weight: "298 kg" },
];

const monthlySupplyLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const monthlySupplyValues = [
  12000, 15000, 14000, 16000, 17000, 15500, 16500, 18000, 17500, 19000, 20000, 21000,
];

const quickLinks = [
  { title: "Fertilizer Requests", description: "Manage fertilizer distribution requests", icon: Leaf },
  { title: "Vehicle Management", description: "Track and manage transport vehicles", icon: Truck },
  { title: "Price Calculator", description: "Calculate tea prices and payments", icon: Calculator },
  { title: "Route Planning", description: "Optimize collection routes", icon: MapPin },
  { title: "Schedule Manager", description: "Manage collection schedules", icon: Calendar },
  { title: "Payment System", description: "Process supplier payments", icon: DollarSign },
];

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const lineColor = isDark ? "#4ADE9E" : "#165e52";
  const fillColor = isDark ? "rgba(74, 222, 158, 0.15)" : "rgba(22, 94, 82, 0.3)";
  const axisColor = isDark ? "#A0ABA3" : "#172526";
  const gridColor = isDark ? "rgba(160, 171, 163, 0.15)" : "#cfece6";

  const monthlySupplyData = {
    labels: monthlySupplyLabels,
    datasets: [
      {
        label: "Tea Collected (kg)",
        data: monthlySupplyValues,
        borderColor: lineColor,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const monthlySupplyOptions = {
    responsive: true,
    interaction: { mode: "nearest", intersect: false },
    plugins: {
      legend: { display: true, labels: { color: axisColor } },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: lineColor,
        titleColor: "#fff",
        bodyColor: "#fff",
      },
      zoom: {
        pan: { enabled: true, mode: "x", modifierKey: "ctrl" },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "x" },
      },
    },
    scales: {
      x: { ticks: { color: axisColor }, grid: { color: gridColor } },
      y: { beginAtZero: true, ticks: { color: axisColor }, grid: { color: gridColor } },
    },
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <Card className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-ink/60 dark:text-muted-dark">
          Comprehensive reporting system for all your tea factories
        </p>
      </Card>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Tea Collected", value: "2,834", icon: TrendingUp },
          { label: "Drivers on Duty", value: "31", icon: Users },
          { label: "Total Payable Amount", value: "1,500,234", icon: DollarSign },
          { label: "Avg Rate Change", value: "+5.2%", icon: TrendingUp },
        ].map((card, idx) => (
          <Card key={idx} hoverable className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink/60 dark:text-muted-dark">{card.label}</p>
              <p className="text-2xl font-heading font-bold text-ink dark:text-ink-dark mt-1">{card.value}</p>
            </div>
            <div className="h-12 w-12 bg-tea-50 dark:bg-tea-900/30 rounded-full flex items-center justify-center shrink-0">
              <card.icon size={24} className="text-tea-700 dark:text-tea-300" />
            </div>
          </Card>
        ))}
      </section>

      {/* Charts & Top Suppliers */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="flex flex-col">
          <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300 mb-5">
            Monthly Supply Chart
          </h3>
          <div className="flex-1 min-h-[320px]">
            <Line data={monthlySupplyData} options={monthlySupplyOptions} />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300 mb-5">
            Top 5 Factory (by tea collecting weight)
          </h3>
          <div className="space-y-4">
            {suppliers.map((supplier, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b border-tea-100 dark:border-card-border-dark last:border-b-0"
              >
                <span className="font-medium text-ink/80 dark:text-ink-dark/80">
                  {supplier.name}
                </span>
                <span className="font-bold text-tea-700 dark:text-tea-300">
                  {supplier.weight}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Quick Links Section */}
      <Card>
        <h3 className="text-lg font-heading font-semibold text-ink dark:text-ink-dark mb-5">
          Quick Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-lg p-5 border border-tea-100 dark:border-card-border-dark hover:shadow-soft transition-shadow cursor-pointer bg-tea-50/50 dark:bg-tea-900/10 flex items-center space-x-4"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-tea-50 dark:bg-tea-900/30 shrink-0">
                <Icon className="w-6 h-6 text-tea-700 dark:text-tea-300" />
              </div>
              <div>
                <h4 className="font-semibold text-ink dark:text-ink-dark">{title}</h4>
                <p className="text-sm text-ink/60 dark:text-muted-dark">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
