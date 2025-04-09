import "./ItemModal.css";

function ItemModal({ activeModal, handlecloseClick, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal_type_image">
        <button
          onClick={handlecloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
