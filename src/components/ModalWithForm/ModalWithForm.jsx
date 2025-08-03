import "./ModalWithForm.css";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isButtonDisabled,
  sideButton,
  tiltleSideButton,
  handleSideButtonClick,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button
              disabled={isButtonDisabled}
              type="submit"
              className="modal__submit"
            >
              {buttonText}
            </button>
            {/* Conditionally render extra buttons */}
            {sideButton === true && (
              <p
                onClick={handleSideButtonClick}
                className="modal__or-registration"
              >
                {tiltleSideButton}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
