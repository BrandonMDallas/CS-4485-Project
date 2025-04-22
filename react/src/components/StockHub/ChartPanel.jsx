// ChartPanel.jsx
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
  symbol = "", // ← new prop
}) {
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: symbol, // ← show selected symbol in legend
          data: values,
          borderWidth: 2,
        },
      ],
    }),
    [labels, values, symbol]
  );

  const options = useMemo(
    () => ({
      plugins: {
        legend: {
          display: Boolean(symbol),
        },
        title: {
          display: Boolean(symbol),
          text: symbol ? `Price history for ${symbol}` : "",
        },
      },
      scales: {
        x: { title: { display: true, text: unitLabel } },
        y: { title: { display: true, text: "Value" }, beginAtZero: true },
      },
    }),
    [unitLabel, symbol]
  );

  return (
    <div className={styles.container}>
      <Line data={chartData} options={options} />
    </div>
  );
}
