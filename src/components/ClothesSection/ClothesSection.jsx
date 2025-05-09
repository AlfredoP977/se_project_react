import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes_section">
      <div className="clothes_section_title">
        <p className="clothes_section_header">Your items</p>
        <button onClick={handleAddClick} className="clothes_section_add-btn">
          + Add New
        </button>
      </div>
      <ul className="clothes_section_cards_list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
