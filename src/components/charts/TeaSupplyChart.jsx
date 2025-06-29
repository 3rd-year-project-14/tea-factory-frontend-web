import React, { useRef} from "react";
import { Line } from "react-chartjs-2";
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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const TeaSupplyChart = ({ data }) => {
  const chartRef = useRef(null);

  // Example data if not provided
  const chartData = data || {
    labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Tea Supply (kg)",
        data: [320, 410, 390, 450, 420, 480],
        borderColor: "#3b82f6",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(59,130,246,0.05)");
          gradient.addColorStop(1, "rgba(59,130,246,0.4)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#3b82f6",
        datalabels: {
          anchor: "end",
          align: "top",
          color: "#1e293b",
          font: { weight: "bold" },
          formatter: (value) => value + " kg",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Tea Collection",
        font: { size: 18 },
        color: "#1e293b",
        padding: { top: 10, bottom: 20 },
      },
      datalabels: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            const index = context.dataIndex;
            const prev = context.dataset.data[index - 1];
            let change = "";
            if (typeof prev !== "undefined") {
              const diff = value - prev;
              const percent = ((diff / prev) * 100).toFixed(1);
              change = ` (${diff >= 0 ? "+" : ""}${percent}%)`;
            }
            return `${value} kg${change}`;
          },
        },
      },
    },
    layout: {
      padding: 24,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "kg",
          color: "#1e293b",
          font: { weight: "bold" },
        },
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          color: "#64748b",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Line
        ref={chartRef}
        data={chartData}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};

export default TeaSupplyChart;
