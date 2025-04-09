import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card-container">
      <h2 className="cards__name">{item.name}</h2>
      <img
        onClick={() => {
          onCardClick(item);
        }}
        className="cards__img"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
