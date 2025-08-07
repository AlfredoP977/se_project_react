import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useState, useEffect } from "react";
import { resetForm } from "../../utils/formUtils";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function UpdateModal({ onClose, isOpen, onUpdateModalSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateModalSubmit({
      name,
      avatar,
      reset: () => {
        setName("");
        setAvatar("");
        resetForm();
      },
    });
  };

  return (
    <ModalWithForm
      buttonText="update"
      title="update"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="EditName" className="modal__label">
        Name
        <input
          id="EditName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
          placeholder={name}
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="EditAvatar" className="modal__label">
        Avatar Url
        <input
          id="EditAvatar"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
          placeholder={avatar}
          required
        />
      </label>
    </ModalWithForm>
  );
}
