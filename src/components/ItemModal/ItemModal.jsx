import "./ItemModal.css";
function ItemModal({ isOpen, onClose, card, handleDeleteClick }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_previw"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer_top-section">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="modal__image_delete-btn"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          </div>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
