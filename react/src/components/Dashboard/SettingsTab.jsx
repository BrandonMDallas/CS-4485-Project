import React, { useState, useEffect } from "react";
import styles from "./SettingsTab.module.css";

const getInitialDarkMode = () => {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) {
    return stored === "true";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const SettingsTab = () => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [fontSize, setFontSize] = useState(21);

  // Toggle body.dark-mode for global theming
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // 2) Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Adjust root font‑size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <div className={styles.settingsContainer}>
      <h3 className={styles.title}>App Settings</h3>

      {/* Dark Mode */}
      <div className={styles.settingItem}>
        <label htmlFor="darkModeSwitch" className={styles.label}>
          Dark Mode
        </label>
        <div className="form-check form-switch">
          <input
            id="darkModeSwitch"
            type="checkbox"
            className="form-check-input"
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
          />
        </div>
      </div>

      {/* Email Notifications */}
      <div className={styles.settingItem}>
        <label htmlFor="emailNotifSwitch" className={styles.label}>
          Email Notifications
        </label>
        <div className="form-check form-switch">
          <input
            id="emailNotifSwitch"
            type="checkbox"
            className="form-check-input"
            checked={emailNotifications}
            onChange={() => setEmailNotifications((prev) => !prev)}
          />
        </div>
      </div>

      {/* Compact Mode */}
      <div className={styles.settingItem}>
        <label htmlFor="compactModeSwitch" className={styles.label}>
          Compact Mode
        </label>
        <div className="form-check form-switch">
          <input
            id="compactModeSwitch"
            type="checkbox"
            className="form-check-input"
            checked={compactMode}
            onChange={() => setCompactMode((prev) => !prev)}
          />
        </div>
      </div>

      {/* Font Size Slider */}
      <div className={styles.settingItem}>
        <label htmlFor="fontSizeRange" className={styles.label}>
          Font Size: {fontSize}px
        </label>
        <input
          id="fontSizeRange"
          type="range"
          className="form-range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SettingsTab;
