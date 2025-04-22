import React, { useMemo } from "react";
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
import { Line } from "react-chartjs-2";
import styles from "./ChartPanel.module.css";

// register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartPanel({
  labels = [],
  values = [],
  unitLabel = "",
  symbol = "", // show selected symbol in legend/title
}) {
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: symbol,
          data: values,
          borderWidth: 3, // thicker line
          borderColor: "#4e7ed8", // brand blue
          backgroundColor: "rgba(78,126,216,0.2)", // translucent fill
          tension: 0.4, // smooth curves
          pointRadius: 4, // larger dots
          pointBackgroundColor: "#fff",
          pointBorderColor: "#4e7ed8",
          pointHoverRadius: 6,
        },
      ],
    }),
    [labels, values, symbol]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false, // fill container height
      plugins: {
        legend: {
          display: Boolean(symbol),
          position: "top",
          labels: {
            font: { family: "'Nunito', sans-serif", size: 14 },
            color: "#333",
          },
        },
        title: {
          display: Boolean(symbol),
          text: symbol ? `Price history for ${symbol}` : "",
          font: { family: "'Nunito', sans-serif", size: 16, weight: "600" },
          color: "#333",
          padding: { top: 10, bottom: 20 },
        },
        tooltip: {
          titleFont: { family: "'Nunito', sans-serif", size: 13 },
          bodyFont: { family: "'Nunito', sans-serif", size: 12 },
          padding: 8,
          cornerRadius: 4,
        },
      },
      scales: {
        x: {
          title: { display: true, text: unitLabel },
          grid: { color: "rgba(0,0,0,0.05)" },
          ticks: {
            font: { family: "'Nunito', sans-serif" },
            color: "#666",
          },
        },
        y: {
          title: { display: true, text: "Value" },
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.05)" },
          ticks: {
            font: { family: "'Nunito', sans-serif" },
            color: "#666",
          },
        },
      },
    }),
    [unitLabel, symbol]
  );

  return (
    <div className={styles.container}>
      <Line data={chartData} options={options} height={400} />
    </div>
  );
}
