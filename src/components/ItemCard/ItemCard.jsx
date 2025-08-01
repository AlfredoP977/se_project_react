import "./ItemCard.css";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState("");
  useEffect(() => {
    console.log("item.likes", item.likes);
    console.log("currentUser.id", currentUser._id);
    if (item.likes.includes(currentUser._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [item]);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsLiked(checked);
    const id = item._id;
    handleCardLike(id, isLiked); // Pass item + state up if needed
  };
  console.log("liked?", isLiked);
  console.log("item id", item._id);
  console.log("thier likes", item.likes);
  return (
    <li className="card-container">
      <div className="card__title">
        <h2 className="cards__name">{item.name}</h2>
        <label class="card__like-label">
          <input
            type="checkbox"
            checked={isLiked}
            onClick={handleCheckboxChange}
            class="card__like-checkbox"
          />
          <span class="card__like-icon"></span>
        </label>
      </div>

      <img
        onClick={() => {
          onCardClick(item);
        }}
        className="cards__img"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
