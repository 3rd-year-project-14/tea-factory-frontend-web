import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdvanceChart = ({ data, selectedMonth, selectedYear }) => {
  // Internal toggle state - default to daily view
  const [viewType, setViewType] = useState("daily");
  const currentDate = new Date();

  // Generate chart data based on view type
  const getChartData = () => {
    if (viewType === "daily") {
      // Generate daily data for the selected month (or current month if not specified)
      const monthToUse =
        selectedMonth !== undefined ? selectedMonth : currentDate.getMonth();
      const yearToUse =
        selectedYear !== undefined ? selectedYear : currentDate.getFullYear();

      const daysInMonth = new Date(yearToUse, monthToUse + 1, 0).getDate();
      const monthName = new Date(yearToUse, monthToUse).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      );

      const dailyLabels = Array.from(
        { length: daysInMonth },
        (_, i) => `${i + 1}`
      );
      const dailyData = Array.from(
        { length: daysInMonth },
        () => Math.floor(Math.random() * 50) + 20 // Random daily tea supply between 20-70 kg
      );

      return {
        labels: dailyLabels,
        datasets: [
          {
            label: `Daily Tea Supply (kg) - ${monthName}`,
            data: dailyData,
            backgroundColor: "#10b981",
          },
        ],
      };
    } else {
      // Monthly totals view
      return (
        data || {
          labels: [
            "Jun 2024",
            "Jul 2024",
            "Aug 2024",
            "Sep 2024",
            "Oct 2024",
            "Nov 2024",
            "Dec 2024",
            "Jan 2025",
            "Feb 2025",
            "Mar 2025",
            "Apr 2025",
            "May 2025",
          ],
          datasets: [
            {
              label: "Monthly Tea Supply (kg)",
              data: [
                13000, 12000, 15000, 10000, 17000, 14000, 16500, 11800, 13500,
                12200, 16800, 15200,
              ],
              backgroundColor: "#10b981",
            },
          ],
        }
      );
    }
  };

  const chartData = getChartData();

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full">
      {/* Toggle for all chart types */}
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setViewType("daily")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewType === "daily"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setViewType("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewType === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Monthly View
          </button>
        </div>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AdvanceChart;
