import { ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Home } from "./components/Home/Home";
import background from "./assets/background.png";
import { useEffect, useState } from "react";
import { MeteoAPI } from "./api/weather";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useFonts } from "expo-font";

export default function App() {
  const [coordinates, setCoordinates] = useState();
  const [weather, setWeather] = useState();

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });

  console.log(isFontLoaded);

  useEffect(() => {
    getUserCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherFromCoordinates(coordinates);
    }
  }, [coordinates]);
  console.log(weather);
  async function fetchWeatherFromCoordinates(coordinates) {
    const weatherResponse = await MeteoAPI.fetchWeatherFromCoordinates(
      coordinates
    );
    setWeather(weatherResponse);
  }

  //Get coordinates from the User
  async function getUserCoordinates() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      setCoordinates({
        lat: "40.71",
        lng: "74.00",
      });
    }
  }

  return (
    <ImageBackground
      source={background}
      style={s.img_background}
      imageStyle={s.img}
    >
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          {isFontLoaded && weather && <Home weather={weather} />}
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
