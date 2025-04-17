import React from "react";

const SettingsTab = () => {
  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          Switch 1
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="defaultCheck1"
        />
        <label className="form-check-label" htmlFor="defaultCheck1">
          Check 1
        </label>
      </div>
    </>
  );
};

export default SettingsTab;
