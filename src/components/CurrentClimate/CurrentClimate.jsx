import { weatherCondition } from "../../utils/";

function Lol({ selectLol }) {
  let lol = data.find((item) => {
    return item.name == selectLol;
  });
  lol = lol?.image
    ? lol
    : data.find((item) => {
        return item.name == "default";
      });

  return <img src={lol.image} alt={lol.name} />;
}

export default Lol;
