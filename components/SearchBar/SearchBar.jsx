import { TextInput } from "react-native";
import { s } from "./SearchBar.style.js";

export function SearchBar({ onSubmit }) {
  return (
    <>
      <TextInput
        onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
        placeholder="Enter a city... Ex: New York"
        style={s.input}
      />
    </>
  );
}
