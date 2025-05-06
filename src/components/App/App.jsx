//react
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
//utils
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constant";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
//css
import "./App.css";
//components
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer";
//context
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isday: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempuratureUnit, setCurrentTempuratureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTempuratureUnit(currentTempuratureUnit === "F" ? "C" : "F");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const hanleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    //update cloth item array
    setClothingItems([{ name, link: imageUrl, weather }, ...clothingItems]);
    //close modal
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempuratureUnit, handleToggleSwitchChange }}
    >
      {" "}
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path=""
              element={
                <Main
                  currentTempuratureUnit={currentTempuratureUnit}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={hanleAddItemModalSubmit}
        />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
