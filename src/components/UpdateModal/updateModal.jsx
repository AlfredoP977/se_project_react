import "./updateModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { resetForm } from "../../utils/formUtils";

export default function UpdateModal({
  onClose,
  isOpen,
  onUpdateModalSubmit,
  currentUser,
}) {
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateModalSubmit({
      name,
      avatar,
      reset: () => resetForm(),
    });
  };

  // console.log(name);
  // console.log(weather);

  return (
    <ModalWithForm
      buttonText="update"
      title="update"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
          placeholder={currentUser.name}
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar Url
        <input
          id="avatar"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
          placeholder={currentUser.avatar}
          required
        />
      </label>
    </ModalWithForm>
  );
}
