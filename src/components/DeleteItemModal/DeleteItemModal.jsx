import "./DeleteItemModal.css";
function DeleteItemModal({ isOpen, onClose, handleremoveItemModalSubmit }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <div className="modal__delete">
          <h1 className="modal__delete_prompt">
            Are you sure you want to delete this item?
          </h1>
          <h1 className="modal__delete_prompt">This action is ireversable.</h1>
          <button
            className="modal__delete_confirm_delete-btn"
            onClick={handleremoveItemModalSubmit}
          >
            Yes,delete item
          </button>
          <button
            className="modal__delete_Cancel-btn"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemModal;
