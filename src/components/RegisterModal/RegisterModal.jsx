import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import { resetForm } from "../../utils/formUtils";

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

  // console.log(name);
  // console.log(weather);

  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign up"
      isOpen={isOpen} //correction
      onClose={onClose}
      onSubmit={handleSubmit}
      sideButton={true}
      tiltleSideButton="or log in"
      handleSideButtonClick={handleSideButtonClick}
      activeModal={activeModal}
      // fix add disable feature
      isButtonDisabled={isButtonDisabled}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email__register"
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
      <label htmlFor="password" className="modal__label">
        Password
        <input
          id="password"
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
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
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
      <label htmlFor="avatar" className="modal__label">
        Avatar Url
        <input
          id="avatar"
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
