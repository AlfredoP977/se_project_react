import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes_section">
      <div className="clothes_section_title">
        <p className="clothes_section_header">Your items</p>
        <button onClick={handleAddClick} className="clothes_section_add-btn">
          + Add New
        </button>
      </div>
      <ul className="clothes_section_cards_list">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
