import { View } from "react-native";
import { Txt } from "../Txt/Txt";
import {
  s,
  StyleContainer,
  StyleValue,
  StyleLabel,
} from "./AdvancedInfo.style";

export function AdvancedInfo({ sunrise, sunset, windspeed }) {
  return (
    <>
      <View style={s.container}>
        <StyleContainer>
          <StyleValue>Sunrise</StyleValue>
          <StyleLabel>{sunrise}</StyleLabel>
        </StyleContainer>
        <StyleContainer>
          <StyleValue>Sunset</StyleValue>
          <StyleLabel>{sunset}</StyleLabel>
        </StyleContainer>
        <StyleContainer>
          <StyleValue>Windspeed</StyleValue>
          <StyleLabel>{windspeed} MPH</StyleLabel>
        </StyleContainer>
      </View>
    </>
  );
}
