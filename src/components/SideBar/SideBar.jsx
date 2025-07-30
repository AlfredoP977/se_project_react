import "./SideBar.css";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import { Link } from "react-router-dom";

function SideBar({ handleLogOutClick, userData }) {
  return (
    <div className="sideBar">
      <div className="sideBar_user">
        <img
          className="sideBar_avatar"
          src={userData.avatar}
          alt="Default Avatar"
        />
        <p className="sideBar_username">{userData.name}</p>
      </div>
      <button className="sideBar_Change-User" type="submit">
        Change profile data
      </button>
      <button
        onClick={handleLogOutClick}
        type="submit"
        className="sideBar_logOut"
      >
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
