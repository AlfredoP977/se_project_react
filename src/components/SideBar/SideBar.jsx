import "./SideBar.css";
import defaultAvatar from "../../assets/defaultAvatar.svg";
function SideBar() {
  return (
    <div className="sideBar">
      <img
        className="sideBar_avatar"
        src={defaultAvatar}
        alt="Default Avatar"
      />
      <p className="sideBar_username">Username</p>
    </div>
  );
}

export default SideBar;
