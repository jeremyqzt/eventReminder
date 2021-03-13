import React, { useState } from "react";
import { ListItem, Avatar, Input, Icon, Button } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { DefaultTheme } from "../utils/constants";
import { connect } from "react-redux";

const EventItem = (props) => {
  return <View></View>;
};

const EventList = (props) => {
  return <View></View>;
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
  },
  buttonNormal: {
    backgroundColor: DefaultTheme.darkMode.background,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  buttonDark: {
    backgroundColor: DefaultTheme.normalMode.background,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  textDark: {
    color: DefaultTheme.darkMode.text,
  },
  textNormal: {
    color: DefaultTheme.normalMode.text,
  },
  buttonRow: {
    justifyContent: "flex-end",
  },
  inputs: {
    width: "50%",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
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

export default connect(mapStateToProps, null)(ContactItem);
