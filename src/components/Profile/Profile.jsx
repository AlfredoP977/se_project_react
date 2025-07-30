import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleLogOutClick,
  handleUpdateClick,
  currentUser,
}) {
  return (
    <div className="profile">
      <SideBar
        handleLogOutClick={handleLogOutClick}
        handleUpdateClick={handleUpdateClick}
        currentUser={currentUser}
      />

      <ClothesSection
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}

export default Profile;
