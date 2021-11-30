import React, { useState } from "react";

import HeadingEvent from "../components/eventHeader";
import EventsList from "../components/eventList";

import { connect } from "react-redux";
import { DefaultTheme } from "../utils/constants";
import { useColorScheme } from "../utils/utils";

import { SafeAreaView } from "react-native";
import { View, StyleSheet } from "react-native";

const EventsPage = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  const [sortType, setSortType] = useState({
    label: "Next Date",
    value: 2,
  });
  return (
    <View style={darkMode ? styles.PageDark : styles.PageNormal}>
      <SafeAreaView>
        <HeadingEvent sortType={sortType} setSortType={setSortType} />
        <EventsList
          sortType={sortType}
          goEvents={props.goEvents}
          deepLinkedEvent={props.deepLinkedEvent}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  PageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
  },
  PageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(EventsPage);
