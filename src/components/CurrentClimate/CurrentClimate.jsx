import { weatherCondition } from "../../utils/weatherConditions.js";

function CurrentClimate({ selectedCurrentClimate }) {
  let currentClimate = weatherCondition.find((item) => {
    return item.name == selectedCurrentClimate;
  });

  currentClimate = currentClimate?.image
    ? currentClimate
    : data.find((item) => {
        return item.name == "SunnyDay";
      });

  return <img src={currentClimate.image} alt={currentClimate.name} />;
}

export default CurrentClimate;
