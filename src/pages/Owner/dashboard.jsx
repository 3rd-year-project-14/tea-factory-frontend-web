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

const ACCENT_COLOR = "#165e52";
const BUTTON_COLOR = "#172526";
const BORDER_COLOR = "#cfece6";
const CARD_BG = "#fff";

const suppliers = [
  { name: "Supplier - A", weight: "485 kg" },
  { name: "Supplier - B", weight: "412 kg" },
  { name: "Supplier - C", weight: "387 kg" },
  { name: "Supplier - D", weight: "342 kg" },
  { name: "Supplier - E", weight: "298 kg" },
];

const monthlySupplyData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Tea Collected (kg)",
      data: [
        12000, 15000, 14000, 16000, 17000, 15500, 16500, 18000, 17500, 19000,
        20000, 21000,
      ],
      borderColor: ACCENT_COLOR,
      backgroundColor: "rgba(22, 94, 82, 0.3)",
      fill: true,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
  ],
};

const monthlySupplyOptions = {
  responsive: true,
  interaction: {
    mode: "nearest",
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      labels: { color: BUTTON_COLOR },
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      backgroundColor: ACCENT_COLOR,
      titleColor: "#fff",
      bodyColor: "#fff",
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
        modifierKey: "ctrl",
      },
      zoom: {
        wheel: { enabled: true },
        pinch: { enabled: true },
        mode: "x",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: BUTTON_COLOR },
      grid: { color: BORDER_COLOR },
    },
    y: {
      beginAtZero: true,
      ticks: { color: BUTTON_COLOR },
      grid: { color: BORDER_COLOR },
    },
  },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 ">
          <h1
            className="text-3xl font-bold mb-1 text-gray-900"
            // style={{ color: ACCENT_COLOR }}
          >
            Dashboard
          </h1>
          <p className="mt-1 text-base text-gray-600 max-w-2xl">
            Comprehensive reporting system for all your tea factories
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total Tea Collected",
              value: "2,834",
              icon: <TrendingUp size={28} color="black" />,
            },
            {
              label: "Drivers on Duty",
              value: "31",
              icon: <Users size={28} color="black" />,
            },
            {
              label: "Total Payable Amount",
              value: "1,500,234",
              icon: <DollarSign size={28} color="black" />,
            },
            {
              label: "Avg Rate Change",
              value: "+5.2%",
              icon: <TrendingUp size={28} color="black" />,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md border border-black transition duration-200 hover:shadow-lg hover:border-[#cfece6] flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-black">{card.label}</p>
                <p className="text-2xl font-bold text-black">{card.value}</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                {card.icon}
              </div>
            </div>
          ))}
        </section>

        {/* Charts & Top Suppliers */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Monthly Supply Chart with zoom & pan */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black flex flex-col">
            <h3
              className="text-lg font-semibold text-black mb-5"
              style={{ color: ACCENT_COLOR }}
            >
              Monthly Supply Chart
            </h3>
            <div className="flex-1 min-h-[320px]">
              <Line data={monthlySupplyData} options={monthlySupplyOptions} />
            </div>
          </div>

          {/* Top 5 Suppliers */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-black">
            <h3
              className="text-lg font-semibold text-black mb-5"
              style={{ color: ACCENT_COLOR }}
            >
              Top 5 Factory (by tea collecting weight)
            </h3>
            <div className="space-y-4">
              {suppliers.map((supplier, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                  style={{ borderColor: BORDER_COLOR }}
                >
                  <span className="font-medium text-gray-700">
                    {supplier.name}
                  </span>
                  <span className="font-bold" style={{ color: ACCENT_COLOR }}>
                    {supplier.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-black">
          <h3
            className="text-lg font-semibold text-black mb-5"
            style={{ color: ACCENT_COLOR }}
          >
            Quick Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Fertilizer Requests",
                description: "Manage fertilizer distribution requests",
                icon: Leaf,
                iconBg: "bg-green-100",
              },
              {
                title: "Vehicle Management",
                description: "Track and manage transport vehicles",
                icon: Truck,
                iconBg: "bg-blue-100",
              },
              {
                title: "Price Calculator",
                description: "Calculate tea prices and payments",
                icon: Calculator,
                iconBg: "bg-purple-100",
              },
              {
                title: "Route Planning",
                description: "Optimize collection routes",
                icon: MapPin,
                iconBg: "bg-orange-100",
              },
              {
                title: "Schedule Manager",
                description: "Manage collection schedules",
                icon: Calendar,
                iconBg: "bg-red-100",
              },
              {
                title: "Payment System",
                description: "Process supplier payments",
                icon: DollarSign,
                iconBg: "bg-yellow-100",
              },
            ].map(({ title, description, icon: Icon, iconBg }, i) => (
              <div
                key={title}
                className={`rounded-lg p-5 border ${iconBg} hover:shadow-lg transition-shadow cursor-pointer bg-gray-50 flex items-center space-x-4`}
                style={{
                  borderColor: BORDER_COLOR,
                  backgroundColor: "#F0FDF4",
                }}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}
                >
                  <Icon className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                </div>
                <div>
                  <h4
                    className="font-semibold text-gray-800"
                    style={{ color: ACCENT_COLOR }}
                  >
                    {title}
                  </h4>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
