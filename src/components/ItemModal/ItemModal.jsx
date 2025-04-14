import "./ItemModal.css";
function ItemModal({ isOpen, handlecloseClick, card }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal_type_image">
        <button
          onClick={handlecloseClick}
          type="button"
          className="modal__close modal__close_previw"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
