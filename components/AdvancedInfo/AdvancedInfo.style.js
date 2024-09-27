import { StyleSheet, View } from "react-native";
import { Txt } from "../Txt/Txt";

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "#0000005c",
  },
});
export function StyleContainer({ children }) {
  return <View style={{ alignItems: "center", width: "33%" }}>{children}</View>;
}
export function StyleLabel({ children }) {
  return <Txt style={{ fontSize: 15 }}>{children}</Txt>;
}
export function StyleValue({ children }) {
  return <Txt style={{ fontSize: 20 }}>{children}</Txt>;
}
export { s };
