import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ handleCardClick, clothingItems }) {
  return (
    <div className="profile">
      <SideBar />

      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}

export default Profile;
