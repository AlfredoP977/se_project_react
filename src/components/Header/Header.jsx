import "./Header.css";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import weatherLogo from "../../assets/weatherLogo.svg";
function Header() {
  return (
    <header className="header">
      <img src={weatherLogo} alt="" className="header__logo" />
      <p className="header__date-and-location">DATE, LOCATION</p>

      <div className="header__user-container">
        <button className="header__add-clothes-btn">+ Add clothes</button>
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
