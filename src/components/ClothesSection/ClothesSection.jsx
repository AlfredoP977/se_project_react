import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

import { defaultClothingItems } from "../../utils/constant";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothes_section">
      <div>
        <p>Your items</p>
        <button>+ Add New</button>
      </div>
      <ul className="clothes_section_cards_list">
        {defaultClothingItems.map((item) => {
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
