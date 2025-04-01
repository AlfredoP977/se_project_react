import "./Header.css";
import defaultAvatar from "./assets/defaultAvatar.svg";
import weatherLogo from "./assets/weatherLogo.svg";
function Header() {
  return (
    <header className="header">
      <img src={weatherLogo} alt="" className="header__logo" />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Name</p>
        <img
          src={defaultAvatar}
          alt="default Avatar"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
