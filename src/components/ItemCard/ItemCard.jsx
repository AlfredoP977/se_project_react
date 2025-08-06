import "./ItemCard.css";
import likedIcon from "../../assets/liked.svg";
import unLikedIcon from "../../assets/unLiked.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(item.likes, "item.likes");
  const isLiked = item.likes.includes(currentUser._id);
  const id = item._id;
  console.log(isLiked, "isLiked");

  return (
    <li className="card-container">
      <div className="card__title">
        <h2 className="cards__name">{item.name}</h2>
        <button
          onClick={() => handleCardLike({ id, isLiked })}
          className="cards__like-button"
          aria-label={isLiked ? "Unlike item" : "Like item"}
        >
          <img
            className="cards__like-icon"
            src={isLiked ? likedIcon : unLikedIcon}
            alt=""
          />
        </button>
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
