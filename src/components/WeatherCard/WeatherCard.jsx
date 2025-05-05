import SunnyDay from "../../assets/weatherConditions/SunnyDay.svg";
import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempuratureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTempuratureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        ° {currentTempuratureUnit}
      </p>
      <img src={SunnyDay} alt="Sunny Day" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
