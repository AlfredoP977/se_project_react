import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentClimate from "../CurrentClimate/CurrentClimate";
import ClearDay from "../../assets/weatherConditions/ClearDay.svg";

function WeatherCard({ weatherData }) {
  console.log("weatherData.condition", weatherData);
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        ° {currentTemperatureUnit}
      </p>
      {/* <CurrentClimate
        selectedCurrentClimate={`${
          weatherData.condition.charAt(0).toUpperCase() +
          weatherData.condition.slice(1)
        }${weatherData.isDay ? "Day" : "Night"}`}
      />
      <CurrentClimate selectedCurrentClimate="FogDay" /> */}
      <img src={ClearDay} alt="ClearDay" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
