import React from "react";

import SettingsHeading from "../components/settingsHeader";
import SettingsList from "../components/listSettings";
import { connect } from "react-redux";

import { DefaultTheme } from "../utils/constants";

import { SafeAreaView } from "react-native";
import { View, StyleSheet, useColorScheme } from "react-native";

const SettingsPage = (props) => {
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark" || props.darkMode;

  return (
    <View
      style={darkMode ? styles.settingsPageDark : styles.settingsPageNormal}
    >
      <SafeAreaView>
        <SettingsHeading />
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
