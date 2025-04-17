import React from "react";
import styles from "./IntervalTabs.module.css";

const intervals = [
  { label: "1 Hour", data: [1, 2, 3, 4], unit: 1 },
  { label: "4 Hours", data: [5, 6, 7, 8], unit: 2 },
  { label: "12 Hours", data: [10, 20, 30, 40], unit: 2 },
  { label: "1 Day", data: [100, 200, 300, 160], unit: 3 },
];

export default function IntervalTabs({ onSelect }) {
  return (
    <ul className={styles.tabs}>
      {intervals.map((intv, i) => (
        <li key={i} className={styles.tabItem}>
          <button onClick={() => onSelect(intv.data, intv.unit)}>
            {intv.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
