import React, { useState } from "react";

import { DefaultTheme } from "../utils/constants";
import { SafeAreaView } from "react-native";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { settingsDarkMode } from "../actions/actions";
import SettingsToggle from "./toggle";

const SettingsList = (props) => {
  const [darkMode, setDarkMode] = useState(props.darkMode);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    props.setDarkMode(!darkMode);
  };

  return (
    <View
      style={darkMode ? styles.settingsPageDark : styles.settingsPageNormal}
    >
      <SafeAreaView>
        <SettingsToggle
          text={"Toggle Dark Mode"}
          value={darkMode}
          callback={toggleDarkMode}
        />
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
  setting: {
    width: "100%",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDarkMode: (darkMode) => dispatch(settingsDarkMode(darkMode)),
  };
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.settingsReducer.darkMode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
