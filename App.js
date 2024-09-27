import { ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Home } from "./components/Home/Home";
import background from "./assets/background.png";
import { useEffect, useState } from "react";
import { MeteoAPI } from "./api/weather";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useFonts } from "expo-font";
import { Forecast } from "./components/Forecast/Forecast";

const Stack = createNativeStackNavigator();
const navTheme = {
  colors: {
    background: "transparent",
  },
};
export default function App() {
  const [coordinates, setCoordinates] = useState();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });

  useEffect(() => {
    getUserCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherFromCoordinates(coordinates);
      fetchCityFromCoordinates(coordinates);
    }
  }, [coordinates]);

  async function fetchWeatherFromCoordinates(coordinates) {
    const weatherResponse = await MeteoAPI.fetchWeatherFromCoordinates(
      coordinates
    );
    setWeather(weatherResponse);
  }

  async function fetchCityFromCoordinates(coordinates) {
    const cityResponse = await MeteoAPI.fetchCityByCoords(coordinates);
    setCity(cityResponse);
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
    <NavigationContainer theme={navTheme}>
      <ImageBackground
        source={background}
        style={s.img_background}
        imageStyle={s.img}
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded && weather && (
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Home"
              >
                <Stack.Screen name="Home">
                  {() => <Home weather={weather} city={city} />}
                </Stack.Screen>
                <Stack.Screen name="Forecast" component={Forecast} />
              </Stack.Navigator>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
