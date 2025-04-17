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

export default function ChartPanel({ data, unitLabel }) {
  const chartData = useMemo(
    () => ({
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          borderWidth: 2,
        },
      ],
    }),
    [data]
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
