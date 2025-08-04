import "./ItemCard.css";
import likedIcon from "../../assets/liked.svg";
import unLikedIcon from "../../assets/unLiked.svg";

function ItemCard({ item, onCardClick, handleCardLike }) {
  console.log(item.likes, "item.likes");
  const onclickLike = () => {
    const id = item._id;
    const isLiked = item.likes;
    handleCardLike({ id, isLiked });
  };
  return (
    <li className="card-container">
      <div className="card__title">
        <h2 className="cards__name">{item.name}</h2>
        <img
          onClick={onclickLike}
          className="cards__like-icon"
          src={item.likes ? likedIcon : unLikedIcon}
          alt={item.likes ? "Liked" : "Not liked"}
        />
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
