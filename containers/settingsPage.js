import React from "react";

import Heading from "../components/header";
import SettingsList from "../components/listSettings";
import { connect } from "react-redux";

import { DefaultTheme } from "../utils/constants";

import { SafeAreaView } from "react-native";
import { View, StyleSheet } from "react-native";

const SettingsPage = (props) => {
  return (
    <View
      style={
        props.darkMode ? styles.settingsPageDark : styles.settingsPageNormal
      }
    >
      <SafeAreaView>
        <SettingsList />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsPageNormal: {
    backgroundColor: DefaultTheme.normalMode.main,
    height: "100%",
  },
  settingsPageDark: {
    backgroundColor: DefaultTheme.darkMode.main,
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, null)(SettingsPage);
