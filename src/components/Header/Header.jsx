import "./Header.css";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import weatherLogo from "../../assets/weatherLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to={"/"}>
        <img src={weatherLogo} alt="Weather logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link to={"/profile"} className="header__link">
          <p className="header__username">Terrence Tegegne</p>
          <img
            src={defaultAvatar}
            alt="Terrence Tegegne"
            className="header__avatar"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
