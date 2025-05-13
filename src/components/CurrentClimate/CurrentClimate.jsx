import { weatherCondition } from "../../utils/weatherCondition.js";

function CurrentClimate({ selectedCurrentClimate }) {
  let currentClimate = weatherCondition.find((item) => {
    return item.name === selectedCurrentClimate;
  });

  currentClimate = currentClimate?.image
    ? currentClimate
    : weatherCondition.find((item) => {
        return item.name === "ClearDay";
      });
  console.log("currentClimate.name", currentClimate.name);
  return (
    <img
      src={currentClimate.image}
      alt={currentClimate.name}
      className="weather-card__image"
    />
  );
}

export default CurrentClimate;
