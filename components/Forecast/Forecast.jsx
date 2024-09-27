import { s } from "./Forecast.style.js";
import { Txt } from "../Txt/Txt.jsx";
import { useRoute } from "@react-navigation/native";
import { Header } from "../Header/Header.jsx";
import { ForecastItem } from "../ForecastItem/ForecastItem.jsx";
import { View } from "react-native";
import { getWeatherInterpretation } from "../../utils/meteo-utils.js";
import { DAYS } from "../../utils/meteo-utils.js";
export function Forecast() {
  const { params } = useRoute();

  const forecastList = (
    <View style={{ marginTop: 50 }}>
      {params.time.map((time, index) => {
        const weatherCode = params.weathercode[index];
        const weatherImage = getWeatherInterpretation(weatherCode).image;
        const temperature = params.temperature_2m_max[index];
        const date = new Date(time);
        const dayNum = date.getDay();
        const dayOfTheWeek = DAYS[dayNum];
        const formatedDate = date.toLocaleDateString("default", {
          day: "numeric",
          month: "numeric",
        });

        return (
          <ForecastItem
            key={time}
            image={weatherImage}
            day={dayOfTheWeek}
            date={formatedDate}
            temp={temperature.toFixed(0)}
          />
        );
      })}
    </View>
  );

  return (
    <>
      <Header city={params.city} />
      {forecastList}
    </>
  );
}
