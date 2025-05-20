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
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
//context
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { getItems, deleteItem, addItem } from "../../utils/api.js";

function App() {
  console.log("App component mounted!");

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  useEffect(() => {
    console.log("Updated weather data:", weatherData);
  }, [weatherData]);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  console.log(defaultClothingItems);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleDeleteClick = () => {
    setActiveModal("delete");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    console.log(" name, imageUrl, weather", name, imageUrl, weather);
    //update cloth item array
    addItem({ name, imageUrl, weather })
      .then(
        setClothingItems([{ name, link: imageUrl, weather }, ...clothingItems]),
        console.log("clothingItems", clothingItems),
        closeActiveModal()
      )
      //close modal
      .catch((error) => {
        console.error("API Error:", error);
      })
      .finally();
  };

  const handleremoveItemModalSubmit = () => {
    deleteItem(selectedCard._id)
      .then((item) => {
        console.log("item", item);
        console.log("selectedCard", selectedCard);
        // Remove the item from clothingItems
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        console.log("clothingItems", clothingItems), closeActiveModal();
      })
      .catch((error) => {
        console.error("API Error:", error);
      })
      .finally();
  };

  useEffect(() => {
    console.log("useEffect is running!");
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        if (!data || typeof data !== "object") {
          throw new Error("Invalid API response");
        }
        console.log("Raw API Data:", JSON.stringify(data, null, 2));
        const filteredData = filterWeatherData(data);
        console.log("Filtered Data:", filteredData);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Raw API response:", data); // Log entire response
        console.log("Extracted items:", data.items); // Log items separately
        console.log("API Response Structure:", JSON.stringify(data, null, 2));
        // setClothingItems({ name, link: imageUrl, weather })
        // return an array from id highest to lowest
        const reformattedArray = data
          .map(({ _id, name, weather, imageUrl }) => ({
            _id,
            name,
            weather: weather.toLowerCase(), // Standardizing weather formatting
            link: imageUrl, // Renaming 'imageUrl' to 'link'
          }))
          .reverse(); //reverse added
        setClothingItems(reformattedArray);
        console.log(reformattedArray);
      })
      .catch(console.error);
    //set clothing items
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      {" "}
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path=""
              element={
                // pass clothingItems prop
                <Main
                  currentTemperatureUnit={currentTemperatureUnit}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={closeActiveModal}
          handleDeleteClick={handleDeleteClick}
        />
        <DeleteItemModal
          card={selectedCard}
          isOpen={activeModal === "delete"}
          onClose={closeActiveModal}
          handleremoveItemModalSubmit={handleremoveItemModalSubmit}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
