import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ handleCardClick }) {
  return (
    <div className="profile">
      <SideBar />

      <ClothesSection handleCardClick={handleCardClick} />
    </div>
  );
}

export default Profile;
