// IntervalTabs.jsx
import React, { useState } from "react";
import styles from "./IntervalTabs.module.css";

const intervals = [
  { label: "Daily", unit: "daily" },
  { label: "Weekly", unit: "weekly" },
  { label: "Monthly", unit: "monthly" },
];

export default function IntervalTabs({ onSelect }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleClick = (unit, idx) => {
    setActiveIdx(idx);
    onSelect(unit);
  };

  return (
    <ul className={styles.tabs}>
      {intervals.map((intv, i) => (
        <li key={intv.unit} className={styles.tabItem}>
          <button
            className={i === activeIdx ? styles.active : ""}
            onClick={() => handleClick(intv.unit, i)}
          >
            {intv.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
