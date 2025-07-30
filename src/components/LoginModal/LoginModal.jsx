import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { resetForm } from "../../utils/formUtils";

export default function LoginModal({
  onClose,
  isOpen,
  onLoginModalSubmit,
  handleSideButtonClick,
  activeModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit({
      email,
      password,
      reset: () => resetForm(setEmail, setPassword),
    });
  };

  // console.log(name);
  // console.log(weather);

  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      sideButton={true}
      tiltleSideButton="or Sign Up"
      handleSideButtonClick={handleSideButtonClick}
      activeModal={activeModal}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength="1"
          maxLength="30"
        />
      </label>
    </ModalWithForm>
  );
}
