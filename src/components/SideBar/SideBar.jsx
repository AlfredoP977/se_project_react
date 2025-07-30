import "./SideBar.css";

function SideBar({ handleUpdateClick, handleLogOutClick, currentUser }) {
  return (
    <div className="sideBar">
      <div className="sideBar_user">
        <img
          className="sideBar_avatar"
          src={currentUser.avatar}
          alt="Default Avatar"
        />
        <p className="sideBar_username">{currentUser.name}</p>
      </div>
      <button
        onClick={handleUpdateClick}
        className="sideBar_Change-User"
        type="submit"
      >
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
