import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTempuratureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTempuratureUnit);
  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${
          currentTempuratureUnit === "F"
            ? `toggle-switch__text_color_white`
            : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${
          currentTempuratureUnit === "C"
            ? `toggle-switch__text_color_white`
            : ""
        }`}
      >
        C
      </span>
    </label>
  );
}
