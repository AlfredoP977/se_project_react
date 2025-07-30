//react
import { useEffect, useState, Navigate } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
//context
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import {
  getItems,
  deleteItem,
  addItem,
  signUp,
  signIn,
  getUser,
} from "../../utils/api.js";
//login and register
import { setToken, getToken, removeToken } from "../../utils/token.js";
function App() {
  console.log("App component mounted!");
  //imported from duck program
  // //check if user is loggedin
  const [userData, setUserData] = useState({ name: "", email: "", avatar: "" });
  const [isLoggedIn, setIsLoggedIn] = useState();
  // const navigate = useNavigate();

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
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleSideButtonClick = () => {
    if (activeModal === "register") {
      setActiveModal("login");
    } else if (activeModal === "login") {
      setActiveModal("register");
    }
  };
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    navigate("/");
    setIsLoggedIn(false);
    setUserData({ name: "", email: "", avatar: "" });
    removeToken();
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
  //register
  const onRegisterModalSubmit = ({ name, avatar, email, password }) => {
    console.log(
      " name, avatar, email, password",
      name,
      avatar,
      email,
      password
    );
    signUp({ name, avatar, email, password })
      .then(() => {
        setActiveModal("login");
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };
  //login
  const onLoginModalSubmit = ({ email, password }) => {
    console.log(" email, password", email, password);
    signIn({ email, password })
      .then((data) => {
        console.log("Login response data:", data);
        if (data.token) {
          setToken(data.token);
          getUser(data.token)
            .then(({ name, email, avatar }) => {
              setIsLoggedIn(true);
              setUserData({ name, email, avatar });
            })
            .catch(console.error);
          closeActiveModal();
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather, reset }) => {
    console.log(" name, imageUrl, weather", name, imageUrl, weather);
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    //update cloth item array
    addItem({ name, imageUrl, weather }, jwt)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        reset();
        closeActiveModal();
        console.log("clothingItems", clothingItems);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };
  const handleremoveItemModalSubmit = () => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    console.log("selectedCard._id:", selectedCard._id);
    console.log("jwt token:", jwt);
    deleteItem(selectedCard._id, jwt)
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
      });
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
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    getItems(jwt)
      .then((data) => {
        // console.log("Raw API response:", data); // Log entire response
        // console.log("Extracted items:", data.items); // Log items separately
        // console.log("API Response Structure:", JSON.stringify(data, null, 2));
        // setClothingItems({ name, link: imageUrl, weather })
        // return an array from id highest to lowest
        //data is the data of data confusing but it makes sense
        const reformattedArray = data.data
          .map(({ _id, name, weather, imageUrl }) => ({
            _id,
            name,
            weather: weather.toLowerCase(), // Standardizing weather formatting
            imageUrl,
          }))
          .reverse(); //reverse added
        setClothingItems(reformattedArray);
        console.log(reformattedArray);
      })
      .catch(console.error);
    //set clothing items
  }, []);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    getUser(jwt)
      .then(({ name, email, avatar }) => {
        setIsLoggedIn(true);
        setUserData({ name, email, avatar });
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      {" "}
      <div className="page">
        <div className="page__content">
          <Header
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            userData={userData}
          />
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
              path="/loggedin"
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
                  handleLogOutClick={handleLogOutClick}
                  userData={userData}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <RegisterModal
          activeModal={activeModal}
          handleSideButtonClick={handleSideButtonClick}
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegisterModalSubmit={onRegisterModalSubmit}
        />
        <LoginModal
          activeModal={activeModal}
          handleSideButtonClick={handleSideButtonClick}
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLoginModalSubmit={onLoginModalSubmit}
        />
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
