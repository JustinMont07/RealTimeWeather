import { s } from "./Header.style";
import { Txt } from "../Txt/Txt";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Header({ city }) {
  const nav = useNavigation();
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={nav.goBack}>
        <Txt style={s.backButton}>{"<"}</Txt>
      </TouchableOpacity>
      <View style={s.headerText}>
        <Txt>{city.toUpperCase()}</Txt>
        <Txt style={s.subTitle}>7 Day Forecast</Txt>
      </View>
    </View>
  );
}
