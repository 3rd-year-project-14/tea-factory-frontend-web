import React from "react";
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

const AdvanceChart = ({ data }) => {
  // Generate 12 months of data before current month (June 2025)
  // From June 2024 to May 2025
  const chartData = data || {
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
          13000, 12000, 15000, 10000, 17000, 14000, 16500, 11800, 13500, 12200,
          16800, 15200,
        ],
        backgroundColor: "#10b981",
      },
    ],
  };

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

  return <Bar data={chartData} options={options} />;
};

export default AdvanceChart;
