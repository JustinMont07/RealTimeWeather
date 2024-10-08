import { s } from "./Home.style";
import { Text, View } from "react-native";
import { Txt } from "../Txt/Txt";
import { BasicInfo } from "../BasicInfo/BasicInfo";
import { getWeatherInterpretation } from "../../utils/meteo-utils";
import { AdvancedInfo } from "../AdvancedInfo/AdvancedInfo";
import { SearchBar } from "../SearchBar/SearchBar";

export function Home({ weather, city, onSubmitSearch }) {
  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather.weathercode
  );
  return (
    <>
      <View style={s.basic}>
        <BasicInfo
          dailyWeather={weather.daily}
          city={city}
          interpretation={currentInterpretation}
          temperature={Math.round(currentWeather.temperature)}
        />
      </View>
      <View style={s.searchbar}>
        <SearchBar onSubmit={onSubmitSearch} />
      </View>
      <View style={s.advanced}>
        <AdvancedInfo
          sunrise={weather.daily.sunrise[0].split("T")[1]}
          sunset={weather.daily.sunset[0].split("T")[1]}
          windspeed={currentWeather.windspeed}
        />
      </View>
    </>
  );
}
