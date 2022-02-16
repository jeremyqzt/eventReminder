import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "tailwind-rn";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import { useColorScheme } from "../utils/utils";

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
      <Text style={[tailwind("font-semibold"), textColor]}>
        {`${weekDay[date.getDay()]}, ${
          monthAbbreviation[date.getMonth()]
        }-${date.getDate()} ${date.getFullYear()}`}
      </Text>
    </View>
  );
};

const HeadingImage = (props) => {
  const textColorNormal = props.darkMode ? styles.textDark : styles.textNormal;
  const textColorEvent = styles.textEvent;
  const countText =
    props.count === 0
      ? `No Reminder Today`
      : `${props.count} Reminder${props.count === 1 ? "" : "s"} Today!`;

  return (
    <View style={tailwind("items-center rounded px-1 py-1")}>
      <Text
        style={[
          tailwind("font-bold"),
          props.count === 0 ? textColorNormal : textColorEvent,
        ]}
      >
        {countText}
      </Text>
    </View>
  );
};

const Heading = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;
  return (
    <View style={styles.headerContainer}>
      <View
        style={[
          tailwind("px-5 py-1 flex-row flex justify-between items-center"),
          styles.header,
        ]}
      >
        <HeadingGreet darkMode={darkMode} />
        <HeadingImage darkMode={darkMode} count={props.eventsToday || 0} />
      </View>
      <Divider />
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
  textEvent: {
    color: "#DC143C",
  },
  headerContainer: {
    marginBottom: 0,
  },
  header: {
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(Heading);
