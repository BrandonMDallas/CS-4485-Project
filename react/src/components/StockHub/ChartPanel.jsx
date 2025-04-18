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
  unitLabel = "", // add this prop if you want an x‑axis label
}) {
  const chartData = useMemo(
    () => ({
      labels, // ← use the labels prop
      datasets: [
        {
          data: values, // ← use the values prop
          borderWidth: 2,
        },
      ],
    }),
    [labels, values]
  );

  const options = useMemo(
    () => ({
      scales: {
        x: { title: { display: true, text: unitLabel } },
        y: { title: { display: true, text: "Value" }, beginAtZero: true },
      },
    }),
    [unitLabel]
  );

  return (
    <div className={styles.container}>
      <Line data={chartData} options={options} />
    </div>
  );
}
