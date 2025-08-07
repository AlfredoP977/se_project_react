import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegisterModalSubmit,
  handleSideButtonClick,
  activeModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const isComplete = email && password && name && avatar;
    setIsButtonDisabled(!isComplete);
  }, [email, password, name, avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({
      email,
      password,
      name,
      avatar,
    });
  };

  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      sideButton={true}
      tiltleSideButton="or log in"
      handleSideButtonClick={handleSideButtonClick}
      activeModal={activeModal}
      isButtonDisabled={isButtonDisabled}
    >
      <label htmlFor="registerEmail" className="modal__label">
        Email
        <input
          id="registerEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal__input"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="registerPassword" className="modal__label">
        Password
        <input
          id="registerPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modal__input"
          placeholder="Password"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="registerName" className="modal__label">
        Name
        <input
          id="registerName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="registerAvatar" className="modal__label">
        Avatar Url
        <input
          id="registerAvatar"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
          placeholder="Avatar Url"
          required
        />
      </label>
    </ModalWithForm>
  );
}
