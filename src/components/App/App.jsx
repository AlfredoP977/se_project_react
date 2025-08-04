//react
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
//utils
import { coordinates, APIkey } from "../../utils/constant";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
//css
import "./App.css";

//components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer";
//modals
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

//context
import ProtectedRoute from "../../contexts/ProtectedRoute.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import {
  getItems,
  deleteItem,
  addItem,
  signUp,
  signIn,
  getUser,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";

//login and register
import { setToken, getToken, removeToken } from "../../utils/token.js";

//app
function App() {
  console.log("App component mounted!");

  //check if user is loggedin
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState();

  //weather data
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

  //
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleUpdateClick = () => {
    setActiveModal("update");
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
    setClothingItems([]);
    setIsLoggedIn(false);
    setCurrentUser({ name: "", email: "", avatar: "", _id: "" });
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
    console.log(" name, avatar, email, password", {
      name,
      avatar,
      email,
      password,
    });
    signUp({ name, avatar, email, password })
      .then(() => {
        onLoginModalSubmit({ email, password });
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
            .then(({ name, email, avatar, _id }) => {
              setIsLoggedIn(true);
              setCurrentUser({ name, email, avatar, _id });
              console.log("User", currentUser);
            })
            .catch(console.error);
          closeActiveModal();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };
  const onUpdateModalSubmit = ({ name, avatar }) => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    updateUser({ name, avatar }, jwt)
      .then(() => {
        getUser(jwt)
          .then(({ name, email, avatar, _id }) => {
            setCurrentUser({ name, email, avatar, _id });
          })
          .catch(console.error);
        closeActiveModal();
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

  const handleCardLike = ({ id, isLiked }) => {
    console.log("handleCardLike", "isLiked", isLiked, "id", id);
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(id, jwt)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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
    getUser(jwt)
      .then(({ name, email, avatar, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, email, avatar, _id });
        console.log("User out side log in", { currentUser });
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getItems(jwt)
      .then((data) => {
        const currentUserId = currentUser._id;
        const reformattedArray = data
          .filter((item) => item.owner === currentUserId)
          .map(({ _id, name, weather, imageUrl, owner, likes }) => ({
            _id,
            name,
            weather: weather.toLowerCase(), // Standardizing weather formatting
            imageUrl,
            owner,
            likes: likes.includes(currentUserId), // returns true or false
          }))
          .reverse(); //reverse added
        setClothingItems(reformattedArray);
        console.log(reformattedArray);
      })
      .catch(console.error);
    //set clothing items
  }, [currentUser._id]);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path=""
                element={
                  // pass clothingItems prop
                  <Main
                    currentTemperatureUnit={currentTemperatureUnit}
                    weatherData={weatherData}
                    handleCardLike={handleCardLike}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleUpdateClick={handleUpdateClick}
                      handleCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleLogOutClick={handleLogOutClick}
                    />
                  </ProtectedRoute>
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
          <EditProfileModal
            activeModal={activeModal}
            isOpen={activeModal === "update"}
            onClose={closeActiveModal}
            onUpdateModalSubmit={onUpdateModalSubmit}
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
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
