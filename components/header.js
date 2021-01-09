import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import tailwind from "tailwind-rn";

import { getColorMode } from "../utils/utils.js";
import { ColorMode, DefaultTheme } from "../utils/constants";

const HeadingGreet = () => {
  const date = new Date();
  const monthAbbreviation = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const greeting =
    date.getHours() >= 17
      ? "Evening"
      : date.getHours() < 13
      ? "Morning"
      : "Afternoon";

  return (
    <View>
      <Text
        style={[tailwind("font-bold text-2xl"), styles.text]}
      >{`Good ${greeting}`}</Text>
      <Text style={[tailwind("font-semibold text-lg"), styles.text]}>
        {`${weekDay[date.getDay()]}, ${
          monthAbbreviation[date.getMonth()]
        }-${date.getDate()} ${date.getFullYear()}`}
      </Text>
    </View>
  );
};

const HeadingImage = () => {
  return (
    <View style={tailwind("items-center rounded px-1 py-1")}>
      <Text
        style={[tailwind("font-bold text-xs"), styles.text]}
      >{`No Events Today`}</Text>
    </View>
  );
};

const Heading = () => {
  return (
    <View
      style={tailwind("px-5 py-1 flex-row flex justify-between items-center")}
    >
      <HeadingGreet />
      <HeadingImage />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color:
      getColorMode() === ColorMode.dark
        ? DefaultTheme.darkMode.text
        : DefaultTheme.normalMode.text,
  },
});

export default Heading;
