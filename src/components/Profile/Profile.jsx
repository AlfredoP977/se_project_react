import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleLogOutClick,
  handleUpdateClick,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <SideBar
        handleLogOutClick={handleLogOutClick}
        handleUpdateClick={handleUpdateClick}
      />

      <ClothesSection
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
        handleCardLike={handleCardLike}
      />
    </div>
  );
}

export default Profile;
