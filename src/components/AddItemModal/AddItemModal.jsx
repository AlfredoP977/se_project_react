import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
    checkFormCompletion(e.target.value, imageUrl, weather);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    checkFormCompletion(name, e.target.value, weather);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    checkFormCompletion(name, imageUrl, e.target.value);
  };
  const checkFormCompletion = (name, imageUrl, weather) => {
    setIsButtonDisabled(!(name && imageUrl && weather));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
    //empty the inputs
    setName("");
    setImageUrl("");
    setWeather("");
    setIsButtonDisabled(true); //reset button
  };

  // console.log(name);
  // console.log(weather);

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen} //correction
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value="hot"
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value="warm"
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            value="cold"
            checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
