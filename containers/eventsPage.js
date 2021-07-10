import React from "react";

import HeadingEvent from "../components/eventHeader";
import AddEventTile from "../components/addEventTile";

import { connect } from "react-redux";
import { DefaultTheme } from "../utils/constants";

import { SafeAreaView, ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";

const EventsPage = (props) => {
  return (
    <View style={props.darkMode ? styles.PageDark : styles.PageNormal}>
      <SafeAreaView>
        <HeadingEvent />
        <ScrollView>
          <AddEventTile />
          <View style={styles.flat} />
        </ScrollView>
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
  flat: {
    height: 150,
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(EventsPage);
