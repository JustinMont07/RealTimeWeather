import { Txt } from "../Txt/Txt";
import { View, Image, TouchableOpacity } from "react-native";
import { s } from "./BasicInfo.style";
import { Clock } from "../Clock/Clock";
import { useNavigation } from "@react-navigation/native";

export function BasicInfo({ dailyWeather, temperature, interpretation, city }) {
  const nav = useNavigation();
  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>
      <View style={s.city}>
        <Txt>{city}</Txt>
      </View>
      <View style={s.interpretation}>
        <Txt style={s.interpretation_txt}>{interpretation.label}</Txt>
      </View>
      <View style={s.tempbox}>
        <TouchableOpacity
          onPress={() => nav.navigate("Forecast", { city, ...dailyWeather })}
        >
          <Txt style={s.temperature}>{temperature}°</Txt>
        </TouchableOpacity>
        <Image style={s.image} source={interpretation.image} />
      </View>
    </>
  );
}
