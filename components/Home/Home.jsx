import { s } from "./Home.style";
import { Text, View } from "react-native";

export function Home() {
  return (
    <>
      <View style={s.basic}>
        <Text style={s.txt}> Basic Weather Info</Text>
      </View>
      <View style={s.searchbar}>
        <Text style={s.txt}> Search Bar</Text>
      </View>
      <View style={s.advanced}>
        <Text style={s.txt}> Advanded info</Text>
      </View>
    </>
  );
}
