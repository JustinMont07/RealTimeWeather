import { Txt } from "../Txt/Txt";
import { View, Image } from "react-native";
import { s } from "./BasicInfo.style";
import { Clock } from "../Clock/Clock";

export function BasicInfo({ temperature, interpretation }) {
  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>
      <View style={s.city}>
        <Txt>City</Txt>
      </View>
      <View style={s.interpretation}>
        <Txt style={s.interpretation_txt}>{interpretation.label}</Txt>
      </View>
      <View style={s.tempbox}>
        <Txt style={s.temperature}>{temperature}°</Txt>
        <Image style={s.image} source={interpretation.image} />
      </View>
    </>
  );
}
