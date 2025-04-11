import "./Header.css";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import weatherLogo from "../../assets/weatherLogo.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={weatherLogo} alt="" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={defaultAvatar}
          alt="Terrence Tegegne"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
