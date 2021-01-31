import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";

import { DefaultTheme } from "../utils/constants";

const HeadingGreet = (props) => {
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

  const textColor = props.darkMode ? styles.textDark : styles.textNormal;
  return (
    <View>
      <Text
        style={[tailwind("font-bold text-2xl"), textColor]}
      >{`Good ${greeting}`}</Text>
      <Text style={[tailwind("font-semibold text-lg"), textColor]}>
        {`${weekDay[date.getDay()]}, ${
          monthAbbreviation[date.getMonth()]
        }-${date.getDate()} ${date.getFullYear()}`}
      </Text>
    </View>
  );
};

const HeadingImage = (props) => {
  const textColor = props.darkMode ? styles.textDark : styles.textNormal;

  return (
    <View style={tailwind("items-center rounded px-1 py-1")}>
      <Text
        style={[tailwind("font-bold text-xs"), textColor]}
      >{`No Events Today`}</Text>
    </View>
  );
};

const Heading = (props) => {
  return (
    <View
      style={tailwind("px-5 py-1 flex-row flex justify-between items-center")}
    >
      <HeadingGreet darkMode={props.darkMode} />
      <HeadingImage darkMode={props.darkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  textDark: {
    color: DefaultTheme.darkMode.text,
  },
  textNormal: {
    color: DefaultTheme.normalMode.text,
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(Heading);
