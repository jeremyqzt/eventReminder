import React, { useState } from "react";

import { DefaultTheme } from "../utils/constants";
import { SafeAreaView } from "react-native";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { settingsDarkMode } from "../actions/actions";
import SettingsToggle from "./toggle";

const SettingsList = (props) => {
  const [darkMode, setDarkMode] = useState(props.darkMode);
  const [notifs, setNotifs] = useState(props.notifs);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    props.setDarkMode(!darkMode);
  };

  const toggleNotifs = () => {
    setNotifs(!notifs);
    //props.setDarkMode(!darkMode);
  };

  return (
    <View
      style={darkMode ? styles.settingsPageDark : styles.settingsPageNormal}
    >
      <SafeAreaView>
        <SettingsToggle
          text={"Dark Mode"}
          subText={"Toggle between dark and light mode."}
          value={darkMode}
          callback={toggleDarkMode}
        />
        <SettingsToggle
          text={"Notify Me"}
          subText={"Create a notification on the day of the event."}
          value={notifs}
          callback={toggleNotifs}
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
