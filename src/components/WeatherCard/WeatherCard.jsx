import SunnyDay from "../../assets/weatherConditions/SunnyDay.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp} &deg; F</p>
      <img src={SunnyDay} alt="Sunny Day" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
