import { s } from "./Home.style";
import { Text, View } from "react-native";
import { Txt } from "../Txt/Txt";
import { BasicInfo } from "../BasicInfo/BasicInfo";
import { getWeatherInterpretation } from "../../utils/meteo-utils";

export function Home({ weather }) {
  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather.weathercode
  );
  return (
    <>
      <View style={s.basic}>
        <BasicInfo
          interpretation={currentInterpretation}
          temperature={Math.round(currentWeather.temperature)}
        />
      </View>
      <View style={s.searchbar}>
        <Txt> Search Bar</Txt>
      </View>
      <View style={s.advanced}>
        <Txt> Advanded info</Txt>
      </View>
    </>
  );
}
