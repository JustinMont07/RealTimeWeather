import { View } from "react-native";
import { Txt } from "../Txt/Txt";
import {
  s,
  StyleContainer,
  StyleValue,
  StyleLabel,
} from "./AdvancedInfo.style";

export function AdvancedInfo({ sunrise, sunset, windspeed }) {
  function getTime(time) {
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];
    hour = hour % 12;
    hour = hour ? hour : 12;
    const minutesStr = minute < 10 ? "0" + minute : minute;
    return `${hour}:${minutesStr}`;
  }
  return (
    <>
      <View style={s.container}>
        <StyleContainer>
          <StyleValue>Sunrise</StyleValue>
          <StyleLabel>{getTime(sunrise)} am</StyleLabel>
        </StyleContainer>
        <StyleContainer>
          <StyleValue>Sunset</StyleValue>
          <StyleLabel>{getTime(sunset)} pm</StyleLabel>
        </StyleContainer>
        <StyleContainer>
          <StyleValue>Windspeed</StyleValue>
          <StyleLabel>{windspeed} MPH</StyleLabel>
        </StyleContainer>
      </View>
    </>
  );
}
