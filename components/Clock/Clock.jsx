import { s } from "./Clock.style";
import { View } from "react-native";
import { Txt } from "../Txt/Txt";
import { nowtoHHMM } from "../../utils/date-time";
import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState(nowtoHHMM());
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(nowtoHHMM());
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return <Txt style={s.time}>{time}</Txt>;
}
