import { ImageBackground, Alert, Platform } from "react-native";
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

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

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
    //App in background or closed and notification is pressed
    registerForPushNotificationsAsync();
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response.notification.request.content);
    });
    //App is opened and notification is received
    // Notifications.addNotificationReceivedListener((notification) => {
    //   console.log(notification.request.content.data);
    // });
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherFromCoordinates(coordinates);
      fetchCityFromCoordinates(coordinates);
    }
  }, [coordinates]);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get permissions for push notifications!");
        return;
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectID,
        })
      ).data;
      //Send token to database
      console.log("Token: ", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

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

  async function fetchCoordsByCity(city) {
    try {
      const coordsResponse = await MeteoAPI.fetchCoordinatesByCity(city);
      setCoordinates(coordsResponse);
    } catch (err) {
      Alert.alert("Invalid City");
    }
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
                screenOptions={{ headerShown: false, animation: "fade" }}
                initialRouteName="Home"
              >
                <Stack.Screen name="Home">
                  {() => (
                    <Home
                      weather={weather}
                      city={city}
                      onSubmitSearch={fetchCoordsByCity}
                    />
                  )}
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
