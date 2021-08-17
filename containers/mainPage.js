import React, { useState } from "react";

import Heading from "../components/header";
import OverviewList from "../components/overviewList";

import { connect } from "react-redux";
import { DefaultTheme } from "../utils/constants";

import { SafeAreaView } from "react-native";
import { View, StyleSheet } from "react-native";

const MainPage = (props) => {
  const [eventsToday, setEventsToday] = useState(0);
  const setEventsCount = (count) => setEventsToday(count);

  return (
    <View style={props.darkMode ? styles.mainPageDark : styles.mainPageNormal}>
      <SafeAreaView>
        <Heading eventsToday={eventsToday} />
        <OverviewList setCount={setEventsCount} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainPageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
  },
  mainPageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(MainPage);
