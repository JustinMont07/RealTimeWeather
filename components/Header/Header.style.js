import { StyleSheet } from "react-native";

const BACK_BUTTON_SIZE = 30;
export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  backButton: {
    width: BACK_BUTTON_SIZE,
  },
  headerText: {
    flex: 1,
    alignItems: "center",
    marginRight: BACK_BUTTON_SIZE,
  },
  subTitle: {
    fontSize: 20,
  },
});
