import { s } from "./ForecastItem.style.js";
import { Txt } from "../Txt/Txt.jsx";
import { View, Image } from "react-native";

export function ForecastItem({ image, day, date, temp }) {
  return (
    <View style={s.container}>
      <Image style={s.image} source={image} />
      <Txt style={s.day}>{day}</Txt>
      <Txt style={s.date}>{date}</Txt>
      <Txt style={s.temp}>{temp}°</Txt>
    </View>
  );
}
